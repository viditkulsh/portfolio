import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Layout constants ─────────────────────────────────────────────────────────
const SPACING   = 210;   // px between each year dot
const PAD_H     = 110;   // horizontal padding
const SVG_H     = 520;   // total svg height
const WAVE_CY   = 260;   // vertical center of the wave
const AMPLITUDE = 80;    // wave crest / trough offset from centre
const CARD_W    = 168;   // card width (px)
const CARD_H    = 130;   // card height (px)
const CONN_LEN  = 30;    // connector line length (wave ↔ card)
const CARD_GAP  = 10;    // gap between connector end and card edge
const DOT_R     = 10;    // dot radius

// Derived positions (computed once)
const CREST_Y       = WAVE_CY - AMPLITUDE;                            // 180
const TROUGH_Y      = WAVE_CY + AMPLITUDE;                            // 340
const CARD_ABOVE_TOP = CREST_Y  - CONN_LEN - CARD_H - CARD_GAP;      //  10
const CARD_BELOW_TOP = TROUGH_Y + CONN_LEN + CARD_GAP;               // 380

// ── Per-point helpers ─────────────────────────────────────────────────────────
const xOf     = (i) => PAD_H + i * SPACING;
const yOf     = (i) => (i % 2 === 0 ? CREST_Y : TROUGH_Y);
const isCrest = (i) => i % 2 === 0;

