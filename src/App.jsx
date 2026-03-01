import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // Removed unused 'motion' import

// Components
import LandingPage from './components/Landing/LandingPage';
import StoryMode from './components/StoryMode/StoryMode';
import ExploreMode from './components/ExploreMode/ExploreMode';
import RecruiterMode from './components/RecruiterMode/RecruiterMode';
import EasterEgg from './components/EasterEgg/EasterEgg';
import LoadingScreen from './components/Common/LoadingScreen';
import ErrorBoundary from './components/Common/ErrorBoundary';
import AIAssistant from './components/AIAssistant/AIAssistant';
import GlobalOverlay from './components/Common/GlobalOverlay';
import ScrollProgress from './components/Common/ScrollProgress';

// Styles
import './App.css';
import './styles/globals.css';

// Context
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';

// Inner component that can use useLocation inside Router
const AppRoutes = () => {
  const location = useLocation();
  const isRecruiterMode = location.pathname === '/recruiter';
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [keySequence, setKeySequence] = useState(''); // eslint-disable-line no-unused-vars

  // Handle Easter Egg
  useEffect(() => {
    const handleKeyPress = (e) => {
      setKeySequence(prev => {
        const newSequence = (prev + e.key).toLowerCase().slice(-4);
        if (newSequence === 'idit') {
          setShowEasterEgg(true);
        }
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className={`app-container ${isRecruiterMode ? 'recruiter-mode' : ''}`}>
      {/* Read Progress Bar */}
      {location.pathname !== '/story' && location.pathname !== '/' && (
        <ScrollProgress />
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<LandingPage isRecruiterMode={isRecruiterMode} />}
          />
          <Route
            path="/story"
            element={<StoryMode isRecruiterMode={isRecruiterMode} />}
          />
          <Route
            path="/explore"
            element={<ExploreMode isRecruiterMode={isRecruiterMode} />}
          />
          <Route
            path="/recruiter"
            element={<RecruiterMode />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <EasterEgg onClose={() => setShowEasterEgg(false)} />
        )}
      </AnimatePresence>

      {/* AI Assistant - Show everywhere except Recruiter Mode */}
      {!isRecruiterMode && (
        <AIAssistant isRecruiterMode={isRecruiterMode} />
      )}

      {/* Global Overlay for persistent navigation and CTA */}
      <GlobalOverlay />
    </div>
  );
};

// 404 Not Found component
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl md:text-8xl font-dm-serif text-white mb-4">404</h1>
      <p className="text-xl md:text-2xl text-blue-200 mb-8">This page doesn't exist.</p>
      <a
        href="/"
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:scale-105 transition-transform"
      >
        Back to Portfolio
      </a>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

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