import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';

// ── Layout constants ───────────────────────────────────────────────────────────
const SPACING  = 228;
const PAD_H    = 112;
const CANVAS_H = 510;
const TRACK_Y  = 255;
const NODE_D   = 46;
const NODE_R   = NODE_D / 2;
const CONN_H   = 38;
const CARD_W   = 196;
const CARD_H   = 158;
const GAP      = 6;

const isAbove  = (i) => i % 2 === 0;
const xOf      = (i) => PAD_H + i * SPACING;
const cardLeft = (i) => xOf(i) - CARD_W / 2;
const cardTopY = (i) =>
  isAbove(i)
    ? TRACK_Y - NODE_R - CONN_H - CARD_H - GAP
    : TRACK_Y + NODE_R + CONN_H + GAP;
const connTopY = (i) =>
  isAbove(i) ? TRACK_Y - NODE_R - CONN_H : TRACK_Y + NODE_R;

// ── Detail modal ───────────────────────────────────────────────────────────────
const DetailModal = ({ item, onClose }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: 'rgba(26,26,26,0.45)', backdropFilter: 'blur(6px)' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="relative bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl"
      style={{ border: '1px solid #E8E8E8' }}
      initial={{ scale: 0.93, y: 16 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.93, y: 16 }}
      transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 transition-colors"
        style={{ color: '#A8A8A8' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#1A1A1A')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#A8A8A8')}
      >
        <X size={18} />
      </button>

      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{
            background: item.isHumorous ? '#FFF7ED' : '#1A1A1A',
            color: item.isHumorous ? '#F97316' : '#FFFFFF',
            border: item.isHumorous ? '1.5px solid #FED7AA' : 'none',
          }}
        >
          {String(item.year).slice(-2)}
        </div>
        <div>
          <p
            className="text-xs font-mono uppercase tracking-widest mb-0.5"
            style={{ color: '#A8A8A8' }}
          >
            {item.year}
          </p>
          <h3
            className="leading-snug font-semibold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.2rem',
              color: '#1A1A1A',
            }}
          >
            {item.title}
          </h3>
        </div>
      </div>

      <p className="leading-relaxed text-sm mb-4" style={{ color: '#6B6B6B' }}>
        {item.description}
      </p>

      {item.lessonLearned && (
        <div
          className="flex items-start gap-3 rounded-xl p-4"
          style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}
        >
          <Lightbulb size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#F97316' }} />
          <p className="text-sm leading-relaxed" style={{ color: '#92400E' }}>
            <strong className="font-semibold">Lesson: </strong>
            {item.lessonLearned}
          </p>
        </div>
      )}
    </motion.div>
  </motion.div>
);

