import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { socialMediaData } from '../../data/sections/socialMediaData';
import GlobalFooter from '../Common/GlobalFooter';
import { User, GraduationCap, Zap, Rocket, Briefcase, Trophy, Mail, Wrench, MapPin, ExternalLink, Github, Eye, Calendar, Award, TrendingUp, Activity } from 'lucide-react';

const ExploreMode = ({ isRecruiterMode }) => {
    const navigate = useNavigate();
    const { portfolioData } = usePortfolio();
    const [activeSection, setActiveSection] = useState('about');
    const [showSidebar, setShowSidebar] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    const [bioExpanded, setBioExpanded] = useState(false);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Auto-hide sidebar on mobile after selection
    useEffect(() => {
        if (windowWidth < 768) {
            setShowSidebar(false);
        } else {
            setShowSidebar(true);
        }
    }, [windowWidth, activeSection]);

    const sections = {
        about: { title: 'About Me', icon: User, color: 'from-blue-500 to-cyan-500' },
        education: { title: 'Education', icon: GraduationCap, color: 'from-purple-500 to-pink-500' },
        skills: { title: 'Skills', icon: Zap, color: 'from-green-500 to-teal-500' },
        projects: { title: 'Projects', icon: Rocket, color: 'from-orange-500 to-red-500' },
        experience: { title: 'Experience', icon: Briefcase, color: 'from-indigo-500 to-purple-500' },
        certificates: { title: 'Certificates', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
        activities: { title: 'Activities', icon: Activity, color: 'from-teal-500 to-green-500' },
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
                                
                                <div className="text-white/90 leading-relaxed">
                                    {bioExpanded ? (
                                        <p className="whitespace-pre-line">{portfolioData.about.bio}</p>
                                    ) : (
                                        <p>{portfolioData.about.bio.substring(0, 400)}...</p>
                                    )}
                                    <button
                                        onClick={() => setBioExpanded(!bioExpanded)}
                                        className="text-blue-400 hover:text-blue-300 text-sm mt-2 font-medium transition-colors"
                                    >
                                        {bioExpanded ? 'Read Less' : 'Read More'}
                                    </button>
                                </div>
                                
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
                    <div className="space-y-6 sm:space-y-8">
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">Projects</h2>
                            <p className="text-base sm:text-lg lg:text-xl text-white/80">
                                Bringing ideas to life through code and innovation...
                            </p>
                        </div>
                        <div className="grid-responsive">
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
                                    {/* Project Image/Icon - Responsive */}
                                    <div className="w-full h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg mb-3 sm:mb-4 flex items-center justify-center relative overflow-hidden">
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div className={`text-4xl sm:text-5xl lg:text-6xl opacity-50 items-center justify-center absolute inset-0 ${project.image ? 'hidden' : 'flex'}`}>{project.icon ? React.createElement(project.icon, { size: windowWidth < 640 ? 32 : windowWidth < 1024 ? 40 : 48 }) : <Rocket size={windowWidth < 640 ? 32 : windowWidth < 1024 ? 40 : 48} />}</div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                    </div>

                                    {/* Project Info - Responsive */}
                                    <div className="text-left">
                                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{project.title}</h3>
                                        <p className="text-white/70 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2">{project.description}</p>

                                        {/* Technologies - Responsive */}
                                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="text-xs bg-purple-500/20 text-cyan-400 px-2 py-1 rounded-md flex items-center gap-1"
                                                >
                                                    <span>
                                                        {React.createElement(tech.icon, {
                                                            size: 12,
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

                                        {/* Status - Responsive */}
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
                <div className="space-y-6 sm:space-y-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair text-white mb-4 sm:mb-6">Professional Experience</h2>
                    <div className="space-y-4 sm:space-y-6">
                    {portfolioData.experience.map((exp, index) => (
                  <motion.div
                      key={index}
                            className="card cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedExperience(exp)}
                  >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-3 sm:mb-4">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm sm:text-lg">
                                            {exp.company.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg sm:text-xl font-semibold text-white">{exp.position}</h3>
                                        <p className="text-blue-200 text-sm sm:text-base">{exp.company}</p>
                                        <p className="text-blue-300 text-xs sm:text-sm">{exp.duration}</p>
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-start">
                                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
                                </div>
                            </div>
                            <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3">{exp.description}</p>
                      {exp.responsibilities && (
                          <div className="space-y-2">
                                    <h4 className="text-blue-200 font-medium text-sm sm:text-base">Key Responsibilities:</h4>
                              <ul className="space-y-1">
                                        {exp.responsibilities.slice(0, 2).map((resp, i) => (
                                            <li key={i} className="text-white/80 text-xs sm:text-sm flex items-start gap-2">
                                          <span className="text-green-400 mt-1">•</span>
                                          <span>{resp}</span>
                                      </li>
                                  ))}
                                        {exp.responsibilities.length > 2 && (
                                            <li className="text-blue-300 text-xs sm:text-sm">
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
                    <div className="space-y-6 sm:space-y-8">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair text-white mb-4 sm:mb-6">Certificates & Achievements</h2>
                        <div className="grid-responsive">
                            {portfolioData.certificates.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    className="card"
                                    whileHover={{ y: -5 }}
                                >
                                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{cert.title}</h3>
                                    <p className="text-blue-200 text-sm sm:text-base mb-2">{cert.issuer}</p>
                                    <p className="text-blue-300 text-xs sm:text-sm mb-3 sm:mb-4">{cert.year}</p>
                                    <p className="text-white/80 text-sm sm:text-base">{cert.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'contact':
                return (
                    <div className="space-y-6 sm:space-y-8">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair text-white mb-4 sm:mb-6">Get In Touch</h2>
                        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                            <div className="space-y-6">
                                <div className="card">
                                    <h3 className="text-lg sm:text-xl font-semibold text-blue-200 mb-3 sm:mb-4">Contact Information</h3>
                                    <div className="space-y-3 sm:space-y-4">
                                        <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-3 hover:text-blue-300 transition-colors">
                                            <span className="text-blue-400"><Mail size={16} /></span>
                                            <span className="text-white text-sm sm:text-base break-all">{portfolioData.personal.email}</span>
                                        </a>
                                        <div className="flex items-center gap-3">
                                            <span className="text-blue-400"><MapPin size={16} /></span>
                                            <span className="text-white text-sm sm:text-base">{portfolioData.personal.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <h3 className="text-lg sm:text-xl font-semibold text-blue-200 mb-3 sm:mb-4">Social Links</h3>
                                    <div className="space-y-2 sm:space-y-3">
                                        {Object.entries(portfolioData.personal.social).map(([platform, url]) => {
                                            const platformData = socialMediaData.platforms[platform];
                                            const IconComponent = platformData?.icon;
                                            return (
                                                <a
                                                    key={platform}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-white/5 min-h-[44px] touch-target"
                                                >
                                                    <span className="text-lg sm:text-xl">
                                                        {IconComponent ? <IconComponent size={windowWidth < 640 ? 18 : 20} /> : '🔗'}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <span className="capitalize font-medium text-sm sm:text-base">{platformData?.name || platform}</span>
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
                            {/* Quick Contact Form */}
                            <div className="card">
                                <h3 className="text-lg sm:text-xl font-semibold text-blue-200 mb-3 sm:mb-4">Send a Quick Message</h3>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.target);
                                        const name = formData.get('name');
                                        const subject = formData.get('subject');
                                        const message = formData.get('message');
                                        window.open(`mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Vidit,\n\nMy name is ${name}.\n\n${message}\n`)}`, '_blank');
                                    }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label htmlFor="contact-name" className="block text-sm text-blue-200 mb-1">Your Name</label>
                                        <input id="contact-name" name="name" type="text" required className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Jane Doe" />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-subject" className="block text-sm text-blue-200 mb-1">Subject</label>
                                        <input id="contact-subject" name="subject" type="text" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Opportunity / Collaboration" />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-message" className="block text-sm text-blue-200 mb-1">Message</label>
                                        <textarea id="contact-message" name="message" required rows={4} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" placeholder="I'd love to discuss..." />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Send via Email
                                    </motion.button>
                                </form>
                            </div>
                        </div>
                    </div>
                );

            case 'activities':
                return (
                    <div className="space-y-6 sm:space-y-8">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair text-white mb-4 sm:mb-6">Activities & Community</h2>
                        <div className="grid-responsive">
                            {portfolioData.activities.map((activity, index) => (
                                <motion.div
                                    key={index}
                                    className="card"
                                    whileHover={{ y: -5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        <span className="text-2xl">{typeof activity.icon === 'string' ? activity.icon : React.createElement(activity.icon, { size: 24, className: 'text-blue-400' })}</span>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-semibold text-white">{activity.title}</h3>
                                            <p className="text-blue-200 text-sm">{activity.event}</p>
                                        </div>
                                    </div>
                                    <p className="text-white/80 text-sm sm:text-base mb-3">{activity.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-blue-300">{activity.date}</span>
                                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full capitalize">{activity.type}</span>
                                    </div>
                                    {activity.stickyNote && (
                                        <div className="mt-3 p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                            <p className="text-yellow-200 text-xs italic">{activity.stickyNote}</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
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
            {/* Responsive Top Navigation */}
          <div className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md border-b border-white/10 z-50">
                <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
                  <motion.button
                      onClick={handleBackToHome}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-blue-200 hover:text-white hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                        aria-label="Back to home page"
                  >
                      <span className="text-lg">←</span>
                        <span className="font-medium hidden sm:inline">Back to Home</span>
                        <span className="font-medium sm:hidden">Back</span>
                  </motion.button>

                    <h1 className="text-lg sm:text-xl lg:text-2xl font-playfair text-white">Portfolio Explorer</h1>

                  <motion.button
                      onClick={() => setShowSidebar(!showSidebar)}
                        className="px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-blue-200 hover:text-white hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                        aria-label={showSidebar ? 'Hide navigation menu' : 'Show navigation menu'}
                        aria-expanded={showSidebar}
                  >
                        <span className="hidden sm:inline">{showSidebar ? 'Hide Menu' : 'Show Menu'}</span>
                        <span className="sm:hidden">☰</span>
                  </motion.button>
              </div>
          </div>

            <div className="flex pt-16 sm:pt-20">
                {/* Responsive Sidebar Navigation */}
              <AnimatePresence>
                  {showSidebar && (
                      <motion.div
                            className="fixed left-0 top-16 sm:top-20 bottom-0 w-full sm:w-80 bg-black/30 backdrop-blur-md border-r border-white/10 z-40 overflow-y-auto"
                          initial={{ x: -320 }}
                          animate={{ x: 0 }}
                          exit={{ x: -320 }}
                          transition={{ duration: 0.3 }}
                      >
                            <div className="p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Navigation</h3>
                                <div className="space-y-2 sm:space-y-3">
                                  {Object.entries(sections).map(([key, section]) => (
                                      <motion.button
                                          key={key}
                                          onClick={() => {
                                              setActiveSection(key);
                                              // Auto-hide sidebar on mobile after selection
                                              if (window.innerWidth < 640) {
                                                  setShowSidebar(false);
                                              }
                                          }}
                                          className={`w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 ${activeSection === key
                                                  ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                                                  : 'bg-white/5 text-blue-200 hover:bg-white/10'
                                              }`}
                                          whileHover={{ scale: 1.02, x: 5 }}
                                          whileTap={{ scale: 0.98 }}
                                          aria-label={`Navigate to ${section.title}`}
                                          aria-current={activeSection === key ? 'page' : undefined}
                                      >
                                          <span className="text-lg sm:text-xl">{React.createElement(section.icon, { size: window.innerWidth < 640 ? 18 : 20 })}</span>
                                          <span className="font-medium text-sm sm:text-base">{section.title}</span>
                                      </motion.button>
                                  ))}
                              </div>
                          </div>
                      </motion.div>
                  )}
              </AnimatePresence>

                {/* Responsive Main Content */}
                <div className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${showSidebar && window.innerWidth >= 640 ? 'sm:ml-80' : 'ml-0'}`}>
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

                    <div className="mt-20">
                        <GlobalFooter />
                    </div>
              </div>
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
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row">
                                {/* Project Image - Responsive */}
                                <div className="w-full lg:w-1/2">
                                    <div className="w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                                        {selectedProject.image ? (
                                            <img
                                                src={selectedProject.image}
                                                alt={selectedProject.title}
                                                className="w-full h-full object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div className={`text-6xl sm:text-7xl lg:text-8xl opacity-50 items-center justify-center ${selectedProject.image ? 'hidden' : 'flex'}`}>{selectedProject.icon ? React.createElement(selectedProject.icon, { size: windowWidth < 640 ? 48 : windowWidth < 1024 ? 56 : 64 }) : <Rocket size={windowWidth < 640 ? 48 : windowWidth < 1024 ? 56 : 64} />}</div>
                                    </div>
                                </div>

                                {/* Project Details - Responsive */}
                                <div className="w-full lg:w-1/2">
                                    <h2 className="text-2xl sm:text-3xl font-playfair text-white mb-3 sm:mb-4">{selectedProject.title}</h2>
                                    <p className="text-white/90 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">{selectedProject.description}</p>

                                    {/* Technologies - Responsive */}
                                    <div className="mb-4 sm:mb-6">
                                        <h3 className="text-base sm:text-lg font-semibold text-blue-200 mb-2 sm:mb-3">Technologies Used</h3>
                                        <div className="flex flex-wrap gap-1 sm:gap-2">
                                            {selectedProject.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-500/20 text-blue-200 px-2 sm:px-3 py-1 rounded-md flex items-center gap-1 sm:gap-2 border border-blue-500/30 text-xs sm:text-sm"
                                                >
                                                    <span>
                                                        {tech.icon ? React.createElement(tech.icon, { size: 14 }) : <Wrench size={14} />}
                                                    </span>
                                                    <span>{tech.name || tech}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Project Links - Responsive */}
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        {selectedProject.githubUrl && (
                                            <a
                                                href={selectedProject.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary touch-target flex items-center justify-center gap-2"
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
                                                className="btn-primary touch-target flex items-center justify-center gap-2"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        )}
                                    </div>

                                    {/* Project Status and Year - Responsive */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                                        {selectedProject.status && (
                                            <span className={`px-2 sm:px-3 py-1 rounded-full w-fit ${selectedProject.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
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
                                className="btn-primary touch-target mt-6 sm:mt-8 mx-auto block"
                                aria-label="Close project details"
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
                        className="modal-overlay"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setSelectedExperience(null)}
                    >
                        <motion.div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Experience Header - Responsive */}
                            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                                    <span className="text-white font-bold text-lg sm:text-xl">
                                        {selectedExperience.company.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-2xl sm:text-3xl font-playfair text-white mb-1 sm:mb-2">{selectedExperience.position}</h2>
                                    <p className="text-blue-200 font-medium text-base sm:text-lg">{selectedExperience.company}</p>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white/70 mt-2 text-sm">
                                        <span className="flex items-center justify-center sm:justify-start gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {selectedExperience.duration}
                                        </span>
                                        {selectedExperience.location && (
                                            <span className="flex items-center justify-center sm:justify-start gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {selectedExperience.location}
                                            </span>
                                        )}
                                        {selectedExperience.type && (
                                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm mx-auto sm:mx-0 w-fit ${selectedExperience.type === 'Full-time' ? 'bg-green-500/20 text-green-300' :
                                                selectedExperience.type === 'Internship' ? 'bg-blue-500/20 text-blue-300' :
                                                    'bg-purple-500/20 text-purple-300'
                                                }`}>
                                                {selectedExperience.type}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <p className="text-white/90 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">{selectedExperience.description}</p>

                            {/* Responsibilities - Responsive */}
                            {selectedExperience.responsibilities && (
                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-base sm:text-lg font-semibold text-blue-200 mb-2 sm:mb-3">Key Responsibilities</h3>
                                    <ul className="space-y-1 sm:space-y-2">
                                        {selectedExperience.responsibilities.map((responsibility, index) => (
                                            <li key={index} className="flex items-start gap-2 sm:gap-3 text-white/80 text-sm sm:text-base">
                                                <span className="text-blue-300 mt-1 flex-shrink-0">•</span>
                                                <span>{responsibility}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Technologies - Responsive */}
                            {selectedExperience.technologies && (
                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-base sm:text-lg font-semibold text-blue-200 mb-2 sm:mb-3">Technologies Used</h3>
                                    <div className="flex flex-wrap gap-1 sm:gap-2">
                                        {selectedExperience.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-500/20 text-blue-200 px-2 sm:px-3 py-1 rounded-md flex items-center gap-1 sm:gap-2 border border-blue-500/30 text-xs sm:text-sm"
                                            >
                                                <span>
                                                    {tech.icon ? React.createElement(tech.icon, { size: 14 }) : <Wrench size={14} />}
                                                </span>
                                                <span>{tech.name || tech}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements - Responsive */}
                            {selectedExperience.achievements && selectedExperience.achievements.length > 0 && (
                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-base sm:text-lg font-semibold text-blue-200 mb-2 sm:mb-3 flex items-center justify-center sm:justify-start gap-2">
                                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                                        Key Achievements
                                    </h3>
                                    <ul className="space-y-1 sm:space-y-2">
                                        {selectedExperience.achievements.map((achievement, index) => (
                                            <li key={index} className="flex items-start gap-2 sm:gap-3 text-white/80 text-sm sm:text-base">
                                                <span className="text-yellow-400 mt-1 flex-shrink-0">★</span>
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Impact - Responsive */}
                            {selectedExperience.impact && (
                                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                                        <span className="font-medium text-green-300 text-sm sm:text-base">Impact & Results</span>
                                    </div>
                                    <p className="text-white/80 text-sm sm:text-base text-center sm:text-left">{selectedExperience.impact}</p>
                                </div>
                            )}

                            <button
                                onClick={() => setSelectedExperience(null)}
                                className="btn-primary touch-target mt-6 sm:mt-8 mx-auto block"
                                aria-label="Close experience details"
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
