import React, { useEffect, useRef } from 'react';
import './LandingCard.css';

const LandingCard = ({ onClick }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const colors = ['255,255,255', '128,208,199', '64,81,78', '255,99,71']; // Cosmic-like colors

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);

    // Mouse object to track mouse position
    const mouse = {
      x: null,
      y: null,
    };

    // Update mouse position on mouse move
    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor(x, y, size, color, speedX, speedY, originalX, originalY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.originalX = originalX;
        this.originalY = originalY;
      }

      update(mouse) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        // Additional logic for particle update
      }

      draw() {
        ctx.fillStyle = `rgba(${this.color}, 1)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    const createStars = () => {
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const originalX = x;
        const originalY = y;
        particlesArray.push(new Particle(x, y, size, color, 0, 0, originalX, originalY));
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle, index) => {
        particle.update(mouse);
        particle.draw();
        if (particle.size <= 0.5) {
          particlesArray.splice(index, 1);
        }
      });
      requestAnimationFrame(animateParticles);
    };

    createStars();
    animateParticles();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="landing-container" onClick={onClick}>
      <canvas ref={canvasRef} className="particle-canvas"></canvas>
      <div className="card-container">
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