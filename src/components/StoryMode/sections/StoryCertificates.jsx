import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Award, ExternalLink, Calendar } from 'lucide-react';

const StoryCertificates = () => {
  const { portfolioData } = usePortfolio();

  return (
    <motion.div
      className="story-certificates min-h-screen py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-gradient mb-4">Certifications</h2>
          <p className="text-xl text-primary-text/80">
            Continuous learning and professional validation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.certificates.map((cert, index) => (
            <motion.div
              key={index}
              className="card hover:card-neon transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full flex items-center justify-center">
                  <Award size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-text">
                    {cert.title}
                  </h3>
                  <p className="text-primary-text/70 text-sm">{cert.issuer}</p>
                </div>
              </div>

              {cert.date && (
                <div className="flex items-center gap-2 text-primary-text/70 text-sm mb-3">
                  <Calendar size={14} />
                  <span>{cert.date}</span>
                </div>
              )}

              {cert.description && (
                <p className="text-primary-text/80 text-sm mb-4">
                  {cert.description}
                </p>
              )}

              {cert.verificationUrl && (
                <div className="flex justify-end">
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-cyan hover:text-primary-purple transition-colors text-sm"
                  >
                    Verify <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StoryCertificates;
