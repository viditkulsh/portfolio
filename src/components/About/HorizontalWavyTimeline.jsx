import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ── Layout constants ───────────────────────────────────────────────────────────
const NODE_SPACING = 270;   // px between each node
const PAD_H        = 130;   // horizontal padding
const SVG_H        = 580;   // total canvas height
const TRACK_Y      = 290;   // vertical center of the track
const CARD_W       = 216;   // card width
const CARD_H_EST   = 162;   // estimated card height for layout
const CONN_LEN     = 52;    // connector line length
const NODE_R       = 26;    // node circle outer radius
const INNER_R      = 18;    // node inner circle radius

// Alternating positions: even index above track, odd below
const isAbove  = (i) => i % 2 === 0;
const xOf      = (i) => PAD_H + i * NODE_SPACING;
const cardTop  = (i) => isAbove(i)
  ? TRACK_Y - CONN_LEN - NODE_R - CARD_H_EST - 6
  : TRACK_Y + CONN_LEN + NODE_R + 6;
const connY1   = (i) => isAbove(i) ? TRACK_Y - NODE_R : TRACK_Y + NODE_R;
const connY2   = (i) => isAbove(i)
  ? TRACK_Y - NODE_R - CONN_LEN
  : TRACK_Y + NODE_R + CONN_LEN;

// ── Palette ────────────────────────────────────────────────────────────────────
const PALETTE = [
  { track: '#14b8a6', border: 'rgba(20,184,166,0.50)',  glow: 'rgba(20,184,166,0.22)'  },
  { track: '#818cf8', border: 'rgba(129,140,248,0.50)', glow: 'rgba(129,140,248,0.22)' },
  { track: '#f472b6', border: 'rgba(244,114,182,0.45)', glow: 'rgba(244,114,182,0.18)' },
  { track: '#fbbf24', border: 'rgba(251,191,36,0.45)',  glow: 'rgba(251,191,36,0.18)'  },
  { track: '#34d399', border: 'rgba(52,211,153,0.45)',  glow: 'rgba(52,211,153,0.18)'  },
  { track: '#a78bfa', border: 'rgba(167,139,250,0.45)', glow: 'rgba(167,139,250,0.18)' },
  { track: '#60a5fa', border: 'rgba(96,165,250,0.45)',  glow: 'rgba(96,165,250,0.18)'  },
];

const colOf = (item, i) => {
  if (i === 0) return { track: '#34d399', border: 'rgba(52,211,153,0.55)', glow: 'rgba(52,211,153,0.25)' };
  return PALETTE[(item.isHumorous ? 2 : i) % PALETTE.length];
};

// ── Track path ────────────────────────────────────────────────────────────────
const buildTrack = (n) => {
  const x0 = PAD_H - 40;
  const x1 = PAD_H + (n - 1) * NODE_SPACING + 40;
  return `M ${x0} ${TRACK_Y} L ${x1} ${TRACK_Y}`;
};

// ── Lesson tooltip ─────────────────────────────────────────────────────────────
const LessonTooltip = ({ text, color, above }) => (
  <motion.div
    initial={{ opacity: 0, y: above ? -6 : 6, scale: 0.94 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.94 }}
    transition={{ duration: 0.2 }}
    className="absolute z-50 rounded-xl px-3 py-2.5 text-xs font-inter leading-snug shadow-2xl backdrop-blur-xl pointer-events-none"
    style={{
      bottom: above ? 'calc(100% + 10px)' : 'auto',
      top: above ? 'auto' : 'calc(100% + 10px)',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 210,
      background: 'rgba(6,6,18,0.96)',
      border: `1px solid ${color}50`,
      boxShadow: `0 4px 28px ${color}20`,
      color: '#d4d4d4',
    }}
  >
    <span style={{ color }} className="mr-1 text-sm">💡</span>
    {text}
    <span
      style={{
        position: 'absolute',
        ...(above
          ? { bottom: -6, borderTop: `6px solid ${color}50` }
          : { top: -6, borderBottom: `6px solid ${color}50` }),
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
      }}
    />
  </motion.div>
);

