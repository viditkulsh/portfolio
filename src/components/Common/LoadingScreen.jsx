import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center">
      <motion.div
        className="font-display text-4xl font-bold text-ink-800 tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        VK
      </motion.div>
      <motion.div
        className="mt-6 w-32 h-0.5 bg-ink-100 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="h-full bg-warm rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
