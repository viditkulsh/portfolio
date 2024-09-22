import React, { useState } from 'react';
import Background from './components/Background/Background.jsx';
import LandingCard from './components/LandingCard/LandingCard.jsx';
import Header from './components/Header/Header.jsx';
import About from './components/About/About.js';
import Projects from './components/Projects/Projects.jsx';
import Contact from './components/Contact/Contact.jsx';
import './App.css';

const App = () => {
  const [showLandingCard, setShowLandingCard] = useState(true);

  const handleLandingClick = () => {
    setShowLandingCard(false);
  };

  return (
    <div className="app-container" onClick={handleLandingClick}>
      <Background />
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