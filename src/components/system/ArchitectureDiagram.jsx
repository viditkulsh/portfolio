import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useMotionTier from '../../hooks/useMotionTier';
import { NODE_KIND } from '../../data/sections/architectureData';

/**
 * Interactive system diagram.
 *
 * WHAT IT COMMUNICATES: the shape of a real system and how its parts depend
 * on one another. Selecting a component dims everything it does not touch,
 * which answers the question a reader actually has — "what talks to what?" —
 * rather than decorating the page with boxes.
 *
 * The animated flow along edges runs only on the full motion tier, and only
 * for the selected node's edges. Continuous traffic on every edge would be
 * noise; traffic on the path you just asked about is an answer.
 *
 * Accessibility: nodes are real <button>s in DOM order, so the diagram is
 * fully keyboard navigable and each node's detail is announced. The SVG
 * edge layer is decorative and hidden from assistive tech — the same
 * relationships are stated in text in the detail panel.
 */

const KIND_STYLE = {
  [NODE_KIND.CLIENT]: { fg: 'var(--text)', bd: 'var(--line-strong)', bg: 'var(--surface)' },
  [NODE_KIND.SERVICE]: { fg: 'var(--text)', bd: 'var(--line-strong)', bg: 'var(--surface)' },
  [NODE_KIND.DATA]: { fg: 'var(--cyan)', bd: 'var(--cyan-line)', bg: 'var(--cyan-soft)' },
  [NODE_KIND.CHAIN]: { fg: 'var(--cyan)', bd: 'var(--cyan-line)', bg: 'var(--cyan-soft)' },
  [NODE_KIND.EXTERNAL]: { fg: 'var(--text-muted)', bd: 'var(--line)', bg: 'var(--surface-inset)' },
  [NODE_KIND.CROSSCUT]: { fg: 'var(--ember)', bd: 'var(--ember-line)', bg: 'var(--ember-soft)' },
};

const KIND_LABEL = {
  [NODE_KIND.CLIENT]: 'Client',
  [NODE_KIND.SERVICE]: 'Service',
  [NODE_KIND.DATA]: 'Data store',
  [NODE_KIND.CHAIN]: 'On-chain',
  [NODE_KIND.EXTERNAL]: 'External',
  [NODE_KIND.CROSSCUT]: 'Cross-cutting',
};

