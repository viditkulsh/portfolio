import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Layers, Settings, Mail, X, HelpCircle, Briefcase, BookOpen, User } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const GlobalOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { portfolioData } = usePortfolio();
  
  const currentMode = location.pathname.substring(1) || 'landing';

  // Handle Escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Don't show on landing page as it's redundant
  if (location.pathname === '/') return null;

  const menuVariants = {
    closed: { opacity: 0, scale: 0.9, y: 20, pointerEvents: 'none' },
    open: { opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' }
  };

  const navItems = [
    { id: 'landing', label: 'Home Page', path: '/', icon: Home, color: 'text-blue-400' },
    { id: 'story', label: 'Story Mode', path: '/story', icon: User, color: 'text-purple-400' },
    { id: 'explore', label: 'Explore Mode', path: '/explore', icon: BookOpen, color: 'text-green-400' },
    { id: 'recruiter', label: 'Recruiter View', path: '/recruiter', icon: Briefcase, color: 'text-orange-400' }
  ];

  return (
    <>
      {/* Floating Action Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
        
        {/* Main Menu Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label={isOpen ? "Close global navigation" : "Open global navigation"}
          aria-expanded={isOpen}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={20} /> : <Layers size={20} />}
        </motion.button>
      </div>

      {/* Floating Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 left-6 z-50 w-64 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-b border-white/10">
              <h3 className="text-white font-medium text-sm">Site Controls</h3>
            </div>
            
            <div className="p-2 space-y-1">
              {/* Quick Contact - Always Visible CTA */}
              <a 
                href={`mailto:${portfolioData?.personal?.email || 'hello@example.com'}`}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500 hover:to-purple-500 text-white transition-all shadow-md group border border-white/10 mb-2"
                onClick={() => setIsOpen(false)}
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm">Let's Talk</span>
              </a>

              <div className="h-px bg-white/10 my-2 mx-2" />
              <p className="text-xs text-white/50 px-3 py-1 font-semibold uppercase tracking-wider">Switch View</p>

              {navItems.map((item) => {
                const isActive = currentMode === item.id;
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-white/15 text-white' 
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? item.color : 'text-white/50'} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="p-3 border-t border-white/10 bg-black/20 flex justify-between items-center text-xs text-white/40">
              <span>Press <kbd className="font-mono bg-white/10 px-1 py-0.5 rounded text-white/60">Esc</kbd> to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Keyboard Shortcut for closing */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 md:hidden backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />
      )}
    </>
  );
};

export default GlobalOverlay;
