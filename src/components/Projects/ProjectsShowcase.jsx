import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const Projects = () => {
  const { portfolioData } = usePortfolio();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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
      className="min-h-screen bg-gradient-accent py-20 px-4"
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
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-secondary mx-auto rounded-full" />
          <p className="text-lg text-white/80 font-inter mt-6 max-w-2xl mx-auto">
            Showcasing innovative solutions at the intersection of web and blockchain technology
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="backdrop-blur-md bg-glassmorphism-dark rounded-2xl border border-glassmorphism-border overflow-hidden group"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -10
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Project Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-gradient-deep-blue to-gradient-violet relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-gradient-accent text-white text-sm rounded-full font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-playfair text-white group-hover:text-gradient-teal transition-colors">
                    {project.title}
                  </h3>
                  {project.status && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'Active Research' 
                        ? 'bg-gradient-accent text-white' 
                        : 'bg-primary-silver/20 text-primary-silver'
                    }`}>
                      {project.status}
                    </span>
                  )}
                </div>

                <p className="text-primary-silver/90 font-inter mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-gradient-secondary/20 text-primary-silver px-2 py-1 rounded border border-primary-silver/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Collaborators */}
                {project.collaborators && (
                  <div className="mb-4">
                    <span className="text-sm text-primary-silver/70 font-inter">
                      In collaboration with: {project.collaborators.join(', ')}
                    </span>
                  </div>
                )}

                {/* Highlights */}
                {project.highlights && (
                  <div className="space-y-2 mb-4">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-gradient-teal rounded-full" />
                        <span className="text-sm text-primary-silver/80 font-inter">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      className="flex-1 py-2 px-4 bg-gradient-accent text-white text-center rounded-lg font-medium transition-all hover:bg-gradient-secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Code
                    </motion.a>
                  )}
                  <motion.button
                    className="flex-1 py-2 px-4 border border-primary-silver/30 text-primary-silver text-center rounded-lg font-medium transition-all hover:bg-primary-silver/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          variants={itemVariants}
        >
          <motion.div
            className="backdrop-blur-md bg-glassmorphism-dark p-8 rounded-2xl border border-glassmorphism-border max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-playfair text-white mb-4">
              Interested in Collaboration?
            </h3>
            <p className="text-primary-silver/90 font-inter mb-6">
              I'm always excited to work on innovative projects that push the boundaries of technology.
            </p>
            <motion.button
              className="px-8 py-3 bg-gradient-secondary text-white rounded-full font-medium transition-all hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
