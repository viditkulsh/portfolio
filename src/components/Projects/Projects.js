import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const projects = [
    { id: 1, name: 'My Codolio Profile', url: 'https://codolio.com/profile/viditkul08' },
    { id: 2, name: 'Sathi Sahyogi', url: 'https://github.com/viditkulsh/SathiSahyogi' },
    { id: 3, name: 'Spell Checker', url: 'https://github.com/viditkulsh/SpellChecker' },
    { id: 4, name: 'Graph Crafters', url: 'https://github.com/viditkulsh/GraphCrafters' },
    { id: 5, name: 'Aventura De Texto', url: 'https://github.com/viditkulsh/Aventura-De-Texto' },
    { id: 6, name: 'Image Carousel', url: 'https://github.com/viditkulsh/ImageCarousel' },
  ];

  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <motion.ul 
        className="projects-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {projects.map(project => (
          <motion.li key={project.id} whileHover={{ scale: 1.1 }}>
            <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};

export default Projects;