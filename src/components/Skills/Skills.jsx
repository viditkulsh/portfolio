import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const TIER_ACCENT = {
  teal: { border: '#0F766E', bg: 'rgba(15,118,110,0.12)', badge: 'bg-teal-900/60 text-teal-200 border border-teal-700/50' },
  purple: { border: '#7C3AED', bg: 'rgba(124,58,237,0.12)', badge: 'bg-purple-900/60 text-purple-200 border border-purple-700/50' },
  blue: { border: '#1D4ED8', bg: 'rgba(29,78,216,0.12)', badge: 'bg-blue-900/60  text-blue-200  border border-blue-700/50' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55 } }
};

const Skills = () => {
  const { portfolioData } = usePortfolio();
  const skills = portfolioData.skills;
  const [activeTab, setActiveTab] = useState('domains'); // 'tiers' | 'domains'

  return (
    <motion.section
      className="min-h-screen bg-gradient-secondary py-20 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ────────────────────────────────────────────── */}
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <h2 className="text-5xl md:text-6xl font-dm-serif text-white mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mb-6" />
          <p className="text-lg text-primary-silver/70 max-w-xl mx-auto">
            {skills.identityNote}
          </p>
        </motion.div>

        {/* ── Tab Toggle ────────────────────────────────────────── */}
        <motion.div className="flex justify-center mb-12" variants={itemVariants}>
          <div className="flex gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
            {[
              { key: 'tiers', label: 'Expertise Tiers' },
              { key: 'domains', label: 'How I Build' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-lg text-sm font-inter font-medium transition-all duration-200 ${activeTab === tab.key
                    ? 'bg-teal-600 text-white shadow'
                    : 'text-primary-silver/60 hover:text-primary-silver'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Expertise Tiers View ──────────────────────────────── */}
        {activeTab === 'tiers' && (
          <motion.div
            key="tiers"
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {(skills.tiers || []).map((tier, ti) => {
              const accent = TIER_ACCENT[tier.accent] || TIER_ACCENT.teal;
              return (
                <motion.div
                  key={ti}
                  className="backdrop-blur-md bg-glassmorphism-dark rounded-2xl border border-glassmorphism-border overflow-hidden"
                  style={{ boxShadow: `0 0 0 1.5px ${accent.border}22` }}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Tier header accent bar */}
                  <div className="h-1 w-full" style={{ background: accent.border }} />

                  <div className="p-7">
                    <h3 className="text-xl font-playfair text-white mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-primary-silver/50 mb-5 font-inter">
                      {tier.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {tier.skills.map((skill, si) => (
                        <span
                          key={si}
                          className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${accent.badge}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* ── Skill Domains View ────────────────────────────────── */}
        {activeTab === 'domains' && (
          <motion.div
            key="domains"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {(skills.domains || []).map((domain, di) => {
              const Icon = domain.icon;
              return (
                <motion.div
                  key={di}
                  className="backdrop-blur-md bg-glassmorphism-dark rounded-2xl border border-glassmorphism-border overflow-hidden"
                  style={{ boxShadow: `0 0 0 1.5px ${domain.color}22` }}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Domain color accent bar */}
                  <div className="h-1 w-full" style={{ background: domain.color }} />

                  <div className="p-6">
                    {/* Domain header */}
                    <div className="flex items-center gap-3 mb-2">
                      {Icon && (
                        <div
                          className="p-2 rounded-lg"
                          style={{ background: `${domain.color}22` }}
                        >
                          <Icon size={16} style={{ color: domain.color }} />
                        </div>
                      )}
                      <h3 className="text-base font-playfair text-white leading-tight">
                        {domain.name}
                      </h3>
                    </div>
                    <p className="text-xs text-primary-silver/45 mb-5 font-inter pl-1">
                      {domain.description}
                    </p>

                    {/* Skill chips */}
                    <div className="space-y-2">
                      {domain.skills.map((skill, si) => {
                        const skillName = typeof skill === 'string' ? skill : skill.name;
                        const skillNote = typeof skill === 'object' ? skill.note : '';
                        return (
                          <div key={si} className="flex items-baseline gap-2 flex-wrap">
                            <span
                              className="px-2.5 py-0.5 rounded-md text-xs font-inter font-semibold text-white/90"
                              style={{ background: `${domain.color}30`, border: `1px solid ${domain.color}40` }}
                            >
                              {skillName}
                            </span>
                            {skillNote && (
                              <span className="text-xs text-primary-silver/40 font-inter">
                                {skillNote}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </motion.section>
  );
};

export default Skills;

