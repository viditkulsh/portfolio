import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

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
        className="modal-content max-w-3xl"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-ink-300 hover:text-ink-600 transition-colors">
          <X size={20} />
        </button>

        <div className="text-center">
          <motion.div
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-mono bg-warm-50 text-warm-600 border border-warm-200"
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            $ sudo hire vidit
          </motion.div>

          <motion.h2
            className="heading-lg mb-3"
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Behind the Scenes
          </motion.h2>

          <motion.p
            className="text-ink-400 mb-8 text-sm"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            You found the secret! Here's what happened behind the curtain...
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <motion.div
              className="card-light"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">☕</span>
                <h3 className="text-sm font-semibold text-ink-800">Dev Stats</h3>
              </div>
              <ul className="space-y-1.5 text-ink-500 text-sm">
                <li>☕ Coffee consumed: 47 cups</li>
                <li>🐛 Bugs fixed: 23 (and counting)</li>
                <li>🎨 Design iterations: 12</li>
                <li>⏰ Hours of coding: 72</li>
              </ul>
            </motion.div>

            <motion.div
              className="card-light"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💻</span>
                <h3 className="text-sm font-semibold text-ink-800">Fun Facts</h3>
              </div>
              <ul className="space-y-1.5 text-ink-500 text-sm">
                <li>🚀 First animation: 4 hours</li>
                <li>🎭 Component count: 30+</li>
                <li>🎨 Color iterations: 15</li>
                <li>📱 Responsive breakpoints: 8</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="mt-5 card-light border-l-2 !border-l-warm"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h4 className="text-sm font-semibold text-ink-800 mb-2">Developer's Note</h4>
            <p className="text-ink-500 text-sm italic leading-relaxed">
              "Building this portfolio was like solving a complex puzzle where every piece
              had to fit perfectly. Exploring the boundaries of creative web design! 😄"
            </p>
            <p className="text-warm-500 text-xs mt-2 font-mono">— Vidit</p>
          </motion.div>

          <motion.div
            className="flex justify-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <button onClick={onClose} className="btn-primary text-sm">
              Back to Portfolio
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EasterEgg;
