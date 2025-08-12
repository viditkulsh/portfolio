import React from 'react';
import { motion } from 'framer-motion';

const StorySkills = () => {
  return (
    <motion.div
      className="story-skills min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <h2 className="heading-lg text-gradient mb-4">Skills Galaxy</h2>
        <p className="text-xl text-primary-text/80">
          Exploring the constellation of technologies...
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {['React', 'Node.js', 'Blockchain', 'AI/ML'].map((skill, index) => (
            <motion.div
              key={skill}
              className="card text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-primary-cyan font-semibold">{skill}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StorySkills;
