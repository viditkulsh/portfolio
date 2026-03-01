import React from 'react';
import { User, Briefcase, Mail, Home } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img 
            src={portfolioData.personal.profileImage}
            alt={portfolioData.personal.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = '<div class="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"><div style="color: white; font-size: 12px;">V</div></div>';
            }}
          />
        </div>
        <h1 className="header-title">{portfolioData.personal.name}</h1>
      </div>
      <nav className="header-nav">
        <a href="#home" className="nav-link flex items-center gap-1">
          <Home className="w-4 h-4" />
          <span>Home</span>
        </a>
        <a href="#about" className="nav-link flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>About</span>
        </a>
        <a href="#projects" className="nav-link flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          <span>Projects</span>
        </a>
        <a href="#contact" className="nav-link flex items-center gap-1">
          <Mail className="w-4 h-4" />
          <span>Contact</span>
        </a>
      </nav>
    </header>
  );
};

export default Header;