import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const GlobalFooter = () => {
  const { portfolioData } = usePortfolio();

  const links = [
    { icon: Github, href: portfolioData.personal.social.github },
    { icon: Linkedin, href: portfolioData.personal.social.linkedin },
    { icon: Twitter, href: portfolioData.personal.social.twitter },
    { icon: Mail, href: `mailto:${portfolioData.personal.email}` },
  ];

  return (
    <footer className="border-t border-ink-100 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-300 hover:text-warm transition-colors"
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>
        <p className="text-xs text-ink-300 font-mono">
          © {new Date().getFullYear()} {portfolioData.personal.name}
        </p>
      </div>
    </footer>
  );
};

export default GlobalFooter;
