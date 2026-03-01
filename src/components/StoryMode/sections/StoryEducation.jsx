import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { MapPin, Award } from 'lucide-react';

const StoryEducation = () => {
  const { portfolioData } = usePortfolio();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="section-label mb-3">Education</div>
        <h2 className="heading-xl mb-2">Academic Foundation</h2>
        <p className="text-ink-400">The building blocks of innovation</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {portfolioData.education.map((edu, i) => (
          <motion.div
            key={edu.id}
            className="card-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-warm-50 flex items-center justify-center text-2xl">🎓</div>
              <div>
                <h3 className="text-lg font-semibold text-ink-800">{edu.degree}</h3>
                <p className="text-sm text-ink-400">{edu.field}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="flex items-center gap-1 text-ink-400"><MapPin size={14} /> {edu.institution}</span>
              <span className="font-mono text-warm-600">{edu.duration}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Award size={14} className="text-warm-500" />
              <span className="text-sm text-ink-600">CGPA: <strong className="text-ink-800">{edu.cgpa}</strong></span>
            </div>
            {edu.achievements && (
              <div className="border-t border-ink-100 pt-3 mt-3">
                <p className="text-xs font-mono text-ink-300 uppercase tracking-wider mb-2">Achievements</p>
                <ul className="space-y-1">
                  {edu.achievements.map((a, j) => (
                    <li key={j} className="text-sm text-ink-500 flex items-start gap-2">
                      <span className="text-warm-500 mt-0.5">→</span>{a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryEducation;
