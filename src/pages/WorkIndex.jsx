import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Star } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { architectureData } from '../data/sections/architectureData';
import { ProjectThumb } from '../components/system/ProjectGlyph';
import { RevealGroup, RevealItem, WipeLines } from '../components/system/Reveal';
import { getGitHubStats } from '../hooks/useGitHubData';
import usePageMeta from '../hooks/usePageMeta';

/**
 * The full project index.
 *
 * Everything that isn't a flagship lives here, which is what lets the
 * homepage stay a narrative (§34). Projects with a case study are marked,
 * so the reader can tell depth from breadth at a glance rather than
 * opening eleven cards to find out.
 */

const slugByProjectId = Object.fromEntries(
  Object.entries(architectureData).map(([slug, a]) => [a.projectId, slug])
);

export default function WorkIndex() {
  const { portfolioData } = usePortfolio();
  const [filter, setFilter] = useState('All');

  usePageMeta({
    title: 'Work — Vidit Kulshrestha',
    description:
      'Every project: blockchain systems, full-stack platforms, utilities and experiments.',
    path: '/work',
  });

  const categories = useMemo(
    () => ['All', ...new Set(portfolioData.projects.map((p) => p.category))],
    [portfolioData.projects]
  );

  const visible = useMemo(
    () =>
      filter === 'All'
        ? portfolioData.projects
        : portfolioData.projects.filter((p) => p.category === filter),
    [filter, portfolioData.projects]
  );

  return (
    <div className="pt-28">
      <div className="shell">
        <header className="mb-12 border-b border-line pb-10">
          <p className="t-eyebrow mb-4">Everything</p>
          <WipeLines as="h1" className="t-xl" lines={['All work']} />
          <p className="t-body-lg mt-5">
            {portfolioData.projects.length} projects, from production systems to the
            experiments that taught me something worth keeping.
          </p>
        </header>

        <div
          className="mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className="tag transition-all duration-fast"
              style={
                filter === cat
                  ? {
                      borderColor: 'var(--ember)',
                      background: 'var(--ember-soft)',
                      color: 'var(--ember-text)',
                    }
                  : undefined
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <RevealGroup
          as="ul"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.04}
        >
          {visible.map((project) => {
            const slug = slugByProjectId[project.id];
            const gh = getGitHubStats(project.githubUrl);
            const live =
              project.showLiveDemo && project.liveUrl && project.liveUrl !== '#';

            return (
              <RevealItem as="li" key={project.id} className="h-full">
                <article className="card card-interactive flex h-full flex-col !p-0">
                  <div className="aspect-[16/10] overflow-hidden rounded-t-[--radius-lg]">
                    <ProjectThumb project={project} />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="t-mono">{project.year}</span>
                      {slug && <span className="tag tag-ember">Case study</span>}
                    </div>

                    <h2 className="t-ui mb-2">
                      {slug ? (
                        <Link to={`/work/${slug}`} className="link-draw">
                          {project.title}
                        </Link>
                      ) : (
                        project.title
                      )}
                    </h2>

                    <p className="t-small mb-4 flex-1">{project.description}</p>

                    <ul className="mb-4 flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((t) => (
                        <li key={t.name} className="tag tag-mono !text-[0.6rem]">
                          {t.name}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-4 border-t border-line pt-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-ink"
                        >
                          <Github size={12} aria-hidden="true" />
                          Code
                        </a>
                      )}
                      {live && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-ink"
                        >
                          Live
                          <ArrowUpRight size={11} aria-hidden="true" />
                        </a>
                      )}
                      {gh?.stars > 0 && (
                        <span className="t-mono ml-auto inline-flex items-center gap-1">
                          <Star size={11} aria-hidden="true" />
                          {gh.stars}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="py-16">
          <Link to="/" className="btn btn-quiet">
            Back to the portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
