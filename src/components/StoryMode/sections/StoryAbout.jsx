import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { MapPin, Sparkles, X } from 'lucide-react';
import JourneyTimeline from '../../Common/JourneyTimeline';

const StoryAbout = () => {
  const { portfolioData } = usePortfolio();
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

        {/* Bio snippet on larger screens */}
        <motion.div className="lg:col-span-3 hidden lg:block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="card-light h-full">
            <h3 className="heading-md mb-4">In Brief</h3>
            <p className="text-ink-500 leading-relaxed text-sm">{portfolioData.about.bio?.slice(0, 380)}...</p>
          </div>
        </motion.div>
      </div>

      {/* Journey Timeline — full-width horizontal */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="heading-md mb-6">My Journey</h3>
        <JourneyTimeline timelineItems={portfolioData.about.timeline} />
      </motion.div>

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
