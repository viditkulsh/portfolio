import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ExternalLink, Calendar } from 'lucide-react';

const StoryCertificates = () => {
  const { portfolioData } = usePortfolio();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="section-label mb-3">Certifications</div>
        <h2 className="heading-xl mb-2">Validated Knowledge</h2>
        <p className="text-ink-400">Continuous learning & professional growth</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolioData.certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            className="card-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{cert.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-ink-800 line-clamp-2">{cert.title}</h3>
                <p className="text-xs text-ink-400">{cert.issuer}</p>
              </div>
            </div>
            {cert.date && (
              <div className="flex items-center gap-1 text-xs text-ink-300 mb-2">
                <Calendar size={11} /> {cert.date}
              </div>
            )}
            {cert.verificationUrl && (
              <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs text-warm-500 hover:text-warm-600 flex items-center gap-1 transition-colors">
                Verify <ExternalLink size={11} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryCertificates;
