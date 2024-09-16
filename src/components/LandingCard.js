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
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 150; // Attraction radius
        const force = (maxDistance - distance) / maxDistance;

        if (distance < maxDistance) {
          this.x -= forceDirectionX * force * 2; // Move toward mouse
          this.y -= forceDirectionY * force * 2;
        } else {
          // Return to original position
          this.x += (this.originalX - this.x) * 0.05;
          this.y += (this.originalY - this.y) * 0.05;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, 0.8)`;
        ctx.fill();
      }
    }

    const mouse = { x: undefined, y: undefined };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Cosmic trail effect near the cursor
      const numberOfParticles = 5;
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const speedX = Math.random() * 1 - 0.5;
        const speedY = Math.random() * 1 - 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particlesArray.push(new Particle(e.clientX, e.clientY, size, color, speedX, speedY));
      }
    };

    const createStars = () => {
      for (let i = 0; i < 150; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const originalX = x;
        const originalY = y;
        const color = '255,255,255'; // Star-like color
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

    window.addEventListener('mousemove', handleMouseMove);
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
