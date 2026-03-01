import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const GlobalFooter = () => {
  const { portfolioData } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 bg-black/20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand & Copyright */}
          <div className="text-center md:text-left">
            <span className="text-xl font-playfair font-bold text-white tracking-wider uppercase mb-2 block">
              {portfolioData.personal.name}
            </span>
            <p className="text-white/50 text-sm">
              &copy; {currentYear} All rights reserved. Let's build something great.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(portfolioData.personal.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-blue-400 text-sm font-medium transition-colors capitalize"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>Built with React & Tailwind CSS</p>
          <div className="flex items-center gap-2">
            <span>Powered by Gemini AI</span>
            <span>•</span>
            <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-white transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
