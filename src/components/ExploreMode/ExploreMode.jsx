import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { socialMediaData } from '../../data/sections/socialMediaData';
import GlobalFooter from '../Common/GlobalFooter';
import {
  User, GraduationCap, Zap, Rocket, Briefcase, Trophy, Mail, Activity,
  MapPin, ExternalLink, Github, Calendar, Award, TrendingUp,
  ArrowLeft, Menu, X, ChevronRight, Star, GitFork, Clock
} from 'lucide-react';
import { getGitHubStats } from '../../hooks/useGitHubData';

const SectionHeader = ({ title, sub }) => (
  <div className="mb-8">
    <div className="section-label mb-2">{title}</div>
    <h2 className="heading-xl">{title}</h2>
    {sub && <p className="text-ink-400 mt-1">{sub}</p>}
  </div>
);

const ExploreMode = ({ isRecruiterMode }) => {
  const navigate = useNavigate();
  const { portfolioData } = usePortfolio();
  const [activeSection, setActiveSection] = useState('about');
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [bioExpanded, setBioExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setShowSidebar(windowWidth >= 768);
  }, [windowWidth, activeSection]);

  const sections = {
    about: { title: 'About', icon: User },
    education: { title: 'Education', icon: GraduationCap },
    skills: { title: 'Skills', icon: Zap },
    projects: { title: 'Projects', icon: Rocket },
    experience: { title: 'Experience', icon: Briefcase },
    certificates: { title: 'Certificates', icon: Trophy },
    activities: { title: 'Activities', icon: Activity },
    contact: { title: 'Contact', icon: Mail },
  };

  /* ─── Section Renderers ─── */
  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="space-y-6">
            <SectionHeader title="About Me" />
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card-light">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-warm-200 bg-sand-100">
                    <img src={portfolioData.personal.profileImage} alt={portfolioData.personal.name}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.src = ''; e.target.style.display = 'none'; }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink-800">{portfolioData.personal.name}</h3>
                    <p className="text-sm text-warm-600">{portfolioData.personal.title}</p>
                    <p className="text-xs text-ink-400 flex items-center gap-1"><MapPin size={12} />{portfolioData.personal.location}</p>
                  </div>
                </div>
                <div className="text-sm text-ink-500 leading-relaxed">
                  {bioExpanded ? <p className="whitespace-pre-line">{portfolioData.about.bio}</p> : <p>{portfolioData.about.bio.substring(0, 400)}...</p>}
                  <button onClick={() => setBioExpanded(!bioExpanded)} className="text-warm-500 hover:text-warm-600 text-xs mt-2 font-medium">
                    {bioExpanded ? 'Read less' : 'Read more'}
                  </button>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-warm-50 border-l-2 border-warm">
                  <p className="text-warm-600 italic text-sm">"{portfolioData.personal.quote}"</p>
                </div>
              </div>
              <div className="card-light">
                <h3 className="heading-sm mb-4">Fun Facts</h3>
                <ul className="space-y-3">
                  {portfolioData.about.funFacts.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-500"><span className="text-warm-500 mt-0.5">→</span>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Timeline */}
            <div>
              <h3 className="heading-sm mb-4">Timeline</h3>
              <div className="space-y-3">
                {portfolioData.about.timeline.map((t, i) => (
                  <motion.div key={i} className="card-light flex items-start gap-4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${t.isHumorous ? 'bg-warm' : 'bg-ink-800'}`}>
                      {t.year.slice(-2)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-ink-800">{t.title}</h4>
                      <p className="text-xs text-ink-400">{t.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <SectionHeader title="Education" />
            {portfolioData.education.map((edu, i) => (
              <motion.div key={edu.id} className="card-light" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-warm-50 flex items-center justify-center text-2xl">🎓</div>
                  <div>
                    <h3 className="font-semibold text-ink-800">{edu.degree}</h3>
                    <p className="text-sm text-ink-400">{edu.field} · {edu.institution}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
                  <div><span className="text-ink-300">Duration:</span> <span className="text-ink-600">{edu.duration}</span></div>
                  <div><span className="text-ink-300">CGPA:</span> <span className="text-ink-800 font-semibold">{edu.cgpa}</span></div>
                </div>
                {edu.keyCourses && (
                  <div className="mb-4">
                    <p className="text-xs font-mono text-ink-300 mb-2">KEY COURSES</p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.keyCourses.map((c, j) => <span key={j} className="tag text-xs">{c}</span>)}
                    </div>
                  </div>
                )}
                {edu.achievements && (
                  <div>
                    <p className="text-xs font-mono text-ink-300 mb-2">ACHIEVEMENTS</p>
                    <ul className="space-y-1">
                      {edu.achievements.map((a, j) => <li key={j} className="text-sm text-ink-500 flex items-start gap-2"><Award size={13} className="text-warm-500 mt-0.5 flex-shrink-0" />{a}</li>)}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-8">
            <SectionHeader title="Skills" />
            {portfolioData.skills.categories.map((cat, ci) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.1 }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <h3 className="heading-sm">{cat.name}</h3>
                  <span className="text-xs text-ink-300 font-mono">{cat.skills.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s, si) => (
                    <div key={s.name} className="tag group">
                      {s.icon && React.createElement(s.icon, { size: 13, className: 'text-ink-400' })}
                      <span>{s.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <SectionHeader title="Projects" sub={`${portfolioData.projects.length} projects built`} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {portfolioData.projects.map((p, i) => (
                <motion.div key={p.id} className="card-light cursor-pointer group" onClick={() => setSelectedProject(p)}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
                  <div className="w-full h-32 rounded-lg mb-3 overflow-hidden bg-sand-100 flex items-center justify-center">
                    {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : <Rocket size={28} className="text-ink-200" />}
                  </div>
                  <h3 className="text-sm font-semibold text-ink-800 mb-1">{p.title}</h3>
                  <p className="text-xs text-ink-400 line-clamp-2 mb-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {p.technologies.slice(0, 3).map((t, j) => <span key={j} className="text-[0.6rem] px-1.5 py-0.5 rounded bg-ink-50 text-ink-500">{t.name}</span>)}
                  </div>
                  {(() => {
                    const gh = getGitHubStats(p.githubUrl); return gh ? (
                      <div className="flex items-center gap-3 text-[0.6rem] text-ink-400 font-mono mb-2">
                        <span className="flex items-center gap-0.5"><Star size={10} className="text-amber-400" />{gh.stars}</span>
                        <span className="flex items-center gap-0.5"><GitFork size={10} />{gh.forks}</span>
                        {gh.language && <span>{gh.language}</span>}
                      </div>
                    ) : null;
                  })()}
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2 py-0.5 rounded-full ${p.status === 'Completed' ? 'bg-green-50 text-green-600' : p.status === 'In Progress' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>{p.status}</span>
                    <span className="text-ink-300 font-mono">{p.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <SectionHeader title="Experience" />
            {portfolioData.experience.map((exp, i) => (
              <motion.div key={exp.id} className="card-light cursor-pointer" onClick={() => setSelectedExperience(exp)}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ x: 4 }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ink-800 flex items-center justify-center text-white font-bold flex-shrink-0">{exp.company.charAt(0)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-ink-800">{exp.position}</h3>
                        <p className="text-sm text-warm-600">{exp.company}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${exp.type === 'Full-time' ? 'bg-green-50 text-green-600' : exp.type === 'Internship' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{exp.type}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-ink-400 mt-1">
                      <span className="flex items-center gap-1"><Calendar size={12} />{exp.duration}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} />{exp.location}</span>
                    </div>
                    <p className="text-sm text-ink-400 mt-2">{exp.description}</p>
                    {exp.impact && <p className="text-xs text-green-600 mt-2 flex items-center gap-1"><TrendingUp size={12} />{exp.impact.slice(0, 100)}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'certificates':
        return (
          <div className="space-y-6">
            <SectionHeader title="Certificates" sub={`${portfolioData.certificates.length} certifications earned`} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioData.certificates.map((cert, i) => (
                <motion.div key={cert.id} className="card-light" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">{cert.icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-ink-800">{cert.title}</h3>
                      <p className="text-xs text-ink-400">{cert.issuer}</p>
                    </div>
                  </div>
                  {cert.date && <p className="text-xs text-ink-300 flex items-center gap-1"><Calendar size={11} />{cert.date}</p>}
                  {cert.verificationUrl && <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-warm-500 hover:text-warm-600 flex items-center gap-1 mt-1">Verify <ExternalLink size={11} /></a>}
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'activities':
        return (
          <div className="space-y-6">
            <SectionHeader title="Activities" />
            <div className="grid md:grid-cols-2 gap-5">
              {portfolioData.activities.map((a, i) => (
                <motion.div key={a.id} className="card-light" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <h3 className="text-sm font-semibold text-ink-800 mb-1">{a.title}</h3>
                  <p className="text-xs text-warm-600 mb-1">{a.event}</p>
                  <p className="text-xs text-ink-300 mb-2">{a.date}</p>
                  <p className="text-sm text-ink-500">{a.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <SectionHeader title="Get in Touch" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="card-light">
                <h3 className="heading-sm mb-4">Direct Contact</h3>
                <div className="space-y-3 text-sm">
                  <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-2 text-ink-500 hover:text-warm-600 transition-colors">
                    <Mail size={16} className="text-warm-500" /> {portfolioData.personal.email}
                  </a>
                  <p className="flex items-center gap-2 text-ink-500">
                    <MapPin size={16} className="text-warm-500" /> {portfolioData.personal.location}
                  </p>
                </div>
              </div>
              <div className="card-light">
                <h3 className="heading-sm mb-4">Social Profiles</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(socialMediaData.platforms).map((p) => (
                    <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-ink-500 hover:text-warm-600 p-2 rounded-lg hover:bg-warm-50 transition-all">
                      {React.createElement(p.icon, { size: 16 })} {p.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-ink-100">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowSidebar(!showSidebar)} className="md:hidden p-2 rounded-lg hover:bg-ink-50 text-ink-400">
              {showSidebar ? <X size={18} /> : <Menu size={18} />}
            </button>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-ink-400 hover:text-ink-600 transition-colors">
              <ArrowLeft size={16} /> <span className="text-sm font-medium">Home</span>
            </button>
          </div>
          <span className="text-sm font-medium text-ink-600">Explore</span>
          <button onClick={() => navigate('/recruiter')} className="text-xs px-3 py-1.5 rounded-lg bg-ink-800 text-white hover:bg-ink-700 transition-colors">
            Recruiter
          </button>
        </div>
      </div>

      <div className="pt-14 flex">
        {/* Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.aside
              className="fixed md:sticky top-14 left-0 h-[calc(100vh-3.5rem)] w-56 bg-white border-r border-ink-100 z-30 overflow-y-auto"
              initial={{ x: -224 }} animate={{ x: 0 }} exit={{ x: -224 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <nav className="p-3 space-y-0.5">
                {Object.entries(sections).map(([key, s]) => {
                  const Icon = s.icon;
                  const active = activeSection === key;
                  return (
                    <button key={key} onClick={() => { setActiveSection(key); if (windowWidth < 768) setShowSidebar(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${active ? 'bg-warm-50 text-warm-600 font-medium' : 'text-ink-400 hover:bg-ink-50 hover:text-ink-600'
                        }`}>
                      <Icon size={16} /> {s.title}
                      {active && <ChevronRight size={14} className="ml-auto" />}
                    </button>
                  );
                })}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={activeSection} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }}>
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="max-w-5xl mx-auto mt-16">
            <GlobalFooter />
          </div>
        </main>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
            <motion.div className="modal-content max-w-3xl" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-ink-300 hover:text-ink-600"><X size={20} /></button>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="h-48 rounded-xl overflow-hidden bg-sand-100 flex items-center justify-center">
                  {selectedProject.image ? <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" /> : <Rocket size={48} className="text-ink-200" />}
                </div>
                <div>
                  <h3 className="heading-md mb-2">{selectedProject.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-4">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selectedProject.technologies.map((t, j) => <span key={j} className="tag">{React.createElement(t.icon, { size: 12 })} {t.name}</span>)}
                  </div>
                  {(() => {
                    const gh = getGitHubStats(selectedProject.githubUrl); return gh ? (
                      <div className="flex items-center gap-4 text-xs text-ink-400 font-mono mb-4 border-t border-ink-100 pt-3">
                        <span className="flex items-center gap-1"><Star size={12} className="text-amber-400" />{gh.stars} stars</span>
                        <span className="flex items-center gap-1"><GitFork size={12} />{gh.forks} forks</span>
                        {gh.language && <span>{gh.language}</span>}
                        <span className="flex items-center gap-1"><Clock size={12} />{new Date(gh.pushedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                      </div>
                    ) : null;
                  })()}
                  <div className="flex gap-3">
                    {selectedProject.githubUrl && <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm"><Github size={14} /> Code</a>}
                    {selectedProject.showLiveDemo && selectedProject.liveUrl && selectedProject.liveUrl !== '#' && <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm"><ExternalLink size={14} /> Demo</a>}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experience Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedExperience(null)}>
            <motion.div className="modal-content max-w-3xl" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedExperience(null)} className="absolute top-4 right-4 text-ink-300 hover:text-ink-600"><X size={20} /></button>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-ink-800 flex items-center justify-center text-white font-bold text-lg">{selectedExperience.company.charAt(0)}</div>
                <div>
                  <h3 className="heading-md mb-1">{selectedExperience.position}</h3>
                  <p className="text-warm-600 font-medium">{selectedExperience.company}</p>
                  <div className="flex items-center gap-3 text-sm text-ink-400 mt-1">
                    <span className="flex items-center gap-1"><Calendar size={13} />{selectedExperience.duration}</span>
                    <span className="flex items-center gap-1"><MapPin size={13} />{selectedExperience.location}</span>
                  </div>
                </div>
              </div>
              <p className="text-ink-500 leading-relaxed mb-5">{selectedExperience.description}</p>
              {selectedExperience.responsibilities && (
                <div className="mb-5">
                  <p className="text-xs font-mono text-ink-300 uppercase tracking-wider mb-2">Responsibilities</p>
                  <ul className="space-y-1.5">
                    {selectedExperience.responsibilities.map((r, j) => <li key={j} className="text-sm text-ink-500 flex items-start gap-2"><span className="text-warm-500">→</span>{r}</li>)}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedExperience.technologies.map((t, j) => <span key={j} className="tag">{React.createElement(t.icon, { size: 12 })} {t.name}</span>)}
              </div>
              {selectedExperience.impact && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-700"><TrendingUp size={14} className="inline mr-1" /><strong>Impact:</strong> {selectedExperience.impact}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExploreMode;
