import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { usePortfolio } from '../../context/PortfolioContext';
import ResumeSelector from '../../pages/ResumeSelector';

const LandingPage = ({ isRecruiterMode }) => {
  const navigate = useNavigate();
  const { portfolioData, setCurrentSection, setMode } = usePortfolio();
  const [showControls, setShowControls] = useState(false);
  const [showResumeSelector, setShowResumeSelector] = useState(false);
  // Removed unused 'mounted' state variable

  useEffect(() => {
    // Removed setMounted(true) as it was unused
    const timer = setTimeout(() => setShowControls(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleExploreMode = () => {
    setMode('explore');
    setCurrentSection('about');
    navigate('/explore');
  };

  const handleStoryMode = () => {
    setMode('story');
    setCurrentSection('about');
    navigate('/story');
  };

  const handleRecruiterMode = () => {
    navigate('/recruiter');
  };

  const handleResumeDownload = () => {
    setShowResumeSelector(true);
  };

  const handleBackFromResume = () => {
    setShowResumeSelector(false);
  };

  const handleViewPortfolio = () => {
    setShowResumeSelector(false);
  };

  // Show Resume Selector if requested
  if (showResumeSelector) {
    return (
      <ResumeSelector
        onBack={handleBackFromResume}
        onViewPortfolio={handleViewPortfolio}
      />
    );
  }

  return (
    <motion.div
      className="landing-page min-h-screen relative overflow-hidden bg-gradient-hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      {/* Elegant Gradient Background with Depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        <div className="absolute inset-0 bg-gradient-accent opacity-30" />
        <div className="absolute inset-0 bg-gradient-secondary opacity-20" />
      </div>
      
      {/* Subtle Particle Animation - Reduced for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(window.innerWidth < 768 ? 15 : 30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-silver rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Mobile/Desktop Top Navigation - Updated for better mobile layout */}
      <motion.div
        className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 flex flex-row items-center gap-2 sm:gap-4 z-20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.button
          onClick={handleRecruiterMode}
          className="px-2 sm:px-4 lg:px-6 py-2 text-xs sm:text-base rounded-full backdrop-blur-md border bg-glassmorphism-bg text-primary-silver border-glassmorphism-border font-medium transition-all duration-300 hover:scale-105 hover:bg-gradient-accent hover:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="hidden sm:inline">Recruiter Mode</span>
          <span className="sm:hidden">Recruiter</span>
        </motion.button>

        <motion.button
          onClick={handleResumeDownload}
          className="px-2 sm:px-4 lg:px-6 py-2 text-xs sm:text-base rounded-full bg-glassmorphism-bg backdrop-blur-md border border-glassmorphism-border text-primary-silver font-medium transition-all duration-300 hover:scale-105 hover:bg-gradient-accent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="hidden sm:inline">Download Resume</span>
          <span className="sm:hidden">Resume</span>
        </motion.button>
      </motion.div>

      {/* Main Content - Mobile First - Updated to avoid overlap */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 lg:px-8 pt-20 sm:pt-16">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-8 sm:mb-10 lg:mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {/* Name with Responsive Typography */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-dm-serif mb-4 sm:mb-6 text-white tracking-wide leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-primary-silver via-white to-primary-silver bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {portfolioData.personal.name}
            </motion.span>
          </motion.h1>
          
          {/* Role with Professional Styling - Responsive */}
          <motion.div
            className="relative mb-6 sm:mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-playfair text-primary-silver font-light tracking-wide">
              {portfolioData.personal.title}
            </h2>
            <div className="absolute inset-0 bg-gradient-accent opacity-10 blur-xl" />
          </motion.div>

          {/* Tagline - Responsive */}
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-primary-silver/90 max-w-sm sm:max-w-2xl lg:max-w-3xl mx-auto font-inter leading-relaxed px-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {portfolioData.personal.tagline}
          </motion.p>
        </motion.div>

        {/* Short Introduction - Mobile First */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="text-center mb-10 sm:mb-12 lg:mb-16 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto px-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="text-sm sm:text-base lg:text-lg text-primary-silver/80 font-inter leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {portfolioData.personal.shortIntro}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Buttons - Mobile First Responsive */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center w-full max-w-md sm:max-w-none"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                {/* Story Mode Button - Responsive */}
                <motion.button
                  onClick={handleStoryMode}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 
               bg-gradient-secondary rounded-full text-white 
               font-medium text-base sm:text-lg 
               w-auto sm:min-w-[250px] overflow-hidden"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(92, 44, 111, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Story Mode
                    <motion.span
                      animate={{ rotate: [0, 15, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      📖
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gradient-charcoal to-gradient-silver opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                {/* Explore Portfolio Button - Responsive */}
                <motion.button
                  onClick={handleExploreMode}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 
               bg-gradient-accent rounded-full text-white 
               font-medium text-base sm:text-lg 
               w-auto sm:min-w-[250px] overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(15, 118, 110, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="hidden sm:inline">Explore Portfolio</span>
                    <span className="sm:hidden">Explore</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gradient-teal to-gradient-indigo opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Choose your experience indicator - moved under CTA buttons */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
            >
              <motion.div
                className="flex flex-col items-center"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-primary-silver to-transparent opacity-60" />
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary-silver mt-2"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-xs text-primary-silver/60 mt-3 font-inter tracking-wide">
                  Choose your experience
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Subtle Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gradient-deep-blue/30 pointer-events-none" />
    </motion.div>
  );
};

export default LandingPage;
