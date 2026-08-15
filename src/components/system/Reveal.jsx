import React from 'react';
import { motion } from 'framer-motion';
import useMotionTier from '../../hooks/useMotionTier';
import { reveal, revealGroup, wipeUp, forTier, inView, DUR, EASE } from '../../lib/motion';

/**
 * Scroll reveal, tier-aware.
 *
 * Exists so no component has to repeat `initial/whileInView/viewport` props
 * or remember to check reduced motion. Previously those three props were
 * hand-written at ~30 call sites, which is how motion drifts out of sync.
 *
 * On the `static` tier this renders the content at rest with no animation
 * at all — the reveal is a presentation choice, never a gate on the content.
 */
export function Reveal({ as = 'div', children, delay = 0, className, ...rest }) {
  const { isStatic } = useMotionTier();
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      variants={forTier(reveal, isStatic)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      transition={isStatic ? { duration: 0 } : { delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Parent for sequenced reveals. Use on lists that genuinely have an order;
 * a stagger on an unordered grid invents a sequence that isn't there.
 */
export function RevealGroup({
  as = 'div',
  children,
  stagger = 0.07,
  delay = 0,
  className,
  ...rest
}) {
  const { isStatic } = useMotionTier();
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      variants={isStatic ? { hidden: {}, visible: {} } : revealGroup(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Child of RevealGroup. Inherits the parent's stagger timing. */
export function RevealItem({ as = 'div', children, className, ...rest }) {
  const { isStatic } = useMotionTier();
  const Tag = motion[as] || motion.div;

  return (
    <Tag className={className} variants={forTier(reveal, isStatic)} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Line-level mask wipe for display headings.
 *
 * Communicates a statement being set into place rather than fading in.
 * Reserved for the few headings that open a section — used everywhere it
 * would stop meaning anything.
 *
 * The wrapper clips; the inner span travels. Text stays selectable and is
 * read by screen readers as a single string either way.
 */
export function WipeLines({ lines = [], className = '', delay = 0, as = 'h1', ...rest }) {
  const { isStatic } = useMotionTier();
  const Tag = motion[as] || motion.h1;

  if (isStatic) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {lines.map((line, i) => (
          <span key={i} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </Plain>
    );
  }

  return (
    /* The scroll trigger MUST live on this unclipped parent.
       Putting whileInView on the travelling span deadlocks: each line is
       translated outside its own `overflow: hidden` wrapper, and an ancestor
       clip removes the element from its IntersectionObserver rect entirely —
       so the observer reports 0% visible, the reveal never fires, and the
       heading stays permanently hidden. Observing the parent and letting
       variants propagate to the children avoids that entirely. */
    <Tag
      className={className}
      variants={{ hidden: {}, visible: {} }}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      {...rest}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em' }}
        >
          <motion.span
            style={{ display: 'block', willChange: 'transform' }}
            variants={wipeUp}
            transition={{ duration: DUR.scene, ease: EASE.out, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export default Reveal;
