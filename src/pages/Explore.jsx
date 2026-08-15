import React, { Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, MousePointer2, Move3d, X } from 'lucide-react';
import useMotionTier from '../hooks/useMotionTier';
import usePageMeta from '../hooks/usePageMeta';
import { monuments, KIND_COLOR } from '../components/explore/worldData';
import { WipeLines } from '../components/system/Reveal';

/* The entire Three.js payload sits behind this import, which is only
   evaluated after the visitor presses Enter. Landing on /explore costs
   nothing until they choose to pay for it. */
const World = lazy(() => import('../components/explore/World'));

/**
 * Explore (§20).
 *
 * An optional, discoverable bonus — never a gate on information. Every
 * monument in the world links back to the same content in the main
 * portfolio, and this page lists all of it as plain text below the gate,
 * so a visitor who never enters (or can't) loses nothing at all.
 */
export default function Explore() {
  const [entered, setEntered] = useState(false);
  const [selected, setSelected] = useState(null);
  const { allowWebGL, webgl, tier } = useMotionTier();

  usePageMeta({
    title: 'Explore — Vidit Kulshrestha',
    description:
      'An optional 3D district where each structure is a real project, role or research thread.',
    path: '/explore',
  });

  const selectedData = monuments.find((m) => m.id === selected);
  // Below the "full" tier we still allow entry, but with shadows, AA and
  // auto-rotation off rather than refusing outright.
  const reducedEffects = tier !== 'full';

  return (
    <div className="pt-24">
      <div className="shell">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to the portfolio
        </Link>

        {!entered ? (
          <div className="py-16">
            <p className="t-eyebrow mb-4">Optional</p>
            <WipeLines as="h1" className="t-hero max-w-[14ch]" lines={['A small', 'world.']} />
            <p className="t-body-lg mt-6 max-w-[50ch]">
              The same work, laid out as a district. Each structure is a real project,
              role or research thread — height is scope, colour is kind, and the lines
              on the ground are lineage.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {webgl ? (
                <button type="button" onClick={() => setEntered(true)} className="btn btn-primary">
                  Enter the world
                  <Move3d size={15} aria-hidden="true" />
                </button>
              ) : (
                <p className="t-small max-w-[40ch]">
                  Your browser doesn't support WebGL, so the 3D world can't run here.
                  Everything in it is listed below.
                </p>
              )}
              <p className="t-mono">
                {reducedEffects && webgl
                  ? 'Simplified for this device · ~240 KB'
                  : 'Loads about 240 KB · desktop recommended'}
              </p>
            </div>

            {/* The whole world, as text. This is what makes the 3D genuinely
                optional rather than nominally optional. */}
            <div className="mt-16 border-t border-line pt-10">
              <h2 className="t-eyebrow mb-6">What's in it</h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {monuments.map((m) => (
                  <li key={m.id} className="card !p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="block h-2 w-2 rounded-full"
                        style={{ background: KIND_COLOR[m.kind] }}
                        aria-hidden="true"
                      />
                      <h3 className="t-ui">{m.label}</h3>
                    </div>
                    <p className="t-mono mb-2">{m.sub}</p>
                    <p className="t-small mb-3 text-[0.82rem]">{m.body}</p>
                    <Link to={m.link.to} className="text-xs text-accent link-draw">
                      {m.link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="py-8">
            <div className="relative overflow-hidden rounded-xl border border-line bg-[#0b0a09]">
              <div className="h-[min(72vh,44rem)] w-full">
                <Suspense
                  fallback={
                    <div
                      className="flex h-full items-center justify-center"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="t-mono">Building the world…</span>
                    </div>
                  }
                >
                  <World
                    selected={selected}
                    onSelect={setSelected}
                    reducedEffects={reducedEffects}
                  />
                </Suspense>
              </div>

              {/* Controls hint. Plain language, no gaming vocabulary. */}
              <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-1.5">
                <span className="t-mono inline-flex w-fit items-center gap-1.5 rounded border border-line bg-[rgba(11,10,9,0.8)] px-2 py-1 text-[0.62rem] text-[#948a7c]">
                  <MousePointer2 size={11} aria-hidden="true" />
                  Drag to look around
                </span>
                <span className="t-mono inline-flex w-fit items-center gap-1.5 rounded border border-line bg-[rgba(11,10,9,0.8)] px-2 py-1 text-[0.62rem] text-[#948a7c]">
                  Click a structure for detail
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEntered(false);
                  setSelected(null);
                }}
                className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded border border-line bg-[rgba(11,10,9,0.8)] px-2.5 py-1.5 text-xs text-[#cdc4b8] transition-colors hover:text-white"
              >
                <X size={13} aria-hidden="true" />
                Exit
              </button>

              {/* Detail panel for the selected monument. */}
              <AnimatePresence>
                {selectedData && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-4 bottom-4 rounded-lg border border-line bg-[rgba(16,14,12,0.94)] p-5 backdrop-blur sm:max-w-md"
                  >
                    <div className="mb-1.5 flex items-center gap-2">
                      <span
                        className="block h-2 w-2 rounded-full"
                        style={{ background: KIND_COLOR[selectedData.kind] }}
                        aria-hidden="true"
                      />
                      <h2 className="text-[0.95rem] font-semibold text-[#f4efe7]">
                        {selectedData.label}
                      </h2>
                    </div>
                    <p className="mb-2 font-mono text-[0.65rem] text-[#948a7c]">
                      {selectedData.sub}
                    </p>
                    <p className="mb-4 text-[0.85rem] leading-relaxed text-[#cdc4b8]">
                      {selectedData.body}
                    </p>
                    <Link
                      to={selectedData.link.to}
                      className="inline-flex items-center gap-1.5 text-xs text-[#f2733c]"
                    >
                      {selectedData.link.label}
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="t-small mt-4">
              Everything here also exists as text on the main site — this is a second
              way to read it, not the only one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
