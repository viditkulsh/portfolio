import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, FileText, Code, Blocks, User, X, Eye,
  ChevronLeft, CheckCircle, Sparkles, ArrowRight,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

/* ─── Data ──────────────────────────────────────────────────────────────── */
const VARIANTS = [
  {
    key: 'full-stack-developer',
    Icon: Code,
    label: 'Full Stack',
    title: 'Full Stack Developer',
    tagline: 'Web, APIs & Databases',
    description:
      'Highlights React, Node.js, MongoDB, REST APIs and end-to-end product delivery. Best when the role spans both front-end and back-end.',
    bestFor: ['Web dev roles', 'Frontend / Backend', 'Product companies'],
    skills: ['React & Next.js', 'Node.js & Express', 'MongoDB', 'REST APIs', 'TypeScript'],
    color: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' },
    recommended: true,
  },
  {
    key: 'blockchain-developer',
    Icon: Blocks,
    label: 'Blockchain',
    title: 'Blockchain Developer',
    tagline: 'Web3, DeFi & Smart Contracts',
    description:
      'Leads with Solidity, cross-chain bridges, tokenisation and DRDO research. Ideal when the role is centred on decentralised systems.',
    bestFor: ['Web3 startups', 'DeFi protocols', 'Tokenisation platforms'],
    skills: ['Solidity', 'Smart Contracts', 'Web3.js', 'Cross-chain', 'Hardhat'],
    color: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
    recommended: false,
  },
  {
    key: 'software-engineer',
    Icon: User,
    label: 'Software Eng.',
    title: 'Software Engineer',
    tagline: 'Algorithms, Design & CS core',
    description:
      'Emphasises DSA, system design, Java/Python and clean-code practices. A strong general-purpose fit for technical screening rounds.',
    bestFor: ['SWE roles', 'Technical interviews', 'FAANG / tier-1'],
    skills: ['Data Structures', 'System Design', 'Java', 'Python', 'Algorithms'],
    color: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' },
    recommended: false,
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const triggerDownload = (path, filename) => {
  const a = document.createElement('a');
  a.href = path;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/* ─── Component ──────────────────────────────────────────────────────────── */
const ResumeSelector = ({ isOpen, onClose }) => {
  const { portfolioData } = usePortfolio();

  // step: 'pick' | 'confirm' | 'done'
  const [step, setStep]           = useState('pick');
  const [chosen, setChosen]       = useState(null);   // VARIANTS item
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress]   = useState(0);

  const reset = () => { setStep('pick'); setChosen(null); setProgress(0); setDownloading(false); };
  const handleClose = () => { reset(); onClose(); };

  const selectVariant = (v) => { setChosen(v); setStep('confirm'); };

  const handleDownload = (v = chosen) => {
    const data = portfolioData.resumeVariants[v.key];
    if (!data?.path) return;
    setDownloading(true);
    setProgress(0);
    const id = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + Math.random() * 28 + 8, 100);
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => {
            triggerDownload(data.path, data.filename);
            setDownloading(false);
            setProgress(0);
            if (v.key === chosen?.key) setStep('done');
          }, 350);
        }
        return next;
      });
    }, 160);
  };

  const handleView = (v = chosen) => {
    const data = portfolioData.resumeVariants[v.key];
    if (data?.path) window.open(data.path, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="modal-content w-full"
            style={{ maxWidth: step === 'pick' ? '860px' : '520px' }}
            initial={{ scale: 0.93, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-ink-100 text-ink-300 hover:text-ink-600 transition-colors"
            >
              <X size={18} />
            </button>

            {/* ── STEP 1 · PICK ──────────────────────────────────── */}
            <AnimatePresence mode="wait">
              {step === 'pick' && (
                <motion.div
                  key="pick"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  {/* Header */}
                  <div className="mb-7 pr-8">
                    <div className="section-label mb-2">Resume</div>
                    <h2 className="heading-lg mb-1">Which role are you hiring for?</h2>
                    <p className="text-ink-400 text-sm leading-relaxed">
                      Pick the version tailored to your opening — each PDF is ATS-optimised and emphasises the most relevant skills.
                    </p>
                  </div>

                  {/* Role cards */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {VARIANTS.map((v, i) => {
                      const { Icon } = v;
                      return (
                        <motion.button
                          key={v.key}
                          onClick={() => selectVariant(v)}
                          className={`
                            relative text-left rounded-2xl p-5 border-2 transition-all duration-200
                            bg-white hover:shadow-lifted hover:-translate-y-0.5
                            ${v.color.border} hover:border-warm-400
                          `}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07 }}
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                        >
                          {/* Recommended badge */}
                          {v.recommended && (
                            <span className="absolute top-3 right-3 flex items-center gap-1 text-[0.6rem] font-semibold bg-warm-100 text-warm-700 px-2 py-0.5 rounded-full">
                              <Sparkles size={9} /> Recommended
                            </span>
                          )}

                          {/* Icon */}
                          <div className={`w-11 h-11 rounded-xl ${v.color.bg} flex items-center justify-center mb-4`}>
                            <Icon size={22} className={v.color.text} />
                          </div>

                          {/* Title */}
                          <p className="font-semibold text-ink-800 text-sm mb-0.5">{v.title}</p>
                          <p className={`text-xs font-medium mb-3 ${v.color.text}`}>{v.tagline}</p>

                          {/* Description */}
                          <p className="text-xs text-ink-400 leading-relaxed mb-4">{v.description}</p>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {v.skills.map(s => (
                              <span key={s} className={`text-[0.6rem] font-medium px-2 py-0.5 rounded-full ${v.color.badge}`}>
                                {s}
                              </span>
                            ))}
                          </div>

                          {/* Best for */}
                          <div className="pt-3 border-t border-ink-100">
                            <p className="text-[0.6rem] font-mono text-ink-300 uppercase tracking-wider mb-1">Best for</p>
                            <p className="text-xs text-ink-500">{v.bestFor.join(' · ')}</p>
                          </div>

                          {/* CTA hint */}
                          <div className="flex items-center justify-end mt-3 gap-1 text-xs text-ink-300 group-hover:text-warm-500 transition-colors">
                            <span className="text-[0.65rem]">Select</span>
                            <ArrowRight size={11} />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Footer meta */}
                  <div className="flex items-center justify-center gap-6 pt-4 border-t border-ink-100">
                    {[
                      { Icon: FileText, label: 'PDF Format' },
                      { Icon: Download, label: 'Instant Download' },
                      { Icon: CheckCircle, label: 'ATS Optimised' },
                    ].map(({ Icon, label }) => (
                      <div key={label} className="flex items-center gap-1.5 text-ink-400">
                        <Icon size={13} />
                        <span className="text-xs">{label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2 · CONFIRM ─────────────────────────────── */}
              {(step === 'confirm' || step === 'done') && chosen && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.22 }}
                >
                  {/* Back */}
                  <button
                    onClick={() => { setStep('pick'); setProgress(0); setDownloading(false); }}
                    className="flex items-center gap-1.5 text-xs text-ink-400 hover:text-ink-700 transition-colors mb-6"
                  >
                    <ChevronLeft size={14} /> Choose a different version
                  </button>

                  {/* Chosen badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${chosen.color.bg} ${chosen.color.text} text-xs font-semibold mb-5`}>
                    <chosen.Icon size={13} />
                    {chosen.title}
                  </div>

                  {/* Title */}
                  {step === 'done' ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-4 mb-5"
                    >
                      <CheckCircle size={40} className="text-emerald-500 mx-auto mb-3" />
                      <h2 className="heading-lg mb-1">Download started!</h2>
                      <p className="text-ink-400 text-sm">
                        {portfolioData.resumeVariants[chosen.key]?.filename} is on its way.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <h2 className="heading-lg mb-1 pr-8">{chosen.title} Resume</h2>
                      <p className="text-ink-400 text-sm mb-5 leading-relaxed">{chosen.description}</p>
                    </>
                  )}

                  {/* Skills in confirm view */}
                  {step === 'confirm' && (
                    <div className="mb-5">
                      <p className="text-[0.65rem] font-mono text-ink-300 uppercase tracking-wider mb-2">What's emphasised</p>
                      <div className="flex flex-wrap gap-1.5">
                        {chosen.skills.map(s => (
                          <span key={s} className={`text-xs font-medium px-2.5 py-1 rounded-full ${chosen.color.badge}`}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Progress bar */}
                  <AnimatePresence>
                    {downloading && (
                      <motion.div
                        className="mb-5 p-4 bg-warm-50 rounded-xl border border-warm-200"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-ink-700">Preparing PDF…</span>
                          <span className="text-xs text-warm-600 font-mono">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-ink-100 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-warm"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.25 }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDownload()}
                      disabled={downloading}
                      className="flex-1 btn-primary justify-center disabled:opacity-50 disabled:cursor-wait"
                    >
                      <Download size={15} />
                      {downloading ? 'Downloading…' : 'Download PDF'}
                    </button>
                    <button
                      onClick={() => handleView()}
                      className="flex-1 btn-outline justify-center"
                    >
                      <Eye size={15} /> View PDF
                    </button>
                  </div>

                  {/* Alt downloads */}
                  {step === 'done' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-5 pt-5 border-t border-ink-100"
                    >
                      <p className="text-xs text-ink-400 mb-3">Also grab the other versions:</p>
                      <div className="flex gap-2 flex-wrap">
                        {VARIANTS.filter(v => v.key !== chosen.key).map(v => (
                          <button
                            key={v.key}
                            onClick={() => handleDownload(v)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink-200 hover:border-warm-400 hover:bg-warm-50 transition-colors text-xs text-ink-600"
                          >
                            <Download size={11} /> {v.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Contact footer */}
                  <p className="text-center text-[0.65rem] text-ink-300 mt-5">
                    Questions?&nbsp;
                    <a href={`mailto:${portfolioData.personal.email}`} className="text-warm-500 hover:text-warm-600 underline underline-offset-2">
                      {portfolioData.personal.email}
                    </a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeSelector;
