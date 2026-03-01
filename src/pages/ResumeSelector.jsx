import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, ArrowLeft, Eye, ExternalLink, User, Code, Blocks,
  CheckCircle, Sparkles, FileText, ChevronRight,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/* ─── Data (shared shape with modal variant) ─────────────────────────────── */
const VARIANTS = [
  {
    key: 'full-stack-developer',
    Icon: Code,
    label: 'Full Stack',
    title: 'Full Stack Developer',
    tagline: 'Web, APIs & Databases',
    description:
      'End-to-end web development with React, Node.js, MongoDB and REST APIs. Best when the role spans both front-end and back-end.',
    bestFor: ['Web dev roles', 'Frontend / Backend', 'Product companies'],
    skills: ['React & Next.js', 'Node.js & Express', 'MongoDB', 'REST APIs', 'TypeScript'],
    color: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', ring: 'ring-blue-400' },
    recommended: true,
  },
  {
    key: 'blockchain-developer',
    Icon: Blocks,
    label: 'Blockchain',
    title: 'Blockchain Developer',
    tagline: 'Web3, DeFi & Smart Contracts',
    description:
      'Leads with Solidity, cross-chain bridges, tokenisation and DRDO research. Ideal for decentralised-systems roles.',
    bestFor: ['Web3 startups', 'DeFi protocols', 'Tokenisation platforms'],
    skills: ['Solidity', 'Smart Contracts', 'Web3.js', 'Cross-chain', 'Hardhat'],
    color: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', ring: 'ring-amber-400' },
    recommended: false,
  },
  {
    key: 'software-engineer',
    Icon: User,
    label: 'Software Eng.',
    title: 'Software Engineer',
    tagline: 'Algorithms, Design & CS core',
    description:
      'Emphasises DSA, system design, Java/Python and clean-code practices. Great for SWE screening rounds.',
    bestFor: ['SWE roles', 'Technical interviews', 'FAANG / tier-1'],
    skills: ['Data Structures', 'System Design', 'Java', 'Python', 'Algorithms'],
    color: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700', ring: 'ring-emerald-400' },
    recommended: false,
  },
];

