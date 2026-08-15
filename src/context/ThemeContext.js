import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Theme ownership.
 *
 * This context is the single owner of the theme. Two bugs are fixed here:
 *
 *  1. The previous version did `document.documentElement.className = theme`,
 *     which wiped every other class off <html>. It now toggles one class.
 *  2. PortfolioContext was also writing the same `portfolio-theme` key from
 *     its own state, which never changed — so whichever effect ran last won
 *     and the toggle could silently revert. Persistence now lives only here.
 */

const STORAGE_KEY = 'portfolio-theme';
const ThemeContext = createContext(null);

/** Resolve the initial theme synchronously so the first paint is correct. */
function initialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(initialTheme);
  /** True only while the user has made no explicit choice. */
  const [followsSystem, setFollowsSystem] = useState(
    () => typeof window !== 'undefined' && !window.localStorage.getItem(STORAGE_KEY)
  );

  // Apply to <html>. classList.toggle leaves every other class intact.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  }, [theme]);

  // Track the OS preference, but only while the user hasn't overridden it.
  useEffect(() => {
    if (!followsSystem) return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setThemeState(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [followsSystem]);

  const setTheme = useCallback((next) => {
    // Suppress per-element transitions for one frame — otherwise every
    // element cross-fades on its own schedule and the swap smears.
    const root = document.documentElement;
    root.classList.add('theme-switching');
    window.setTimeout(() => root.classList.remove('theme-switching'), 90);

    setThemeState(next);
    setFollowsSystem(false);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    followsSystem,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export default ThemeContext;
