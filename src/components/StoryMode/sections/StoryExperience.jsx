import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { MapPin, Calendar, TrendingUp, X } from 'lucide-react';

const StoryExperience = () => {
  const { portfolioData } = usePortfolio();
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="section-label mb-3">Experience</div>
        <h2 className="heading-xl mb-2">Professional Journey</h2>
        <p className="text-ink-400">Where theory meets practice</p>
      </div>

      <div className="space-y-5">
        {portfolioData.experience.map((exp, i) => (
          <motion.div
            key={exp.id}
            className="card-light cursor-pointer"
            onClick={() => setSelected(exp)}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-ink-800 flex items-center justify-center text-white font-bold flex-shrink-0">
                {exp.company.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-ink-800">{exp.position}</h3>
                    <p className="text-sm text-warm-600 font-medium">{exp.company}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${exp.type === 'Full-time' ? 'bg-green-50 text-green-600' :
                      exp.type === 'Internship' ? 'bg-blue-50 text-blue-600' :
                        'bg-purple-50 text-purple-600'
                    }`}>{exp.type}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-ink-400 mt-1">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {exp.duration}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {exp.location}</span>
                </div>
                <p className="text-sm text-ink-400 mt-2 line-clamp-2">{exp.description}</p>
                {exp.impact && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-green-600">
                    <TrendingUp size={12} /> {exp.impact.slice(0, 80)}...
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="modal-content max-w-3xl" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-ink-300 hover:text-ink-600"><X size={20} /></button>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-ink-800 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">{selected.company.charAt(0)}</div>
                <div>
                  <h3 className="heading-md mb-1">{selected.position}</h3>
                  <p className="text-warm-600 font-medium">{selected.company}</p>
                  <div className="flex items-center gap-3 text-sm text-ink-400 mt-1">
                    <span className="flex items-center gap-1"><Calendar size={13} /> {selected.duration}</span>
                    <span className="flex items-center gap-1"><MapPin size={13} /> {selected.location}</span>
                  </div>
                </div>
              </div>
              <p className="text-ink-500 leading-relaxed mb-5">{selected.description}</p>
              {selected.responsibilities && (
                <div className="mb-5">
                  <p className="text-xs font-mono text-ink-300 uppercase tracking-wider mb-2">Responsibilities</p>
                  <ul className="space-y-1.5">
                    {selected.responsibilities.map((r, j) => <li key={j} className="text-sm text-ink-500 flex items-start gap-2"><span className="text-warm-500">→</span>{r}</li>)}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selected.technologies.map((t, j) => <span key={j} className="tag">{React.createElement(t.icon, { size: 12 })} {t.name}</span>)}
              </div>
              {selected.impact && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-700"><TrendingUp size={14} className="inline mr-1" /> <strong>Impact:</strong> {selected.impact}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryExperience;