export default function ArchitectureDiagram({ architecture }) {
  const { isStatic, allowNarrative } = useMotionTier();
  const wrapRef = useRef(null);
  const nodeRefs = useRef({});
  const [geometry, setGeometry] = useState({ w: 0, h: 0, points: {} });
  const [selected, setSelected] = useState(null);

  const allNodes = useMemo(
    () => architecture.layers.flatMap((l) => l.nodes.map((n) => ({ ...n, layer: l.id }))),
    [architecture]
  );

  const nodeById = useMemo(
    () => Object.fromEntries(allNodes.map((n) => [n.id, n])),
    [allNodes]
  );

  /** Edges touching the selected node, in both directions. */
  const activeEdges = useMemo(() => {
    if (!selected) return new Set();
    return new Set(
      architecture.edges
        .map((e, i) => (e.from === selected || e.to === selected ? i : -1))
        .filter((i) => i >= 0)
    );
  }, [architecture.edges, selected]);

  /** Nodes one hop from the selection — what stays lit. */
  const activeNodes = useMemo(() => {
    if (!selected) return null;
    const set = new Set([selected]);
    architecture.edges.forEach((e) => {
      if (e.from === selected) set.add(e.to);
      if (e.to === selected) set.add(e.from);
    });
    return set;
  }, [architecture.edges, selected]);

  /* Measure node centres so edges can be drawn between real positions.
     ResizeObserver keeps them correct through reflow and font swap — the
     usual failure mode here is edges drawn once against a pre-webfont
     layout and never corrected. */
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const box = wrap.getBoundingClientRect();
    const points = {};
    Object.entries(nodeRefs.current).forEach(([id, el]) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      points[id] = {
        cx: r.left - box.left + r.width / 2,
        cy: r.top - box.top + r.height / 2,
        w: r.width,
        h: r.height,
        left: r.left - box.left,
        right: r.right - box.left,
        top: r.top - box.top,
        bottom: r.bottom - box.top,
      };
    });
    setGeometry({ w: box.width, h: box.height, points });
  }, []);

  useEffect(() => {
    measure();
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    Object.values(nodeRefs.current).forEach((el) => el && ro.observe(el));
    // Re-measure once webfonts land, since they change box sizes.
    document.fonts?.ready?.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [measure, architecture]);

  /** Route an edge as an orthogonal path — reads as a schematic, not a web. */
  const pathFor = (edge) => {
    const a = geometry.points[edge.from];
    const b = geometry.points[edge.to];
    if (!a || !b) return null;

    // Vertical-ish: leave the bottom of A, enter the top of B.
    if (Math.abs(b.cy - a.cy) > 24) {
      const y1 = a.cy < b.cy ? a.bottom : a.top;
      const y2 = a.cy < b.cy ? b.top : b.bottom;
      const mid = y1 + (y2 - y1) / 2;
      return `M ${a.cx} ${y1} L ${a.cx} ${mid} L ${b.cx} ${mid} L ${b.cx} ${y2}`;
    }
    // Horizontal: side to side.
    const x1 = a.cx < b.cx ? a.right : a.left;
    const x2 = a.cx < b.cx ? b.left : b.right;
    return `M ${x1} ${a.cy} L ${x2} ${b.cy}`;
  };

  const detail = selected ? nodeById[selected] : null;

  return (
    <div className="stack-lg">
      <div className="scroll-x">
        <div ref={wrapRef} className="relative min-w-[34rem]">
          {/* Edge layer. Decorative — relationships are also stated in text. */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            width={geometry.w}
            height={geometry.h}
            aria-hidden="true"
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 7 4 L 0 7 z" fill="currentColor" />
              </marker>
            </defs>

            {architecture.edges.map((edge, i) => {
              const d = pathFor(edge);
              if (!d) return null;
              const isActive = activeEdges.has(i);
              const dimmed = selected && !isActive;
              return (
                <g
                  key={`${edge.from}-${edge.to}-${i}`}
                  style={{
                    color: isActive ? 'var(--ember)' : 'var(--line-strong)',
                    opacity: dimmed ? 0.16 : 1,
                    transition: 'opacity 220ms var(--ease-out), color 220ms var(--ease-out)',
                  }}
                >
                  <path
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={isActive ? 1.6 : 1}
                    markerEnd="url(#arrow)"
                  />
                  {/* Flow pulse: only on the path the reader selected. */}
                  {isActive && allowNarrative && !isStatic && (
                    <path
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeDasharray="5 210"
                      opacity="0.95"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="215"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </path>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Node layers */}
          <div className="relative flex flex-col gap-8">
            {architecture.layers.map((layer) => (
              <div key={layer.id} className="flex items-start gap-4">
                <span className="t-mono w-24 shrink-0 pt-3 text-right uppercase tracking-[0.14em]">
                  {layer.label}
                </span>
                <div className="flex flex-1 flex-wrap gap-3">
                  {layer.nodes.map((node) => {
                    const style = KIND_STYLE[node.kind] || KIND_STYLE[NODE_KIND.SERVICE];
                    const isSel = selected === node.id;
                    const dim = activeNodes && !activeNodes.has(node.id);
                    return (
                      <button
                        key={node.id}
                        type="button"
                        ref={(el) => {
                          nodeRefs.current[node.id] = el;
                        }}
                        onClick={() => setSelected(isSel ? null : node.id)}
                        aria-pressed={isSel}
                        aria-label={`${node.label} — ${KIND_LABEL[node.kind] || 'component'}. ${node.detail}`}
                        className="relative z-10 rounded-[--radius] px-3.5 py-2.5 text-left transition-all duration-base ease-out"
                        style={{
                          background: style.bg,
                          borderWidth: node.emphasis || isSel ? 2 : 1,
                          borderStyle: 'solid',
                          borderColor: isSel ? 'var(--ember)' : style.bd,
                          color: style.fg,
                          opacity: dim ? 0.34 : 1,
                          transform: isSel ? 'translateY(-2px)' : 'none',
                          boxShadow: isSel ? 'var(--shadow-md)' : 'none',
                        }}
                      >
                        <span className="block text-[0.82rem] font-medium leading-tight">
                          {node.label}
                        </span>
                        <span className="t-mono mt-0.5 block text-[0.6rem] opacity-70">
                          {KIND_LABEL[node.kind]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail panel. Reserves its own height so selecting a node never
          shoves the page content below it. */}
      <div className="min-h-[7.5rem]">
        <motion.div
          key={selected || 'idle'}
          initial={isStatic ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="card-inset"
        >
          {detail ? (
            <>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h4 className="t-ui">{detail.label}</h4>
                <span className="tag tag-mono">{KIND_LABEL[detail.kind]}</span>
                {detail.emphasis && <span className="tag tag-ember">Load-bearing</span>}
              </div>
              <p className="t-body text-sm">{detail.detail}</p>
              <ConnectionList
                architecture={architecture}
                nodeById={nodeById}
                selected={selected}
              />
            </>
          ) : (
            <p className="t-small">
              Select any component to see what it does and what it connects to.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/** The relationships, in words — so the diagram isn't the only way to read them. */
function ConnectionList({ architecture, nodeById, selected }) {
  const outgoing = architecture.edges.filter((e) => e.from === selected);
  const incoming = architecture.edges.filter((e) => e.to === selected);
  if (!outgoing.length && !incoming.length) return null;

  return (
    <dl className="mt-4 grid gap-2 border-t border-line pt-3 sm:grid-cols-2">
      {incoming.length > 0 && (
        <div>
          <dt className="t-mono mb-1">Receives from</dt>
          <dd className="text-sm text-secondary">
            {incoming.map((e) => nodeById[e.from]?.label).filter(Boolean).join(', ')}
          </dd>
        </div>
      )}
      {outgoing.length > 0 && (
        <div>
          <dt className="t-mono mb-1">Sends to</dt>
          <dd className="text-sm text-secondary">
            {outgoing.map((e) => nodeById[e.to]?.label).filter(Boolean).join(', ')}
          </dd>
        </div>
      )}
    </dl>
  );
}
