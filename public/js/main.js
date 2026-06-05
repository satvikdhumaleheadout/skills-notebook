// ── Bootstrap ─────────────────────────────────────────────────────────────────
const { useState, useEffect, useCallback, useMemo, useRef } = React;

// ── Routing ───────────────────────────────────────────────────────────────────
function navigate(path) {
  window.location.hash = '#' + (path.startsWith('/') ? path : '/' + path);
}

function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);
  if (!parts.length || parts[0] !== 'skill') return { page: 'home' };
  return {
    page:       'skill',
    skillId:    parts[1] || null,
    tab:        parts[2] || 'overview',
    runVersion: parts[3] || null,
    runId:      parts[4] ? decodeURIComponent(parts[4]) : null,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function scoreMeta(score, max) {
  const pct = Math.round(score / max * 100);
  const label = `${score}/${max}`;
  if (pct >= 85) return { cls: 'score-high', label };
  if (pct >= 70) return { cls: 'score-mid', label };
  return { cls: 'score-low', label };
}

function initials(name) {
  return (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

const CAT_COLORS = {
  Conversion: '#6366F1',
  Revenue:    '#10B981',
  Traffic:    '#3B82F6',
  Metadata:   '#8B5CF6',
  Inventory:  '#F59E0B',
};

// ── Markdown Viewer ───────────────────────────────────────────────────────────
function MarkdownViewer({ src }) {
  const [html, setHtml]     = useState('');
  const [loading, setLoad]  = useState(true);
  const [error, setError]   = useState(false);

  useEffect(() => {
    if (!src) return;
    setLoad(true); setError(false);
    fetch(src)
      .then(r => { if (!r.ok) throw new Error(); return r.text(); })
      .then(text => {
        setHtml(typeof marked !== 'undefined' ? marked.parse(text) : `<pre>${text}</pre>`);
        setLoad(false);
      })
      .catch(() => { setError(true); setLoad(false); });
  }, [src]);

  if (loading) return <div className="loading-state">Loading…</div>;
  if (error)   return <div className="empty-state"><div className="empty-state-icon">📄</div><div className="empty-state-title">File not found</div></div>;
  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />;
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ skills, route, collapsed, onToggle }) {
  const catOrder = ['Conversion', 'Revenue', 'Traffic', 'Metadata', 'Inventory'];
  const grouped = catOrder.map(cat => ({
    cat, items: skills.filter(s => s.category === cat)
  })).filter(g => g.items.length > 0);

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="sidebar-logo" onClick={() => navigate('/')}>
        <span className="sidebar-logo-icon">🧠</span>
        <span className="sidebar-logo-text">Skills Notebook</span>
      </div>
      <nav className="sidebar-nav">
        <div
          className={`sidebar-nav-item ${route.page === 'home' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <span className="sidebar-nav-icon">⊞</span>
          <span className="sidebar-nav-label">Home</span>
        </div>
        {grouped.map(({ cat, items }) => (
          <div key={cat}>
            <div className="sidebar-section-label">{cat}</div>
            {items.map(skill => (
              <div key={skill.id}>
                <div
                  className={`sidebar-skill-item ${route.skillId === skill.id && route.tab !== 'runs' ? 'active' : ''}`}
                  style={{ opacity: skill.status === 'coming-soon' ? 0.55 : 1, cursor: skill.status === 'coming-soon' ? 'default' : 'pointer' }}
                  onClick={() => skill.status === 'active' && navigate('/skill/' + skill.id)}
                >
                  <span className="sidebar-skill-dot" style={{ background: skill.color }} />
                  <span className="sidebar-skill-name">{skill.name}</span>
                  {skill.status === 'coming-soon' && <span className="sidebar-skill-soon">soon</span>}
                </div>
                {skill.status === 'active' && skill.runsPath && (
                  <div
                    className={`sidebar-skill-runs-link ${route.skillId === skill.id && route.tab === 'runs' ? 'active' : ''}`}
                    onClick={() => navigate(`/skill/${skill.id}/runs`)}
                  >
                    <span>🧪</span>
                    <span>Test Runs</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <button className="sidebar-toggle-btn" onClick={onToggle} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        {collapsed ? '›' : '‹'}
      </button>
    </aside>
  );
}

// ── Skill Card ────────────────────────────────────────────────────────────────
function SkillCard({ skill }) {
  const color = skill.color || '#6B7280';
  return (
    <div
      className={`skill-card ${skill.status === 'coming-soon' ? 'coming-soon' : ''}`}
      onClick={() => skill.status === 'active' && navigate('/skill/' + skill.id)}
    >
      <div className="skill-card-top">
        <span className="skill-card-icon">{skill.icon}</span>
        <span className="skill-card-cat" style={{ color, borderColor: color + '40', background: color + '12' }}>
          {skill.category}
        </span>
      </div>
      <div className="skill-card-name">{skill.name}</div>
      <div className="skill-card-desc">{skill.description}</div>
      <div className="skill-card-footer">
        {skill.status === 'active' ? (
          <>
            <span className="status-badge status-active">● Active</span>
            {skill.latestVersion && <span className="skill-card-meta">{skill.latestVersion}</span>}
          </>
        ) : (
          <span className="status-badge status-coming-soon">Coming soon</span>
        )}
      </div>
    </div>
  );
}

// ── D3 Force Graph ────────────────────────────────────────────────────────────
function GraphView({ skills, connections }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (typeof d3 === 'undefined' || !svgRef.current) return;
    const el = svgRef.current;
    const W = el.clientWidth || 860;
    const H = 480;

    const svg = d3.select(el);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${W} ${H}`);

    const nodes = skills.map(s => ({ ...s }));
    const links = connections
      .map(c => ({ source: c.from, target: c.to, label: c.label }))
      .filter(l => nodes.find(n => n.id === l.source) && nodes.find(n => n.id === l.target));

    const sim = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(160))
      .force('charge', d3.forceManyBody().strength(-450))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('collision', d3.forceCollide(60));

    svg.append('defs').append('marker')
      .attr('id', 'garrow').attr('viewBox', '0 -5 10 10')
      .attr('refX', 34).attr('refY', 0).attr('markerWidth', 5).attr('markerHeight', 5).attr('orient', 'auto')
      .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', '#CBD5E1');

    const link = svg.append('g').selectAll('line').data(links).join('line')
      .attr('stroke', '#E2E8F0').attr('stroke-width', 1.5)
      .attr('marker-end', 'url(#garrow)');

    const linkLabel = svg.append('g').selectAll('text').data(links).join('text')
      .attr('font-size', 9).attr('fill', '#9CA3AF')
      .attr('text-anchor', 'middle').attr('dy', -4)
      .text(d => d.label);

    const node = svg.append('g').selectAll('g').data(nodes).join('g')
      .attr('cursor', d => d.status === 'active' ? 'pointer' : 'default')
      .on('click', (e, d) => d.status === 'active' && navigate('/skill/' + d.id))
      .call(d3.drag()
        .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on('end',   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
      );

    node.append('circle')
      .attr('r', 44)
      .attr('fill', d => (CAT_COLORS[d.category] || '#6B7280') + '14')
      .attr('stroke', d => CAT_COLORS[d.category] || '#6B7280')
      .attr('stroke-width', 2)
      .attr('opacity', d => d.status === 'active' ? 1 : 0.45);

    node.append('text').attr('text-anchor', 'middle').attr('dy', '-10px')
      .attr('font-size', '22px').text(d => d.icon);

    node.append('text').attr('text-anchor', 'middle').attr('dy', '12px')
      .attr('font-size', 11).attr('font-weight', '600')
      .attr('fill', d => d.status === 'active' ? '#111827' : '#9CA3AF')
      .text(d => d.name);

    node.filter(d => d.status === 'coming-soon').append('text')
      .attr('text-anchor', 'middle').attr('dy', '26px')
      .attr('font-size', 8).attr('fill', '#9CA3AF').text('soon');

    sim.on('tick', () => {
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      linkLabel.attr('x', d => (d.source.x + d.target.x) / 2).attr('y', d => (d.source.y + d.target.y) / 2);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => sim.stop();
  }, [skills, connections]);

  return (
    <div className="graph-container">
      <svg ref={svgRef} className="skill-graph" style={{ height: 480 }} />
      <div className="graph-hint">Drag nodes · Click active skills to open</div>
    </div>
  );
}

// ── Home Hub ──────────────────────────────────────────────────────────────────
function HomeHub({ skills, connections }) {
  const [view, setView] = useState('table');

  return (
    <div className="page-home">
      <div className="home-eyebrow">Headout · Analytics Engineering</div>
      <h1 className="home-title">Skills Notebook</h1>
      <p className="home-subtitle">AI-powered RCA and analysis skills covering revenue drivers across the platform.</p>

      <div className="home-controls">
        <span className="home-controls-label">View</span>
        <button className={`view-btn ${view === 'table' ? 'active' : ''}`} onClick={() => setView('table')}>⊞ Table</button>
        <button className={`view-btn ${view === 'graph' ? 'active' : ''}`} onClick={() => setView('graph')}>◈ Graph</button>
      </div>

      {view === 'table' && (
        <div className="skill-grid">
          {skills.map(s => <SkillCard key={s.id} skill={s} />)}
        </div>
      )}
      {view === 'graph' && <GraphView skills={skills} connections={connections} />}
    </div>
  );
}

// ── Overview Tab ──────────────────────────────────────────────────────────────
function OverviewTab({ skill, allSkills, connections }) {
  const incoming = connections.filter(c => c.to === skill.id)
    .map(c => ({ ...allSkills.find(s => s.id === c.from), rel: c.label })).filter(Boolean);
  const outgoing = connections.filter(c => c.from === skill.id)
    .map(c => ({ ...allSkills.find(s => s.id === c.to), rel: c.label })).filter(Boolean);

  return (
    <div style={{ maxWidth: 900 }}>
      {skill.status === 'coming-soon' && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10, padding: '14px 18px', marginBottom: 24, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 18 }}>🚧</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#92400E' }}>Coming soon</div>
            <div style={{ fontSize: 12, color: '#B45309', marginTop: 2 }}>This skill is in development. Check back later for updates.</div>
          </div>
        </div>
      )}

      <div className="overview-grid">
        <div className="overview-card" style={{ gridColumn: '1 / -1' }}>
          <div className="overview-card-label">About this skill</div>
          <p>{skill.longDescription || skill.description}</p>
        </div>

        {skill.inputs && (
          <div className="overview-card">
            <div className="overview-card-label">Inputs</div>
            <div className="io-list">
              {skill.inputs.map((inp, i) => (
                <div key={i} className="io-item">
                  <span className="io-dot" style={{ background: '#3B82F6' }} />
                  {inp}
                </div>
              ))}
            </div>
          </div>
        )}

        {skill.outputs && (
          <div className="overview-card">
            <div className="overview-card-label">Outputs</div>
            <div className="io-list">
              {skill.outputs.map((out, i) => (
                <div key={i} className="io-item">
                  <span className="io-dot" style={{ background: '#10B981' }} />
                  {out}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {(incoming.length > 0 || outgoing.length > 0) && (
        <div className="overview-card" style={{ marginBottom: 24 }}>
          <div className="overview-card-label">Connected skills</div>
          {incoming.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8 }}>Feeds from</div>
              <div className="connected-skills">
                {incoming.map(s => (
                  <div key={s.id} className="connected-skill-chip" onClick={() => s.status === 'active' && navigate('/skill/' + s.id)}>
                    <span>{s.icon}</span> {s.name}
                    <span style={{ color: 'var(--text-3)', fontSize: 10 }}>→ {s.rel}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {outgoing.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8 }}>Informs</div>
              <div className="connected-skills">
                {outgoing.map(s => (
                  <div key={s.id} className="connected-skill-chip" onClick={() => s.status === 'active' && navigate('/skill/' + s.id)}>
                    <span>{s.icon}</span> {s.name}
                    <span style={{ color: 'var(--text-3)', fontSize: 10 }}>→ {s.rel}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {skill.trigger && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>TRIGGER</span>
            <code style={{ fontSize: 12, background: 'var(--bg)', padding: '2px 8px', borderRadius: 4, color: 'var(--primary-text)' }}>{skill.trigger}</code>
          </div>
          {skill.latestVersion && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>VERSION</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{skill.latestVersion}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Changelog Tab ─────────────────────────────────────────────────────────────
function ChangelogTab({ skill }) {
  if (!skill.changelogPath) {
    return <div className="empty-state"><div className="empty-state-icon">📋</div><div className="empty-state-title">No changelog yet</div></div>;
  }
  return <MarkdownViewer src={`/${skill.changelogPath}`} />;
}

// ── Events Tab ────────────────────────────────────────────────────────────────
function EventsTab({ skill }) {
  if (!skill.eventsPath) {
    return <div className="empty-state"><div className="empty-state-icon">⚡</div><div className="empty-state-title">No events reference</div></div>;
  }
  return <iframe src={`/${skill.eventsPath}`} style={{ width: '100%', height: '100%', border: 'none' }} title="Funnel Events" />;
}

// ── Decision Tree View ────────────────────────────────────────────────────────
function TreeView() {
  // Globals injected by /part2.js
  const TREE_NODES     = typeof NODES          !== 'undefined' ? NODES          : [];
  const TREE_EDGES     = typeof EDGES          !== 'undefined' ? EDGES          : [];
  const TREE_TYPE_META = typeof TYPE_META      !== 'undefined' ? TYPE_META      : {};
  const TREE_LABELS    = typeof SECTION_LABELS !== 'undefined' ? SECTION_LABELS : [];
  const TREE_FILES     = typeof FILE_CONTENTS  !== 'undefined' ? FILE_CONTENTS  : {};
  const NODE_W = 248;
  const NODE_H = 160;

  const [zoom,     setZoom]  = useState(0.72);
  const [pan,      setPan]   = useState({ x: 55, y: 20 });
  const [selected, setSelected] = useState(null);
  const [dragging, setDragging] = useState(false);
  const dragRef   = useRef(null);
  const movedRef  = useRef(false);
  const wrapRef   = useRef(null);

  const nodeMap = useMemo(() => Object.fromEntries(TREE_NODES.map(n => [n.id, n])), []);

  const litIds = useMemo(() => {
    if (!selected) return null;
    const s = new Set([selected.id]);
    TREE_EDGES.forEach(e => { if (e.from === selected.id) s.add(e.to); if (e.to === selected.id) s.add(e.from); });
    return s;
  }, [selected]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = e => { e.preventDefault(); setZoom(z => Math.max(0.2, Math.min(2, z + (e.deltaY < 0 ? 0.07 : -0.07)))); };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onMouseDown = e => {
    if (e.button !== 0) return;
    setDragging(true); movedRef.current = false;
    dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  };
  const onMouseMove = e => {
    if (!dragging || !dragRef.current) return;
    const dx = e.clientX - dragRef.current.x, dy = e.clientY - dragRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) movedRef.current = true;
    setPan({ x: dragRef.current.px + dx, y: dragRef.current.py + dy });
  };
  const onMouseUp = () => { setDragging(false); dragRef.current = null; };

  function edgePath(from, to) {
    const fx = from.x + NODE_W / 2, fy = from.y + NODE_H;
    const tx = to.x + NODE_W / 2, ty = to.y;
    const dx = Math.abs(tx - fx);
    if (dx > 400) {
      // Horizontal-ish (reference file nodes)
      if (from.x > to.x) {
        return `M ${from.x} ${from.y + NODE_H / 2} C ${from.x - 80} ${from.y + NODE_H / 2} ${to.x + NODE_W + 80} ${to.y + NODE_H / 2} ${to.x + NODE_W} ${to.y + NODE_H / 2}`;
      }
      return `M ${from.x + NODE_W} ${from.y + NODE_H / 2} C ${from.x + NODE_W + 80} ${from.y + NODE_H / 2} ${to.x - 80} ${to.y + NODE_H / 2} ${to.x} ${to.y + NODE_H / 2}`;
    }
    const mid = (fy + ty) / 2;
    return `M ${fx} ${fy} C ${fx} ${mid} ${tx} ${mid} ${tx} ${ty}`;
  }

  if (!TREE_NODES.length) {
    return <div className="empty-state"><div className="empty-state-icon">🗺</div><div className="empty-state-title">Decision tree data not loaded</div><div className="empty-state-desc">Reload the page to try again.</div></div>;
  }

  return (
    <div className="tree-outer">
      <div className="tree-main">
        <div className="tree-topbar">
          <span className="tree-hint">Click any node to inspect · Drag to pan · Scroll to zoom</span>
          <span className="tree-node-count">{TREE_NODES.length} nodes · {TREE_EDGES.length} edges</span>
        </div>

        <div
          ref={wrapRef}
          className="tree-wrap"
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onClick={e => {
            if (movedRef.current) { movedRef.current = false; return; }
            if (e.target === wrapRef.current || e.target.classList.contains('tree-canvas-inner')) setSelected(null);
          }}
        >
          <div
            className="tree-canvas-inner"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: '0 0' }}
          >
            {/* SVG Edges */}
            <svg style={{ position: 'absolute', left: 0, top: 0, width: 2200, height: 5500, pointerEvents: 'none', overflow: 'visible' }}>
              <defs>
                <marker id="tarrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L7,3 z" fill="#94A3B8" opacity="0.7" />
                </marker>
              </defs>
              {TREE_EDGES.map(edge => {
                const from = nodeMap[edge.from], to = nodeMap[edge.to];
                if (!from || !to) return null;
                const isConsults = edge.type === 'consults';
                const isConditional = edge.type === 'conditional';
                return (
                  <path
                    key={edge.id}
                    d={edgePath(from, to)}
                    fill="none"
                    stroke={isConsults ? '#CBD5E1' : isConditional ? '#A5B4FC' : '#64748B'}
                    strokeWidth={isConsults ? 1 : 1.5}
                    strokeDasharray={isConsults ? '5 4' : isConditional ? '7 3' : 'none'}
                    markerEnd="url(#tarrow)"
                    opacity={0.65}
                  />
                );
              })}
            </svg>

            {/* Section labels */}
            {TREE_LABELS.map(s => (
              <div key={s.text} style={{ position: 'absolute', left: s.x, top: s.y, fontSize: 10, fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.05em', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                {s.text}
              </div>
            ))}

            {/* Nodes */}
            {TREE_NODES.map(node => {
              const meta = TREE_TYPE_META[node.type] || { color: '#94A3B8' };
              const isSel = selected?.id === node.id;
              const isDim = litIds && !litIds.has(node.id);
              return (
                <div
                  key={node.id}
                  className={`tree-node ${isSel ? 'selected' : ''} ${isDim ? 'dimmed' : ''}`}
                  style={{
                    left: node.x, top: node.y,
                    borderLeft: `4px solid ${meta.color}`,
                    boxShadow: isSel ? `0 0 0 2px ${meta.color}40, var(--shadow)` : 'var(--shadow-sm)',
                  }}
                  onClick={e => { e.stopPropagation(); setSelected(p => p?.id === node.id ? null : node); }}
                >
                  <div className="tree-node-header">
                    <span className="tree-node-icon">{node.icon || '📌'}</span>
                    <span className="tree-node-label">{node.label}</span>
                  </div>
                  {node.sublabel && <div className="tree-node-sub">{node.sublabel}</div>}
                  {node.badge && <div className="tree-node-badge">{node.badge}</div>}
                  <div className="tree-node-io">
                    {node.inputs?.length > 0 && <div>IN: <span>{node.inputs.slice(0, 2).join(', ')}{node.inputs.length > 2 ? ` +${node.inputs.length - 2}` : ''}</span></div>}
                    {node.outputs?.length > 0 && <div>OUT: <span>{node.outputs.slice(0, 2).join(', ')}{node.outputs.length > 2 ? ` +${node.outputs.length - 2}` : ''}</span></div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Zoom controls */}
        <div className="zoom-controls">
          <button className="zoom-btn" onClick={() => setZoom(z => Math.min(2, z + 0.1))}>+</button>
          <button className="zoom-btn" onClick={() => setZoom(z => Math.max(0.2, z - 0.1))}>−</button>
          <button className="zoom-btn" title="Reset" onClick={() => { setZoom(0.72); setPan({ x: 55, y: 20 }); }}>↺</button>
        </div>

        {/* Legend */}
        <div className="tree-legend">
          {Object.entries(TREE_TYPE_META).map(([type, meta]) => (
            <div key={type} className="legend-item">
              <span className="legend-dot" style={{ background: meta.color }} />
              <span>{meta.label}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: 4, paddingTop: 4 }}>
            <div className="legend-item"><svg width="18" height="8"><line x1="0" y1="4" x2="18" y2="4" stroke="#64748B" strokeWidth="1.5" /></svg> Always</div>
            <div className="legend-item"><svg width="18" height="8"><line x1="0" y1="4" x2="18" y2="4" stroke="#A5B4FC" strokeWidth="1.5" strokeDasharray="6 3" /></svg> Conditional</div>
            <div className="legend-item"><svg width="18" height="8"><line x1="0" y1="4" x2="18" y2="4" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" /></svg> Consults</div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {selected && (
        <div className="tree-side-panel">
          <div className="tree-panel-header">
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 18 }}>{selected.icon || '📌'}</span>
                <div className="tree-panel-title">{selected.label}</div>
              </div>
              {selected.sublabel && <div className="tree-panel-sub">{selected.sublabel}</div>}
            </div>
            <button className="zoom-btn" onClick={() => setSelected(null)} title="Close">✕</button>
          </div>

          <div className="tree-panel-body">
            {selected.condition && (
              <div className="panel-section">
                <div className="panel-section-label">Condition</div>
                <div className="panel-condition">{selected.condition}</div>
              </div>
            )}
            {selected.inputs?.length > 0 && (
              <div className="panel-section">
                <div className="panel-section-label">Inputs</div>
                <div className="chip-row">{selected.inputs.map((x, i) => <span key={i} className="chip chip-in">{x}</span>)}</div>
              </div>
            )}
            {selected.outputs?.length > 0 && (
              <div className="panel-section">
                <div className="panel-section-label">Outputs</div>
                <div className="chip-row">{selected.outputs.map((x, i) => <span key={i} className="chip chip-out">{x}</span>)}</div>
              </div>
            )}
            {selected.description && (
              <div className="panel-section">
                <div className="panel-section-label">Description</div>
                <div className="panel-desc">{selected.description}</div>
              </div>
            )}
            {selected.chips?.length > 0 && (
              <div className="panel-section">
                <div className="panel-section-label">Key rules</div>
                <div className="chip-row">{selected.chips.map((x, i) => <span key={i} className="chip">{x}</span>)}</div>
              </div>
            )}
            {selected.fileKey && TREE_FILES[selected.fileKey] && (
              <div className="panel-section">
                <div className="panel-section-label">File contents</div>
                <div className="panel-markdown" dangerouslySetInnerHTML={{ __html: typeof marked !== 'undefined' ? marked.parse(TREE_FILES[selected.fileKey]) : TREE_FILES[selected.fileKey] }} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Comments ──────────────────────────────────────────────────────────────────

function getAuthorToken() {
  let token = localStorage.getItem('nb_author_token');
  if (!token) {
    token = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('nb_author_token', token);
  }
  return token;
}

function getMyCommentIds() {
  try { return new Set(JSON.parse(localStorage.getItem('nb_my_comments') || '[]')); }
  catch { return new Set(); }
}

function addMyCommentId(id) {
  const ids = getMyCommentIds();
  ids.add(id);
  localStorage.setItem('nb_my_comments', JSON.stringify([...ids]));
}

function removeMyCommentId(id) {
  const ids = getMyCommentIds();
  ids.delete(id);
  localStorage.setItem('nb_my_comments', JSON.stringify([...ids]));
}

function Comments({ runKey }) {
  const [comments,   setComments]  = useState([]);
  const [loading,    setLoading]   = useState(true);
  const [name,       setName]      = useState(() => localStorage.getItem('nb_name') || '');
  const [text,       setText]      = useState('');
  const [submitting, setSubmit]    = useState(false);
  const [replyTo,    setReplyTo]   = useState(null);
  const [replyName,  setRName]     = useState(() => localStorage.getItem('nb_name') || '');
  const [replyText,  setRText]     = useState('');
  const [editingId,  setEditingId] = useState(null);
  const [editText,   setEditText]  = useState('');
  const [myIds,      setMyIds]     = useState(() => getMyCommentIds());
  const [modToken,   setModToken]  = useState(() => sessionStorage.getItem('nb_mod_token') || '');

  const isMod = !!modToken;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/comments?run=${encodeURIComponent(runKey)}`)
      .then(r => r.json()).then(d => { setComments(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [runKey]);

  const canEdit = (comment) => isMod || myIds.has(comment.id);

  const authHeaders = (extra = {}) => {
    const h = { ...extra };
    if (isMod) h['X-Moderator-Token'] = modToken;
    else h['X-Author-Token'] = getAuthorToken();
    return h;
  };

  const postComment = async (authorName, body, parentId = null) => {
    const authorToken = getAuthorToken();
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ runId: runKey, authorName, text: body, parentId, authorToken }),
    });
    const c = await res.json();
    addMyCommentId(c.id);
    setMyIds(getMyCommentIds());
    setComments(prev => [...prev, c]);
    return c;
  };

  const handleDelete = async (comment) => {
    if (!window.confirm('Delete this comment?')) return;
    const res = await fetch(`/api/comments/${comment.id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.ok) {
      removeMyCommentId(comment.id);
      setMyIds(getMyCommentIds());
      setComments(prev => prev.filter(c => c.id !== comment.id && c.parent_id !== comment.id));
    } else {
      const err = await res.json().catch(() => ({}));
      if (res.status === 403 && isMod) { sessionStorage.removeItem('nb_mod_token'); setModToken(''); }
      alert(err.error || 'Delete failed');
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const handleEdit = async (id) => {
    if (!editText.trim()) return;
    const res = await fetch(`/api/comments/${id}`, {
      method: 'PATCH',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ text: editText.trim() }),
    });
    if (res.ok) {
      const updated = await res.json();
      setComments(prev => prev.map(c => c.id === id ? updated : c));
      setEditingId(null);
    } else {
      const err = await res.json().catch(() => ({}));
      if (res.status === 403 && isMod) { sessionStorage.removeItem('nb_mod_token'); setModToken(''); }
      alert(err.error || 'Edit failed');
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !text.trim()) return;
    setSubmit(true);
    localStorage.setItem('nb_name', name.trim());
    await postComment(name.trim(), text.trim());
    setText(''); setSubmit(false);
  };

  const handleReply = async (parentId) => {
    if (!replyName.trim() || !replyText.trim()) return;
    localStorage.setItem('nb_name', replyName.trim());
    await postComment(replyName.trim(), replyText.trim(), parentId);
    setReplyTo(null); setRText('');
  };

  const activateMod = () => {
    const token = window.prompt('Enter moderator token:');
    if (!token) return;
    sessionStorage.setItem('nb_mod_token', token);
    setModToken(token);
  };

  const OwnActions = ({ comment }) => (
    <span style={{ display: 'inline-flex', gap: 4, marginLeft: 4 }}>
      <button className="comment-action-btn" onClick={() => startEdit(comment)}>✎ Edit</button>
      <button className="comment-action-btn" style={{ color: 'var(--red)' }} onClick={() => handleDelete(comment)}>✕ Delete</button>
    </span>
  );

  const topLevel = comments.filter(c => !c.parent_id);
  const getReplies = id => comments.filter(c => c.parent_id === id);
  const total = comments.length;

  const EditBox = ({ id }) => (
    <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
      <input
        className="input-text"
        value={editText}
        onChange={e => setEditText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleEdit(id)}
        autoFocus
      />
      <button className="btn btn-primary btn-sm" onClick={() => handleEdit(id)}>Save</button>
      <button className="btn btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
    </div>
  );

  return (
    <div className="comments-section">
      <div className="comments-section-inner">
        <div className="comments-header">
          <span className="comments-title">Discussion</span>
          {total > 0 && <span className="comments-count">{total}</span>}
          <span style={{ marginLeft: 'auto' }}>
            {isMod ? (
              <button
                className="comment-action-btn"
                style={{ color: 'var(--primary-text)', fontSize: 11 }}
                onClick={() => { sessionStorage.removeItem('nb_mod_token'); setModToken(''); }}
                title="Exit moderator mode"
              >🔓 Mod</button>
            ) : (
              <button
                className="comment-action-btn"
                style={{ color: 'var(--text-3)', fontSize: 11 }}
                onClick={activateMod}
                title="Enter moderator token to manage all comments"
              >🔑</button>
            )}
          </span>
        </div>

        {/* New comment form */}
        <div className="comment-form">
          <div className="comment-form-fields">
            <input
              className="input-name"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className="input-text"
              placeholder="Add a comment…"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
            />
          </div>
          <div className="comment-form-actions">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSubmit}
              disabled={submitting || !name.trim() || !text.trim()}
            >
              {submitting ? 'Posting…' : 'Post comment'}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">Loading comments…</div>
        ) : topLevel.length === 0 ? (
          <div style={{ color: 'var(--text-3)', fontSize: 12.5, paddingTop: 4 }}>No comments yet. Share your feedback above.</div>
        ) : (
          <div className="comments-list">
            {topLevel.map(comment => (
              <div key={comment.id} className="comment-thread">
                <div className="comment-row">
                  <div className="comment-avatar">{initials(comment.author_name)}</div>
                  <div className="comment-body">
                    <div className="comment-meta">
                      <span className="comment-author">{comment.author_name}</span>
                      <span className="comment-time">{timeAgo(comment.created_at)}</span>
                      {canEdit(comment) && <OwnActions comment={comment} />}
                    </div>
                    {editingId === comment.id ? (
                      <EditBox id={comment.id} />
                    ) : (
                      <div className="comment-text">{comment.text}</div>
                    )}
                    <div className="comment-actions">
                      <button className="comment-action-btn" onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}>
                        ↩ Reply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {getReplies(comment.id).length > 0 && (
                  <div className="comment-replies">
                    {getReplies(comment.id).map(reply => (
                      <div key={reply.id} className="comment-row">
                        <div className="comment-avatar sm">{initials(reply.author_name)}</div>
                        <div className="comment-body">
                          <div className="comment-meta">
                            <span className="comment-author">{reply.author_name}</span>
                            <span className="comment-time">{timeAgo(reply.created_at)}</span>
                            {canEdit(reply) && <OwnActions comment={reply} />}
                          </div>
                          {editingId === reply.id ? (
                            <EditBox id={reply.id} />
                          ) : (
                            <div className="comment-text">{reply.text}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply form */}
                {replyTo === comment.id && (
                  <div className="reply-form" style={{ paddingLeft: 38, marginTop: 8 }}>
                    <div className="reply-form-fields">
                      <input className="input-name" placeholder="Your name" value={replyName} onChange={e => setRName(e.target.value)} style={{ width: 130 }} />
                      <input className="input-text" placeholder="Write a reply…" value={replyText} onChange={e => setRText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleReply(comment.id)} />
                    </div>
                    <div className="reply-form-actions">
                      <button className="btn btn-sm" onClick={() => setReplyTo(null)}>Cancel</button>
                      <button className="btn btn-primary btn-sm" onClick={() => handleReply(comment.id)} disabled={!replyName.trim() || !replyText.trim()}>Reply</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Run Card ──────────────────────────────────────────────────────────────────
function RunCard({ run, selected, onClick }) {
  const sm = scoreMeta(run.eval_score, run.eval_max);
  return (
    <div className={`run-card ${selected ? 'selected' : ''}`} onClick={onClick}>
      <div className="run-card-top">
        <span className="run-card-name">{run.ce_name}</span>
        <span className={`score-badge ${sm.cls}`}>{sm.label}</span>
      </div>
      <div className="run-card-meta">CE {run.ce_id} · {run.pre_start} → {run.post_end}</div>
      {run.root_cause && <div className="run-card-root-cause">{run.root_cause}</div>}
    </div>
  );
}

// ── Run Viewer ────────────────────────────────────────────────────────────────
function RunViewer({ run, skillId, version }) {
  const [tab,        setTab]        = useState('report');
  const [toast,      setToast]      = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  const runKey = `${skillId}/${version}/${run.id}`;

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };
  const copyLink  = () => { navigator.clipboard.writeText(window.location.href); showToast('🔗 Link copied!'); };

  useEffect(() => {
    if (!fullscreen) return;
    const handler = e => { if (e.key === 'Escape') setFullscreen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [fullscreen]);

  const findingsPath = run.files?.transcript ? run.files.transcript.replace('transcript.md', 'findings.md') : null;

  const viewerTabs = [
    { id: 'report',     label: '📄 Report',     show: !!run.files?.report },
    { id: 'transcript', label: '📝 Transcript',  show: !!run.files?.transcript },
    { id: 'findings',   label: '🔍 Findings',    show: !!findingsPath },
    { id: 'evaluation', label: '⭐ Evaluation',  show: !!run.files?.evaluation },
  ].filter(t => t.show);

  const sm = scoreMeta(run.eval_score, run.eval_max);

  const content = (
    <>
      <div className="viewer-header">
        <div className="viewer-header-left">
          <div className="viewer-run-name">{run.ce_name}</div>
          <div className="viewer-run-meta">CE {run.ce_id} · {run.pre_start} → {run.post_end} · Run date {run.run_date}</div>
        </div>
        <div className="viewer-header-right">
          <span className={`score-badge ${sm.cls}`}>{sm.label}</span>
          <button className="btn btn-sm" onClick={copyLink}>🔗 Share</button>
          <button
            className="btn btn-sm btn-icon"
            onClick={() => setFullscreen(f => !f)}
            title={fullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen'}
          >
            {fullscreen ? '✕' : '⛶'}
          </button>
        </div>
      </div>

      <div className="viewer-tabs">
        {viewerTabs.map(t => (
          <div key={t.id} className={`viewer-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </div>
        ))}
      </div>

      <div className="viewer-body">
        {tab === 'report'     && <iframe className="viewer-iframe" src={`/${run.files.report}`} title="Report" />}
        {tab === 'transcript' && <div className="viewer-markdown"><MarkdownViewer src={`/${run.files.transcript}`} /></div>}
        {tab === 'findings'   && <div className="viewer-markdown"><MarkdownViewer src={`/${findingsPath}`} /></div>}
        {tab === 'evaluation' && <div className="viewer-markdown"><MarkdownViewer src={`/${run.files.evaluation}`} /></div>}
      </div>

      <Comments runKey={runKey} />
      {toast && <div className="toast">{toast}</div>}
    </>
  );

  if (fullscreen) {
    return <div className="viewer-fullscreen-overlay">{content}</div>;
  }
  return content;
}

// ── Test Runs ─────────────────────────────────────────────────────────────────
function TestRuns({ skill, route }) {
  const [versions, setVersions]   = useState([]);
  const [runsData, setRunsData]   = useState([]);
  const [loadingV, setLoadingV]   = useState(false);
  const [loadingR, setLoadingR]   = useState(false);

  // Load versions
  useEffect(() => {
    if (!skill.runsPath) return;
    setLoadingV(true);
    fetch(`/${skill.runsPath}/index.json`)
      .then(r => r.json())
      .then(d => { setVersions([...d.versions].reverse()); setLoadingV(false); })
      .catch(() => setLoadingV(false));
  }, [skill.runsPath]);

  // Determine active version
  const latestVersion = versions[0]?.version;
  const activeVersion = route.runVersion || latestVersion;

  // Load runs for active version
  useEffect(() => {
    if (!activeVersion || !skill.runsPath) return;
    setLoadingR(true);
    fetch(`/${skill.runsPath}/${activeVersion}/manifest.json`)
      .then(r => r.json())
      .then(d => { setRunsData(d.runs || []); setLoadingR(false); })
      .catch(() => { setRunsData([]); setLoadingR(false); });
  }, [activeVersion, skill.runsPath]);

  const activeRun = route.runId ? runsData.find(r => r.id === route.runId) : null;

  if (!skill.runsPath) {
    return (
      <div className="empty-state" style={{ flex: 1 }}>
        <div className="empty-state-icon">🧪</div>
        <div className="empty-state-title">No test runs yet</div>
        <div className="empty-state-desc">Test runs will appear here once this skill is active.</div>
      </div>
    );
  }

  return (
    <div className="runs-layout">
      {/* Left panel: version + run list */}
      <div className="runs-panel">
        <div className="runs-panel-header">
          {loadingV ? (
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Loading versions…</div>
          ) : (
            <select
              className="version-select"
              value={activeVersion || ''}
              onChange={e => navigate(`/skill/${skill.id}/runs/${e.target.value}`)}
            >
              {versions.map(v => (
                <option key={v.version} value={v.version}>
                  {v.version} — {v.version_date}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="runs-list">
          {loadingR ? (
            <div className="loading-state">Loading runs…</div>
          ) : runsData.length === 0 ? (
            <div className="empty-state"><div className="empty-state-title">No runs in this version</div></div>
          ) : runsData.map(run => (
            <RunCard
              key={run.id}
              run={run}
              selected={run.id === route.runId}
              onClick={() => navigate(`/skill/${skill.id}/runs/${activeVersion}/${encodeURIComponent(run.id)}`)}
            />
          ))}
        </div>
      </div>

      {/* Right panel: viewer */}
      <div className="runs-viewer-area">
        {activeRun ? (
          <RunViewer run={activeRun} skillId={skill.id} version={activeVersion} />
        ) : (
          <div className="viewer-no-run">
            <div className="viewer-no-run-icon">📋</div>
            <div className="viewer-no-run-title">Select a run to view</div>
            <div className="viewer-no-run-desc">Pick a test run from the left to see the report, transcript, findings, and evaluation.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Skill Page ────────────────────────────────────────────────────────────────
function SkillPage({ skill, allSkills, connections, route }) {
  const activeTab = route.tab || 'overview';

  const tabs = [
    { id: 'overview',  label: '📋 Overview' },
    ...(skill.hasDecisionTree ? [{ id: 'tree', label: '🗺 Decision Tree' }] : []),
    { id: 'runs',      label: '🧪 Test Runs' },
    ...(skill.changelogPath ? [{ id: 'changelog', label: '📋 Changelog' }] : []),
    ...(skill.hasEvents ? [{ id: 'events', label: '⚡ Funnel Events' }] : []),
  ];

  const scrollableTabs = ['overview', 'changelog'];
  const isScrollable = scrollableTabs.includes(activeTab);

  return (
    <div className="skill-page">
      {/* Header */}
      <div className="skill-header">
        <div className="skill-breadcrumb">
          <a onClick={() => navigate('/')}>Home</a>
          <span className="skill-breadcrumb-sep">›</span>
          <span>{skill.name}</span>
        </div>
        <div className="skill-header-top">
          <span className="skill-header-icon">{skill.icon}</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h1 className="skill-header-title">{skill.name}</h1>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 100, background: (skill.color || '#6B7280') + '14', color: skill.color || '#6B7280', border: `1px solid ${(skill.color || '#6B7280')}30` }}>{skill.category}</span>
              <span className={`status-badge ${skill.status === 'active' ? 'status-active' : 'status-coming-soon'}`}>
                {skill.status === 'active' ? '● Active' : 'Coming soon'}
              </span>
            </div>
            <div className="skill-header-desc">{skill.description}</div>
          </div>
        </div>
        <div className="skill-tabs">
          {tabs.map(t => (
            <div
              key={t.id}
              className={`skill-tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => navigate(`/skill/${skill.id}/${t.id}`)}
            >
              {t.label}
            </div>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className={`skill-tab-content ${isScrollable ? 'scrollable' : ''}`}>
        {activeTab === 'overview'  && <OverviewTab skill={skill} allSkills={allSkills} connections={connections} />}
        {activeTab === 'tree'      && <TreeView />}
        {activeTab === 'runs'      && <TestRuns skill={skill} route={route} />}
        {activeTab === 'changelog' && <ChangelogTab skill={skill} />}
        {activeTab === 'events'    && <EventsTab skill={skill} />}
      </div>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
function App() {
  const [route,            setRoute]            = useState(parseRoute());
  const [skills,           setSkills]           = useState([]);
  const [connections,      setConnections]      = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handler = () => setRoute(parseRoute());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  useEffect(() => {
    fetch('/skills/index.json')
      .then(r => r.json())
      .then(d => { setSkills(d.skills); setConnections(d.connections); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const currentSkill = route.skillId ? skills.find(s => s.id === route.skillId) : null;
  const isSkillPage  = route.page === 'skill' && currentSkill;

  return (
    <div className="app-shell">
      <Sidebar skills={skills} route={route} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
      <div className={`main-content ${isSkillPage ? 'no-scroll' : ''}`}>
        {loading ? (
          <div className="loading-state" style={{ height: '100%' }}>Loading…</div>
        ) : route.page === 'home' ? (
          <HomeHub skills={skills} connections={connections} />
        ) : isSkillPage ? (
          <SkillPage skill={currentSkill} allSkills={skills} connections={connections} route={route} />
        ) : (
          <div className="empty-state" style={{ height: '100%' }}>
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-title">Skill not found</div>
            <div className="empty-state-desc">The skill "{route.skillId}" doesn't exist.</div>
            <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => navigate('/')}>Back to Home</button>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
