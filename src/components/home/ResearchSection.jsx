import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHead from './SectionHead';
import { Reveal } from '../system/Reveal';
import useMotionTier from '../../hooks/useMotionTier';
import { METHOD } from '../../data/sections/researchData';

/**
 * The research dimension (§11).
 *
 * WHAT THE MOTION COMMUNICATES: the method rail fills as you scroll it,
 * so the reader physically traverses question → delivery. That is the
 * claim of this section — that Vidit's work moves through those stages —
 * expressed as movement rather than asserted in a paragraph.
 *
 * Each thread expands to show the same seven stages applied to a real
 * piece of work. Nothing here is a hypothetical process diagram: every
 * thread names the role or project it happened inside.
 */

export default function ResearchSection({ threads }) {
  const [openId, setOpenId] = useState(threads[0]?.id ?? null);
  const { isStatic } = useMotionTier();

  return (
    <section id="research" className="section" aria-labelledby="research-heading">
      <div className="shell">
        <SectionHead
          id="research-heading"
          index="02"
          eyebrow="How I think"
          title={['I read the system', 'before I write it.']}
          lede="Blockchain rewards people who understand the trust assumptions and punishes people who don't. These are the questions I actually chased, and what came out of each one."
        />

        {/* The method, as a rail. Horizontal on desktop, stacked on mobile. */}
        <Reveal className="mb-14">
          {/* tabIndex makes the overflow region reachable by keyboard — a
              scrollable box that only a mouse can pan hides content from
              keyboard users on narrow viewports. */}
          <ol
            className="scroll-x flex gap-0 border-y border-line py-5"
            tabIndex={0}
            role="list"
            aria-label="Method: question through delivery"
          >
            {METHOD.map((stage, i) => (
              <li
                key={stage.id}
                className="flex min-w-[8.5rem] flex-1 flex-col gap-1 px-3 first:pl-0 last:pr-0"
              >
                <div className="flex items-center gap-2">
                  <span className="t-mono text-[0.6rem] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {i < METHOD.length - 1 && (
                    <span className="h-px flex-1 bg-line" aria-hidden="true" />
                  )}
                </div>
                <span className="text-[0.82rem] font-medium text-ink">{stage.label}</span>
                <span className="t-small text-[0.72rem] leading-snug">{stage.note}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="stack">
          {threads.map((thread) => (
            <ThreadRow
              key={thread.id}
              thread={thread}
              open={openId === thread.id}
              onToggle={() => setOpenId(openId === thread.id ? null : thread.id)}
              isStatic={isStatic}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ThreadRow({ thread, open, onToggle, isStatic }) {
  const panelId = `thread-panel-${thread.id}`;
  const buttonId = `thread-button-${thread.id}`;

  return (
    <div
      className="border-b border-line"
      style={thread.weight === 'primary' ? { borderColor: 'var(--line-strong)' } : undefined}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start gap-4 py-6 text-left"
        >
          <span className="flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="t-md font-display text-ink">{thread.title}</span>
              {thread.weight === 'primary' && <span className="tag tag-ember">Primary</span>}
              {thread.outcome?.open && <span className="tag tag-cyan">Ongoing</span>}
            </span>
            <span className="t-mono mt-1.5 block">{thread.context}</span>
            <span className="t-body mt-3 block text-[0.95rem]">{thread.summary}</span>
          </span>
          <motion.span
            className="mt-1 shrink-0 text-muted"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: isStatic ? 0 : 0.22 }}
            aria-hidden="true"
          >
            <ChevronDown size={18} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={isStatic ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={isStatic ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: isStatic ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-8">
              <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
                {METHOD.map((stage, i) => {
                  const text = thread.stages[stage.id];
                  if (!text) return null;
                  return (
                    <li key={stage.id} className="bg-bg p-4">
                      <div className="mb-1.5 flex items-baseline gap-2">
                        <span className="t-mono text-[0.6rem] text-accent">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="t-eyebrow !text-[var(--text-muted)]">{stage.label}</span>
                      </div>
                      <p className="text-[0.86rem] leading-relaxed text-secondary">{text}</p>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <ul className="flex flex-wrap gap-1.5">
                  {thread.tags.map((tag) => (
                    <li key={tag} className="tag tag-mono">
                      {tag}
                    </li>
                  ))}
                </ul>
                {thread.outcome && (
                  <p className="t-mono">
                    <span className="text-faint">{thread.outcome.label} → </span>
                    <span className="text-ink">{thread.outcome.value}</span>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
