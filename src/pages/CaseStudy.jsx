import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { architectureData } from '../data/sections/architectureData';
import ArchitectureDiagram from '../components/system/ArchitectureDiagram';
import { ProjectThumb } from '../components/system/ProjectGlyph';
import { Reveal, WipeLines } from '../components/system/Reveal';
import useMotionTier from '../hooks/useMotionTier';
import usePageMeta from '../hooks/usePageMeta';

/**
 * Flagship case study — the three-layer model from §14.
 *
 *   Layer 1  Non-technical. What is it, why does it exist, what did Vidit do.
 *            Always visible. A recruiter can stop here and have the answer.
 *   Layer 2  Engineering. The system diagram and the implementation detail.
 *   Layer 3  Deep technical. Trade-offs, constraints, what it cost.
 *
 * Layers 2 and 3 are opt-in, and the control says what's behind it rather
 * than "read more" — the reader chooses depth deliberately instead of
 * scrolling through detail they didn't ask for.
 */

const LAYERS = [
  { id: 1, label: 'Overview', note: 'What and why' },
  { id: 2, label: 'Engineering', note: 'How it is built' },
  { id: 3, label: 'Trade-offs', note: 'What it cost' },
];

export default function CaseStudy() {
  const { slug } = useParams();
  const { portfolioData } = usePortfolio();
  const { isStatic } = useMotionTier();
  const [layer, setLayer] = useState(1);

  const arch = architectureData[slug];
  const project = arch
    ? portfolioData.projects.find((p) => p.id === arch.projectId)
    : null;

  usePageMeta({
    title: project
      ? `${project.title} — Case study — Vidit Kulshrestha`
      : 'Case study — Vidit Kulshrestha',
    description: arch?.thesis || project?.description,
    path: `/work/${slug}`,
  });

  if (!arch || !project) return <Navigate to="/work" replace />;

  const live = project.showLiveDemo && project.liveUrl && project.liveUrl !== '#';
  const isDelivery = arch.presentation === 'delivery';

  return (
    <article className="pt-24">
      <div className="shell">
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          All work
        </Link>

        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="mt-8 border-b border-line pb-12">
          <p className="t-eyebrow mb-4">{arch.subtitle}</p>
          <WipeLines as="h1" className="t-hero" lines={[project.title]} />

          {/* The thesis — the one sentence worth remembering about this
              project. Sits above everything so it frames what follows. */}
          <p className="t-body-lg mt-6 max-w-[54ch] text-ink">{arch.thesis}</p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-4">
            {[
              { k: 'Year', v: project.year },
              { k: 'Duration', v: project.duration },
              { k: 'Team', v: project.teamSize },
              { k: 'Status', v: project.status },
            ].map(({ k, v }) => (
              <div key={k}>
                <dt className="t-eyebrow !text-[var(--text-faint)]">{k}</dt>
                <dd className="mt-1 text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-quiet btn-sm"
              >
                <Github size={14} aria-hidden="true" />
                Source
              </a>
            )}
            {live && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-quiet btn-sm"
              >
                Live site
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </header>

        {/* ── Layer 1: always visible ────────────────────────────── */}
        <Reveal className="section !pb-0">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="stack-lg">
              <div>
                <h2 className="t-eyebrow mb-3">The problem</h2>
                <p className="t-body-lg">{project.problem}</p>
              </div>
              <div>
                <h2 className="t-eyebrow mb-3">What it does</h2>
                <p className="t-body">{project.longDescription}</p>
              </div>
              {project.highlights?.length > 0 && (
                <div>
                  <h2 className="t-eyebrow mb-3">Built into it</h2>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-secondary">
                        <span
                          className="mt-[0.6em] block h-px w-3 shrink-0 bg-ember"
                          aria-hidden="true"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <div className="overflow-hidden rounded-lg border border-line">
                <div className="aspect-[16/10]">
                  <ProjectThumb project={project} loading="eager" />
                </div>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <li key={t.name} className="tag tag-mono">
                    {t.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ── Depth control ──────────────────────────────────────── */}
        <div className="section">
          <div className="mb-10 flex flex-wrap items-center gap-2 border-y border-line py-4">
            <span className="t-eyebrow mr-2">Depth</span>
            {LAYERS.map((l) => {
              // The delivery presentation has no architecture layer — this
              // project is a marketing site, and drawing a system for it
              // would dress up delivery work as something it isn't.
              if (isDelivery && l.id === 2) return null;
              const active = layer >= l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLayer(l.id)}
                  aria-pressed={layer === l.id}
                  className="rounded-[--radius] border px-3 py-2 text-left transition-all duration-fast"
                  style={{
                    borderColor: active ? 'var(--ember-line)' : 'var(--line)',
                    background: active ? 'var(--ember-soft)' : 'transparent',
                    color: active ? 'var(--ember-text)' : 'var(--text-muted)',
                  }}
                >
                  <span className="block text-[0.8rem] font-medium">{l.label}</span>
                  {/* No opacity here: fading text is the quiet way to fail a
                      contrast check, since the ratio is computed after the
                      composite. Set the colour instead. */}
                  <span
                    className="t-mono block text-[0.6rem]"
                    style={{ color: active ? 'var(--ember-text)' : 'var(--text-faint)' }}
                  >
                    {l.note}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {/* ── Layer 2: engineering ─────────────────────────── */}
            {layer >= 2 && !isDelivery && (
              <motion.section
                key="layer2"
                initial={isStatic ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={isStatic ? undefined : { opacity: 0 }}
                transition={{ duration: isStatic ? 0 : 0.34 }}
                className="mb-16"
                aria-label="Engineering detail"
              >
                <h2 className="t-lg mb-2">How it fits together</h2>
                <p className="t-body mb-8">
                  Select any component to see what it does and what depends on it.
                </p>

                <ArchitectureDiagram architecture={arch} />

                {project.technicalDepth && (
                  <div className="mt-10 grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="t-eyebrow mb-3">Implementation</h3>
                      <p className="t-body text-[0.95rem]">{project.technicalDepth}</p>
                    </div>
                    {project.challenges && (
                      <div>
                        <h3 className="t-eyebrow mb-3">Hardest part</h3>
                        <p className="t-body text-[0.95rem]">{project.challenges}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.section>
            )}

            {/* Delivery projects get outcomes instead of architecture. */}
            {layer >= 2 && isDelivery && (
              <motion.section
                key="delivery"
                initial={isStatic ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isStatic ? 0 : 0.34 }}
                className="mb-16"
                aria-label="Delivery outcomes"
              >
                <h2 className="t-lg mb-2">What shipped</h2>
                <p className="t-body mb-8 max-w-[52ch]">
                  A client site is judged on whether it loads and converts, so the work
                  was performance and structure rather than architecture.
                </p>
                <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                  {arch.deliveryNotes.map((note) => (
                    <div key={note.label} className="bg-bg p-5">
                      <dt className="t-eyebrow !text-[var(--text-faint)]">{note.label}</dt>
                      <dd>
                        <p className="t-md mt-1 font-display text-ink">{note.value}</p>
                        <p className="t-small mt-1.5">{note.detail}</p>
                        {/* Figures Vidit reports but that aren't independently
                            verifiable are labelled as such rather than
                            presented as measurements. */}
                        {note.claim === 'reported' && (
                          <p className="t-mono mt-2 text-[0.6rem] text-faint">
                            Client-reported
                          </p>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.section>
            )}

            {/* ── Layer 3: trade-offs ──────────────────────────── */}
            {layer >= 3 && (
              <motion.section
                key="layer3"
                initial={isStatic ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isStatic ? 0 : 0.34 }}
                aria-label="Trade-offs"
              >
                <h2 className="t-lg mb-2">What it cost</h2>
                <p className="t-body mb-8 max-w-[52ch]">
                  Every decision here bought something and gave something up. The
                  second column is the part that usually goes unsaid.
                </p>

                {arch.tradeoffs ? (
                  <ul className="stack">
                    {arch.tradeoffs.map((t) => (
                      <li key={t.decision} className="card">
                        <h3 className="t-ui mb-4">{t.decision}</h3>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <p className="t-eyebrow !text-[var(--positive)] mb-1.5">Why</p>
                            <p className="text-[0.9rem] leading-relaxed text-secondary">
                              {t.why}
                            </p>
                          </div>
                          <div>
                            <p className="t-eyebrow !text-[var(--caution)] mb-1.5">Cost</p>
                            <p className="text-[0.9rem] leading-relaxed text-secondary">
                              {t.cost}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="t-body">
                    {project.keyLearnings ||
                      'No architectural trade-offs recorded for this project.'}
                  </p>
                )}

                {project.keyLearnings && arch.tradeoffs && (
                  <div className="mt-10 border-l-2 border-ember pl-6">
                    <h3 className="t-eyebrow mb-3">What it taught</h3>
                    <p className="t-body italic">{project.keyLearnings}</p>
                  </div>
                )}

                {/* Provenance. The reader can check where these claims came
                    from — which is the point of writing them down. */}
                <p className="t-mono mt-12 border-t border-line pt-4 text-[0.62rem] leading-relaxed text-faint">
                  Sources — {arch.source}
                </p>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        <NextProject slug={slug} />
      </div>
    </article>
  );
}

function NextProject({ slug }) {
  const keys = Object.keys(architectureData);
  const next = keys[(keys.indexOf(slug) + 1) % keys.length];
  const arch = architectureData[next];
  if (!arch || next === slug) return null;

  return (
    <div className="border-t border-line py-12">
      <p className="t-eyebrow mb-3">Next</p>
      <Link to={`/work/${next}`} className="group inline-flex items-baseline gap-3">
        <span className="t-lg font-display transition-colors group-hover:text-accent">
          {arch.title}
        </span>
        <ArrowUpRight
          size={20}
          className="text-muted transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
      <p className="t-small mt-2">{arch.subtitle}</p>
    </div>
  );
}
