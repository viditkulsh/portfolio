// This is Projects.js file under components folder which is present in src folder.

import React from 'react';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <ul className="projects-list">
        <li>
          <a href="https://codolio.com/profile/viditkul08" target="_blank" rel="noopener noreferrer">My Codolio Profile</a>
        </li>
        <li>
          <a href="https://github.com/viditkulsh/SathiSahyogi" target="_blank" rel="noopener noreferrer">Sathi Sahyogi</a>
        </li>
        <li>
          <a href="https://github.com/viditkulsh/SpellChecker" target="_blank" rel="noopener noreferrer">Spell Checker</a>
        </li>
        <li>
          <a href="https://github.com/viditkulsh/GraphCrafters" target="_blank" rel="noopener noreferrer">Graph Crafters</a>
        </li>
        <li>
          <a href="https://github.com/viditkulsh/Aventura-De-Texto" target="_blank" rel="noopener noreferrer">Aventura De Texto</a>
        </li>
        <li>
          <a href="https://github.com/viditkulsh/ImageCarousel" target="_blank" rel="noopener noreferrer">Image Carousel</a>
        </li>
      </ul>
    </section>
  );
};

export default Projects;