import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import SectionHead from './SectionHead';
import { RevealGroup, RevealItem } from '../system/Reveal';
import { ProjectThumb } from '../system/ProjectGlyph';
import { getGitHubStats } from '../../hooks/useGitHubData';

/**
 * Flagship work.
 *
 * Layer 1 only (§14): what it is, why it exists, what Vidit contributed.
 * Architecture and trade-offs live on the case-study route, so a recruiter
 * gets the gist in seconds and an engineer can go two levels deeper on
 * purpose rather than by scrolling past everything.
 *
 * Three projects here, deliberately. The remaining eight live in the index
 * so the homepage stays a narrative rather than a catalogue.
 */

const FLAGSHIPS = [
  { id: 11, slug: 'idittrack', role: 'Systems' },
  { id: 8, slug: 'sathisahyogi', role: 'Blockchain' },
  { id: 9, slug: 'adbhutglobal', role: 'Delivery' },
];

export default function WorkSection({ projects }) {
  const flagships = FLAGSHIPS.map((f) => ({
    ...f,
    project: projects.find((p) => p.id === f.id),
  })).filter((f) => f.project);

  return (
    <section id="work" className="section" aria-labelledby="work-heading">
      <div className="shell">
        <SectionHead
          id="work-heading"
          index="01"
          eyebrow="What I build"
          title={['Three systems,', 'three different problems.']}
          lede="Each one starts with what it is and why it exists. Go a level deeper for the architecture, and another for the trade-offs behind it."
        />

        <RevealGroup className="stack-lg" stagger={0.1}>
          {flagships.map(({ project, slug, role }, i) => (
            <RevealItem key={project.id}>
              <ProjectRow project={project} slug={slug} role={role} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-line pt-8">
          <Link to="/work" className="btn btn-quiet">
            All {projects.length} projects
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <p className="t-small">Including earlier work, utilities and experiments.</p>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, slug, role, index }) {
  const gh = getGitHubStats(project.githubUrl);
  const live = project.showLiveDemo && project.liveUrl && project.liveUrl !== '#';

  return (
    <article className="group grid gap-6 border-b border-line pb-10 last:border-0 md:grid-cols-[1fr_1.1fr] md:gap-10">
      {/* Visual. Falls back to a generated lattice when no screenshot exists,
          so the row never renders a broken image or an empty box. */}
      <Link
        to={`/work/${slug}`}
        className="relative block overflow-hidden rounded-lg border border-line bg-surface-inset"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="aspect-[16/10] w-full overflow-hidden">
          <div className="h-full w-full transition-transform duration-slow ease-out group-hover:scale-[1.025]">
            <ProjectThumb project={project} loading={index === 0 ? 'eager' : 'lazy'} />
          </div>
        </div>
      </Link>

      <div className="flex flex-col">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="tag tag-mono">{role}</span>
          <span className="t-mono">{project.year}</span>
          <span className="t-mono" aria-hidden="true">
            ·
          </span>
          <span className="t-mono">{project.teamSize}</span>
        </div>

        <h3 className="t-lg">
          <Link to={`/work/${slug}`} className="link-draw">
            {project.title}
          </Link>
        </h3>

        {/* Layer 1: the problem, in language that needs no context. */}
        <p className="t-body mt-4 text-[0.98rem]">{project.problem}</p>
        <p className="t-body mt-3 text-[0.98rem] text-secondary">{project.solution}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((t) => (
            <li key={t.name} className="tag tag-mono">
              {t.name}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link to={`/work/${slug}`} className="btn btn-quiet btn-sm">
            How it works
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-ink"
            >
              <Github size={13} aria-hidden="true" />
              Code
              {gh?.language && <span className="t-mono">· {gh.language}</span>}
            </a>
          )}
          {live && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-ink"
            >
              Live
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
