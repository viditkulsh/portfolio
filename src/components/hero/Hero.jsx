import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import SystemField from './SystemField';
import { WipeLines } from '../system/Reveal';
import useMotionTier from '../../hooks/useMotionTier';
import { DUR, EASE } from '../../lib/motion';

/**
 * Hero.
 *
 * Job: in about five seconds, a visitor who knows nothing about blockchain
 * should be able to say what Vidit does — and a visitor who knows a lot
 * should see something worth staying for.
 *
 * The headline states the discipline in plain words. The lattice behind it
 * carries the "systems" idea without a single crypto cliché. The BUILD /
 * DEPTH / DELIVERY strip is the site's contract with the reader: three
 * claims, each with named evidence, each provable further down the page.
 */

const CLAIM_KEYS = ['build', 'depth', 'delivery'];

export default function Hero({ personal, currentRole }) {
  const { isStatic } = useMotionTier();

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Ambient field. Inert to pointer at the container level so it can
          never intercept a click meant for the content above it. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="pointer-events-auto absolute inset-0">
          <SystemField />
        </div>
        {/* Legibility wash — the lattice must never fight the type. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 85% at 12% 45%, var(--bg) 0%, var(--bg) 34%, transparent 78%)',
          }}
        />
      </div>

      <div className="shell relative w-full pt-28 pb-16">
        {/* Identity anchor. Small, factual, scannable — the recruiter's
            first fixation point. */}
        <motion.p
          className="t-mono mb-6 flex flex-wrap items-center gap-x-3 gap-y-1"
          initial={isStatic ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.slow, ease: EASE.out }}
        >
          <span className="uppercase tracking-[0.18em]">{personal.name}</span>
          {currentRole && (
            <>
              <span aria-hidden="true" className="text-faint">
                /
              </span>
              <span className="inline-flex items-center gap-2">
                {/* Live dot. Communicates: currently employed, right now. */}
                <span className="relative flex h-1.5 w-1.5">
                  {!isStatic && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--positive)] opacity-60" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--positive)]" />
                </span>
                {currentRole.position} · {currentRole.company}
              </span>
            </>
          )}
        </motion.p>

        <WipeLines
          as="h1"
          id="hero-heading"
          className="t-hero max-w-[18ch]"
          lines={['I build blockchain', 'and fintech systems.']}
        />

        {/* The depth claim, set apart. Serif italic against the roman above
            reads as a second voice rather than a second sentence. */}
        <motion.p
          className="mt-6 font-display text-[clamp(1.4rem,0.9rem+2vw,2.4rem)] leading-tight text-muted"
          initial={isStatic ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, ease: EASE.out, delay: isStatic ? 0 : 0.22 }}
        >
          <span className="italic text-accent">Researched</span> first. Then shipped.
        </motion.p>

        <motion.p
          className="t-body-lg mt-8 max-w-[52ch]"
          initial={isStatic ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          /* This paragraph is the page's LCP element, so it gets the shorter
             curve — a long fade here directly inflates Largest Contentful
             Paint for every visitor. */
          transition={{ duration: DUR.base, ease: EASE.out, delay: isStatic ? 0 : 0.30 }}
        >
          {personal.shortIntro}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={isStatic ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, ease: EASE.out, delay: isStatic ? 0 : 0.40 }}
        >
          <a href="#work" className="btn btn-primary">
            See the work
            <ArrowDown size={15} aria-hidden="true" />
          </a>
          <Link to="/recruiter" className="btn btn-quiet">
            Hiring? Start here
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </motion.div>

        {/* The contract: three claims, each with evidence. Everything below
            this fold exists to substantiate one of them. */}
        <motion.dl
          className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3"
          initial={isStatic ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.slow, ease: EASE.out, delay: isStatic ? 0 : 0.50 }}
        >
          {CLAIM_KEYS.map((key) => {
            const claim = personal.positioning?.[key];
            if (!claim) return null;
            return (
              <div key={key} className="bg-bg p-5">
                <dt className="t-eyebrow">{claim.label}</dt>
                <dd className="mt-2">
                  <p className="t-ui">{claim.claim}</p>
                  <p className="t-mono mt-2 leading-relaxed">{claim.evidence}</p>
                </dd>
              </div>
            );
          })}
        </motion.dl>
      </div>
    </section>
  );
}
