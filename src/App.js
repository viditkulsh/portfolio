import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LandingCard from './components/LandingCard';

const App = () => {
  const [showLandingCard, setShowLandingCard] = useState(true);

  const handleLandingClick = () => {
    setShowLandingCard(false); // Trigger transition on click
  };

  return (
    <div className="app-container">
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
