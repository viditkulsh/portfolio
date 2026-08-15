import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Blocks, Code, Download, ExternalLink, FileText, User } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Reveal, WipeLines } from '../components/system/Reveal';
import usePageMeta from '../hooks/usePageMeta';

/**
 * Résumé.
 *
 * Three variants existed with two competing selector components rendering
 * them; this is the single one. The page stays deliberately secondary to
 * the portfolio (§18) — it is a document to take away, not the experience.
 *
 * Selection is made obvious rather than clever: one recommended default,
 * plainly stated differences, and both view and download for each.
 */

const VARIANTS = [
  {
    key: 'current',
    icon: FileText,
    label: 'Current',
    tagline: 'Most recent · June 2026',
    detail:
      'The only version that includes the AGP Webpulse role — the RWA platform, the 365+ APIs and the Foundry validation suite. Start here.',
    recommended: true,
  },
  {
    key: 'software-engineer',
    icon: Code,
    label: 'Software Engineer',
    tagline: 'General engineering roles',
    detail:
      'Leads with full-stack delivery, system design and clean architecture. Predates the current role.',
  },
  {
    key: 'blockchain-developer',
    icon: Blocks,
    label: 'Blockchain',
    tagline: 'Web3, protocols, smart contracts',
    detail:
      'Leads with Solidity, cross-chain bridge work and the DRDO interoperability research.',
  },
  {
    key: 'full-stack-developer',
    icon: User,
    label: 'Full Stack',
    tagline: 'Product and platform teams',
    detail:
      'Leads with React, Node/NestJS, Postgres and end-to-end product delivery.',
  },
];

export default function ResumePage() {
  const { portfolioData } = usePortfolio();
  const [selected, setSelected] = useState('current');

  usePageMeta({
    title: 'Résumé — Vidit Kulshrestha',
    description:
      'Résumé for Vidit Kulshrestha, software engineer working on blockchain and fintech systems. Three variants by role.',
    path: '/resume',
  });

  const active = portfolioData.resumeVariants[selected];

  return (
    <div className="pt-28">
      <div className="shell max-w-4xl">
        <header className="mb-10">
          <p className="t-eyebrow mb-4">Résumé</p>
          <WipeLines as="h1" className="t-xl" lines={['Pick the one that fits.']} />
          <p className="t-body-lg mt-5">
            Same experience, ordered differently depending on what the role leads with.
            If you're unsure, take the current one — it's the most complete.
          </p>
        </header>

        <Reveal>
          <div
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            role="radiogroup"
            aria-label="Résumé variant"
          >
            {VARIANTS.map((variant) => {
              const isActive = selected === variant.key;
              const Icon = variant.icon;
              return (
                <button
                  key={variant.key}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setSelected(variant.key)}
                  className="card !p-5 text-left transition-all duration-base"
                  style={{
                    borderColor: isActive ? 'var(--ember)' : 'var(--line)',
                    background: isActive ? 'var(--ember-soft)' : 'var(--surface)',
                  }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <Icon
                      size={18}
                      style={{ color: isActive ? 'var(--ember)' : 'var(--text-muted)' }}
                      aria-hidden="true"
                    />
                    {variant.recommended && (
                      <span className="tag tag-mono !text-[0.58rem]">Recommended</span>
                    )}
                  </div>
                  <h2 className="t-ui">{variant.label}</h2>
                  <p className="t-mono mt-1">{variant.tagline}</p>
                  <p className="t-small mt-3 text-[0.8rem]">{variant.detail}</p>
                </button>
              );
            })}
          </div>
        </Reveal>

        {active && (
          <Reveal className="mt-8" delay={0.05}>
            <div className="card flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="t-ui">{active.title}</p>
                <p className="t-mono mt-1">{active.filename}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={active.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-quiet btn-sm"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  View
                </a>
                <a href={active.path} download={active.filename} className="btn btn-primary btn-sm">
                  <Download size={14} aria-hidden="true" />
                  Download
                </a>
              </div>
            </div>

            {/* Inline preview. Height is fixed so the page never jumps when
                the PDF finishes loading. */}
            <object
              data={`${active.path}#view=FitH`}
              type="application/pdf"
              className="mt-6 h-[min(78vh,50rem)] w-full rounded-lg border border-line"
              aria-label={`${active.title} preview`}
            >
              {/* Browsers without an inline PDF viewer — notably most mobile
                  ones — get a real link rather than an empty grey box. */}
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="t-body">Your browser can't display the PDF inline.</p>
                <a href={active.path} download={active.filename} className="btn btn-primary">
                  <Download size={15} aria-hidden="true" />
                  Download instead
                </a>
              </div>
            </object>
          </Reveal>
        )}

        {/* Honest note: the PDFs predate the current role. Better to say so
            than to let a reader find the gap themselves. */}
        <p className="t-small mt-6">
          {selected === 'current' ? (
            <>Revised June 2026. This is the most current version.</>
          ) : (
            <>
              This role-specific version predates the AGP Webpulse role — take the{' '}
              <button
                type="button"
                onClick={() => setSelected('current')}
                className="link-draw underline-offset-2"
              >
                current résumé
              </button>{' '}
              or read the{' '}
              <Link to="/#experience" className="link-draw">
                experience section
              </Link>{' '}
              for up-to-date detail.
            </>
          )}
        </p>

        <div className="py-16">
          <Link to="/" className="btn btn-quiet">
            Back to the portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