// ── Build cubic-bezier wave path ──────────────────────────────────────────────
const buildPath = (n) => {
  const pts = Array.from({ length: n }, (_, i) => ({ x: xOf(i), y: yOf(i) }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const { x: x0, y: y0 } = pts[i - 1];
    const { x: x1, y: y1 } = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C ${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
  }
  return d;
};

// ── Gradient colours ──────────────────────────────────────────────────────────
const CARD_COLORS = [
  { border: 'rgba(20,184,166,0.45)', glow: 'rgba(20,184,166,0.18)'  }, // teal
  { border: 'rgba(99,102,241,0.45)', glow: 'rgba(99,102,241,0.18)'  }, // indigo
  { border: 'rgba(236,72,153,0.40)', glow: 'rgba(236,72,153,0.15)'  }, // pink
  { border: 'rgba(245,158,11,0.42)', glow: 'rgba(245,158,11,0.14)'  }, // amber
  { border: 'rgba(16,185,129,0.45)', glow: 'rgba(16,185,129,0.18)'  }, // emerald
  { border: 'rgba(139,92,246,0.45)', glow: 'rgba(139,92,246,0.18)'  }, // violet
  { border: 'rgba(59,130,246,0.45)', glow: 'rgba(59,130,246,0.18)'  }, // blue
];

const DOT_COLORS = [
  '#14b8a6','#6366f1','#ec4899','#f59e0b','#10b981','#8b5cf6','#3b82f6'
];

// ═════════════════════════════════════════════════════════════════════════════
const HorizontalWavyTimeline = ({ timelineItems }) => {
  // Reverse so index-0 is the most recent
  const items  = [...timelineItems].reverse();
  const n      = items.length;
  const svgW   = PAD_H * 2 + (n - 1) * SPACING;

  const wrapRef   = useRef(null);
  const scrollRef  = useRef(null);
  const inView     = useInView(wrapRef, { once: true, margin: '-8%' });

  /* drag-to-scroll */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let dragging = false, startX = 0, sl = 0;
    const onDown = (e) => { dragging = true; startX = e.pageX - el.offsetLeft; sl = el.scrollLeft; el.style.cursor = 'grabbing'; };
    const onUp   = ()  => { dragging = false; el.style.cursor = 'grab'; };
    const onMove = (e) => { if (!dragging) return; e.preventDefault(); el.scrollLeft = sl - (e.pageX - el.offsetLeft - startX); };
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => { el.removeEventListener('mousedown', onDown); window.removeEventListener('mouseup', onUp); window.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <div ref={wrapRef} className="w-full">
      {/* ── Heading ── */}
      <motion.h3
        className="text-3xl md:text-4xl font-dm-serif text-white text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        My Journey
      </motion.h3>
      <motion.p
        className="text-center text-primary-silver/60 font-inter text-sm mb-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Present → Past
      </motion.p>

      {/* ── Scrollable track ── */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-2 select-none"
        style={{ cursor: 'grab', WebkitOverflowScrolling: 'touch' }}
      >
        {/* ── Canvas ── */}
        <div
          className="relative mx-auto"
          style={{ width: svgW, height: SVG_H, minWidth: svgW }}
        >
          {/* ── SVG layer (wave + connectors + dots) ── */}
          <svg
            width={svgW}
            height={SVG_H}
            className="absolute top-0 left-0 pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {/* Wave gradient */}
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#14b8a6" />
                <stop offset="30%"  stopColor="#6366f1" />
                <stop offset="60%"  stopColor="#ec4899" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="waveGlow" x="-20%" y="-100%" width="140%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Dot glow filter */}
              <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Wave path (animated draw) ── */}
            <motion.path
              d={buildPath(n)}
              fill="none"
              stroke="url(#waveGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#waveGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
            />

            {/* ── Ghost / darker wave (depth) ── */}
            <motion.path
              d={buildPath(n)}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            />

            {/* ── Per-point: connector + ring + dot ── */}
            {items.map((item, i) => {
              const cx   = xOf(i);
              const cy   = yOf(i);
              const crest = isCrest(i);
              const connY2 = crest ? cy - CONN_LEN : cy + CONN_LEN;
              const color = DOT_COLORS[i % DOT_COLORS.length];

              return (
                <g key={i}>
                  {/* Connector line */}
                  <motion.line
                    x1={cx} y1={cy} x2={cx} y2={connY2}
                    stroke={color}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    opacity="0.7"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={inView ? { scaleY: 1, opacity: 0.7 } : {}}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                  />

                  {/* Outer pulsing ring */}
                  <motion.circle
                    cx={cx} cy={cy} r={DOT_R + 6}
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    opacity="0"
                    animate={inView ? { opacity: [0, 0.6, 0], r: [DOT_R + 4, DOT_R + 16, DOT_R + 4] } : {}}
                    transition={{ delay: 0.6 + i * 0.15, duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  />

                  {/* Dot background glow */}
                  <motion.circle
                    cx={cx} cy={cy} r={DOT_R + 3}
                    fill={color}
                    opacity="0.2"
                    filter="url(#dotGlow)"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 200 }}
                  />

                  {/* Main dot */}
                  <motion.circle
                    cx={cx} cy={cy} r={DOT_R}
                    fill={color}
                    filter="url(#dotGlow)"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 260, damping: 14 }}
                    className="cursor-pointer"
                  />

                  {/* Year label — opposite side from card */}
                  <motion.text
                    x={cx}
                    y={crest ? cy + 22 : cy - 14}
                    textAnchor="middle"
                    fill={color}
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="0.5"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                  >
                    {item.year}
                  </motion.text>
                </g>
              );
            })}
          </svg>

          {/* ── HTML Cards overlay ── */}
          {items.map((item, i) => {
            const cx    = xOf(i);
            const crest = isCrest(i);
            const left  = cx - CARD_W / 2;
            const top   = crest ? CARD_ABOVE_TOP : CARD_BELOW_TOP;

            const { border, glow } = CARD_COLORS[i % CARD_COLORS.length];

            return (
              <motion.div
                key={i}
                className="absolute rounded-xl p-3 backdrop-blur-md"
                style={{
                  left,
                  top,
                  width: CARD_W,
                  minHeight: CARD_H,
                  background: 'rgba(10, 10, 20, 0.75)',
                  border: `1px solid ${border}`,
                  boxShadow: `0 0 18px ${glow}`,
                }}
                initial={{ opacity: 0, y: crest ? -16 : 16, scale: 0.88 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.55, ease: 'easeOut' }}
                whileHover={{ scale: 1.04, boxShadow: `0 0 32px ${border}` }}
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                     style={{ background: `linear-gradient(90deg,transparent,${DOT_COLORS[i % DOT_COLORS.length]},transparent)` }} />

                {/* Title */}
                <p className="font-inter font-bold text-white text-xs leading-tight mb-1 mt-1">
                  {item.title}
                </p>

                {/* Description */}
                <p className="text-primary-silver/75 font-inter text-xs leading-relaxed"
                   style={{ display:'-webkit-box', WebkitLineClamp:4, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  {item.description}
                </p>

                {/* Lesson tag */}
                {item.lessonLearned && (
                  <div className="mt-2 pt-2 border-t" style={{ borderColor: border }}>
                    <p className="text-xs italic leading-snug"
                       style={{ color: DOT_COLORS[i % DOT_COLORS.length], opacity: 0.88,
                                display:'-webkit-box', WebkitLineClamp:2,
                                WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                      💡&nbsp;{item.lessonLearned}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Scroll hint (mobile) ── */}
      <motion.p
        className="text-center text-primary-silver/40 font-inter text-xs mt-3 md:hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
      >
        ← scroll to explore →
      </motion.p>
    </div>
  );
};

export default HorizontalWavyTimeline;