// ═════════════════════════════════════════════════════════════════════════════
const HorizontalWavyTimeline = ({ timelineItems }) => {
  const items     = [...timelineItems].reverse();   // present-first
  const n         = items.length;
  const svgW      = PAD_H * 2 + (n - 1) * NODE_SPACING;

  const wrapRef   = useRef(null);
  const scrollRef = useRef(null);
  const inView    = useInView(wrapRef, { once: true, margin: '-6%' });

  const [hoveredCard, setHoveredCard] = useState(null);
  const [showLesson, setShowLesson]   = useState(null);

  /* ── drag-to-scroll ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let dragging = false, startX = 0, sl = 0;
    const onDown = (e) => { dragging = true; startX = e.clientX; sl = el.scrollLeft; el.style.cursor = 'grabbing'; };
    const onUp   = () => { dragging = false; el.style.cursor = 'grab'; };
    const onMove = (e) => { if (!dragging) return; e.preventDefault(); el.scrollLeft = sl - (e.clientX - startX); };
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove, { passive: false });
    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full">

      {/* ── Heading ── */}
      <motion.div
        className="text-center mb-3"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl md:text-4xl font-dm-serif text-white tracking-tight">
          My Journey
        </h3>
        <p className="mt-2 text-primary-silver/45 font-inter text-xs tracking-widest uppercase">
          Present &nbsp;←&nbsp; scroll right to travel back in time &nbsp;→
        </p>
      </motion.div>

      {/* ── Legend ── */}
      <motion.div
        className="flex flex-wrap justify-center gap-5 mb-8 mt-3"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {[
          { label: 'Milestone',  dot: '#14b8a6' },
          { label: 'Fun chapter', dot: '#f472b6' },
          { label: 'Present',    dot: '#34d399', pulse: true },
        ].map(({ label, dot, pulse }) => (
          <span key={label} className="flex items-center gap-2 text-xs font-inter text-primary-silver/50">
            <span
              className={`w-2 h-2 rounded-full inline-block ${pulse ? 'animate-pulse' : ''}`}
              style={{ background: dot }}
            />
            {label}
          </span>
        ))}
      </motion.div>

      {/* ── Scrollable track ── */}
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden pb-2 select-none"
        style={{ cursor: 'grab', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin' }}
      >
        {/* ── Canvas ── */}
        <div
          className="relative mx-auto"
          style={{ width: svgW, height: SVG_H, minWidth: svgW }}
        >
          {/* ── SVG layer ── */}
          <svg
            width={svgW}
            height={SVG_H}
            className="absolute top-0 left-0 pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#34d399" />
                <stop offset="30%"  stopColor="#818cf8" />
                <stop offset="60%"  stopColor="#f472b6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
              <filter id="trackGlow" x="-5%" y="-400%" width="110%" height="900%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="nodeGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Track shadow */}
            <line
              x1={PAD_H - 40} y1={TRACK_Y + 2}
              x2={PAD_H + (n - 1) * NODE_SPACING + 40} y2={TRACK_Y + 2}
              stroke="rgba(0,0,0,0.5)" strokeWidth="6" strokeLinecap="round"
            />

            {/* Gradient track */}
            <motion.path
              d={buildTrack(n)}
              fill="none" stroke="url(#trackGrad)" strokeWidth="3" strokeLinecap="round"
              filter="url(#trackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.1 }}
            />

            {/* Wide faint depth track */}
            <motion.path
              d={buildTrack(n)}
              fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="14" strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            />

            {/* ── Per-node elements ── */}
            {items.map((item, i) => {
              const cx    = xOf(i);
              const above = isAbove(i);
              const c     = colOf(item, i);
              const isFirst = i === 0;

              return (
                <g key={i}>
                  {/* Dashed connector */}
                  <motion.line
                    x1={cx} y1={connY1(i)} x2={cx} y2={connY2(i)}
                    stroke={c.track} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={inView ? { scaleY: 1, opacity: 0.6 } : {}}
                    transition={{ delay: 0.55 + i * 0.13, duration: 0.4 }}
                    style={{ transformOrigin: `${cx}px ${TRACK_Y}px` }}
                  />

                  {/* Connector end-cap dot */}
                  <motion.circle
                    cx={cx} cy={connY2(i)} r={3} fill={c.track} opacity="0.85"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.65 + i * 0.13 }}
                  />

                  {/* Outer pulse ring */}
                  <motion.circle
                    cx={cx} cy={TRACK_Y} r={NODE_R + 8}
                    fill="none" stroke={c.track} strokeWidth="1" opacity={0}
                    animate={inView ? {
                      opacity: [0, isFirst ? 0.9 : 0.45, 0],
                      r:       [NODE_R + 4, NODE_R + 22, NODE_R + 4],
                    } : {}}
                    transition={{
                      delay: 0.75 + i * 0.13,
                      duration: isFirst ? 1.8 : 2.6,
                      repeat: Infinity,
                      repeatDelay: isFirst ? 0.5 : 1.2,
                    }}
                  />

                  {/* Node glow backdrop */}
                  <motion.circle
                    cx={cx} cy={TRACK_Y} r={NODE_R + 5}
                    fill={c.track} opacity="0.16" filter="url(#nodeGlow)"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.58 + i * 0.13, type: 'spring', stiffness: 180 }}
                  />

                  {/* Node ring */}
                  <motion.circle
                    cx={cx} cy={TRACK_Y} r={NODE_R}
                    fill="rgba(6,6,20,0.88)" stroke={c.track} strokeWidth="2.5"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.58 + i * 0.13, type: 'spring', stiffness: 240, damping: 16 }}
                  />

                  {/* Node inner fill */}
                  <motion.circle
                    cx={cx} cy={TRACK_Y} r={INNER_R - 7}
                    fill={c.track} opacity="0.9" filter="url(#nodeGlow)"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.63 + i * 0.13, type: 'spring', stiffness: 300, damping: 14 }}
                  />

                  {/* Year label in node */}
                  <motion.text
                    x={cx} y={TRACK_Y + 4}
                    textAnchor="middle"
                    fill="#ffffff" fontSize="8" fontWeight="800"
                    fontFamily="Inter, sans-serif" letterSpacing="0.3"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.76 + i * 0.13 }}
                  >
                    {item.year.toString().replace('-Present','').replace('2025-','').slice(-4)}
                  </motion.text>

                  {/* PRESENT badge */}
                  {isFirst && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.0, duration: 0.6 }}
                    >
                      <rect
                        x={cx - 24}
                        y={above ? TRACK_Y + NODE_R + 9 : TRACK_Y - NODE_R - 25}
                        width={48} height={16} rx={8}
                        fill="rgba(52,211,153,0.18)"
                        stroke="rgba(52,211,153,0.65)" strokeWidth="1"
                      />
                      <text
                        x={cx}
                        y={above ? TRACK_Y + NODE_R + 20 : TRACK_Y - NODE_R - 13}
                        textAnchor="middle"
                        fill="#34d399" fontSize="7" fontWeight="800"
                        fontFamily="Inter, sans-serif" letterSpacing="1.4"
                      >
                        PRESENT
                      </text>
                    </motion.g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* ── HTML Cards ── */}
          {items.map((item, i) => {
            const cx    = xOf(i);
            const above = isAbove(i);
            const left  = cx - CARD_W / 2;
            const top   = cardTop(i);
            const c     = colOf(item, i);

            return (
              <motion.div
                key={i}
                className="absolute rounded-2xl backdrop-blur-lg"
                style={{
                  left,
                  top,
                  width: CARD_W,
                  background: 'rgba(8,8,22,0.82)',
                  border: `1px solid ${c.border}`,
                  boxShadow: hoveredCard === i
                    ? `0 0 40px ${c.glow}, 0 8px 36px rgba(0,0,0,0.55)`
                    : `0 0 18px ${c.glow}, 0 4px 18px rgba(0,0,0,0.4)`,
                  transition: 'box-shadow 0.25s ease',
                }}
                initial={{ opacity: 0, y: above ? -22 : 22, scale: 0.86 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.52 + i * 0.13, duration: 0.56, ease: 'easeOut' }}
                whileHover={{ scale: 1.035 }}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => { setHoveredCard(null); setShowLesson(null); }}
              >
                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg,transparent,${c.track},transparent)` }}
                />

                <div className="p-3.5 pt-4">
                  {/* Header: year tag + type badge */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <span
                      className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${c.track}18`,
                        color: c.track,
                        border: `1px solid ${c.border}`,
                      }}
                    >
                      {item.year}
                    </span>
                    {item.isHumorous ? (
                      <span className="text-[9.5px] font-inter px-1.5 py-0.5 rounded-full bg-pink-500/12 text-pink-400 border border-pink-500/22 whitespace-nowrap">
                        😄 story
                      </span>
                    ) : (
                      <span className="text-[9.5px] font-inter px-1.5 py-0.5 rounded-full bg-teal-500/12 text-teal-400 border border-teal-500/22 whitespace-nowrap">
                        🎯 milestone
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <p className="font-inter font-bold text-white text-[0.78rem] leading-snug mb-2">
                    {item.title}
                  </p>

                  {/* Description */}
                  <p
                    className="text-primary-silver/68 font-inter text-[0.69rem] leading-relaxed"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Lesson learned */}
                  {item.lessonLearned && (
                    <div
                      className="relative mt-2.5 pt-2 border-t"
                      style={{ borderColor: `${c.track}22` }}
                    >
                      <button
                        className="flex items-center gap-1.5 text-[10px] font-inter font-semibold tracking-wide"
                        style={{ color: c.track, opacity: 0.72 }}
                        onMouseEnter={() => setShowLesson(i)}
                        onMouseLeave={() => setShowLesson(null)}
                      >
                        💡&nbsp;<span className="underline underline-offset-2 decoration-dotted">Lesson learned</span>
                      </button>
                      <AnimatePresence>
                        {showLesson === i && (
                          <LessonTooltip text={item.lessonLearned} color={c.track} above={above} />
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Direction indicator ── */}
      <motion.div
        className="flex items-center justify-center gap-3 mt-5"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 2.0, duration: 0.7 }}
      >
        <span className="text-emerald-400/80 text-[11px] font-inter font-semibold tracking-wider uppercase">Now</span>
        <span className="flex gap-0.5">
          {[0.7, 0.56, 0.42, 0.28, 0.14].map((op, k) => (
            <span key={k} className="block w-1.5 h-1.5 rounded-full" style={{ background: `rgba(52,211,153,${op})` }} />
          ))}
        </span>
        <span className="text-primary-silver/30 text-[11px] font-inter tracking-wide">← drag to explore →</span>
        <span className="flex gap-0.5">
          {[0.14, 0.28, 0.42, 0.56, 0.7].map((op, k) => (
            <span key={k} className="block w-1.5 h-1.5 rounded-full" style={{ background: `rgba(96,165,250,${op})` }} />
          ))}
        </span>
        <span className="text-blue-400/70 text-[11px] font-inter font-semibold tracking-wider uppercase">Past</span>
      </motion.div>

      {/* Mobile hint */}
      <p className="text-center text-primary-silver/30 font-inter text-[10px] mt-2 md:hidden tracking-wide">
        swipe to explore your journey
      </p>
    </div>
  );
};

export default HorizontalWavyTimeline;
