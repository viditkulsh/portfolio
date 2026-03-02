import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ResumeSelector from '../../../pages/ResumeSelector';
import { Download, Mail, ArrowLeft, Briefcase, CalendarCheck } from 'lucide-react';
import socialMediaData from '../../../data/sections/socialMediaData';

const StoryFinale = () => {
  const navigate = useNavigate();
  const [showResume, setShowResume] = useState(false);

  if (showResume) return <ResumeSelector onBack={() => setShowResume(false)} onViewPortfolio={() => navigate('/')} />;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="section-label mb-4">The End</div>
        <h2 className="heading-hero mb-4">
          Let's build something<br /><span className="text-warm">extraordinary</span>.
        </h2>
        <p className="text-ink-400 text-lg max-w-xl mx-auto leading-relaxed">
          Ready to bring innovation, expertise, and collaborative spirit to your team.
        </p>
      </motion.div>

      <motion.div className="flex flex-col sm:flex-row gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <button onClick={() => setShowResume(true)} className="btn-primary"><Download size={16} /> Download Resume</button>
        <button
          onClick={() => window.open(socialMediaData.platforms.calendar.url, '_blank', 'noopener,noreferrer')}
          className="btn-outline"
        ><CalendarCheck size={16} /> Schedule Interview</button>
        <button onClick={() => navigate('/recruiter')} className="btn-outline"><Briefcase size={16} /> Recruiter Mode</button>
      </motion.div>

      <motion.button
        onClick={() => navigate('/')}
        className="text-sm text-ink-400 hover:text-ink-600 flex items-center gap-1.5 transition-colors mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <ArrowLeft size={14} /> Back to Home
      </motion.button>
    </div>
  );
};

export default StoryFinale;
