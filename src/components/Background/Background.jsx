import React, { useEffect, useRef } from 'react';
import './Background.css';

const Background = () => {
  const patternRef = useRef(null);
  const gradientRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const patternElement = patternRef.current;
    const gradientElement = gradientRef.current;

    const hexagonWidth = 55;
    const hexagonHeight = 60;
    const verticalSpacing = 50;
    const horizontalSpacing = 55;

    const countY = Math.ceil(patternElement.clientHeight / verticalSpacing) + 1;
    const countX = Math.ceil(patternElement.clientWidth / horizontalSpacing) + 1;

    const hexagons = [];

    for (let i = 0; i < countY; i++) {
      for (let j = 0; j < countX; j++) {
        const hexagon = document.createElement('div');
        hexagon.style = `
          background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODciIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgODcgMTAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMi4xOTg3MyAyNi4xNTQ3TDQzLjUgMi4zMDk0TDg0LjgwMTMgMjYuMTU0N1Y3My44NDUzTDQzLjUgOTcuNjkwNkwyLjE5ODczIDczLjg0NTNWMjYuMTU0N1oiIGZpbGw9IiMxMzEyMTciIHN0cm9rZT0iIzEzMTIxNyIgc3Ryb2tlLXdpZHRoPSI0Ii8+Cjwvc3ZnPgo=') no-repeat;
          width: ${hexagonWidth}px;
          height: ${hexagonHeight}px;
          background-size: contain;
          position: absolute;
          top: ${i * verticalSpacing}px;
          left: ${j * horizontalSpacing + ((i * (horizontalSpacing / 2)) % horizontalSpacing)}px;
        `;
        patternElement.appendChild(hexagon);
        hexagons.push(hexagon);
      }
    }

    const handleMouseMove = (event) => {
      mousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const loop = () => {
      const { x, y } = mousePosition.current;
      gradientElement.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      hexagons.forEach(hexagon => patternElement.removeChild(hexagon));
    };
  }, []);

  return (
    <>
      <div id="gradient" ref={gradientRef}></div>
      <div id="pattern" ref={patternRef}></div>
    </>
  );
};

export default Background;