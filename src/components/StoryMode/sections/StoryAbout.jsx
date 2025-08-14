import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { User, Target, Lightbulb, Sparkles, Rocket } from 'lucide-react';

const StoryAbout = ({ isRecruiterMode, onNext, onPrevious }) => {
  const { portfolioData } = usePortfolio();
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(null);
  const [showFunFacts, setShowFunFacts] = useState(false);

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.6 }
    })
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <div className="story-about flex flex-col lg:flex-row gap-12 min-h-screen">
      {/* Center-Left Side - Introduction */}
      <motion.div
        className="lg:w-2/5 xl:w-1/3 flex flex-col justify-center space-y-8 lg:pl-8"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-6">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <h1 className="heading-lg text-gradient">{portfolioData.personal.name}</h1>
              <p className="text-xl text-primary-text/80">{portfolioData.personal.title}</p>
            </div>
          </motion.div>

          <motion.p
            className="text-lg text-primary-text leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {portfolioData.about.introduction}
          </motion.p>

          <motion.div
            className="flex items-center gap-6 text-primary-text/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{portfolioData.personal.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>☕</span>
              <span>Coffee Enthusiast</span>
            </div>
          </motion.div>

          {/* Fun Facts Button */}
          <motion.button
            onClick={() => setShowFunFacts(true)}
            className="btn btn-secondary mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover Fun Facts <Target size={16} className="inline" />
          </motion.button>
        </div>
      </motion.div>

      {/* Right Side - Interactive Timeline */}
      <motion.div
        className="lg:w-3/5 xl:w-2/3 space-y-6"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="heading-md text-center mb-8">My Journey Timeline</h2>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-cyan to-primary-purple rounded-full" />
          
          {/* Timeline Items */}
          <div className="space-y-8">
            {portfolioData.about.timeline.map((item, index) => (
              <motion.div
                key={index}
                className="relative flex items-start gap-6 cursor-pointer"
                custom={index}
                variants={timelineVariants}
                initial="hidden"
                animate="visible"
                onClick={() => setSelectedTimelineItem(item)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Timeline Dot */}
                <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg
                  ${item.isHumorous 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                  : index % 2 === 0
                    ? 'bg-gradient-to-r from-primary-cyan to-primary-purple'
                    : 'bg-gradient-to-r from-green-400 to-blue-500'
                  }`}>
                  {item.year}
                </div>
                
                {/* Content */}
                <div className="flex-1 card hover:card-neon transition-all duration-300">
                  <h3 className="font-semibold text-lg text-primary-text mb-2">
                    {item.title}
                    {item.isHumorous && <span className="ml-2">😄</span>}
                  </h3>
                  <p className="text-primary-text/70 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-primary-cyan text-sm">
                    <span>📅</span>
                    <span>{item.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timeline Detail Modal */}
      <AnimatePresence>
        {selectedTimelineItem && (
          <motion.div
            className="modal-overlay"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedTimelineItem(null)}
          >
            <motion.div
              className="modal-content max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                  ${selectedTimelineItem.isHumorous 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                    : 'bg-gradient-to-r from-primary-cyan to-primary-purple'
                  }`}>
                  {selectedTimelineItem.year}
                </div>
                <h2 className="heading-sm">
                  {selectedTimelineItem.title}
                  {selectedTimelineItem.isHumorous && <span className="ml-2">😄</span>}
                </h2>
              </div>
              
              <p className="text-lg text-primary-text leading-relaxed mb-6">
                {selectedTimelineItem.description}
              </p>
              
              {selectedTimelineItem.isHumorous && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-300 text-sm">
                    <Lightbulb size={16} className="inline" /> <strong>Lesson learned:</strong> Every bug is just an undocumented feature waiting to be discovered!
                  </p>
                </div>
              )}
              
              <button
                onClick={() => setSelectedTimelineItem(null)}
                className="btn btn-primary mt-6"
              >
                Got it! <Sparkles size={16} className="inline" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fun Facts Modal */}
      <AnimatePresence>
        {showFunFacts && (
          <motion.div
            className="modal-overlay"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setShowFunFacts(false)}
          >
            <motion.div
              className="modal-content max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="heading-sm mb-6 text-center">
                Fun Facts About Me 🎉
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioData.about.funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    className="card bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-l-4 border-primary-cyan"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="text-primary-text">
                      <span className="text-primary-cyan mr-2">•</span>
                      {fact}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowFunFacts(false)}
                  className="btn btn-primary"
                >
                  Awesome! <Rocket size={16} className="inline" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryAbout;
