#!/usr/bin/env node
/**
 * update-manifests.js
 *
 * Scans runs/{skill-id}/{version}/ folders, reads run-meta.json from each run
 * subfolder, and regenerates manifest.json for each version. Handles any number
 * of skills — just add a new runs/{skill-id}/ folder and it's picked up
 * automatically. Run by the GitHub Action on every push to main.
 *
 * Usage: node scripts/update-manifests.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..', 'runs');
const DRY_RUN = process.argv.includes('--dry-run');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  if (DRY_RUN) {
    console.log(`[dry-run] Would write ${filePath}:`);
    console.log(JSON.stringify(data, null, 2));
    return;
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function detectFiles(skillId, versionDir, runId) {
  const runDir = path.join(versionDir, runId);
  const version = path.basename(versionDir);
  const files = {};
  const candidates = {
    report:     'report.html',
    transcript: 'transcript.md',
    evaluation: 'evaluation.md',
    findings:   'findings.md',
  };
  for (const [key, filename] of Object.entries(candidates)) {
    if (fs.existsSync(path.join(runDir, filename))) {
      files[key] = `runs/${skillId}/${version}/${runId}/${filename}`;
    }
  }
  return files;
}

function processVersion(skillId, versionDir) {
  const version = path.basename(versionDir);
  const entries = fs.readdirSync(versionDir, { withFileTypes: true });

  const runs = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const runId = entry.name;
    const metaPath = path.join(versionDir, runId, 'run-meta.json');

    if (!fs.existsSync(metaPath)) {
      console.warn(`  [warn] No run-meta.json in ${skillId}/${version}/${runId} — skipping`);
      continue;
    }

    let meta;
    try {
      meta = readJson(metaPath);
    } catch (err) {
      console.error(`  [error] Failed to parse run-meta.json in ${skillId}/${version}/${runId}: ${err.message}`);
      continue;
    }

    const required = ['ce_id', 'ce_name', 'pre_start', 'post_end', 'run_date', 'eval_max', 'root_cause'];
    const missing = required.filter(k => meta[k] === undefined || meta[k] === null);
    if (missing.length > 0) {
      console.error(`  [error] run-meta.json in ${skillId}/${version}/${runId} missing fields: ${missing.join(', ')} — skipping`);
      continue;
    }

    runs.push({
      id: runId,
      ce_id: String(meta.ce_id),
      ce_name: meta.ce_name,
      pre_start: meta.pre_start,
      post_end: meta.post_end,
      run_date: meta.run_date,
      eval_score: meta.eval_score,
      eval_max: meta.eval_max,
      root_cause: meta.root_cause,
      files: detectFiles(skillId, versionDir, runId),
    });
  }

  runs.sort((a, b) => a.run_date.localeCompare(b.run_date));

  const manifest = { version, runs };
  writeJson(path.join(versionDir, 'manifest.json'), manifest);

  console.log(`    ${version}: wrote manifest.json with ${runs.length} run(s)`);
  return runs.length;
}

function processSkill(skillDir) {
  const skillId = path.basename(skillDir);
  const entries = fs.readdirSync(skillDir, { withFileTypes: true });
  const versionDirs = entries
    .filter(e => e.isDirectory() && /^v\d+/.test(e.name))
    .map(e => path.join(skillDir, e.name))
    .sort();

  if (versionDirs.length === 0) {
    console.log(`  ${skillId}: no version directories — skipping`);
    return 0;
  }

  console.log(`  ${skillId}: ${versionDirs.length} version(s)`);
  let total = 0;
  for (const versionDir of versionDirs) {
    total += processVersion(skillId, versionDir);
  }
  return total;
}

function main() {
  if (!fs.existsSync(BASE_DIR)) {
    console.error(`runs/ directory not found at ${BASE_DIR}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(BASE_DIR, { withFileTypes: true });
  const skillDirs = entries
    .filter(e => e.isDirectory() && !/^v\d+/.test(e.name))
    .map(e => path.join(BASE_DIR, e.name))
    .sort();

  if (skillDirs.length === 0) {
    console.log('No skill directories found in runs/. Nothing to do.');
    return;
  }

  console.log(`Found ${skillDirs.length} skill(s): ${skillDirs.map(d => path.basename(d)).join(', ')}`);
  let total = 0;
  for (const skillDir of skillDirs) {
    total += processSkill(skillDir);
  }
  console.log(`Done. ${total} run(s) processed.`);
}

main();
