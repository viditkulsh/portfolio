import React from 'react'; // Removed unused useState import
import { motion } from 'framer-motion'; // Removed unused AnimatePresence import
import { Download, ArrowLeft, Eye, ExternalLink, User, Code, Blocks } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const ResumeSelector = ({ onBack, onViewPortfolio }) => {
  // Removed unused state variables: selectedResume, setSelectedResume, isViewing, setIsViewing

  const resumeOptions = [
    {
      key: 'full-stack-developer',
      title: 'Full Stack Developer',
      description: 'Comprehensive web development experience with React, Node.js, and modern frameworks',
      icon: <Code className="w-8 h-8" />,
      color: 'from-blue-500 to-purple-600',
      highlights: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript'],
      bestFor: 'Web development roles, Frontend/Backend positions'
    },
    {
      key: 'blockchain-developer',
      title: 'Blockchain Developer',
      description: 'Specialized in blockchain technology, smart contracts, and decentralized applications',
      icon: <Blocks className="w-8 h-8" />,
      color: 'from-green-500 to-teal-600',
      highlights: ['Solidity', 'Smart Contracts', 'Web3.js', 'Ethereum', 'DeFi'],
      bestFor: 'Blockchain companies, DeFi protocols, Web3 startups'
    },
    {
      key: 'software-engineer',
      title: 'Software Engineer',
      description: 'General software engineering with focus on algorithms, system design, and problem solving',
      icon: <User className="w-8 h-8" />,
      color: 'from-orange-500 to-red-600',
      highlights: ['Java', 'Python', 'Data Structures', 'System Design', 'Algorithms'],
      bestFor: 'Software engineering roles, Technical interviews, FAANG companies'
    }
  ];

  const handleDownload = (resumeKey) => {
    const resume = portfolioData.resumeVariants[resumeKey];
    if (resume && resume.path) {
      const link = document.createElement('a');
      link.href = resume.path;
      link.download = resume.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleView = (resumeKey) => {
    const resume = portfolioData.resumeVariants[resumeKey];
    if (resume && resume.path) {
      window.open(resume.path, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Portfolio
          </button>
          
          <button
            onClick={onViewPortfolio}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Portfolio Website
          </button>
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Resume Version
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the resume that best matches the role you're considering. Each version is tailored 
            to highlight relevant skills and experience.
          </p>
        </motion.div>

        {/* Resume Options Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {resumeOptions.map((option, index) => (
            <motion.div
              key={option.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${option.color} rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${option.color} mb-4`}>
                  {option.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {option.description}
                </p>
                
                <div className="mb-4">
                  <p className="text-xs text-purple-300 mb-2 font-semibold">Key Highlights:</p>
                  <div className="flex flex-wrap gap-1">
                    {option.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded-md"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-xs text-gray-400 mb-1">Best for:</p>
                  <p className="text-sm text-gray-300">{option.bestFor}</p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(option.key)}
                    className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(option.key)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center"
        >
          <h3 className="text-lg font-semibold mb-4 text-purple-300">About {portfolioData.personal.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-white">{portfolioData.education[0].cgpa}</div>
              <div className="text-sm text-gray-400">CGPA</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{portfolioData.projects.length}+</div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{portfolioData.experience.length}</div>
              <div className="text-sm text-gray-400">Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{portfolioData.certificates.length}</div>
              <div className="text-sm text-gray-400">Certificates</div>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-gray-400"
        >
          <p>Have questions? Reach out at {portfolioData.personal.email}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeSelector;
