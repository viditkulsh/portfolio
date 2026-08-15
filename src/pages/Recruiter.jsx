import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CalendarCheck,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { architectureData } from '../data/sections/architectureData';
import socialMediaData from '../data/sections/socialMediaData';
import { CERT_GROUPS } from '../data/sections/certificatesData';
import usePageMeta from '../hooks/usePageMeta';

/**
 * Recruiter view.
 *
 * Deliberately the least animated page on the site. This audience is
 * scanning, often against a stack of other candidates, and motion costs
 * them time. Everything is above-the-fold dense, in the order a screener
 * actually reads: who → currently → evidence → contact.
 *
 * No blockchain knowledge is assumed anywhere on this page.
 */

const slugByProjectId = Object.fromEntries(
  Object.entries(architectureData).map(([slug, a]) => [a.projectId, slug])
);

export default function Recruiter() {
  const { portfolioData } = usePortfolio();
  const { personal, experience, education, projects, certificates, skills } = portfolioData;
  const current = experience.find((r) => r.duration.includes('Present'));
  const flagship = projects.filter((p) => slugByProjectId[p.id]);

  usePageMeta({
    title: `${personal.name} — Résumé summary for hiring teams`,
    description: personal.shortIntro,
    path: '/recruiter',
  });

  return (
    <div className="pt-24 pb-20">
      <div className="shell max-w-5xl">
        {/* ── Identity ─────────────────────────────────────────── */}
        <header className="border-b border-line pb-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <h1 className="t-xl">{personal.name}</h1>
              <p className="mt-2 text-[1.05rem] text-accent">{personal.title}</p>
              <p className="t-mono mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={12} aria-hidden="true" />
                  {personal.location}
                </span>
                <span aria-hidden="true">·</span>
                <a href={`mailto:${personal.email}`} className="link-draw">
                  {personal.email}
                </a>
                <span aria-hidden="true">·</span>
                <span>{personal.phone}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={socialMediaData.platforms.calendar.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <CalendarCheck size={14} aria-hidden="true" />
                Book a call
              </a>
              <Link to="/resume" className="btn btn-quiet btn-sm">
                <Download size={14} aria-hidden="true" />
                Résumé
              </Link>
            </div>
          </div>

          <p className="t-body mt-6 max-w-[62ch]">{personal.shortIntro}</p>
        </header>

        {/* ── At a glance ──────────────────────────────────────── */}
        <dl className="grid gap-px overflow-hidden border-b border-line bg-line sm:grid-cols-4">
          {[
            { k: 'Currently', v: current ? current.company : '—', sub: current?.position },
            { k: 'Education', v: 'BCA (Hons)', sub: `${education[0].cgpa} · Bennett University` },
            { k: 'Experience', v: `${experience.length} roles`, sub: 'Since Dec 2024' },
            { k: 'Projects', v: `${projects.length}`, sub: `${flagship.length} case studies` },
          ].map((item) => (
            <div key={item.k} className="bg-bg py-5">
              <dt className="t-eyebrow !text-[var(--text-faint)]">{item.k}</dt>
              <dd className="mt-1">
                <span className="block text-[0.95rem] font-medium text-ink">{item.v}</span>
                {item.sub && <span className="t-mono block">{item.sub}</span>}
              </dd>
            </div>
          ))}
        </dl>

        {/* ── Experience ───────────────────────────────────────── */}
        <Section title="Experience">
          <ol className="stack-lg">
            {experience.map((role) => (
              <li key={role.id} className="grid gap-x-6 gap-y-2 md:grid-cols-[10rem_1fr]">
                <p className="t-mono md:text-right">{role.duration}</p>
                <div>
                  <h3 className="t-ui">
                    {role.position} <span className="text-accent">· {role.company}</span>
                  </h3>
                  <p className="t-mono mt-0.5">
                    {role.location} · {role.type}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {role.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.88rem] leading-relaxed text-secondary">
                        <span
                          className="mt-[0.6em] block h-px w-2.5 shrink-0 bg-line-strong"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── Selected work ────────────────────────────────────── */}
        <Section title="Selected work">
          <ul className="grid gap-4 md:grid-cols-3">
            {flagship.map((project) => (
              <li key={project.id} className="card !p-5">
                <h3 className="t-ui mb-1">{project.title}</h3>
                <p className="t-mono mb-3">{project.year} · {project.teamSize}</p>
                <p className="t-small mb-4 text-[0.82rem]">{project.problem}</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/work/${slugByProjectId[project.id]}`}
                    className="text-xs text-accent link-draw"
                  >
                    Case study
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink"
                    >
                      <Github size={11} aria-hidden="true" />
                      Code
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Technical ────────────────────────────────────────── */}
        <Section title="Technical">
          <dl className="stack">
            {skills.tiers.map((tier) => (
              <div key={tier.name} className="grid gap-x-6 gap-y-1 md:grid-cols-[10rem_1fr]">
                <dt className="t-mono md:text-right">{tier.name}</dt>
                <dd className="text-[0.9rem] leading-relaxed text-secondary">
                  {tier.skills.join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ── Education ────────────────────────────────────────── */}
        <Section title="Education">
          {education.map((edu) => (
            <div key={edu.id} className="grid gap-x-6 gap-y-2 md:grid-cols-[10rem_1fr]">
              <p className="t-mono md:text-right">{edu.duration}</p>
              <div>
                <h3 className="t-ui">{edu.degree}</h3>
                <p className="t-mono mt-0.5">
                  {edu.institution} · CGPA {edu.cgpa}
                </p>
                <p className="t-small mt-3">
                  <span className="text-faint">Capstone — </span>
                  {edu.capstone}
                </p>
                <ul className="mt-3 space-y-1">
                  {edu.achievements.map((a) => (
                    <li key={a} className="text-[0.85rem] text-secondary">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Section>

        {/* ── Certifications ───────────────────────────────────── */}
        <Section title="Certifications">
          <div className="stack">
            {CERT_GROUPS.map((group) => {
              const items = certificates.filter((c) => c.group === group.id);
              if (!items.length) return null;
              return (
                <div key={group.id} className="grid gap-x-6 gap-y-1 md:grid-cols-[10rem_1fr]">
                  <p className="t-mono md:text-right">{group.label}</p>
                  <ul className="space-y-1">
                    {items.map((cert) => (
                      <li key={cert.id} className="text-[0.85rem] text-secondary">
                        <a
                          href={cert.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-draw"
                        >
                          {cert.title}
                        </a>
                        <span className="text-faint"> — {cert.issuer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-8">
          <a href={`mailto:${personal.email}`} className="btn btn-primary btn-sm">
            <Mail size={14} aria-hidden="true" />
            Email
          </a>
          <a
            href={socialMediaData.platforms.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-quiet btn-sm"
          >
            <Linkedin size={14} aria-hidden="true" />
            LinkedIn
          </a>
          <a
            href={socialMediaData.platforms.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-quiet btn-sm"
          >
            <Github size={14} aria-hidden="true" />
            GitHub
          </a>
          <Link to="/" className="ml-auto inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
            Full portfolio
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="border-b border-line py-10">
      <h2 className="t-eyebrow mb-6">{title}</h2>
      {children}
    </section>
  );
}