const triggerDownload = (path, filename) => {
  const a = document.createElement('a');
  a.href = path;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/* ─── Component ──────────────────────────────────────────────────────────── */
const ResumeSelector = ({ onBack, onViewPortfolio }) => {
  const [active, setActive]         = useState(null); // key string
  const [downloading, setDownloading] = useState({});  // { [key]: progress 0-100 }
  const [done, setDone]             = useState({});    // { [key]: true }

  const handleDownload = (key) => {
    if (downloading[key] !== undefined) return;
    const data = portfolioData.resumeVariants[key];
    if (!data?.path) return;

    setDownloading(d => ({ ...d, [key]: 0 }));
    const id = setInterval(() => {
      setDownloading(d => {
        const cur = d[key] ?? 0;
        const next = Math.min(cur + Math.random() * 28 + 8, 100);
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => {
            triggerDownload(data.path, data.filename);
            setDownloading(prev => { const n = { ...prev }; delete n[key]; return n; });
            setDone(prev => ({ ...prev, [key]: true }));
          }, 350);
        }
        return { ...d, [key]: next };
      });
    }, 160);
  };

  const handleView = (key) => {
    const data = portfolioData.resumeVariants[key];
    if (data?.path) window.open(data.path, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-ink-400 hover:text-ink-700 text-sm transition-colors"
          >
            <ArrowLeft size={15} /> Back
          </button>
        )}
        {onViewPortfolio && (
          <button onClick={onViewPortfolio} className="btn-outline text-sm">
            <ExternalLink size={14} /> Portfolio
          </button>
        )}
      </div>

      {/* ── Title ── */}
      <div className="text-center">
        <div className="section-label mb-3">Resume</div>
        <h2 className="heading-xl mb-2">Pick the right version</h2>
        <p className="text-ink-400 text-sm max-w-md mx-auto leading-relaxed">
          Each PDF is tailored for a specific role. Click a card to expand details, then download or view.
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="grid md:grid-cols-3 gap-5">
        {VARIANTS.map((v, i) => {
          const isActive   = active === v.key;
          const progress   = downloading[v.key];
          const isDone     = done[v.key];
          const inProgress = progress !== undefined;

          return (
            <motion.div
              key={v.key}
              className={`
                relative rounded-2xl border-2 overflow-hidden transition-all duration-200 cursor-pointer
                ${isActive
                  ? `${v.color.border} shadow-lifted`
                  : 'border-ink-100 hover:border-ink-200 hover:shadow-soft'}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActive(isActive ? null : v.key)}
            >
              {/* Recommended ribbon */}
              {v.recommended && (
                <div className="absolute top-0 right-0">
                  <div className="bg-warm text-white text-[0.6rem] font-semibold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                    <Sparkles size={9} /> Recommended
                  </div>
                </div>
              )}

              {/* Done overlay tick */}
              {isDone && (
                <div className="absolute top-3 left-3 flex items-center gap-1 text-emerald-600 text-[0.6rem] font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle size={9} /> Downloaded
                </div>
              )}

              {/* Card body */}
              <div className="p-5">
                {/* Icon + title row */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${v.color.bg} flex items-center justify-center flex-shrink-0`}>
                    <v.Icon size={20} className={v.color.text} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-ink-800 text-sm leading-tight">{v.title}</p>
                    <p className={`text-xs font-medium mt-0.5 ${v.color.text}`}>{v.tagline}</p>
                  </div>
                  <ChevronRight
                    size={15}
                    className={`text-ink-300 flex-shrink-0 transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`}
                  />
                </div>

                {/* Description — always shown */}
                <p className="text-xs text-ink-400 leading-relaxed mb-3">{v.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {v.skills.map(s => (
                    <span key={s} className={`text-[0.6rem] font-medium px-2 py-0.5 rounded-full ${v.color.badge}`}>{s}</span>
                  ))}
                </div>

                {/* Best for — collapsed unless active */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-ink-100 mb-4">
                        <p className="text-[0.6rem] font-mono text-ink-300 uppercase tracking-wider mb-1">Best for</p>
                        <p className="text-xs text-ink-500">{v.bestFor.join(' · ')}</p>
                      </div>

                      {/* Progress bar */}
                      {inProgress && (
                        <div className="mb-3">
                          <div className="flex justify-between text-[0.65rem] text-ink-400 mb-1">
                            <span>Preparing PDF…</span>
                            <span className="font-mono text-warm-600">{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-ink-100 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-warm"
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.22 }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => handleDownload(v.key)}
                          disabled={inProgress}
                          className="flex-1 btn-primary text-xs justify-center disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isDone
                            ? <><CheckCircle size={13} /> Downloaded</>
                            : inProgress
                              ? <><Download size={13} /> Downloading…</>
                              : <><Download size={13} /> Download</>}
                        </button>
                        <button
                          onClick={() => handleView(v.key)}
                          className="flex-1 btn-outline text-xs justify-center"
                        >
                          <Eye size={13} /> View
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed CTA hint */}
                {!isActive && (
                  <p className="text-[0.65rem] text-ink-300">Tap to expand &amp; download</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Download all row ── */}
      <motion.div
        className="card-light"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-ink-800">Not sure? Download all three</p>
            <p className="text-xs text-ink-400 mt-0.5 leading-relaxed">
              Each is a lightweight, ATS-ready PDF. The&nbsp;
              <span className="font-medium text-ink-600">Full Stack</span> version works as a catch-all for general roles.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap flex-shrink-0">
            {VARIANTS.map(v => (
              <button
                key={v.key}
                onClick={() => handleDownload(v.key)}
                disabled={downloading[v.key] !== undefined}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink-200 hover:border-warm-400 hover:bg-warm-50 transition-colors text-xs text-ink-600 hover:text-warm-700 whitespace-nowrap disabled:opacity-50 disabled:cursor-wait"
              >
                {done[v.key]
                  ? <CheckCircle size={11} className="text-emerald-500" />
                  : <Download size={11} />}
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Stats strip ── */}
      <div className="card-light">
        <p className="text-xs font-mono text-ink-300 uppercase tracking-wider text-center mb-4">
          At a glance — {portfolioData.personal.name}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: 'CGPA',         value: portfolioData.education[0]?.cgpa },
            { label: 'Projects',     value: `${portfolioData.projects.length}+` },
            { label: 'Roles',        value: portfolioData.experience.length },
            { label: 'Certificates', value: portfolioData.certificates.length },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xl font-display font-bold text-ink-800">{value}</p>
              <p className="text-xs text-ink-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact footer ── */}
      <div className="flex items-center justify-center gap-5 flex-wrap pt-2">
        {[
          { Icon: FileText,     label: 'PDF format' },
          { Icon: Download,     label: 'Instant download' },
          { Icon: CheckCircle,  label: 'ATS optimised' },
        ].map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-ink-400">
            <Icon size={13} />
            <span className="text-xs">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-ink-400">
        Questions?&nbsp;
        <a href={`mailto:${portfolioData.personal.email}`} className="text-warm-500 hover:text-warm-600">
          {portfolioData.personal.email}
        </a>
      </p>
    </div>
  );
};

export default ResumeSelector;
