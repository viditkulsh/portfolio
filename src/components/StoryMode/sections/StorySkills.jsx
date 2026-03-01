import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';

const TIER_COLORS = {
  teal: { badge: 'bg-teal-900/60 text-teal-200 border border-teal-700/40', dot: '#0F766E' },
  purple: { badge: 'bg-purple-900/50 text-purple-200 border border-purple-700/40', dot: '#7C3AED' },
  blue: { badge: 'bg-blue-900/50  text-blue-200  border border-blue-700/40', dot: '#1D4ED8' },
};

const StorySkills = () => {
  const { portfolioData } = usePortfolio();
  const skills = portfolioData.skills;

  return (
    <div className="space-y-10">
      <div className="text-center">
        <div className="section-label mb-3">Skills</div>
        <h2 className="heading-xl mb-2">Engineering Expertise</h2>
        <p className="text-ink-400">{skills.identityNote}</p>
      </div>

      {/* Expertise Tiers */}
      {(skills.tiers || []).map((tier, ti) => {
        const colors = TIER_COLORS[tier.accent] || TIER_COLORS.teal;
        return (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ti * 0.15 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.dot }} />
              <h3 className="heading-sm">{tier.name}</h3>
              <span className="text-xs text-ink-300 font-mono">{tier.description}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tier.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: ti * 0.1 + si * 0.04 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StorySkills;
