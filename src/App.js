// This is App.js file under components folder which is present in src folder.
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LandingCard from './components/LandingCard';
import ParticleBackground from './components/ParticleBackground';

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
      <ParticleBackground />
      {showLandingCard ? (
        <LandingCard onClick={handleLandingClick} />
      ) : (
        <div className="main-content">
          <Header />
          <div className="content-wrapper">
            <About />
            <Projects />
            <Contact />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;