import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { usePortfolio } from '../../context/PortfolioContext';

const LandingPage = ({ isRecruiterMode, setIsRecruiterMode }) => {
  const navigate = useNavigate();
  const { portfolioData, setCurrentSection, setMode } = usePortfolio();
  const [showControls, setShowControls] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    // Default to full-stack developer resume
    const link = document.createElement('a');
    link.href = '/resumes/Vidit Kulsh CV Full Stack.pdf';
    link.download = 'Vidit_Kulshrestha_FullStack_Resume.pdf';
    link.click();
  };

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
      
      {/* Subtle Particle Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
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

      {/* Top Navigation */}
      <motion.div
        className="absolute top-8 right-8 flex items-center gap-4 z-20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.button
          onClick={handleRecruiterMode}
          className="px-6 py-2 rounded-full backdrop-blur-md border bg-glassmorphism-bg text-primary-silver border-glassmorphism-border font-medium transition-all duration-300 hover:scale-105 hover:bg-gradient-accent hover:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Recruiter Mode
        </motion.button>

        <motion.button
          onClick={handleResumeDownload}
          className="px-6 py-2 rounded-full bg-glassmorphism-bg backdrop-blur-md border border-glassmorphism-border text-primary-silver font-medium transition-all duration-300 hover:scale-105 hover:bg-gradient-accent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Resume
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {/* Name with Elegant Typography */}
          <motion.h1
            className="text-6xl md:text-8xl font-dm-serif mb-6 text-white tracking-wide"
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
          
          {/* Role with Professional Styling */}
          <motion.div
            className="relative mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-4xl font-playfair text-primary-silver font-light tracking-wide">
              {portfolioData.personal.title}
            </h2>
            <div className="absolute inset-0 bg-gradient-accent opacity-10 blur-xl" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-lg md:text-xl text-primary-silver/90 max-w-3xl mx-auto font-inter leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {portfolioData.personal.tagline}
          </motion.p>
        </motion.div>

        {/* Short Introduction */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="text-center mb-16 max-w-4xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="text-base md:text-lg text-primary-silver/80 font-inter leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {portfolioData.personal.shortIntro}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Buttons */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="flex flex-col md:flex-row gap-6 items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
                          {/* Story Mode Button */}
                          <motion.button
                              onClick={handleStoryMode}
                              className="group relative px-8 py-4 bg-gradient-secondary rounded-full text-white font-medium text-lg min-w-[200px] overflow-hidden"
                              whileHover={{
                                  scale: 1.05,
                                  boxShadow: "0 20px 40px rgba(92, 44, 111, 0.3)"
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

              {/* Explore Portfolio Button */}
              <motion.button
                onClick={handleExploreMode}
                className="group relative px-8 py-4 bg-gradient-accent rounded-full text-white font-medium text-lg min-w-[200px] overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(15, 118, 110, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.5 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Portfolio
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gradient-teal to-gradient-indigo opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              {/* Download Resume Button */}
              <motion.button
                onClick={handleResumeDownload}
                className="px-8 py-4 border-2 border-primary-silver/30 rounded-full text-primary-silver font-medium text-lg min-w-[200px] backdrop-blur-md bg-glassmorphism-bg hover:bg-gradient-secondary hover:text-white transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(192, 192, 192, 0.8)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                Download Resume
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Elegant Scroll Indicator */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
            >
              <motion.div
                className="flex flex-col items-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary-silver to-transparent opacity-60" />
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
