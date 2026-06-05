const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.DATABASE_URL ? { ssl: { rejectUnauthorized: false } } : {}),
});

app.use(cors());
app.use(express.json());

// New app (public/) served at root
app.use(express.static(path.join(__dirname, 'public')));

// ── GitHub data proxy ─────────────────────────────────────────────────────────
// All dynamic data (skills, runs, changelog, events) is served from GitHub.
// This keeps Replit and Vercel in sync automatically — no filesystem dependency.
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/satvikdhumaleheadout/skills-notebook/main';

const MIME_TYPES = {
  html: 'text/html; charset=utf-8',
  json: 'application/json; charset=utf-8',
  md:   'text/plain; charset=utf-8',
  js:   'application/javascript; charset=utf-8',
  css:  'text/css; charset=utf-8',
  txt:  'text/plain; charset=utf-8',
};

app.get('/github/*', async (req, res) => {
  const filePath = req.params[0];
  try {
    const ghRes = await fetch(`${GITHUB_RAW_BASE}/${filePath}`);
    if (!ghRes.ok) return res.status(ghRes.status).end();
    const ext = filePath.split('.').pop().toLowerCase();
    res.set('Content-Type', MIME_TYPES[ext] || 'text/plain; charset=utf-8');
    res.set('Cache-Control', 'public, max-age=30');
    res.send(await ghRes.text());
  } catch (err) {
    console.error('GitHub proxy error:', err.message);
    res.status(502).send('GitHub proxy error');
  }
});

// Decision tree data (URL kept as /part2.js for frontend compatibility)
app.get('/part2.js', (req, res) => res.sendFile(path.join(__dirname, 'skills', 'cvr-rca', 'tree.js')));

// ── Comments API ───────────────────────────────────────────────────────────────

app.get('/api/comments', async (req, res) => {
  try {
    const { run } = req.query;
    if (!run) return res.status(400).json({ error: 'run param required' });
    const result = await pool.query(
      'SELECT id, run_id, author_name, text, parent_id, created_at FROM comments WHERE run_id = $1 ORDER BY created_at ASC',
      [run]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    const { runId, authorName, text, parentId, authorToken } = req.body;
    if (!runId || !authorName || !text) return res.status(400).json({ error: 'Missing fields' });
    const result = await pool.query(
      `INSERT INTO comments (run_id, author_name, text, parent_id, author_token)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, run_id, author_name, text, parent_id, created_at`,
      [runId, authorName.trim(), text.trim(), parentId || null, authorToken || null]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

function isAuthorized(req, row) {
  const modToken = process.env.MODERATOR_TOKEN;
  if (modToken && req.headers['x-moderator-token'] === modToken) return true;
  const authorToken = req.headers['x-author-token'];
  if (authorToken && row.author_token && row.author_token === authorToken) return true;
  return false;
}

app.delete('/api/comments/:id', async (req, res) => {
  try {
    if (!req.headers['x-author-token'] && !req.headers['x-moderator-token']) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const check = await pool.query('SELECT author_token FROM comments WHERE id = $1', [req.params.id]);
    if (!check.rows.length) return res.status(404).json({ error: 'not found' });
    if (!isAuthorized(req, check.rows[0])) return res.status(403).json({ error: 'Forbidden' });
    await pool.query('DELETE FROM comments WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'db error' });
  }
});

app.patch('/api/comments/:id', async (req, res) => {
  try {
    if (!req.headers['x-author-token'] && !req.headers['x-moderator-token']) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ error: 'text required' });
    const check = await pool.query('SELECT author_token FROM comments WHERE id = $1', [req.params.id]);
    if (!check.rows.length) return res.status(404).json({ error: 'not found' });
    if (!isAuthorized(req, check.rows[0])) return res.status(403).json({ error: 'Forbidden' });
    const result = await pool.query(
      'UPDATE comments SET text = $1 WHERE id = $2 RETURNING id, run_id, author_name, text, parent_id, created_at',
      [text.trim(), req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'db error' });
  }
});

// Fallback: serve new app for all non-API, non-asset routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

// ── DB Init ────────────────────────────────────────────────────────────────────

let dbInitialized = false;
let dbInitPromise = null;

function ensureDb() {
  if (dbInitialized) return Promise.resolve();
  if (dbInitPromise) return dbInitPromise;
  dbInitPromise = pool.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id         SERIAL PRIMARY KEY,
      run_id     TEXT NOT NULL,
      author_name TEXT NOT NULL,
      text       TEXT NOT NULL,
      parent_id  INTEGER REFERENCES comments(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_comments_run_id ON comments(run_id);
    ALTER TABLE comments ADD COLUMN IF NOT EXISTS author_token TEXT;
  `).then(() => {
    dbInitialized = true;
    console.log('DB ready');
  });
  return dbInitPromise;
}

// Run DB init eagerly at startup (handles both local and Vercel cold-start)
ensureDb().catch(console.error);

// ── Local dev server (not used on Vercel) ──────────────────────────────────────

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Skills Notebook running on port ${PORT}`);
  });
}

module.exports = app;
