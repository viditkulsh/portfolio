/**
 * Shared motion vocabulary.
 *
 * Every animated component pulls its curves, durations and variants from
 * here. The point is not brevity — it is that the whole site accelerates
 * and settles the same way, which is most of what makes motion read as
 * designed rather than applied.
 *
 * Durations are seconds (framer-motion's unit); the CSS tokens carry the
 * same values in ms so the two systems stay in step.
 */

export const EASE = {
  /** Entrances and reveals. Fast start, long settle. */
  out: [0.22, 1, 0.36, 1],
  /** Two-way state changes. Symmetric. */
  inOut: [0.65, 0, 0.35, 1],
  /** Affirmative feedback only — a small overshoot reads as "yes". */
  spring: [0.34, 1.4, 0.64, 1],
};

export const DUR = {
  instant: 0.09,
  fast: 0.18,
  base: 0.32,
  slow: 0.62,
  scene: 1.1,
};

/** Distance a reveal travels. Small — large travel reads as cheap. */
const RISE = 18;

/**
 * The default reveal. Content arrives from slightly below at rest opacity.
 * Communicates: this is new information entering the frame.
 */
export const reveal = {
  hidden: { opacity: 0, y: RISE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE.out },
  },
};

/**
 * Parent for grouped reveals. Children arrive in reading order, which
 * communicates sequence — use it on lists that *have* an order, and plain
 * `reveal` on grids that don't.
 */
export const revealGroup = (stagger = 0.07, delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Text that arrives as a mask-wipe rather than a fade. Used sparingly, */
/* on the few headings that carry a conceptual transition. */
export const wipeUp = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: DUR.scene, ease: EASE.out },
  },
};

/** Modal / palette surface. Scale is subtle; big pops feel toy-like. */
export const surfaceIn = {
  hidden: { opacity: 0, scale: 0.97, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 4,
    transition: { duration: DUR.fast, ease: EASE.inOut },
  },
};

export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.base, ease: EASE.out } },
  exit: { opacity: 0, transition: { duration: DUR.fast, ease: EASE.inOut } },
};

/**
 * Collapses any variant to its resting state.
 *
 * Reduced-motion users must still receive the content — so we keep the
 * same variant names and simply make both states identical, rather than
 * stripping the animation props at every call site.
 */
export const stillVariant = (variant) => {
  const out = {};
  for (const key of Object.keys(variant)) {
    out[key] = { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0 } };
  }
  return out;
};

/**
 * Picks the right variant for the tier. Call this instead of importing
 * variants directly wherever a component can run in `static`.
 */
export const forTier = (variant, isStatic) =>
  isStatic ? stillVariant(variant) : variant;

/** Standard viewport trigger: fire once, a little before fully in view. */
export const inView = { once: true, amount: 0.25, margin: '0px 0px -12% 0px' };

export default { EASE, DUR, reveal, revealGroup, wipeUp, surfaceIn, fade, forTier, inView };
