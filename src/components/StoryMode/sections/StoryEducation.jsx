import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { MapPin, Trophy } from 'lucide-react';

const StoryEducation = ({ isRecruiterMode }) => {
  const { portfolioData } = usePortfolio();

  return (
    <div className="story-education space-y-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="heading-lg text-gradient mb-4">Educational Journey</h2>
        <p className="text-xl text-primary-text/80">
          Building the foundation for innovation
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {portfolioData.education.map((edu, index) => (
          <motion.div
            key={edu.id}
            className="card hover:card-neon transition-all duration-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-text">
                  {edu.degree}
                </h3>
                <p className="text-primary-text/70">{edu.field}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-text/70">
                  <span><MapPin size={16} /></span>
                  <span>{edu.institution}</span>
                </div>
                <span className="text-primary-cyan font-semibold">
                  {edu.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-primary-purple"><Trophy size={16} /></span>
                <span className="text-primary-text">
                  CGPA: <strong className="text-primary-cyan">{edu.cgpa}</strong>
                </span>
              </div>

              {edu.achievements && (
                <div className="mt-4">
                  <h4 className="text-primary-text font-semibold mb-2">Achievements:</h4>
                  <ul className="space-y-1">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="text-primary-text/70 text-sm">
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryEducation;
