import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import HorizontalWavyTimeline from './HorizontalWavyTimeline';

const About = () => {
  const { portfolioData } = usePortfolio();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section
      className="min-h-screen bg-gradient-primary py-20 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-5xl md:text-6xl font-dm-serif text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bio Section */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            {/* Introduction */}
            {portfolioData.about.introduction && (
              <div className="backdrop-blur-md bg-gradient-accent/10 p-6 rounded-2xl border border-gradient-teal/20">
                <p className="text-primary-silver/90 font-inter leading-relaxed text-lg italic">
                  {portfolioData.about.introduction}
                </p>
              </div>
            )}

            <div className="backdrop-blur-md bg-glassmorphism-dark p-8 rounded-2xl border border-glassmorphism-border">
              <h3 className="text-2xl font-playfair text-primary-silver mb-6">
                My Journey
              </h3>
              <p className="text-primary-silver/90 font-inter leading-relaxed text-lg whitespace-pre-line">
                {portfolioData.about.bio}
              </p>
            </div>

            {/* Quote */}
            <motion.div 
              className="text-center p-6 backdrop-blur-md bg-gradient-accent/20 rounded-2xl border border-gradient-teal/30"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <blockquote className="text-xl md:text-2xl font-playfair text-white italic">
                "{portfolioData.personal.quote}"
              </blockquote>
            </motion.div>
          </motion.div>

          {/* Fun Facts & Highlights */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <div className="backdrop-blur-md bg-glassmorphism-dark p-8 rounded-2xl border border-glassmorphism-border">
              <h3 className="text-2xl font-playfair text-primary-silver mb-6">
                Fun Facts
              </h3>
              <div className="space-y-4">
                {portfolioData.about.funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-gradient-secondary/10 border border-primary-silver/20"
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: "rgba(192, 192, 192, 0.1)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-gradient-teal text-lg">✨</span>
                    <p className="text-primary-silver/90 font-inter">{fact}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key Highlights */}
            <div className="backdrop-blur-md bg-glassmorphism-dark p-8 rounded-2xl border border-glassmorphism-border">
              <h3 className="text-2xl font-playfair text-primary-silver mb-6">
                Academic Excellence
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-accent/20 rounded-lg">
                  <span className="text-primary-silver font-inter">Current CGPA</span>
                  <span className="text-2xl font-bold text-gradient-teal">
                    {portfolioData.education[0].cgpa}
                  </span>
                </div>
                <div className="space-y-2">
                  {portfolioData.education[0].achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gradient-secondary/10"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-gradient-indigo"><Trophy size={20} /></span>
                      <p className="text-primary-silver/90 font-inter text-sm">
                        {achievement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Wavy Timeline Section ── */}
        {portfolioData.about.timeline && portfolioData.about.timeline.length > 0 && (
          <motion.div
            className="mt-20"
            variants={itemVariants}
          >
            <HorizontalWavyTimeline timelineItems={portfolioData.about.timeline} />
          </motion.div>
        )}

        {/* Education Section */}
        <motion.div 
          className="mt-20"
          variants={itemVariants}
        >
          <h3 className="text-4xl font-dm-serif text-white text-center mb-12">
            Education
          </h3>
          <div className="backdrop-blur-md bg-glassmorphism-dark p-8 rounded-2xl border border-glassmorphism-border max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-playfair text-primary-silver mb-2">
                  {portfolioData.education[0].degree}
                </h4>
                <p className="text-gradient-teal font-inter text-lg mb-2">
                  {portfolioData.education[0].institution}
                </p>
                <p className="text-primary-silver/80 font-inter mb-4">
                  {portfolioData.education[0].duration}
                </p>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-primary-silver/70">CGPA:</span>
                  <span className="text-2xl font-bold text-gradient-teal">
                    {portfolioData.education[0].cgpa}
                  </span>
                </div>
              </div>
              
              <div>
                <h5 className="text-lg font-playfair text-primary-silver mb-4">
                  Key Coursework
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {portfolioData.education[0].keyCourses.map((course, index) => (
                    <motion.span
                      key={index}
                      className="text-sm text-primary-silver/80 bg-gradient-accent/20 px-3 py-1 rounded-full border border-gradient-teal/30"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Capstone Project */}
            <motion.div 
              className="mt-8 p-6 bg-gradient-accent/20 rounded-xl border border-gradient-teal/30"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="text-lg font-playfair text-white mb-2">
                Capstone Project
              </h5>
              <p className="text-primary-silver/90 font-inter">
                {portfolioData.education[0].capstone}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
