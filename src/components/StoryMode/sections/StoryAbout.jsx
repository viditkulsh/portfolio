import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { MapPin, Sparkles, X } from 'lucide-react';

const StoryAbout = () => {
  const { portfolioData } = usePortfolio();
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [showFacts, setShowFacts] = useState(false);

  return (
    <div className="space-y-12">
      {/* Intro */}
      <div className="grid lg:grid-cols-5 gap-10">
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="section-label mb-3">About</div>
          <h2 className="heading-xl mb-4">{portfolioData.personal.name}</h2>
          <p className="text-ink-400 mb-2">{portfolioData.personal.title}</p>
          <div className="flex items-center gap-2 text-sm text-ink-300 mb-6">
            <MapPin size={14} /> {portfolioData.personal.location}
          </div>
          <p className="text-ink-500 leading-relaxed mb-6">{portfolioData.about.introduction}</p>
          <button onClick={() => setShowFacts(true)} className="btn-outline text-sm">
            <Sparkles size={14} /> Fun Facts
          </button>
        </motion.div>

        {/* Timeline */}
        <motion.div className="lg:col-span-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="heading-md mb-6">My Journey</h3>
          <div className="space-y-4">
            {portfolioData.about.timeline.map((item, i) => (
              <motion.div
                key={i}
                className="card-light cursor-pointer group"
                onClick={() => setSelectedTimeline(item)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                    item.isHumorous ? 'bg-warm' : 'bg-ink-800'
                  }`}>{item.year.slice(-2)}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-ink-800 mb-0.5">{item.title}</h4>
                    <p className="text-xs text-ink-400 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Timeline Modal */}
      <AnimatePresence>
        {selectedTimeline && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTimeline(null)}>
            <motion.div className="modal-content max-w-lg" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedTimeline(null)} className="absolute top-4 right-4 text-ink-300 hover:text-ink-600"><X size={20} /></button>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-sm font-bold text-white mb-4 ${selectedTimeline.isHumorous ? 'bg-warm' : 'bg-ink-800'}`}>
                {selectedTimeline.year.slice(-2)}
              </div>
              <h3 className="heading-md mb-3">{selectedTimeline.title}</h3>
              <p className="text-ink-500 leading-relaxed mb-4">{selectedTimeline.description}</p>
              {selectedTimeline.lessonLearned && (
                <div className="bg-warm-50 border border-warm-200 rounded-xl p-4">
                  <p className="text-sm text-warm-600"><strong>Lesson:</strong> {selectedTimeline.lessonLearned}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fun Facts Modal */}
      <AnimatePresence>
        {showFacts && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFacts(false)}>
            <motion.div className="modal-content max-w-lg" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowFacts(false)} className="absolute top-4 right-4 text-ink-300 hover:text-ink-600"><X size={20} /></button>
              <h3 className="heading-md mb-5">Fun Facts</h3>
              <div className="space-y-3">
                {portfolioData.about.funFacts.map((f, i) => (
                  <div key={i} className="bg-cream rounded-xl p-4 text-sm text-ink-600 border-l-3 border-warm">{f}</div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryAbout;
