import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowRight, Download, BookOpen, Compass, Briefcase } from 'lucide-react';
import ResumeSelector from '../Resume/ResumeSelector';

const LandingPage = () => {
  const navigate = useNavigate();
  const { portfolioData } = usePortfolio();
  const [showResume, setShowResume] = useState(false);

  return (
    <>
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-ink-100/50"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-ink-800 tracking-tight">VK</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/recruiter')}
              className="text-xs font-medium text-ink-400 hover:text-ink-800 transition-colors flex items-center gap-1.5"
            >
              <Briefcase size={13} /> Recruiter
            </button>
            <button
              onClick={() => setShowResume(true)}
              className="text-xs font-medium text-ink-400 hover:text-ink-800 transition-colors flex items-center gap-1.5"
            >
              <Download size={13} /> Resume
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-label mb-6">Full Stack & Blockchain Developer</div>

          <h1 className="heading-hero mb-6 max-w-4xl">
            Hi, I'm{' '}
            <span className="text-warm">
              {portfolioData.personal.name.split(' ')[0]}
            </span>
            .
            <br />
            <span className="text-ink-300">I build things that matter.</span>
          </h1>

          <p className="text-lg md:text-xl text-ink-400 max-w-2xl leading-relaxed mb-10 font-sans">
            {portfolioData.personal.shortIntro}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={() => navigate('/story')}
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BookOpen size={16} />
              Read My Story
              <ArrowRight size={15} />
            </motion.button>
            <motion.button
              onClick={() => navigate('/explore')}
              className="btn-outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Compass size={16} />
              Explore Portfolio
            </motion.button>
          </div>
        </motion.div>

        {/* Quick stats strip */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-ink-100 pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { label: 'CGPA', value: '8.78/10' },
            { label: 'Projects', value: `${portfolioData.projects.length}+` },
            { label: 'Experience', value: `${portfolioData.experience.length} Roles` },
            { label: 'Certifications', value: `${portfolioData.certificates.length}` },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-display font-bold text-ink-800">{s.value}</div>
              <div className="text-xs text-ink-400 font-mono uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>

      {/* Resume selector modal */}
      <ResumeSelector isOpen={showResume} onClose={() => setShowResume(false)} />
    </>
  );
};

export default LandingPage;
