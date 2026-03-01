import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ExternalLink, Github, X, Rocket, Star, GitFork, Clock } from 'lucide-react';
import { getGitHubStats } from '../../../hooks/useGitHubData';

const StoryProjects = () => {
  const { portfolioData } = usePortfolio();
  const [selected, setSelected] = useState(null);
  const featured = portfolioData.projects.filter(p => p.featured);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="section-label mb-3">Projects</div>
        <h2 className="heading-xl mb-2">Featured Work</h2>
        <p className="text-ink-400">Ideas brought to life through code</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((p, i) => (
          <motion.div
            key={p.id}
            className="card-light cursor-pointer group"
            onClick={() => setSelected(p)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <div className="w-full h-36 rounded-lg mb-4 overflow-hidden bg-sand-100 flex items-center justify-center">
              {p.image ? (
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              ) : (
                <Rocket size={32} className="text-ink-200" />
              )}
            </div>
            <h3 className="text-base font-semibold text-ink-800 mb-1">{p.title}</h3>
            <p className="text-sm text-ink-400 line-clamp-2 mb-3">{p.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {p.technologies.slice(0, 3).map((t, j) => (
                <span key={j} className="tag text-[0.65rem]">{t.name}</span>
              ))}
            </div>
            {(() => {
              const gh = getGitHubStats(p.githubUrl); return gh ? (
                <div className="flex items-center gap-3 text-xs text-ink-400 mb-2 font-mono">
                  <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" />{gh.stars}</span>
                  <span className="flex items-center gap-1"><GitFork size={11} />{gh.forks}</span>
                  {gh.language && <span className="text-ink-300">{gh.language}</span>}
                </div>
            ) : null;
            })()}
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2 py-0.5 rounded-full ${p.status === 'Completed' ? 'bg-green-50 text-green-600' :
                p.status === 'In Progress' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                }`}>{p.status}</span>
              <span className="text-ink-300 font-mono">{p.year}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="modal-content max-w-3xl" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-ink-300 hover:text-ink-600"><X size={20} /></button>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="h-48 rounded-xl overflow-hidden bg-sand-100 flex items-center justify-center">
                  {selected.image ? <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" /> : <Rocket size={48} className="text-ink-200" />}
                </div>
                <div>
                  <h3 className="heading-md mb-2">{selected.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-4">{selected.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selected.technologies.map((t, j) => <span key={j} className="tag">{React.createElement(t.icon, { size: 12 })} {t.name}</span>)}
                  </div>
                  {(() => {
                    const gh = getGitHubStats(selected.githubUrl); return gh ? (
                      <div className="flex items-center gap-4 text-xs text-ink-400 font-mono mb-4 border-t border-ink-100 pt-3">
                        <span className="flex items-center gap-1"><Star size={12} className="text-amber-400" />{gh.stars} stars</span>
                        <span className="flex items-center gap-1"><GitFork size={12} />{gh.forks} forks</span>
                        {gh.language && <span>{gh.language}</span>}
                        <span className="flex items-center gap-1"><Clock size={12} />{new Date(gh.pushedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  ) : null;
                  })()}
                  <div className="flex gap-3">
                    {selected.githubUrl && <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm"><Github size={14} /> Code</a>}
                    {selected.showLiveDemo && selected.liveUrl && selected.liveUrl !== '#' && <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm"><ExternalLink size={14} /> Demo</a>}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryProjects;
