import React from 'react';
import { motion } from 'framer-motion';

const EasterEgg = ({ onClose }) => {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content max-w-4xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <motion.h1
            className="heading-lg text-gradient mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            🎉 Behind the Scenes
          </motion.h1>
          
          <motion.p
            className="text-xl text-primary-text/80 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            You found the secret! Here's what happened behind the curtain...
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="card"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">☕</span>
                <h3 className="text-lg font-semibold">Development Stats</h3>
              </div>
              <ul className="text-left space-y-2 text-primary-text/70">
                <li>☕ Coffee consumed: 47 cups</li>
                <li>🐛 Bugs fixed: 23 (and counting)</li>
                <li>🎨 Design iterations: 12</li>
                <li>⏰ Hours of coding: 72</li>
              </ul>
            </motion.div>

            <motion.div
              className="card"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💻</span>
                <h3 className="text-lg font-semibold">Fun Facts</h3>
              </div>
              <ul className="text-left space-y-2 text-primary-text/70">
                <li>🚀 First 3D element took 4 hours</li>
                <li>🎭 AI responses: 47 variations</li>
                <li>🎨 Color iterations: 15</li>
                <li>📱 Responsive breakpoints: 8</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg border border-primary-cyan/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h4 className="text-lg font-semibold mb-3">Developer's Note</h4>
            <p className="text-primary-text/80 italic">
              "Building this portfolio was like solving a complex puzzle where every piece 
              had to fit perfectly. The biggest challenge? Making sure the AI assistant 
              doesn't become too sarcastic (it has opinions about my code style) 😄"
            </p>
            <p className="text-primary-cyan text-sm mt-3">- Vidit</p>
          </motion.div>

          <motion.div
            className="flex justify-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <button className="btn btn-secondary flex items-center gap-2">
              <span>🔗</span>
              View Source Code
            </button>
            <button onClick={onClose} className="btn btn-primary">
              Back to Portfolio
            </button>
          </motion.div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
};

export default EasterEgg;
