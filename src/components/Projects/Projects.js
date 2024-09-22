import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <motion.ul 
        className="projects-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.li whileHover={{ scale: 1.1 }}>
          <a href="https://codolio.com/profile/viditkul08" target="_blank" rel="noopener noreferrer">My Codolio Profile</a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <a href="https://github.com/viditkulsh/SathiSahyogi" target="_blank" rel="noopener noreferrer">Sathi Sahyogi</a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <a href="https://github.com/viditkulsh/SpellChecker" target="_blank" rel="noopener noreferrer">Spell Checker</a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <a href="https://github.com/viditkulsh/GraphCrafters" target="_blank" rel="noopener noreferrer">Graph Crafters</a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <a href="https://github.com/viditkulsh/Aventura-De-Texto" target="_blank" rel="noopener noreferrer">Aventura De Texto</a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <a href="https://github.com/viditkulsh/ImageCarousel" target="_blank" rel="noopener noreferrer">Image Carousel</a>
        </motion.li>
      </motion.ul>
    </section>
  );
};

export default Projects;