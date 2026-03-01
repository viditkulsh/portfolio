import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LandingPage from './components/Landing/LandingPage';
import StoryMode from './components/StoryMode/StoryMode';
import ExploreMode from './components/ExploreMode/ExploreMode';
import RecruiterMode from './components/RecruiterMode/RecruiterMode';
import EasterEgg from './components/EasterEgg/EasterEgg';
import LoadingScreen from './components/Common/LoadingScreen';
import ErrorBoundary from './components/Common/ErrorBoundary';
import GlobalOverlay from './components/Common/GlobalOverlay';
import ScrollProgress from './components/Common/ScrollProgress';

import './App.css';
import './styles/globals.css';

import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';

const AppRoutes = () => {
  const location = useLocation();
  const isRecruiterMode = location.pathname === '/recruiter';
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [keySequence, setKeySequence] = useState(''); // eslint-disable-line no-unused-vars

  useEffect(() => {
    const handleKeyPress = (e) => {
      setKeySequence(prev => {
        const newSequence = (prev + e.key).toLowerCase().slice(-4);
        if (newSequence === 'idit') setShowEasterEgg(true);
        return newSequence;
      });
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className={`app-container ${isRecruiterMode ? 'recruiter-mode' : ''}`}>
      {location.pathname !== '/story' && location.pathname !== '/' && <ScrollProgress />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage isRecruiterMode={isRecruiterMode} />} />
          <Route path="/story" element={<StoryMode isRecruiterMode={isRecruiterMode} />} />
          <Route path="/explore" element={<ExploreMode isRecruiterMode={isRecruiterMode} />} />
          <Route path="/recruiter" element={<RecruiterMode />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <AnimatePresence>
        {showEasterEgg && <EasterEgg onClose={() => setShowEasterEgg(false)} />}
      </AnimatePresence>

      <GlobalOverlay />
    </div>
  );
};

const NotFound = () => (
  <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-4">
    <h1 className="heading-hero mb-4 text-ink-200">404</h1>
    <p className="text-lg text-ink-400 mb-8">This page doesn't exist.</p>
    <a href="/" className="btn-primary">Back to Portfolio</a>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 1200); return () => clearTimeout(t); }, []);
  if (isLoading) return <LoadingScreen />;

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PortfolioProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppRoutes />
          </Router>
        </PortfolioProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
