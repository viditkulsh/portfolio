// src/App.jsx
import React, { useState, useEffect, Suspense } from 'react';
import './App.css';
import Background from './components/Background/Background'; // Import the Background component
import LandingCard from './components/LandingCard/LandingCard';

const Header = React.lazy(() => import('./components/Header/Header'));
const About = React.lazy(() => import('./components/About/About'));
const Projects = React.lazy(() => import('./components/Projects/Projects'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));

const App = () => {
  const [showLandingCard, setShowLandingCard] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.add(savedTheme);
    }
  }, []);

  const handleLandingClick = () => {
    setShowLandingCard(false);
  };

  return (
    <div className="app-container">
      <Background /> {/* Add Background component here */}
      {showLandingCard ? (
        <LandingCard onClick={handleLandingClick} />
      ) : (
        <div className="main-content">
          <Suspense fallback={<div>Loading Header...</div>}>
            <Header />
          </Suspense>
          <div className="content-wrapper">
            <Suspense fallback={<div>Loading About...</div>}>
              <About />
            </Suspense>
            <Suspense fallback={<div>Loading Projects...</div>}>
              <Projects />
            </Suspense>
            <Suspense fallback={<div>Loading Contact...</div>}>
              <Contact />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;