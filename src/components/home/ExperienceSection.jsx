import React from 'react';
import SectionHead from './SectionHead';
import { RevealGroup, RevealItem } from '../system/Reveal';

/**
 * Experience (§12).
 *
 * Not a résumé timeline. Each role answers "what did he actually do there?"
 * — responsibilities and the systems touched, not a job title and a date
 * range. The rail on the left communicates progression: research intern →
 * developer → freelance delivery → current full-time role.
 */

export default function ExperienceSection({ experience }) {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="shell">
        <SectionHead
          id="experience-heading"
          index="03"
          eyebrow="Where I've built"
          title={['Research, then', 'production.']}
          lede="Four roles in three years, moving from investigating protocols to shipping systems that other people depend on."
        />

        <RevealGroup as="ol" className="relative" stagger={0.09}>
          {/* Progression rail. */}
          <span
            className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-[calc(9rem+7px)]"
            aria-hidden="true"
          />

          {experience.map((role, i) => {
            const current = role.duration.includes('Present');
            return (
              <RevealItem as="li" key={role.id} className="relative pb-12 last:pb-0">
                <div className="grid gap-x-6 md:grid-cols-[9rem_1fr]">
                  <div className="mb-2 hidden md:block md:text-right">
                    <span className="t-mono">{role.duration}</span>
                  </div>

                  <div className="relative pl-8">
                    {/* Node. The current role is filled; past roles are hollow. */}
                    <span
                      className="absolute left-0 top-[0.45rem] block h-[15px] w-[15px] rounded-full border-2"
                      style={{
                        borderColor: current ? 'var(--ember)' : 'var(--line-strong)',
                        background: current ? 'var(--ember)' : 'var(--bg)',
                      }}
                      aria-hidden="true"
                    />

                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h3 className="t-md font-display text-ink">{role.position}</h3>
                      {current && <span className="tag tag-ember">Current</span>}
                    </div>

                    <p className="text-[0.95rem] font-medium text-accent">{role.company}</p>
                    <p className="t-mono mt-1">
                      <span className="md:hidden">{role.duration} · </span>
                      {role.location} · {role.type}
                    </p>

                    <p className="t-body mt-4 text-[0.95rem]">{role.description}</p>

                    {role.responsibilities?.length > 0 && (
                      <ul className="mt-5 space-y-2">
                        {role.responsibilities.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[0.9rem] leading-relaxed text-secondary"
                          >
                            <span className="mt-[0.55em] block h-px w-3 shrink-0 bg-line-strong" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {role.technologies?.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {role.technologies.map((t) => (
                          <li key={t.name} className="tag tag-mono">
                            {t.name}
                          </li>
                        ))}
                      </ul>
                    )}

                    {role.impact && (
                      <p className="mt-5 border-l-2 border-ember pl-4 text-[0.9rem] italic leading-relaxed text-secondary">
                        {role.impact}
                      </p>
                    )}
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
