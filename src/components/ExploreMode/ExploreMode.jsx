import React, { useState } from 'react'; // Removed unused useEffect import
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { socialMediaData } from '../../data/sections/socialMediaData';
import { User, GraduationCap, Zap, Rocket, Briefcase, Trophy, Mail, Wrench, Smartphone, MapPin, ExternalLink, Github, Eye, Calendar, Award, TrendingUp } from 'lucide-react';

const ExploreMode = ({ isRecruiterMode }) => {
    const navigate = useNavigate();
    const { portfolioData } = usePortfolio();
    const [activeSection, setActiveSection] = useState('about');
    const [showSidebar, setShowSidebar] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedExperience, setSelectedExperience] = useState(null);

    const sections = {
        about: { title: 'About Me', icon: User, color: 'from-blue-500 to-cyan-500' },
        education: { title: 'Education', icon: GraduationCap, color: 'from-purple-500 to-pink-500' },
        skills: { title: 'Skills', icon: Zap, color: 'from-green-500 to-teal-500' },
        projects: { title: 'Projects', icon: Rocket, color: 'from-orange-500 to-red-500' },
        experience: { title: 'Experience', icon: Briefcase, color: 'from-indigo-500 to-purple-500' },
        certificates: { title: 'Certificates', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
        contact: { title: 'Contact', icon: Mail, color: 'from-pink-500 to-rose-500' }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 }
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
                                                        <span className="text-lg">{skill.icon ? React.createElement(skill.icon, { size: 16 }) : <Zap size={16} />}</span>
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
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-playfair bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">Projects</h2>
                            <p className="text-xl text-white/80">
                                Bringing ideas to life through code and innovation...
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {portfolioData.projects.map((project, index) => (
                                <motion.div
                                    key={project.id || index}
                                    className="card hover:card-neon cursor-pointer group relative"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    onClick={() => setSelectedProject(project)}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                >
                                    {/* Project Image/Icon */}
                                    <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
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
                                        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                                        <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.description}</p>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="text-xs bg-purple-500/20 text-cyan-400 px-2 py-1 rounded-md flex items-center gap-1"
                                                >
                                                    <span>
                                                        {React.createElement(tech.icon, {
                                                            size: 14,
                                                            className: "text-cyan-400"
                                                        })}
                                                    </span>
                                                    <span>{tech.name || tech}</span>
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="text-xs text-white/60">+{project.technologies.length - 3} more</span>
                                            )}
                                        </div>

                                        {/* Status */}
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs px-2 py-1 rounded-full ${project.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                                                project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300' :
                                                    'bg-blue-500/20 text-blue-300'
                                                }`}>
                                                {project.status || 'Completed'}
                                            </span>
                                            <span className="text-xs text-white/60">{project.year}</span>
                                        </div>
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
                            className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedExperience(exp)}
                  >
                      <div className="flex justify-between items-start mb-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-lg">
                                            {exp.company.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                                        <p className="text-blue-200">{exp.company}</p>
                                        <p className="text-blue-300 text-sm">{exp.duration}</p>
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Eye className="w-5 h-5 text-blue-300" />
                                </div>
                            </div>
                            <p className="text-white/80 mb-4 line-clamp-3">{exp.description}</p>
                      {exp.responsibilities && (
                          <div className="space-y-2">
                              <h4 className="text-blue-200 font-medium">Key Responsibilities:</h4>
                              <ul className="space-y-1">
                                        {exp.responsibilities.slice(0, 2).map((resp, i) => (
                                      <li key={i} className="text-white/80 text-sm flex items-start gap-2">
                                          <span className="text-green-400 mt-1">•</span>
                                          <span>{resp}</span>
                                      </li>
                                  ))}
                                        {exp.responsibilities.length > 2 && (
                                            <li className="text-blue-300 text-sm">
                                                +{exp.responsibilities.length - 2} more responsibilities...
                                            </li>
                                        )}
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
                                        <span className="text-blue-400"><Mail size={16} /></span>
                                        <span className="text-white">{portfolioData.personal.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-blue-400"><Smartphone size={16} /></span>
                                        <span className="text-white">{portfolioData.personal.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-blue-400"><MapPin size={16} /></span>
                                        <span className="text-white">{portfolioData.personal.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold text-blue-200 mb-4">Social Links</h3>
                                <div className="space-y-3">
                                    {Object.entries(portfolioData.personal.social).map(([platform, url]) => {
                                        const platformData = socialMediaData.platforms[platform];
                                        const IconComponent = platformData?.icon;
                                        return (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-white/5"
                                            >
                                                <span className="text-xl">
                                                    {IconComponent ? <IconComponent size={20} /> : '🔗'}
                                                </span>
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
                                          <span className="text-xl">{React.createElement(section.icon, { size: 20 })}</span>
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

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="bg-gray-900/95 backdrop-blur-md rounded-xl p-8 border border-white/20 max-w-4xl max-h-[90vh] overflow-y-auto w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Project Image */}
                                <div className="lg:w-1/2">
                                    <div className="w-full h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
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
                                    <h2 className="text-3xl font-playfair text-white mb-4">{selectedProject.title}</h2>
                                    <p className="text-white/90 leading-relaxed mb-6">{selectedProject.description}</p>

                                    {/* Technologies */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-blue-200 mb-3">Technologies Used</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-md flex items-center gap-2 border border-blue-500/30"
                                                >
                                                    <span>
                                                        {tech.icon ? React.createElement(tech.icon, { size: 16 }) : <Wrench size={16} />}
                                                    </span>
                                                    <span>{tech.name || tech}</span>
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
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-white rounded-lg border border-gray-600 hover:bg-gray-600/50 transition-colors"
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
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        )}
                                    </div>

                                    {/* Project Status and Year */}
                                    <div className="flex items-center gap-4 text-sm">
                                        {selectedProject.status && (
                                            <span className={`px-3 py-1 rounded-full ${selectedProject.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                                                selectedProject.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300' :
                                                    'bg-blue-500/20 text-blue-300'
                                                }`}>
                                                {selectedProject.status}
                                            </span>
                                        )}
                                        <span className="text-white/60">Year: {selectedProject.year}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedProject(null)}
                                className="mt-8 mx-auto block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Experience Detail Modal */}
            <AnimatePresence>
                {selectedExperience && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setSelectedExperience(null)}
                    >
                        <motion.div
                            className="bg-gray-900/95 backdrop-blur-md rounded-xl p-8 border border-white/20 max-w-4xl max-h-[90vh] overflow-y-auto w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-xl">
                                        {selectedExperience.company.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-playfair text-white mb-2">{selectedExperience.position}</h2>
                                    <p className="text-blue-200 font-medium text-lg">{selectedExperience.company}</p>
                                    <div className="flex items-center gap-4 text-white/70 mt-2">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {selectedExperience.duration}
                                        </span>
                                        {selectedExperience.location && (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {selectedExperience.location}
                                            </span>
                                        )}
                                        {selectedExperience.type && (
                                            <span className={`px-3 py-1 rounded-full text-sm ${selectedExperience.type === 'Full-time' ? 'bg-green-500/20 text-green-300' :
                                                selectedExperience.type === 'Internship' ? 'bg-blue-500/20 text-blue-300' :
                                                    'bg-purple-500/20 text-purple-300'
                                                }`}>
                                                {selectedExperience.type}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <p className="text-white/90 leading-relaxed mb-6">{selectedExperience.description}</p>

                            {/* Responsibilities */}
                            {selectedExperience.responsibilities && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-blue-200 mb-3">Key Responsibilities</h3>
                                    <ul className="space-y-2">
                                        {selectedExperience.responsibilities.map((responsibility, index) => (
                                            <li key={index} className="flex items-start gap-3 text-white/80">
                                                <span className="text-blue-300 mt-1 flex-shrink-0">•</span>
                                                <span>{responsibility}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Technologies */}
                            {selectedExperience.technologies && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-blue-200 mb-3">Technologies Used</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedExperience.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-md flex items-center gap-2 border border-blue-500/30"
                                            >
                                                <span>
                                                    {tech.icon ? React.createElement(tech.icon, { size: 16 }) : <Wrench size={16} />}
                                                </span>
                                                <span>{tech.name || tech}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            {selectedExperience.achievements && selectedExperience.achievements.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-blue-200 mb-3 flex items-center gap-2">
                                        <Award className="w-5 h-5 text-yellow-400" />
                                        Key Achievements
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedExperience.achievements.map((achievement, index) => (
                                            <li key={index} className="flex items-start gap-3 text-white/80">
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
                                    <p className="text-white/80">{selectedExperience.impact}</p>
                                </div>
                            )}

                            <button
                                onClick={() => setSelectedExperience(null)}
                                className="mt-8 mx-auto block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
    </motion.div>
  );
};

export default ExploreMode;
