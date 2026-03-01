import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { MapPin, Calendar, Award, TrendingUp } from 'lucide-react';

const StoryExperience = () => {
  const { portfolioData } = usePortfolio();
  const [selectedExperience, setSelectedExperience] = useState(null);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <motion.div
      className="story-experience min-h-screen flex items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="heading-lg text-gradient mb-4">Professional Experience</h2>
          <p className="text-xl text-primary-text/80 mb-12">
            My journey through the professional landscape...
          </p>
        </motion.div>
        
        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-cyan to-primary-purple rounded-full hidden md:block" />
          
          <div className="space-y-12">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.2 }}
              >
                {/* Experience Card */}
                <div className="flex-1">
                  <motion.div
                    className="card hover:card-neon cursor-pointer group relative"
                    onClick={() => setSelectedExperience(exp)}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Company Logo placeholder */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {exp.company.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-xl font-semibold text-primary-text">{exp.position}</h3>
                        <p className="text-primary-cyan font-medium">{exp.company}</p>
                        <div className="flex items-center gap-4 text-sm text-primary-text/70 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {exp.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            exp.type === 'Full-time' ? 'bg-green-500/20 text-green-300' :
                            exp.type === 'Internship' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-purple-500/20 text-purple-300'
                          }`}>
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-primary-text/80 text-left mb-4 line-clamp-3">{exp.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs bg-primary-purple/20 text-primary-cyan px-2 py-1 rounded-md flex items-center gap-1"
                        >
                          <span>
                            {React.createElement(tech.icon, {
                              size: 14,
                              className: "text-primary-cyan"
                            })}
                          </span>
                          <span>{tech.name}</span>
                        </span>
                      ))}
                      {exp.technologies.length > 4 && (
                        <span className="text-xs text-primary-text/60">+{exp.technologies.length - 4} more</span>
                      )}
                    </div>

                    {/* Impact */}
                    {exp.impact && (
                      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-3 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-sm font-medium text-green-300">Impact</span>
                        </div>
                        <p className="text-sm text-primary-text/80">{exp.impact}</p>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex w-8 h-8 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full items-center justify-center flex-shrink-0 relative z-10">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Detail Modal */}
        <AnimatePresence>
          {selectedExperience && (
            <motion.div
              className="modal-overlay"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedExperience(null)}
            >
              <motion.div
                className="modal-content max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">
                      {selectedExperience.company.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="heading-sm mb-2">{selectedExperience.position}</h2>
                    <p className="text-primary-cyan font-medium text-lg">{selectedExperience.company}</p>
                    <div className="flex items-center gap-4 text-primary-text/70 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {selectedExperience.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedExperience.location}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        selectedExperience.type === 'Full-time' ? 'bg-green-500/20 text-green-300' :
                        selectedExperience.type === 'Internship' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {selectedExperience.type}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-primary-text leading-relaxed mb-6">{selectedExperience.description}</p>

                {/* Responsibilities */}
                {selectedExperience.responsibilities && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary-text mb-3">Key Responsibilities</h3>
                    <ul className="space-y-2">
                      {selectedExperience.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start gap-3 text-primary-text/80">
                          <span className="text-primary-cyan mt-1 flex-shrink-0">•</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-primary-text mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExperience.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-primary-purple/20 text-primary-cyan px-3 py-1 rounded-md flex items-center gap-2"
                      >
                        <span>
                          {React.createElement(tech.icon, {
                            size: 16,
                            className: "text-primary-cyan"
                          })}
                        </span>
                        <span>{tech.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                {selectedExperience.achievements && selectedExperience.achievements.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary-text mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      Key Achievements
                    </h3>
                    <ul className="space-y-2">
                      {selectedExperience.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3 text-primary-text/80">
                          <span className="text-yellow-400 mt-1 flex-shrink-0">★</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Impact */}
                {selectedExperience.impact && (
                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="font-medium text-green-300">Impact & Results</span>
                    </div>
                    <p className="text-primary-text/80">{selectedExperience.impact}</p>
                  </div>
                )}
                
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="btn btn-primary mx-auto block"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StoryExperience;
