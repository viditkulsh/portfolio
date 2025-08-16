import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // Removed unused 'motion' import

// Components
import LandingPage from './components/Landing/LandingPage';
import StoryMode from './components/StoryMode/StoryMode';
import ExploreMode from './components/ExploreMode/ExploreMode';
import RecruiterMode from './components/RecruiterMode/RecruiterMode';
import EasterEgg from './components/EasterEgg/EasterEgg';
import LoadingScreen from './components/Common/LoadingScreen';
import ErrorBoundary from './components/Common/ErrorBoundary';

// Styles
import './App.css';
import './styles/globals.css';

// Context
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [keySequence, setKeySequence] = useState('');

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
            <div className={`app-container ${isRecruiterMode ? 'recruiter-mode' : ''}`}>
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
                </Routes>
              </AnimatePresence>

              {/* Easter Egg Modal */}
              <AnimatePresence>
                {showEasterEgg && (
                  <EasterEgg onClose={() => setShowEasterEgg(false)} />
                )}
              </AnimatePresence>
            </div>
          </Router>
        </PortfolioProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;