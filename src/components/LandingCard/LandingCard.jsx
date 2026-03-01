import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, MapPin, GraduationCap } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './LandingCard.css';

const LandingCard = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Create floating particles effect without external library
  const FloatingParticle = ({ delay = 0 }) => (
    <motion.div
      className="absolute w-2 h-2 bg-white/30 rounded-full"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0
      }}
      animate={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
    />
  );

  return (
    <div className="landing-container relative w-full h-full overflow-hidden" onClick={onClick}>
      {/* Custom floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Main content */}
      <motion.div 
        className="card-container relative z-10 flex items-center justify-center h-full"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div 
          className="landing-card bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center max-w-md mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05, y: -10 }}
        >
          {/* Profile Photo */}
          <motion.div 
            className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <img 
              src={portfolioData.personal.profileImage}
              alt={portfolioData.personal.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<div class="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"><User class="w-8 h-8 text-white" /></div>';
              }}
            />
          </motion.div>

          {/* Name and Title */}
          <motion.h1 
            className="main-name text-3xl font-bold text-white mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {portfolioData.personal.name}
          </motion.h1>
          
          <motion.p 
            className="text-blue-200 text-lg mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {portfolioData.personal.title}
          </motion.p>

          {/* Education Info */}
          <motion.div 
            className="flex items-center justify-center gap-2 text-blue-300 text-sm mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{portfolioData.education[0].degree.split(' ')[0]} • {portfolioData.education[0].institution}</span>
          </motion.div>

          {/* Location */}
          <motion.div 
            className="flex items-center justify-center gap-2 text-blue-300 text-sm mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <MapPin className="w-4 h-4" />
            <span>{portfolioData.personal.location}</span>
          </motion.div>

          {/* Enter Button */}
          <motion.div 
            className="card-info flex items-center justify-center gap-2 text-white cursor-pointer"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <span className="font-medium">Click to Enter</span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            className="text-blue-200/80 text-xs mt-4 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            "{portfolioData.personal.tagline}"
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingCard; 