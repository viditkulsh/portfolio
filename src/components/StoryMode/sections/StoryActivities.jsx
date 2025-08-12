import React from 'react';
import { motion } from 'framer-motion';

const StoryActivities = () => {
  return (
    <motion.div
      className="story-activities min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <h2 className="heading-lg text-gradient mb-4">Co-curricular Activities</h2>
        <p className="text-xl text-primary-text/80">
          Beyond coding - community and growth...
        </p>
      </div>
    </motion.div>
  );
};

export default StoryActivities;
