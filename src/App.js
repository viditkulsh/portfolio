import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App = () => {
  const [showCard, setShowCard] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(false);
    }, 2000); // 2 seconds delay before zoom-in effect
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      {showCard ? (
        <div className="black-background">
          <div className="intro-card">
            <h1>Vidit Kulshrestha</h1>
            <p>BCA(Hons), Blockchain Specialist</p>
            <p>Bennett University, 3rd Year</p>
          </div>
        </div>
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
