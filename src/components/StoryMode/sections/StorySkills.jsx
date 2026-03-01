import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';

const StorySkills = () => {
  const { portfolioData } = usePortfolio();
  const topSkills = portfolioData.skills.categories
    .flatMap(category => category.skills)
    .sort((a, b) => b.level - a.level)
    .slice(0, 8);

  return (
    <motion.div
      className="story-skills min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center max-w-6xl mx-auto px-4">
        <h2 className="heading-lg text-gradient mb-4">Skills Galaxy</h2>
        <p className="text-xl text-primary-text/80 mb-8">
          Exploring the constellation of technologies I've mastered...
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {topSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="card text-center hover:card-neon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl mb-3">
                {React.createElement(skill.icon, {
                  size: 32,
                  className: "mx-auto text-primary-cyan"
                })}
              </div>
              <h3 className="text-primary-cyan font-semibold mb-2">{skill.name}</h3>
              <div className="text-sm text-primary-text/70 mb-3">{skill.level}% proficiency</div>
              
              {/* Skill bar */}
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary-cyan to-primary-purple h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                />
              </div>
              
              {skill.projects && skill.projects.length > 0 && (
                <div className="text-xs text-primary-text/60 mt-2">
                  Used in {skill.projects.length} project{skill.projects.length !== 1 ? 's' : ''}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Skill Categories */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.skills.categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="card bg-gradient-to-r from-purple-500/10 to-cyan-500/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
            >
              <div 
                className="w-4 h-4 rounded-full mb-3"
                style={{ backgroundColor: category.color }}
              />
              <h3 className="text-lg font-semibold text-primary-text mb-2">{category.name}</h3>
              <div className="text-sm text-primary-text/70">
                {category.skills.length} skill{category.skills.length !== 1 ? 's' : ''} mastered
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StorySkills;
