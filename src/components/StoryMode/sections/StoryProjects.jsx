import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ExternalLink, Github, Eye, Rocket } from 'lucide-react';

const StoryProjects = () => {
  const { portfolioData } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);
  const featuredProjects = portfolioData.projects.filter(project => project.featured);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <motion.div
      className="story-projects min-h-screen flex items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="heading-lg text-gradient mb-4">Featured Projects</h2>
          <p className="text-xl text-primary-text/80 mb-12">
            Bringing ideas to life through code and innovation...
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="card hover:card-neon cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Project Image/Icon */}
              <div className="w-full h-48 bg-gradient-to-br from-primary-purple/20 to-primary-cyan/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                    <div className="text-6xl opacity-50">{project.icon ? React.createElement(project.icon, { size: 48 }) : <Rocket size={48} />}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Project Info */}
              <div className="text-left">
                <h3 className="text-xl font-semibold text-primary-text mb-2">{project.title}</h3>
                <p className="text-primary-text/70 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
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
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-primary-text/60">+{project.technologies.length - 3} more</span>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                    project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-primary-text/60">{project.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="modal-overlay"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="modal-content max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Project Image */}
                  <div className="lg:w-1/2">
                    <div className="w-full h-64 bg-gradient-to-br from-primary-purple/20 to-primary-cyan/20 rounded-lg flex items-center justify-center">
                      {selectedProject.image ? (
                        <img 
                          src={selectedProject.image} 
                          alt={selectedProject.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                          <div className="text-8xl opacity-50">{selectedProject.icon ? React.createElement(selectedProject.icon, { size: 64 }) : <Rocket size={64} />}</div>
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="lg:w-1/2">
                    <h2 className="heading-sm mb-4">{selectedProject.title}</h2>
                    <p className="text-primary-text leading-relaxed mb-6">{selectedProject.description}</p>
                    
                    {/* Technologies */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-primary-text mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
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

                    {/* Project Links */}
                    <div className="flex gap-4 mb-6">
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary flex items-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      )}
                      {selectedProject.showLiveDemo && selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>

                    {/* Project Status and Year */}
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`px-3 py-1 rounded-full ${
                        selectedProject.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                        selectedProject.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {selectedProject.status}
                      </span>
                      <span className="text-primary-text/60">Year: {selectedProject.year}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn btn-primary mt-8 mx-auto block"
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

export default StoryProjects;
