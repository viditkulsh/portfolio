import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const Skills = () => {
  const { portfolioData } = usePortfolio();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section
      className="min-h-screen bg-gradient-secondary py-20 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-5xl md:text-6xl font-dm-serif text-white mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full" />
        </motion.div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-3 gap-8">
          {portfolioData.skills.categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="backdrop-blur-md bg-glassmorphism-dark p-8 rounded-2xl border border-glassmorphism-border"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-playfair text-primary-silver mb-6 text-center">
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="relative"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-primary-silver/90 font-inter">
                        {skill.name}
                      </span>
                      <span className="text-gradient-teal font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gradient-charcoal rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
