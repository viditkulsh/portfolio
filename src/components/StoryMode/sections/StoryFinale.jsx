import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StoryFinale = () => {
  const navigate = useNavigate();

  const handleResumeDownload = (variant) => {
    const resumeMap = {
      'full-stack-developer': '/resumes/Vidit Kulsh CV Full Stack.pdf',
      'blockchain-developer': '/resumes/Vidit Kulsh CV Blockchain.pdf',
      'software-engineer': '/resumes/Vidit Kulsh CV Software Eng.pdf'
    };
    
    const resumePath = resumeMap[variant] || resumeMap['full-stack-developer'];
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = `Vidit_Kulshrestha_${variant.replace('-', '_')}_Resume.pdf`;
    link.click();
  };

  return (
    <div className="story-finale min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center px-4">
      {/* Hero Section */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-playfair text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Now you know why I'm the one
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Ready to bring innovation, expertise, and passion to your team? Let's build something amazing together.
        </motion.p>
      </motion.div>

      {/* Key Highlights */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <div className="text-3xl mb-3">🎓</div>
          <h3 className="text-lg font-semibold text-white mb-2">Academic Excellence</h3>
          <p className="text-blue-200 text-sm">8.88/10 CGPA with consecutive outstanding achievements</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <div className="text-3xl mb-3">🔬</div>
          <h3 className="text-lg font-semibold text-white mb-2">Research Experience</h3>
          <p className="text-blue-200 text-sm">DRDO collaboration in blockchain interoperability</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-lg font-semibold text-white mb-2">Technical Mastery</h3>
          <p className="text-blue-200 text-sm">Full-stack + Blockchain development expertise</p>
        </div>
      </motion.div>

      {/* Resume Selection */}
      <motion.div
        className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 max-w-4xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <h3 className="text-2xl font-playfair text-white mb-6">
          Choose Your Resume Format
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { key: 'full-stack-developer', label: 'Full Stack Developer', icon: '🌐', color: 'from-blue-500 to-cyan-500' },
            { key: 'blockchain-developer', label: 'Blockchain Developer', icon: '⛓️', color: 'from-purple-500 to-pink-500' },
            { key: 'frontend-developer', label: 'Frontend Developer', icon: '🎨', color: 'from-green-500 to-teal-500' },
            { key: 'software-engineer', label: 'Software Engineer', icon: '💻', color: 'from-orange-500 to-red-500' }
          ].map((resume, index) => (
            <motion.button
              key={resume.key}
              onClick={() => handleResumeDownload(resume.key)}
              className={`bg-gradient-to-r ${resume.color} p-6 rounded-xl text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5 + (index * 0.1), duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-3xl mb-3">{resume.icon}</div>
              <div className="text-sm font-semibold">{resume.label}</div>
            </motion.button>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <p className="text-blue-200 mb-6">
            Ready to discuss how I can contribute to your team's success?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Interview
            </motion.button>
            <motion.button
              onClick={() => navigate('/recruiter')}
              className="px-8 py-3 border border-blue-400 text-blue-200 rounded-full font-medium hover:bg-blue-600/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Recruiter Mode
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Back to Home */}
      <motion.button
        onClick={() => navigate('/')}
        className="mt-8 flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-blue-200 hover:text-white hover:bg-white/20 transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-lg">⬅️</span>
        <span className="font-medium">Back to Home</span>
      </motion.button>
    </div>
  );
};

export default StoryFinale;
