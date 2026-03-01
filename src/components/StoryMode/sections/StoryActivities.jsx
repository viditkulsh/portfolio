import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Trophy, Building, Users, Calendar } from 'lucide-react';

const iconMap = { organization: Building, competition: Trophy, academic: Users };

const StoryActivities = () => {
  const { portfolioData } = usePortfolio();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="section-label mb-3">Activities</div>
        <h2 className="heading-xl mb-2">Beyond the Code</h2>
        <p className="text-ink-400">Community, competitions & growth</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {portfolioData.activities.map((a, i) => {
          const Icon = iconMap[a.type] || Users;
          return (
            <motion.div
              key={a.id}
              className="card-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-warm-50 flex items-center justify-center">
                  <Icon size={18} className="text-warm-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink-800">{a.title}</h3>
                  <p className="text-xs text-ink-400">{a.event}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-ink-300 mb-2">
                <Calendar size={11} /> {a.date}
              </div>
              <p className="text-sm text-ink-500">{a.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StoryActivities;
