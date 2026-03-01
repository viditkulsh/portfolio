import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, SkipForward, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

import StoryAbout from './sections/StoryAbout';
import StoryEducation from './sections/StoryEducation';
import StorySkills from './sections/StorySkills';
import StoryProjects from './sections/StoryProjects';
import StoryExperience from './sections/StoryExperience';
import StoryCertificates from './sections/StoryCertificates';
import StoryActivities from './sections/StoryActivities';
import StoryFinale from './sections/StoryFinale';

const STEPS = [
  { id: 'about', component: StoryAbout, label: 'About' },
  { id: 'education', component: StoryEducation, label: 'Education' },
  { id: 'skills', component: StorySkills, label: 'Skills' },
  { id: 'projects', component: StoryProjects, label: 'Projects' },
  { id: 'experience', component: StoryExperience, label: 'Experience' },
  { id: 'certificates', component: StoryCertificates, label: 'Certificates' },
  { id: 'activities', component: StoryActivities, label: 'Activities' },
  { id: 'finale', component: StoryFinale, label: 'Finale' },
];

const DURATION = 25000;

const StoryMode = ({ isRecruiterMode }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [countdown, setCountdown] = useState(DURATION / 1000);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  const total = STEPS.length;
  const CurrentSection = STEPS[step].component;

  const next = useCallback(() => { if (step < total - 1) setStep(s => s + 1); }, [step, total]);
  const prev = useCallback(() => { if (step > 0) setStep(s => s - 1); }, [step]);

  useEffect(() => {
    setCountdown(DURATION / 1000);
    if (paused || step === total - 1) return;
    timerRef.current = setTimeout(next, DURATION);
    countdownRef.current = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => { clearTimeout(timerRef.current); clearInterval(countdownRef.current); };
  }, [step, paused, next, total]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-4 py-2">
          {/* Section progress segments */}
          <div className="flex gap-1 mb-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex-1 h-1 rounded-full bg-ink-100 overflow-hidden cursor-pointer" onClick={() => setStep(i)}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: i < step ? '#1A1A1A' : i === step ? '#F97316' : 'transparent' }}
                  initial={{ width: i < step ? '100%' : '0%' }}
                  animate={{ width: i < step ? '100%' : i === step ? '100%' : '0%' }}
                  transition={{ duration: i === step ? DURATION / 1000 : 0.3, ease: 'linear' }}
                  key={`${s.id}-${step}-${paused}`}
                />
              </div>
            ))}
          </div>
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('/')} className="p-1.5 rounded-lg hover:bg-ink-50 text-ink-400 transition-colors"><Home size={16} /></button>
              <span className="text-xs font-mono text-ink-300">{step + 1}/{total}</span>
            </div>
            <span className="text-xs font-medium text-ink-600">{STEPS[step].label}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPaused(!paused)} className="p-1.5 rounded-lg hover:bg-ink-50 text-ink-400 transition-colors">
                {paused ? <Play size={16} /> : <Pause size={16} />}
              </button>
              <button onClick={prev} disabled={step === 0} className="p-1.5 rounded-lg hover:bg-ink-50 text-ink-400 disabled:opacity-30 transition-colors"><ChevronLeft size={16} /></button>
              <button onClick={next} disabled={step === total - 1} className="p-1.5 rounded-lg hover:bg-ink-50 text-ink-400 disabled:opacity-30 transition-colors"><ChevronRight size={16} /></button>
              <button onClick={() => navigate('/explore')} className="p-1.5 rounded-lg hover:bg-ink-50 text-ink-400 transition-colors"><SkipForward size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Section content */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <CurrentSection
                isRecruiterMode={isRecruiterMode}
                onNext={next}
                onPrevious={prev}
                currentStep={step}
                totalSteps={total}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Countdown (not on finale) */}
      {step < total - 1 && !paused && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-ink-300 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-ink-100">
          Next in {countdown}s
        </div>
      )}
    </div>
  );
};

export default StoryMode;
