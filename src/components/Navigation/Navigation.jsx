import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, User, Settings, Moon, Sun, Target, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ResumeSelector from '../Resume/ResumeSelector';
import SocialProfiles from '../Social/SocialProfiles';

const Navigation = () => {
  const { theme, toggleTheme, isRecruiterMode, toggleRecruiterMode } = useTheme();
  const [showResumeSelector, setShowResumeSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="nav-desktop fixed top-0 left-0 right-0 z-40 p-4 lg:p-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 lg:gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full flex items-center justify-center">
              <span className="text-lg lg:text-xl font-bold text-primary-dark">V</span>
            </div>
            <span className="text-lg lg:text-xl font-bold text-gradient hidden sm:block">
              Vidit Kulshrestha
            </span>
            <span className="text-lg lg:text-xl font-bold text-gradient sm:hidden">
              Vidit K.
            </span>
          </motion.div>

          {/* Social Links - Compact - Hidden on mobile */}
          <div className="hidden lg:block">
            <SocialProfiles compact={true} />
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {/* Recruiter Mode Toggle */}
            <motion.button
              onClick={toggleRecruiterMode}
              className={`px-3 lg:px-4 py-2 rounded-xl border transition-all duration-300 text-sm ${
                isRecruiterMode
                  ? 'bg-gradient-to-r from-primary-cyan to-primary-purple border-transparent text-primary-dark'
                  : 'border-primary-cyan/30 text-primary-text hover:border-primary-cyan/60'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="font-medium">
                  {isRecruiterMode ? 'Professional' : 'Interactive'}
                </span>
              </div>
            </motion.button>

            {/* Resume Button */}
            <motion.button
              onClick={() => setShowResumeSelector(true)}
              className="btn btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              <span className="hidden lg:inline">Resume</span>
            </motion.button>

            {/* Settings */}
            <motion.button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 lg:p-3 rounded-xl border border-primary-cyan/30 hover:border-primary-cyan/60 transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={16} className="text-primary-text" />

              {/* Settings Dropdown */}
              {showSettings && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-64 bg-primary-dark/95 backdrop-blur-xl border border-primary-cyan/30 rounded-xl p-4 shadow-2xl"
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-sm font-semibold text-primary-text mb-3">Settings</h3>
                  
                  <div className="space-y-3">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary-text/70">Theme</span>
                      <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        {theme === 'dark' ? (
                          <Sun size={16} className="text-primary-cyan" />
                        ) : (
                          <Moon size={16} className="text-primary-cyan" />
                        )}
                      </button>
                    </div>

                    {/* Animations Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary-text/70">Animations</span>
                      <div className="w-8 h-4 bg-primary-cyan rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-0 top-0"></div>
                      </div>
                    </div>

                    {/* Accessibility */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary-text/70">High Contrast</span>
                      <div className="w-8 h-4 bg-gray-600 rounded-full relative">
                        <div className="w-4 h-4 bg-gray-400 rounded-full absolute left-0 top-0"></div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-primary-cyan/20 mt-4 pt-3">
                    <p className="text-xs text-primary-text/50">
                      Optimized for {isRecruiterMode ? 'recruiters' : 'interactive experience'}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>

        {/* Recruiter Mode Indicator - Responsive */}
        {isRecruiterMode && (
          <motion.div
            className="mt-2 lg:mt-4 flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 rounded-full px-3 lg:px-4 py-1 lg:py-2">
              <span className="text-xs lg:text-sm text-primary-cyan font-medium flex items-center gap-2">
                <Target size={14} className="lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">Professional Mode Active - Streamlined for Recruiters</span>
                <span className="sm:hidden">Professional Mode</span>
              </span>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="nav-mobile">
        <motion.button
          onClick={toggleMobileMenu}
          className="hamburger"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mobile-menu-content"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Menu</h3>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="space-y-4">
                {/* Recruiter Mode Toggle */}
                <motion.button
                  onClick={() => {
                    toggleRecruiterMode();
                    closeMobileMenu();
                  }}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${isRecruiterMode
                      ? 'bg-gradient-to-r from-primary-cyan to-primary-purple border-transparent text-primary-dark'
                      : 'border-primary-cyan/30 text-primary-text hover:border-primary-cyan/60'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <User size={18} />
                    <span className="font-medium">
                      {isRecruiterMode ? 'Switch to Interactive' : 'Switch to Professional'}
                    </span>
                  </div>
                </motion.button>

                {/* Resume Button */}
                <motion.button
                  onClick={() => {
                    setShowResumeSelector(true);
                    closeMobileMenu();
                  }}
                  className="w-full btn btn-primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={18} />
                  <span>Download Resume</span>
                </motion.button>

                {/* Settings */}
                <div className="border-t border-white/20 pt-4">
                  <h4 className="text-sm font-medium text-white/70 mb-3">Settings</h4>

                  <div className="space-y-3">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80">Theme</span>
                      <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        {theme === 'dark' ? (
                          <Sun size={16} className="text-primary-cyan" />
                        ) : (
                          <Moon size={16} className="text-primary-cyan" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Social Links for Mobile */}
                <div className="border-t border-white/20 pt-4">
                  <h4 className="text-sm font-medium text-white/70 mb-3">Connect</h4>
                  <SocialProfiles compact={false} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Selector Modal */}
      <ResumeSelector
        isOpen={showResumeSelector}
        onClose={() => setShowResumeSelector(false)}
      />

      {/* Click outside to close settings */}
      {showSettings && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowSettings(false)}
        />
      )}
    </>
  );
};

export default Navigation;
