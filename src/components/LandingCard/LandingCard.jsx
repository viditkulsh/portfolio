import React, { useEffect } from 'react';
import 'particles.js';
import './LandingCard.css';

const LandingCard = ({ onClick }) => {
  useEffect(() => {
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: '#ffffff',
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000',
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: false, // Disable the honeycomb effect
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse',
          },
          onclick: {
            enable: true,
            mode: 'push',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }, []);

  return (
    <div className="landing-container" onClick={onClick} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%' }}></div>
      <div className="card-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="landing-card">
          <h1 className="main-name">Vidit Kulshrestha</h1>
          <p>BCA(Hons), Blockchain Specialist</p>
          <p>Bennett University, 3rd Year</p>
          <p className="card-info">Click to Enter</p>
        </div>
      </div>
    </div>
  );
};

export default LandingCard; 