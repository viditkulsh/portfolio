import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Styles
import './App.css';
import './styles/globals.css';

// Context
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';

// Eagerly loaded (small, always needed)
import LandingPage from './components/Landing/LandingPage';
import EasterEgg from './components/EasterEgg/EasterEgg';
import LoadingScreen from './components/Common/LoadingScreen';
import ErrorBoundary from './components/Common/ErrorBoundary';
import ScrollToTop from './components/Common/ScrollToTop';
import AIAssistant from './components/AIAssistant/AIAssistant';

// Lazy loaded (heavy, mode-specific)
const StoryMode = lazy(() => import('./components/StoryMode/StoryMode'));
const ExploreMode = lazy(() => import('./components/ExploreMode/ExploreMode'));
const RecruiterMode = lazy(() => import('./components/RecruiterMode/RecruiterMode'));
const NotFound = lazy(() => import('./components/Common/NotFound'));

// Suspense fallback for lazy-loaded routes
const RouteFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
      <div className="flex space-x-2 justify-center mb-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="text-white/60 text-sm">Loading experience...</p>
    </div>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [keySequence, setKeySequence] = useState('');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Track current path
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setIsRecruiterMode(window.location.pathname === '/recruiter');
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Handle Easter Egg
  useEffect(() => {
    const handleKeyPress = (e) => {
      const newSequence = (keySequence + e.key).toLowerCase().slice(-4);
      setKeySequence(newSequence);

      if (newSequence === 'idit') {
        setShowEasterEgg(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence]);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

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
            <ScrollToTop />
            <div className={`app-container ${isRecruiterMode ? 'recruiter-mode' : ''}`}>
              <Suspense fallback={<RouteFallback />}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <LandingPage
                        isRecruiterMode={isRecruiterMode}
                        setIsRecruiterMode={setIsRecruiterMode}
                      />
                    }
                  />
                  <Route
                    path="/story"
                    element={
                      <StoryMode
                        isRecruiterMode={isRecruiterMode}
                      />
                    }
                  />
                  <Route
                    path="/explore"
                    element={
                      <ExploreMode
                        isRecruiterMode={isRecruiterMode}
                      />
                    }
                  />
                  <Route
                    path="/recruiter"
                    element={<RecruiterMode />}
                  />
                    <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
              </Suspense>

              {/* Easter Egg Modal */}
              <AnimatePresence>
                {showEasterEgg && (
                  <EasterEgg onClose={() => setShowEasterEgg(false)} />
                )}
              </AnimatePresence>

              {/* AI Assistant - Show everywhere except Recruiter Mode */}
              {!isRecruiterMode && currentPath !== '/recruiter' && (
                <AIAssistant isRecruiterMode={isRecruiterMode} />
              )}
            </div>
          </Router>
        </PortfolioProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;