import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, User, Settings, Moon, Sun, Target } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ResumeSelector from '../Resume/ResumeSelector';
import SocialProfiles from '../Social/SocialProfiles';

const Navigation = () => {
  const { theme, toggleTheme, isRecruiterMode, toggleRecruiterMode } = useTheme();
  const [showResumeSelector, setShowResumeSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 p-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-primary-dark">V</span>
            </div>
            <span className="text-xl font-bold text-gradient">
              Vidit Kulshrestha
            </span>
          </motion.div>

          {/* Social Links - Compact */}
          <div className="hidden md:block">
            <SocialProfiles compact={true} />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Recruiter Mode Toggle */}
            <motion.button
              onClick={toggleRecruiterMode}
              className={`px-4 py-2 rounded-xl border transition-all duration-300 ${
                isRecruiterMode
                  ? 'bg-gradient-to-r from-primary-cyan to-primary-purple border-transparent text-primary-dark'
                  : 'border-primary-cyan/30 text-primary-text hover:border-primary-cyan/60'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="text-sm font-medium">
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
              <span>Resume</span>
            </motion.button>

            {/* Settings */}
            <motion.button
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 rounded-xl border border-primary-cyan/30 hover:border-primary-cyan/60 transition-colors relative"
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

        {/* Recruiter Mode Indicator */}
        {isRecruiterMode && (
          <motion.div
            className="mt-4 flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 rounded-full px-4 py-2">
              <span className="text-sm text-primary-cyan font-medium flex items-center gap-2">
                <Target size={16} /> Professional Mode Active - Streamlined for Recruiters
              </span>
            </div>
          </motion.div>
        )}
      </motion.nav>

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
