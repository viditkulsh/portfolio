import React from 'react';
import { motion } from 'framer-motion';

const StoryExperience = () => {
  return (
    <motion.div
      className="story-experience min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <h2 className="heading-lg text-gradient mb-4">Professional Experience</h2>
        <p className="text-xl text-primary-text/80">
          My journey through the professional landscape...
        </p>
      </div>
    </motion.div>
  );
};

export default StoryExperience;
