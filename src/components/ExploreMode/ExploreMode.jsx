import React, { useState } from 'react'; // Removed unused useEffect import
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

const ExploreMode = ({ isRecruiterMode }) => {
    const navigate = useNavigate();
    const { portfolioData } = usePortfolio();
    const [activeSection, setActiveSection] = useState('about');
    const [showSidebar, setShowSidebar] = useState(true);

    const sections = {
        about: { title: 'About Me', icon: '👨‍💻', color: 'from-blue-500 to-cyan-500' },
        education: { title: 'Education', icon: '🎓', color: 'from-purple-500 to-pink-500' },
        skills: { title: 'Skills', icon: '⚡', color: 'from-green-500 to-teal-500' },
        projects: { title: 'Projects', icon: '🚀', color: 'from-orange-500 to-red-500' },
        experience: { title: 'Experience', icon: '💼', color: 'from-indigo-500 to-purple-500' },
        certificates: { title: 'Certificates', icon: '🏆', color: 'from-yellow-500 to-orange-500' },
        contact: { title: 'Contact', icon: '📧', color: 'from-pink-500 to-rose-500' }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'about':
                return (
                    <div className="space-y-8">
                        <h2 className="text-4xl font-playfair text-white mb-6">About Me</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold text-blue-200 mb-4">Personal Overview</h3>
                                
                                {/* Profile Photo */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-cyan/30">
                                        <img 
                                            src={portfolioData.personal.profileImage}
                                            alt={portfolioData.personal.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM0Qjc2ODgiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIyMCIgeT0iMjAiPgo8cGF0aCBkPSJNMTIgMTJDMTQuNDg1MyAxMiAxNi41IDkuOTg1MjggMTYuNSA3LjVDMTYuNSA1LjAxNDcyIDE0LjQ4NTMgMyAxMiAzQzkuNTE0NzIgMyA3LjUgNS4wMTQ3MiA3LjUgNy41QzcuNSA5Ljk4NTI4IDkuNTE0NzIgMTIgMTIgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMTQuNUM3LjAzMTI1IDE0LjUgMyAxOC41MzEyIDMgMjMuNVYyNEg5SDE1SDIxVjIzLjVDMjEgMTguNTMxMiAxNi45Njg4IDE0LjUgMTIgMTQuNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K';
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">{portfolioData.personal.name}</h4>
                                        <p className="text-blue-300 text-sm">{portfolioData.personal.title}</p>
                                        <p className="text-blue-400 text-xs">{portfolioData.personal.location}</p>
                                    </div>
                                </div>
                                
                                <p className="text-white/90 leading-relaxed">{portfolioData.about.bio}</p>
                                
                                {/* Personal Quote */}
                                <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border-l-4 border-primary-cyan">
                                    <p className="text-primary-cyan italic">"{portfolioData.personal.quote}"</p>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold text-blue-200 mb-4">Fun Facts</h3>
                                <ul className="space-y-3">
                                    {portfolioData.about.funFacts.map((fact, index) => (
                                        <li key={index} className="flex items-start gap-3 text-white/90">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span>{fact}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                );

            case 'education':
                return (
                    <div className="space-y-8">
                        <h2 className="text-4xl font-playfair text-white mb-6">Education</h2>
                        <div className="space-y-6">
                            {portfolioData.education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                                            <p className="text-blue-200">{edu.institution}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-green-400 font-semibold">{edu.grade}</p>
                                            <p className="text-blue-300 text-sm">{edu.year}</p>
                                        </div>
                                    </div>
                                    <p className="text-white/80">{edu.description}</p>
                                    {edu.achievements && (
                                        <div className="mt-4">
                                            <h4 className="text-blue-200 font-medium mb-2">Key Achievements:</h4>
                                            <ul className="space-y-1">
                                                {edu.achievements.map((achievement, i) => (
                                                    <li key={i} className="text-white/80 text-sm flex items-start gap-2">
                                                        <span className="text-green-400 mt-1">✓</span>
                                                        <span>{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'skills':
                return (
                    <div className="space-y-8">
                        <h2 className="text-4xl font-playfair text-white mb-6">Skills & Technologies</h2>
                        <div className="space-y-8">
                            {portfolioData.skills.categories.map((category, index) => (
                                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                    <h3 className="text-xl font-semibold text-blue-200 mb-6">{category.name}</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {category.skills.map((skill, skillIndex) => (
                                            <motion.div
                                                key={skillIndex}
                                                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg border border-blue-500/30"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg">{skill.icon || '⚡'}</span>
                                                        <span className="text-white font-medium">{skill.name}</span>
                                                    </div>
                                                    <span className="text-blue-300 text-sm">{skill.level}%</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-2">
                                                    <motion.div
                                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${skill.level}%` }}
                                                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'projects':
                return (
                    <div className="space-y-8">
                        <h2 className="text-4xl font-playfair text-white mb-6">Featured Projects</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {portfolioData.projects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                                        <span className="text-blue-300 text-sm">{project.year}</span>
                                    </div>
                                    <p className="text-white/80 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm border border-blue-500/30"
                                            >
                                                <span>{tech.icon || '🔧'}</span>
                                                <span>{tech.name || tech}</span>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                GitHub
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-400 hover:text-green-300 transition-colors"
                                            >
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'experience':
            return (
            <div className="space-y-8">
                <h2 className="text-4xl font-playfair text-white mb-6">Professional Experience</h2>
                <div className="space-y-6">
                    {portfolioData.experience.map((exp, index) => (
                  <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                      whileHover={{ scale: 1.02 }}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div>
                              <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                              <p className="text-blue-200">{exp.company}</p>
                          </div>
                          <p className="text-blue-300 text-sm">{exp.duration}</p>
                      </div>
                      <p className="text-white/80 mb-4">{exp.description}</p>
                      {exp.responsibilities && (
                          <div className="space-y-2">
                              <h4 className="text-blue-200 font-medium">Key Responsibilities:</h4>
                              <ul className="space-y-1">
                                  {exp.responsibilities.map((resp, i) => (
                                      <li key={i} className="text-white/80 text-sm flex items-start gap-2">
                                          <span className="text-green-400 mt-1">•</span>
                                          <span>{resp}</span>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      )}
                  </motion.div>
              ))}
                        </div>
                    </div>
                );

            case 'certificates':
                return (
                    <div className="space-y-8">
                        <h2 className="text-4xl font-playfair text-white mb-6">Certificates & Achievements</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {portfolioData.certificates.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                                    whileHover={{ y: -5 }}
                                >
                                    <h3 className="text-lg font-semibold text-white mb-2">{cert.title}</h3>
                                    <p className="text-blue-200 mb-2">{cert.issuer}</p>
                                    <p className="text-blue-300 text-sm mb-4">{cert.year}</p>
                                    <p className="text-white/80 text-sm">{cert.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'contact':
                return (
                    <div className="space-y-8">
                        <h2 className="text-4xl font-playfair text-white mb-6">Get In Touch</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold text-blue-200 mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-blue-400">📧</span>
                                        <span className="text-white">{portfolioData.personal.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-blue-400">📱</span>
                                        <span className="text-white">{portfolioData.personal.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-blue-400">📍</span>
                                        <span className="text-white">{portfolioData.personal.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold text-blue-200 mb-4">Social Links</h3>
                                <div className="space-y-3">
                                    {Object.entries(portfolioData.personal.social).map(([platform, url]) => {
                                        const platformData = portfolioData.socialMedia?.platforms?.[platform];
                                        return (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-white/5"
                                            >
                                                <span className="text-xl">{platformData?.icon || '🔗'}</span>
                                                <div>
                                                    <span className="capitalize font-medium">{platformData?.name || platform}</span>
                                                    {platformData?.description && (
                                                        <p className="text-xs text-blue-300">{platformData.description}</p>
                                                    )}
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Section not found</div>;
        }
    };

    return (
        <motion.div
            className="explore-mode min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
          {/* Top Navigation */}
          <div className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md border-b border-white/10 z-50">
              <div className="flex justify-between items-center px-6 py-4">
                  <motion.button
                      onClick={handleBackToHome}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-blue-200 hover:text-white hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                  >
                      <span className="text-lg">←</span>
                      <span className="font-medium">Back to Home</span>
                  </motion.button>

                  <h1 className="text-2xl font-playfair text-white">Portfolio Explorer</h1>

                  <motion.button
                      onClick={() => setShowSidebar(!showSidebar)}
                      className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-blue-200 hover:text-white hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                      {showSidebar ? 'Hide Menu' : 'Show Menu'}
                  </motion.button>
              </div>
          </div>

          <div className="flex pt-20">
              {/* Sidebar Navigation */}
              <AnimatePresence>
                  {showSidebar && (
                      <motion.div
                          className="fixed left-0 top-20 bottom-0 w-80 bg-black/30 backdrop-blur-md border-r border-white/10 z-40 overflow-y-auto"
                          initial={{ x: -320 }}
                          animate={{ x: 0 }}
                          exit={{ x: -320 }}
                          transition={{ duration: 0.3 }}
                      >
                          <div className="p-6">
                              <h3 className="text-lg font-semibold text-white mb-6">Navigation</h3>
                              <div className="space-y-3">
                                  {Object.entries(sections).map(([key, section]) => (
                                      <motion.button
                                          key={key}
                                          onClick={() => setActiveSection(key)}
                                          className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${activeSection === key
                                                  ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                                                  : 'bg-white/5 text-blue-200 hover:bg-white/10'
                                              }`}
                                          whileHover={{ scale: 1.02, x: 5 }}
                                          whileTap={{ scale: 0.98 }}
                                      >
                                          <span className="text-xl">{section.icon}</span>
                                          <span className="font-medium">{section.title}</span>
                                      </motion.button>
                                  ))}
                              </div>
                          </div>
                      </motion.div>
                  )}
              </AnimatePresence>

              {/* Main Content */}
              <div className={`flex-1 p-8 transition-all duration-300 ${showSidebar ? 'ml-80' : 'ml-0'}`}>
                  <AnimatePresence mode="wait">
                      <motion.div
                          key={activeSection}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                      >
                          {renderSectionContent()}
                      </motion.div>
                  </AnimatePresence>
              </div>
      </div>
    </motion.div>
  );
};

export default ExploreMode;