// ── Main component ─────────────────────────────────────────────────────────────
const JourneyTimeline = ({ timelineItems }) => {
  const items   = [...timelineItems].reverse(); // present-first
  const n       = items.length;
  const canvasW = PAD_H * 2 + (n - 1) * SPACING;

  const wrapRef   = useRef(null);
  const scrollRef = useRef(null);
  const inView    = useInView(wrapRef, { once: true, margin: '-5%' });

  const [selected, setSelected] = useState(null);
  const [hovered, setHovered]   = useState(null);

  /* drag-to-scroll */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let down = false, sx = 0, sl = 0;
    const onDown = (e) => { down = true; sx = e.clientX; sl = el.scrollLeft; el.style.cursor = 'grabbing'; };
    const onUp   = ()  => { down = false; el.style.cursor = 'grab'; };
    const onMove = (e) => { if (!down) return; e.preventDefault(); el.scrollLeft = sl - (e.clientX - sx); };
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
      {/* Direction hint bar */}
      <motion.div
        className="flex items-center justify-between mb-5 px-1"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: '#FFF7ED', color: '#F97316', border: '1px solid #FED7AA' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
              style={{ background: '#F97316' }}
            />
            Present
          </span>
          <span
            className="text-xs font-mono tracking-wide"
            style={{ color: '#C4A882' }}
          >
            ← drag to explore past →
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs font-mono" style={{ color: '#A8A8A8' }}>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#1A1A1A' }} />
            Milestone
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#F97316' }} />
            Chapter
          </span>
        </div>
      </motion.div>

      {/* Scrollable canvas */}
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden select-none pb-3"
        style={{
          cursor: 'grab',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollbarColor: '#D4C5B0 transparent',
        }}
      >
        <div
          className="relative"
          style={{ width: canvasW, height: CANVAS_H, minWidth: canvasW }}
        >
          {/* Track shadow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: TRACK_Y + 2,
              left: PAD_H - 50,
              width: (n - 1) * SPACING + 100,
              height: 3,
              background: 'linear-gradient(90deg, rgba(249,115,22,0.22) 0%, rgba(0,0,0,0.05) 100%)',
              filter: 'blur(2px)',
              borderRadius: 2,
            }}
          />

          {/* Animated track line */}
          <motion.div
            className="absolute"
            style={{
              top: TRACK_Y - 1,
              left: PAD_H - 50,
              width: (n - 1) * SPACING + 100,
              height: 2,
              background:
                'linear-gradient(90deg, #F97316 0%, #D4C5B0 45%, #A8A8A8 100%)',
              borderRadius: 2,
              transformOrigin: 'left center',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />

          {/* Per-node: connector + node + card */}
          {items.map((item, i) => {
            const cx       = xOf(i);
            const above    = isAbove(i);
            const isFirst  = i === 0;
            const isHov    = hovered === i;
            const accent   = isFirst || item.isHumorous ? '#F97316' : '#1A1A1A';
            const nodeBg   = isFirst || item.isHumorous ? '#FFF7ED' : '#FFFFFF';

            return (
              <React.Fragment key={i}>
                {/* Connector stub */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    left: cx - 1,
                    top: connTopY(i),
                    width: 2,
                    height: CONN_H,
                    background: `linear-gradient(${above ? '180deg' : '0deg'}, transparent, ${accent}55)`,
                    borderRadius: 1,
                    transformOrigin: above ? 'bottom center' : 'top center',
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={inView ? { scaleY: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.38 }}
                />

                {/* Node */}
                <motion.div
                  className="absolute flex items-center justify-center cursor-pointer"
                  style={{
                    left: cx - NODE_R,
                    top: TRACK_Y - NODE_R,
                    width: NODE_D,
                    height: NODE_D,
                    borderRadius: '50%',
                    background: nodeBg,
                    border: `2px solid ${accent}`,
                    boxShadow: isFirst
                      ? `0 0 0 4px rgba(249,115,22,0.12), 0 2px 12px rgba(249,115,22,0.2)`
                      : isHov
                      ? `0 0 0 3px rgba(26,26,26,0.07), 0 2px 10px rgba(0,0,0,0.12)`
                      : `0 1px 6px rgba(0,0,0,0.08)`,
                    transition: 'box-shadow 0.22s',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    delay: 0.45 + i * 0.12,
                    type: 'spring',
                    stiffness: 280,
                    damping: 18,
                  }}
                  whileHover={{ scale: 1.14 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setSelected(item)}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                >
                  <span
                    className="text-[9px] font-mono font-bold tracking-tight"
                    style={{ color: accent }}
                  >
                    {String(item.year).slice(-2)}
                  </span>
                </motion.div>

                {/* "now" label */}
                {isFirst && (
                  <motion.div
                    className="absolute flex justify-center"
                    style={{
                      left: cx - 28,
                      top: above ? TRACK_Y + NODE_R + 7 : TRACK_Y - NODE_R - 20,
                      width: 56,
                    }}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.9 }}
                  >
                    <span
                      className="text-[8px] font-mono font-bold tracking-widest uppercase"
                      style={{ color: '#F97316' }}
                    >
                      now
                    </span>
                  </motion.div>
                )}

                {/* Card */}
                <motion.div
                  className="absolute cursor-pointer"
                  style={{ left: cardLeft(i), top: cardTopY(i), width: CARD_W }}
                  initial={{ opacity: 0, y: above ? -14 : 14, scale: 0.91 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    delay: 0.38 + i * 0.12,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: above ? -3 : 3, transition: { duration: 0.2 } }}
                  onClick={() => setSelected(item)}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                >
                  <div
                    style={{
                      background: '#FFFFFF',
                      border: `1px solid ${isHov ? accent + '55' : '#E8E8E8'}`,
                      borderRadius: '0.875rem',
                      overflow: 'hidden',
                      boxShadow: isHov
                        ? `0 12px 40px -8px rgba(0,0,0,0.14), 0 0 0 1px ${accent}22`
                        : '0 4px 20px -4px rgba(0,0,0,0.08)',
                      transition: 'border-color 0.22s, box-shadow 0.22s',
                    }}
                  >
                    {/* Colored accent bar */}
                    <div
                      style={{
                        height: 3,
                        background: accent,
                        opacity: isFirst ? 1 : 0.65,
                      }}
                    />

                    <div className="px-3.5 pt-3 pb-3.5">
                      {/* Header row */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                          style={{
                            background: isFirst || item.isHumorous ? '#FFF7ED' : '#F5F5F5',
                            color: isFirst || item.isHumorous ? '#F97316' : '#6B6B6B',
                            border: `1px solid ${isFirst || item.isHumorous ? '#FED7AA' : '#E8E8E8'}`,
                          }}
                        >
                          {item.year}
                        </span>
                        <span
                          className="text-[9px] font-mono"
                          style={{ color: '#C4A882' }}
                        >
                          {item.isHumorous ? 'chapter' : 'milestone'}
                        </span>
                      </div>

                      {/* Title */}
                      <h4
                        className="font-semibold leading-snug mb-1.5"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: '0.78rem',
                          color: '#1A1A1A',
                        }}
                      >
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p
                        className="leading-relaxed"
                        style={{
                          fontSize: '0.68rem',
                          color: '#6B6B6B',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {item.description}
                      </p>

                      {/* Lesson hint */}
                      {item.lessonLearned && (
                        <div
                          className="flex items-center gap-1.5 mt-2 pt-2"
                          style={{ borderTop: '1px solid #F0EBE3' }}
                        >
                          <Lightbulb size={9} style={{ color: '#F97316', flexShrink: 0 }} />
                          <span
                            className="font-mono"
                            style={{ fontSize: '9px', color: '#C4A882' }}
                          >
                            tap for lesson
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Year strip */}
      <motion.div
        className="flex items-center gap-5 overflow-hidden mt-1 px-1"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        {items.map((item, i) => (
          <button
            key={i}
            className="flex-shrink-0 text-[10px] font-mono transition-colors"
            style={{ color: i === 0 ? '#F97316' : '#A8A8A8' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1A1A1A')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = i === 0 ? '#F97316' : '#A8A8A8')
            }
            onClick={() => setSelected(item)}
          >
            {item.year}
          </button>
        ))}
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <DetailModal item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default JourneyTimeline;
