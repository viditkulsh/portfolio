import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHead from './SectionHead';
import { Reveal } from '../system/Reveal';
import { getGitHubStats } from '../../hooks/useGitHubData';

/**
 * Technical depth (§17).
 *
 * Explicitly not a badge grid. Every technology listed here resolves to the
 * work it was used on — selecting one filters the evidence beneath it. If a
 * technology has no project or role behind it, it doesn't appear.
 *
 * That constraint is the point: the reader should conclude "he knows this
 * because he built something with it", which a wall of logos can never say.
 */

/** Aliases let a skill name match how it's written in project/role data. */
const ALIASES = {
  'React.js': ['react'],
  'Node.js': ['node'],
  'Node.js + NestJS': ['node', 'nestjs'],
  'Express.js': ['express'],
  Solidity: ['solidity'],
  MongoDB: ['mongodb', 'mongo'],
  Ethereum: ['ethereum', 'ethers', 'evm'],
  Hardhat: ['hardhat'],
  'Web3.js': ['web3'],
  Docker: ['docker'],
  Java: ['java'],
  Python: ['python'],
  TypeScript: ['typescript'],
  JavaScript: ['javascript'],
  'Smart Contracts': ['smart contract', 'solidity'],
  Tokenization: ['tokenization', 'tokenizing', 'tokeniz'],
  Blockchain: ['blockchain'],
  Cryptography: ['cryptography', 'cryptographic', 'encryption'],
  SEO: ['seo'],
  PHP: ['php'],
  MySQL: ['mysql'],
  HTML: ['html'],
  CSS: ['css'],
  'System Design': ['system design', 'architecture', 'modular', 'schema design'],
  'Blockchain Architecture': ['blockchain', 'tokenization architecture', 'on-chain'],
  'Distributed Systems': ['distributed', 'cross-chain', 'interoperability'],
  'Authentication & Authorization': ['jwt', 'auth', 'access control', 'permission'],
  'CI/CD Pipelines': ['ci/cd', 'deployment', 'dockeriz'],
  Git: ['git', 'github'],
  NestJS: ['nestjs'],
  PostgreSQL: ['postgres'],
  'Next.js': ['next.js'],
  Supabase: ['supabase'],
  Foundry: ['foundry'],
  'Smart Contract Testing': ['test case', 'test suite', 'test coverage', 'fuzz', 'invariant'],
  Firebase: ['firebase'],
  'AWS Fundamentals': ['aws'],
  'C++': ['c++'],
  // NB: no bare 'ml' needle — it matches "html" and manufactured four
  // pieces of evidence for a skill with none. Substring matching needs
  // needles that can't appear inside an unrelated word.
  'Machine Learning': ['machine learning'],
  'Python ML Ecosystem': ['numpy', 'pandas', 'scikit', 'nltk'],
};

export default function SignalSection({ skills, projects, experience }) {
  const [active, setActive] = useState(null);

  /* Build the skill → evidence index once. A skill with no evidence is
     dropped rather than shown as an unbacked claim. */
  const index = useMemo(() => {
    const haystack = (text) => (text || '').toLowerCase();

    /* Search everything on record for a project, not just its tech list.
       Docker appears only in `achievements`, TypeScript only in the synced
       GitHub language — searching a narrow subset silently dropped skills
       that genuinely are evidenced, which reads as a thinner engineer than
       the data supports. */
    const projectText = projects.map((p) => ({
      kind: 'project',
      id: p.id,
      title: p.title,
      to: null,
      blob: haystack(
        [
          p.title,
          p.category,
          p.technologies.map((t) => t.name).join(' '),
          p.technicalDepth,
          p.longDescription,
          p.challenges,
          p.keyLearnings,
          (p.highlights || []).join(' '),
          (p.achievements || []).join(' '),
          getGitHubStats(p.githubUrl)?.language || '',
        ].join(' ')
      ),
      meta: p.year,
    }));

    const roleText = experience.map((r) => ({
      kind: 'role',
      id: `r${r.id}`,
      title: `${r.position} · ${r.company}`,
      to: null,
      blob: haystack(
        [
          r.position,
          r.company,
          r.description,
          r.technologies.map((t) => t.name).join(' '),
          r.skills.join(' '),
          (r.responsibilities || []).join(' '),
          (r.achievements || []).join(' '),
          r.impact,
        ].join(' ')
      ),
      meta: r.duration,
    }));

    const corpus = [...projectText, ...roleText];

    const tiers = skills.tiers.map((tier) => ({
      ...tier,
      skills: tier.skills
        .map((name) => {
          const needles = ALIASES[name] || [name.toLowerCase()];
          const evidence = corpus.filter((entry) =>
            needles.some((n) => entry.blob.includes(n))
          );
          return { name, evidence };
        })
        // The rule that keeps this honest.
        .filter((s) => s.evidence.length > 0),
    }));

    return tiers.filter((t) => t.skills.length > 0);
  }, [skills, projects, experience]);

  const activeSkill = useMemo(() => {
    if (!active) return null;
    for (const tier of index) {
      const found = tier.skills.find((s) => s.name === active);
      if (found) return found;
    }
    return null;
  }, [active, index]);

  return (
    <section id="signal" className="section" aria-labelledby="signal-heading">
      <div className="shell">
        <SectionHead
          id="signal-heading"
          index="04"
          eyebrow="What I work in"
          title={['Every tool here', 'points at something built.']}
          lede="Select any technology to see the work behind it. Anything without a project or a role attached isn't listed."
        />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="stack-lg">
            {index.map((tier) => (
              <div key={tier.name}>
                <div className="mb-3 flex items-baseline gap-3">
                  <h3 className="t-ui">{tier.name}</h3>
                  <span className="t-small text-[0.75rem]">{tier.description}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {tier.skills.map((skill) => {
                    const isActive = active === skill.name;
                    return (
                      <li key={skill.name}>
                        <button
                          type="button"
                          onClick={() => setActive(isActive ? null : skill.name)}
                          aria-pressed={isActive}
                          className="tag transition-all duration-fast"
                          style={
                            isActive
                              ? {
                                  borderColor: 'var(--ember)',
                                  background: 'var(--ember-soft)',
                                  color: 'var(--ember-text)',
                                }
                              : undefined
                          }
                        >
                          {skill.name}
                          <span className="t-mono ml-1 opacity-60">
                            {skill.evidence.length}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </Reveal>

          {/* Evidence panel. Sticky on desktop so the connection stays visible
              while the reader scans the list. */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="card min-h-[16rem]">
              {activeSkill ? (
                <>
                  <p className="t-eyebrow mb-1">Used in</p>
                  <h3 className="t-md mb-5 font-display">{activeSkill.name}</h3>
                  <ul className="stack">
                    {activeSkill.evidence.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0"
                      >
                        <span className="text-[0.9rem] text-ink">{item.title}</span>
                        <span className="t-mono shrink-0">{item.meta}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="flex h-full min-h-[13rem] flex-col justify-center">
                  <p className="t-small">
                    Nothing selected. Pick a technology on the left and this panel shows
                    every project and role it was actually used on.
                  </p>
                  <Link to="/resume" className="btn btn-quiet btn-sm mt-6 self-start">
                    Or read the résumé
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
