import React, { useMemo } from 'react';

/**
 * Generated project artwork.
 *
 * Seven projects have no screenshot on record. Rather than ship broken
 * <img> requests or a grey "no image" box, each one gets a deterministic
 * lattice derived from its own title — same project, same glyph, every
 * render, no network request, a few hundred bytes of SVG.
 *
 * The lattice is the site's recurring visual idea (nodes and edges =
 * systems), so a project without a screenshot still looks like it belongs
 * rather than looking like something failed to load.
 */

/** FNV-1a. Small, fast, and stable across runs — Math.random would make
 *  the same project look different on every render. */
function hash(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Deterministic PRNG seeded from the hash. */
function rng(seed) {
  let s = seed || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 0x100000000;
  };
}

const W = 400;
const H = 260;

export default function ProjectGlyph({
  seed = 'project',
  category = '',
  className = '',
  ariaHidden = true,
}) {
  const { nodes, edges, tone } = useMemo(() => {
    const rand = rng(hash(seed));

    // Category nudges density and palette so a blockchain project and a
    // utility don't read identically, without becoming literal iconography.
    const dense = /blockchain|saas|full stack/i.test(category);
    const count = dense ? 13 : 9;

    // Poisson-ish placement: reject points that crowd an existing node, so
    // the lattice reads as structure rather than scatter.
    const pts = [];
    let guard = 0;
    while (pts.length < count && guard < 500) {
      guard += 1;
      const x = 40 + rand() * (W - 80);
      const y = 34 + rand() * (H - 68);
      if (pts.every((p) => (p.x - x) ** 2 + (p.y - y) ** 2 > 58 ** 2)) {
        pts.push({ x, y, r: 2.5 + rand() * 3.2 });
      }
    }

    // Connect each node to its two nearest neighbours. Nearest-neighbour
    // graphs look engineered; random edges look like confetti.
    const seen = new Set();
    const links = [];
    pts.forEach((p, i) => {
      const near = pts
        .map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 }))
        .filter((n) => n.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      near.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        links.push({ a: pts[i], b: pts[j] });
      });
    });

    return {
      nodes: pts,
      edges: links,
      tone: /blockchain/i.test(category) ? 'var(--cyan)' : 'var(--ember)',
    };
  }, [seed, category]);

  // One node is "live" — the accent. Picked deterministically so it never
  // jumps between renders.
  const liveIndex = hash(seed) % Math.max(nodes.length, 1);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role={ariaHidden ? 'presentation' : 'img'}
      aria-hidden={ariaHidden || undefined}
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <rect width={W} height={H} fill="var(--surface-inset)" />
      <g stroke="var(--field-edge)" strokeWidth="1">
        {edges.map((e, i) => (
          <line key={i} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} />
        ))}
      </g>
      <g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={i === liveIndex ? tone : 'var(--field-node)'}
            opacity={i === liveIndex ? 1 : 0.62}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Drop-in replacement for a project thumbnail: renders the screenshot when
 * one exists, the generated lattice when it doesn't. Callers never branch.
 */
export function ProjectThumb({ project, className = '', loading = 'lazy' }) {
  if (!project.image) {
    return (
      <ProjectGlyph seed={project.title} category={project.category} className={className} />
    );
  }

  // WebP derivatives sit beside the originals (see the cwebp step in the
  // build notes): 960 KB of screenshots became 204 KB. <picture> rather
  // than a bare .webp src so the original still serves anything that
  // can't decode WebP.
  const webp = project.image.replace(/\.(png|jpe?g)$/i, '.webp');

  return (
    <picture>
      {webp !== project.image && <source srcSet={webp} type="image/webp" />}
      <img
        src={project.image}
        alt={`${project.title} — interface screenshot`}
        className={className}
        loading={loading}
        decoding="async"
        // Intrinsic ratio reserves the box before the bytes land, so a
        // late image cannot shove the layout down.
        width={400}
        height={260}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </picture>
  );
}
