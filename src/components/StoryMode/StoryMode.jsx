import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { usePortfolio } from '../../context/PortfolioContext';
import StoryAbout from './sections/StoryAbout';
import StoryEducation from './sections/StoryEducation';
import StorySkills from './sections/StorySkills';
import StoryProjects from './sections/StoryProjects';
import StoryExperience from './sections/StoryExperience';
import StoryCertificates from './sections/StoryCertificates';
import StoryActivities from './sections/StoryActivities';
import StoryFinale from './sections/StoryFinale';

const StoryMode = ({ isRecruiterMode }) => {
  const navigate = useNavigate();
  const [currentStory, setCurrentStory] = useState(0);
  const [aiSpeaking, setAiSpeaking] = useState(false);

  const storySteps = [
    { 
      component: StoryAbout, 
      title: 'About Me', 
      description: 'Let me tell you my story...',
      duration: 25000 // 25 seconds
    },
    { 
      component: StoryEducation, 
      title: 'Education', 
      description: 'My academic journey through the digital realm',
      duration: 25000
    },
    { 
      component: StorySkills, 
      title: 'Skills', 
      description: 'The tools and technologies in my arsenal',
      duration: 25000
    },
    { 
      component: StoryProjects, 
      title: 'Projects', 
      description: 'Bringing ideas to life through code',
      duration: 25000
    },
    { 
      component: StoryExperience, 
      title: 'Experience', 
      description: 'My professional adventures and lessons learned',
      duration: 25000
    },
    { 
      component: StoryCertificates, 
      title: 'Certificates', 
      description: 'Validating expertise through continuous learning',
      duration: 25000
    },
    { 
      component: StoryActivities, 
      title: 'Activities', 
      description: 'Beyond coding - community, creativity, and growth',
      duration: 25000
    },
    { 
      component: StoryFinale, 
      title: 'The Finale', 
      description: 'Now you know why I\'m the one you need',
      duration: 25000
    }
  ];

  const CurrentStoryComponent = storySteps[currentStory]?.component;

  // AI narration effect
  useEffect(() => {
    setAiSpeaking(true);
    const timer = setTimeout(() => setAiSpeaking(false), 3000);
    return () => clearTimeout(timer);
  }, [currentStory]);

  // Auto-advance (optional)
  useEffect(() => {
    if (!isRecruiterMode) {
      const timer = setTimeout(() => {
        if (currentStory < storySteps.length - 1) {
          setCurrentStory(prev => prev + 1);
        }
      }, storySteps[currentStory]?.duration || 30000);

      return () => clearTimeout(timer);
    }
  }, [currentStory, isRecruiterMode, storySteps]);

  const handleNext = () => {
    if (currentStory < storySteps.length - 1) {
      setCurrentStory(prev => prev + 1);
    } else {
      // Story completed, navigate to finale or home
      navigate('/');
    }
  };

  const handlePrevious = () => {
    if (currentStory > 0) {
      setCurrentStory(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    navigate('/explore');
  };

  const handleHome = () => {
    navigate('/');
  };

  const progressPercentage = ((currentStory + 1) / storySteps.length) * 100;

  return (
    <motion.div
      className="story-mode min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-2 bg-gray-800/50 backdrop-blur-md z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Navigation Controls - Improved Layout */}
      <div className="fixed top-6 left-6 right-6 flex justify-between items-center z-40">
        {/* Left Controls */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={handleHome}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-blue-200 hover:text-white hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">🏠</span>
            <span className="font-medium hidden md:inline">Home</span>
          </motion.button>
          
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="text-blue-200 text-sm font-medium">
              {currentStory + 1} of {storySteps.length}
            </span>
          </div>
        </div>

        {/* Center Title - Better positioned */}
        <motion.div
          className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 text-center max-w-md"
          key={currentStory}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg md:text-xl font-semibold text-white mb-1">
            {storySteps[currentStory]?.title}
          </h2>
          <p className="text-sm text-blue-200 hidden md:block">
            {storySteps[currentStory]?.description}
          </p>
        </motion.div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={handleSkip}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-blue-200 hover:text-white hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">⏭️</span>
            <span className="font-medium hidden md:inline">Skip Tour</span>
          </motion.button>
        </div>
      </div>

      {/* AI Avatar - Better positioned */}
      <div className="fixed left-6 bottom-24 w-24 h-24 md:w-32 md:h-32 z-30">
        <motion.div
          className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20"
          animate={{
            scale: aiSpeaking ? 1.1 : 1,
            boxShadow: aiSpeaking ? "0 0 30px rgba(59, 130, 246, 0.5)" : "0 0 20px rgba(0, 0, 0, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-3xl md:text-4xl">🤖</span>
        </motion.div>
        {aiSpeaking && (
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              {isRecruiterMode ? 'Professional Mode' : 'Speaking...'}
            </div>
          </motion.div>
        )}
      </div>

      {/* Main Content Area - Better layout */}
      <div className="pt-24 pb-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="min-h-[calc(100vh-200px)]"
            >
              {CurrentStoryComponent && (
                <CurrentStoryComponent 
                  isRecruiterMode={isRecruiterMode}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  stepData={storySteps[currentStory]}
                  currentStep={currentStory}
                  totalSteps={storySteps.length}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows - Better positioned and styled */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-30">
        <motion.button
          onClick={handlePrevious}
          disabled={currentStory === 0}
          className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl">⬅️</span>
        </motion.button>

        {/* Step Indicators - Improved design */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          {storySteps.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentStory(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStory
                  ? 'bg-blue-400 scale-125 shadow-lg'
                  : index < currentStory
                  ? 'bg-purple-400'
                  : 'bg-gray-500'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          disabled={currentStory === storySteps.length - 1}
          className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl">➡️</span>
        </motion.button>
      </div>

      {/* Auto-advance indicator - Better positioned */}
      {!isRecruiterMode && currentStory < storySteps.length - 1 && (
        <motion.div
          className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm text-blue-200 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          Auto-advancing in {Math.ceil((storySteps[currentStory]?.duration || 25000) / 1000)}s
        </motion.div>
      )}
    </motion.div>
  );
};

export default StoryMode;
