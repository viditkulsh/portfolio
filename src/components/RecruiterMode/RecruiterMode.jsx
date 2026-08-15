import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import GlobalFooter from '../Common/GlobalFooter';
import ResumeSelector from '../../pages/ResumeSelector';
import DarkModeToggle from '../Common/DarkModeToggle';
import {
  ArrowLeft, Download, Mail, Briefcase, Code, GraduationCap, Award,
  TrendingUp, ExternalLink, Github, Calendar, MapPin, Eye, Layers, Star, GitFork, CalendarCheck
} from 'lucide-react';
import socialMediaData from '../../data/sections/socialMediaData';
import { getGitHubStats } from '../../hooks/useGitHubData';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Eye },
  { id: 'technical', label: 'Technical', icon: Code },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'resume', label: 'Resume', icon: Download },
];

const RecruiterMode = () => {
  const navigate = useNavigate();
  const { portfolioData } = usePortfolio();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'CGPA', value: portfolioData.education[0]?.cgpa || 'N/A' },
    { label: 'Projects', value: `${portfolioData.projects.length}+` },
    { label: 'Experience', value: `${portfolioData.experience.length} roles` },
    { label: 'Certifications', value: portfolioData.certificates.length },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Hero card */}
            <div className="bg-ink-800 rounded-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-warm flex items-center justify-center text-white font-bold text-2xl font-display flex-shrink-0">
                  VK
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-bold mb-1">{portfolioData.personal.name}</h2>
                  <p className="text-warm-300 font-medium mb-2">{portfolioData.personal.title}</p>
                  <p className="text-ink-300 text-sm leading-relaxed">{portfolioData.personal.tagline}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={socialMediaData.platforms.calendar.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-warm text-white text-sm font-medium hover:bg-warm-600 transition-colors flex items-center gap-2"
                  >
                    <CalendarCheck size={14} /> Schedule Interview
                  </a>
                  <a
                    href={`mailto:${portfolioData.personal.email}?subject=Interview%20Request`}
                    className="px-4 py-2 rounded-lg border border-ink-200 text-ink-600 text-sm font-medium hover:bg-ink-50 transition-colors flex items-center gap-2"
                  >
                    <Mail size={14} /> Email
                  </a>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div key={s.label} className="card-light text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <p className="text-2xl font-display font-bold text-ink-800">{s.value}</p>
                  <p className="text-xs text-ink-400 font-mono uppercase tracking-wider mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Key strengths */}
            <div>
              <h3 className="heading-sm mb-4">Key Strengths</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: Layers, title: 'Blockchain & Web3', desc: 'Cross-chain interoperability, smart contracts, tokenization architecture' },
                  { icon: Code, title: 'Full Stack Development', desc: 'React, Node.js, MongoDB, modern frameworks for scalable applications' },
                  { icon: TrendingUp, title: 'Research & Innovation', desc: 'DRDO research experience, academic publications, continuous learning' },
                ].map((s, i) => (
                  <motion.div key={s.title} className="card-light" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                    <s.icon size={20} className="text-warm-500 mb-3" />
                    <h4 className="text-sm font-semibold text-ink-800 mb-1">{s.title}</h4>
                    <p className="text-xs text-ink-400">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Short intro */}
            <div className="card-light">
              <h3 className="heading-sm mb-3">About</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{portfolioData.about.introduction}</p>
            </div>
          </div>
        );

      case 'technical':
        return (
          <div className="space-y-8">
            <h3 className="heading-md">Technical Skills</h3>
            {portfolioData.skills.categories.map((cat) => (
              <div key={cat.name} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <h4 className="text-sm font-semibold text-ink-700">{cat.name}</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cat.skills.map((s) => (
                    <div key={s.name} className="card-light flex items-center gap-2 !p-3">
                      {s.icon && React.createElement(s.icon, { size: 14, className: 'text-ink-400' })}
                      <span className="text-sm text-ink-700">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h3 className="heading-md mb-4">Featured Projects</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {portfolioData.projects.filter(p => p.featured).map((p) => (
                  <div key={p.id} className="card-light">
                    <h4 className="text-sm font-semibold text-ink-800 mb-1">{p.title}</h4>
                    <p className="text-xs text-ink-400 mb-2">{p.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {p.technologies.slice(0, 4).map((t, j) => <span key={j} className="tag text-[0.6rem]">{t.name}</span>)}
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
                    <div className="flex gap-2">
                      {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-ink-400 hover:text-warm-500 flex items-center gap-1"><Github size={12} /> Code</a>}
                      {p.showLiveDemo && p.liveUrl && p.liveUrl !== '#' && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-ink-400 hover:text-warm-500 flex items-center gap-1"><ExternalLink size={12} /> Demo</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <h3 className="heading-md">Professional Experience</h3>
            {portfolioData.experience.map((exp, i) => (
              <motion.div key={exp.id} className="card-light" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-ink-800 flex items-center justify-center text-white font-bold flex-shrink-0">{exp.company.charAt(0)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-ink-800">{exp.position}</h4>
                        <p className="text-sm text-warm-600">{exp.company}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${exp.type === 'Full-time' ? 'bg-green-50 text-green-600' : exp.type === 'Internship' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{exp.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-ink-400 mt-1">
                      <span className="flex items-center gap-1"><Calendar size={12} />{exp.duration}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} />{exp.location}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-ink-500 mb-3">{exp.description}</p>
                {exp.responsibilities && (
                  <ul className="space-y-1 mb-3">
                    {exp.responsibilities.map((r, j) => <li key={j} className="text-xs text-ink-400 flex items-start gap-2"><span className="text-warm-500">→</span>{r}</li>)}
                  </ul>
                )}
                <div className="flex flex-wrap gap-1 mb-3">
                  {exp.technologies.map((t, j) => <span key={j} className="tag text-[0.6rem]">{t.name}</span>)}
                </div>
                {exp.impact && (
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                    <p className="text-xs text-green-700"><TrendingUp size={12} className="inline mr-1" /><strong>Impact:</strong> {exp.impact}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <h3 className="heading-md">Education</h3>
            {portfolioData.education.map((edu) => (
              <div key={edu.id} className="card-light">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-warm-50 flex items-center justify-center text-2xl">🎓</div>
                  <div>
                    <h4 className="font-semibold text-ink-800">{edu.degree}</h4>
                    <p className="text-sm text-ink-400">{edu.institution} · {edu.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Award size={16} className="text-warm-500" />
                  <span className="text-sm text-ink-600">CGPA: <strong>{edu.cgpa}</strong></span>
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
                      {edu.achievements.map((a, j) => <li key={j} className="text-xs text-ink-500 flex items-start gap-2"><Award size={12} className="text-warm-500 mt-0.5" />{a}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            <div>
              <h3 className="heading-md mb-4">Certifications</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {portfolioData.certificates.map((cert) => (
                  <div key={cert.id} className="card-light !p-4">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{cert.icon}</span>
                      <div>
                        <h5 className="text-xs font-semibold text-ink-800">{cert.title}</h5>
                        <p className="text-[0.65rem] text-ink-400">{cert.issuer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'resume':
        return <ResumeSelector onBack={() => setActiveTab('overview')} onViewPortfolio={() => navigate('/')} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-[#0F0F0F] transition-colors duration-300">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-[rgba(15,15,15,0.9)] backdrop-blur-md border-b border-ink-100 dark:border-[#2D2D2D] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-ink-400 hover:text-ink-600 dark:hover:text-[#FAF6F0] transition-colors">
            <ArrowLeft size={16} /> <span className="text-sm">Home</span>
          </button>
          <span className="text-sm font-display font-semibold text-ink-700 dark:text-[#E8E8E8]">Recruiter View</span>
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <a
              href={socialMediaData.platforms.calendar.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg bg-warm text-white hover:bg-warm-600 transition-colors flex items-center gap-1.5"
            >
              <CalendarCheck size={12} /> Schedule Interview
            </a>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="fixed top-14 left-0 right-0 z-30 bg-white/80 dark:bg-[rgba(15,15,15,0.85)] backdrop-blur-md border-b border-ink-100 dark:border-[#2D2D2D] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 flex overflow-x-auto no-scrollbar">
          {tabs.map(t => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${active ? 'border-warm text-warm-600 font-medium' : 'border-transparent text-ink-400 hover:text-ink-600 dark:hover:text-[#FAF6F0]'
                  }`}>
                <Icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="pt-28 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }}>
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="max-w-6xl mx-auto mt-16">
          <GlobalFooter />
        </div>
      </div>
    </div>
  );
};

export default RecruiterMode;
