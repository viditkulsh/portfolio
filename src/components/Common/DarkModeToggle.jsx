import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const DarkModeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm focus-visible:ring-offset-2 ${
        isDark
          ? 'bg-ink-700 border-ink-600'
          : 'bg-sand-200 border-ink-100'
      } ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.95 }}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-warm-400 pointer-events-none">
        <Sun size={12} />
      </span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none">
        <Moon size={12} />
      </span>

      {/* Knob */}
      <motion.span
        className={`absolute top-0.5 w-6 h-6 rounded-full shadow-sm flex items-center justify-center ${
          isDark ? 'bg-ink-200 text-ink-800' : 'bg-white text-ink-800'
        }`}
        animate={{ x: isDark ? 28 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? <Moon size={11} /> : <Sun size={11} />}
      </motion.span>
    </motion.button>
  );
};

export default DarkModeToggle;
