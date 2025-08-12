import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingStages = [
    { progress: 20, text: 'Loading 3D assets...' },
    { progress: 40, text: 'Preparing portfolio data...' },
    { progress: 60, text: 'Setting up AI assistant...' },
    { progress: 80, text: 'Optimizing experience...' },
    { progress: 100, text: 'Welcome to the future!' }
  ];

  useEffect(() => {
    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < loadingStages.length) {
        setProgress(loadingStages[currentStage].progress);
        setLoadingText(loadingStages[currentStage].text);
        currentStage++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="loading-screen fixed inset-0 bg-primary-dark flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Logo */}
      <motion.div
        className="mb-12"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.h1
          className="text-6xl font-bold text-gradient"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          VK
        </motion.h1>
      </motion.div>

      {/* Loading Bar */}
      <div className="w-80 mb-8">
        <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-cyan to-primary-purple"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Progress Text */}
        <div className="flex justify-between text-sm text-primary-text/70 mt-2">
          <span>{progress}%</span>
          <span>Loading...</span>
        </div>
      </div>

      {/* Loading Text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={loadingText}
          className="text-primary-text/80 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.p>
      </AnimatePresence>

      {/* Animated Dots */}
      <div className="flex space-x-2 mt-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary-cyan rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Particle Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-purple rounded-full opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
