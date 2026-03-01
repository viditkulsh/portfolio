import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Code, Blocks, User, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const ResumeSelector = ({ isOpen, onClose }) => {
  const { portfolioData } = usePortfolio();
  const [selectedResume, setSelectedResume] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const resumeVariants = [
    {
      id: 'fullstack',
      title: 'Full Stack Developer',
      description: 'Optimized for web development roles with emphasis on React, Node.js, and database technologies',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      highlights: ['React & Next.js', 'Node.js & Express', 'Database Design', 'API Development'],
      filename: 'Vidit_Kulshrestha_FullStack_Resume.pdf'
    },
    {
      id: 'blockchain',
      title: 'Blockchain Developer',
      description: 'Focused on Web3, smart contracts, and decentralized application development',
      icon: Blocks,
      color: 'from-purple-500 to-pink-500',
      highlights: ['Solidity & Smart Contracts', 'Web3.js & DeFi', 'Blockchain Architecture', 'Crypto Projects'],
      filename: 'Vidit_Kulshrestha_Blockchain_Resume.pdf'
    },
    {
      id: 'software',
      title: 'Software Engineer',
      description: 'General software engineering role highlighting algorithms, data structures, and system design',
      icon: User,
      color: 'from-green-500 to-teal-500',
      highlights: ['Data Structures & Algorithms', 'System Design', 'Clean Code', 'Problem Solving'],
      filename: 'Vidit_Kulshrestha_Software_Engineer_Resume.pdf'
    },
    {
      id: 'general',
      title: 'General Resume',
      description: 'Comprehensive resume showcasing all skills and experiences',
      icon: FileText,
      color: 'from-orange-500 to-red-500',
      highlights: ['Complete Portfolio', 'All Technologies', 'Full Experience', 'Academic Projects'],
      filename: 'Vidit_Kulshrestha_Complete_Resume.pdf'
    }
  ];

  const handleDownload = async (resume) => {
    setSelectedResume(resume);
    setIsDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Simulate actual download
          setTimeout(() => {
            const link = document.createElement('a');
            link.href = `/resumes/${resume.filename}`;
            link.download = resume.filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            setIsDownloading(false);
            setDownloadProgress(0);
            setSelectedResume(null);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl bg-primary-dark/95 backdrop-blur-xl border border-primary-cyan/30 rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gradient mb-2">
                  Choose Your Resume
                </h2>
                <p className="text-primary-text/70">
                  Select the version that best matches the role you're applying for
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} className="text-primary-text" />
              </button>
            </div>

            {/* Resume Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {resumeVariants.map((resume, index) => {
                const IconComponent = resume.icon;
                return (
                  <motion.div
                    key={resume.id}
                    className="card hover:card-neon cursor-pointer transition-all duration-300"
                    onClick={() => handleDownload(resume)}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${resume.color} flex items-center justify-center`}>
                        <IconComponent size={28} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-primary-text mb-2">
                          {resume.title}
                        </h3>
                        <p className="text-primary-text/70 text-sm leading-relaxed">
                          {resume.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-primary-cyan font-medium">Key Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {resume.highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/10 rounded-full text-xs text-primary-text border border-white/20"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm text-primary-text/60">
                        {resume.filename}
                      </span>
                      <div className="flex items-center gap-2 text-primary-cyan">
                        <Download size={16} />
                        <span className="text-sm font-medium">Download</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Download Progress */}
            <AnimatePresence>
              {isDownloading && selectedResume && (
                <motion.div
                  className="mb-6 p-6 bg-white/5 rounded-xl border border-primary-cyan/30"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full flex items-center justify-center">
                      <Download size={16} className="text-primary-dark" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary-text">
                        Downloading {selectedResume.title}
                      </h4>
                      <p className="text-sm text-primary-text/70">
                        Preparing your personalized resume...
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-cyan to-primary-purple"
                      initial={{ width: 0 }}
                      animate={{ width: `${downloadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-primary-text/60">
                      {Math.round(downloadProgress)}% complete
                    </span>
                    <span className="text-xs text-primary-cyan">
                      {downloadProgress < 100 ? 'Processing...' : 'Ready!'}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="text-center">
              <p className="text-primary-text/60 text-sm mb-4">
                All resumes are automatically updated with the latest information from this portfolio
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-primary-cyan">
                  <FileText size={16} />
                  <span className="text-sm">PDF Format</span>
                </div>
                <div className="w-1 h-1 bg-primary-text/30 rounded-full"></div>
                <div className="flex items-center gap-2 text-primary-cyan">
                  <Download size={16} />
                  <span className="text-sm">Instant Download</span>
                </div>
                <div className="w-1 h-1 bg-primary-text/30 rounded-full"></div>
                <div className="flex items-center gap-2 text-primary-cyan">
                  <User size={16} />
                  <span className="text-sm">ATS Optimized</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeSelector;
