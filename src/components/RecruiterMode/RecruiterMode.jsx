import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import ResumeSelector from '../../pages/ResumeSelector';
import { GraduationCap, Microscope, Zap, Rocket, Target, Trophy, Lightbulb, Star } from 'lucide-react';

const RecruiterMode = () => {
  const navigate = useNavigate();
  const { portfolioData } = usePortfolio();
  const [activeSection, setActiveSection] = useState('overview');
  // Removed unused showMetrics state variable
  const [showResumeSelector, setShowResumeSelector] = useState(false);

  // Removed unused useEffect for showMetrics

  const sections = {
    overview: 'Executive Summary',
    technical: 'Technical Excellence',
    research: 'Research & Innovation',
    impact: 'Impact & Results',
    culture: 'Cultural Fit'
  };

  const metrics = [
    { label: 'Academic CGPA', value: '8.88/10', icon: GraduationCap, description: 'Consistent Excellence' },
    { label: 'Research Collaborations', value: '2+', icon: Microscope, description: 'DRDO & Industry' },
    { label: 'Technical Skills', value: '15+', icon: Zap, description: 'Full Stack + Blockchain' },
    { label: 'Project Impact', value: 'High', icon: Rocket, description: 'Production Ready' }
  ];

  const strengthsData = {
    technical: [
      { skill: 'Blockchain Development', level: 95, rarity: 'High Demand' },
      { skill: 'Full Stack Development', level: 90, rarity: 'Market Ready' },
      { skill: 'Research & Innovation', level: 88, rarity: 'Unique Asset' },
      { skill: 'Problem Solving', level: 92, rarity: 'Core Strength' }
    ],
    research: [
      'Leading blockchain interoperability research with DRDO',
      'Publishing academic papers in cutting-edge technology',
      'Developing novel consensus mechanisms',
      'Contributing to next-gen distributed systems'
    ],
    impact: [
      'Outstanding Academic Achievement (2 consecutive semesters)',
      'Research collaboration with defense organizations',
      'Active contributor to blockchain technology advancement',
      'Demonstrated leadership in technical initiatives'
    ]
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleDownloadResume = () => {
    setShowResumeSelector(true);
  };

  const handleBackFromResume = () => {
    setShowResumeSelector(false);
  };

  const handleViewPortfolio = () => {
    navigate('/');
  };

  // Show Resume Selector if requested
  if (showResumeSelector) {
    return (
      <ResumeSelector 
        onBack={handleBackFromResume}
        onViewPortfolio={handleViewPortfolio}
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <motion.button
            onClick={handleBackToHome}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-blue-200 hover:text-white hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Back to Portfolio</span>
          </motion.button>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 font-medium">RECRUITER MODE ACTIVE</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-dm-serif text-white mb-4">
            {portfolioData.personal.name}
          </h1>
          <p className="text-xl text-blue-200 font-playfair">
            Your Next Top-Tier Developer
          </p>
        </motion.div>

        {/* Key Metrics Dashboard */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          variants={itemVariants}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl mb-2">{React.createElement(metric.icon, { size: 24 })}</div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-blue-200 font-medium mb-1">{metric.label}</div>
              <div className="text-xs text-blue-300">{metric.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          variants={itemVariants}
        >
          {Object.entries(sections).map(([key, title]) => (
            <motion.button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeSection === key
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {title}
            </motion.button>
          ))}
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
          >
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-playfair text-white mb-6">Why Vidit is Your Ideal Candidate</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-4 flex items-center gap-2"><Target size={20} /> Perfect Fit Profile</h3>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Academic Excellence: 8.88/10 CGPA with consecutive awards</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Research Experience: DRDO collaboration in cutting-edge blockchain</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Technical Breadth: Full-stack + Blockchain expertise</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Growth Mindset: Continuous learning and adaptation</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-4 flex items-center gap-2"><Rocket size={20} /> Immediate Value Add</h3>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-400 mt-1"><Star size={16} /></span>
                        <span>Ready to contribute from day one</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-400 mt-1"><Star size={16} /></span>
                        <span>Strong foundation in modern tech stack</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-400 mt-1"><Star size={16} /></span>
                        <span>Research mindset brings innovation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-400 mt-1"><Star size={16} /></span>
                        <span>Collaborative approach with proven results</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'technical' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-playfair text-white mb-6">Technical Excellence</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-4">Core Strengths</h3>
                    {strengthsData.technical.map((item, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">{item.skill}</span>
                          <span className="text-sm text-blue-300">{item.rarity}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.level}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                        <div className="text-right text-sm text-blue-300 mt-1">{item.level}%</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-4">Technology Stack</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {portfolioData.skills.categories[0].skills.slice(0, 8).map((skill, index) => (
                        <motion.div
                          key={index}
                          className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 p-3 rounded-lg border border-blue-500/30"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-white font-medium text-sm">{skill.name}</div>
                          <div className="text-blue-300 text-xs">{skill.level}% proficiency</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'research' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-playfair text-white mb-6">Research & Innovation</h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-6 rounded-xl border border-purple-500/30">
                    <h3 className="text-xl font-semibold text-white mb-4">🔬 Current Research</h3>
                    <p className="text-blue-200 mb-4">
                      Leading blockchain interoperability research in collaboration with DRDO and Astraeus Next Gen
                    </p>
                    <ul className="space-y-2">
                      {strengthsData.research.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-white/90">
                          <span className="text-purple-400 mt-1"><Target size={16} /></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-600/20 p-6 rounded-xl border border-blue-500/30">
                      <h4 className="text-lg font-semibold text-white mb-3">Innovation Focus</h4>
                      <p className="text-blue-200">
                        Developing novel consensus mechanisms for cross-chain communication, 
                        pushing the boundaries of blockchain interoperability.
                      </p>
                    </div>
                    <div className="bg-green-600/20 p-6 rounded-xl border border-green-500/30">
                      <h4 className="text-lg font-semibold text-white mb-3">Real-World Impact</h4>
                      <p className="text-green-200">
                        Contributing to academic research while building practical solutions 
                        for next-generation distributed systems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'impact' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-playfair text-white mb-6">Impact & Results</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-b from-yellow-500/20 to-orange-500/20 p-6 rounded-xl border border-yellow-500/30">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2"><Trophy size={18} /> Academic Excellence</h3>
                    <ul className="space-y-2 text-yellow-100">
                      <li>• 8.88/10 CGPA</li>
                      <li>• Consecutive Outstanding Achievement Awards</li>
                      <li>• Top performer in advanced subjects</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-b from-blue-500/20 to-cyan-500/20 p-6 rounded-xl border border-blue-500/30">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2"><Rocket size={18} /> Professional Growth</h3>
                    <ul className="space-y-2 text-blue-100">
                      <li>• DRDO research collaboration</li>
                      <li>• Industry-academic bridge building</li>
                      <li>• Leadership in tech initiatives</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-b from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2"><Lightbulb size={18} /> Innovation Impact</h3>
                    <ul className="space-y-2 text-purple-100">
                      <li>• Blockchain protocol development</li>
                      <li>• Technical documentation</li>
                      <li>• Knowledge sharing & mentoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'culture' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-playfair text-white mb-6">Cultural Fit & Personality</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-4">🤝 Work Style</h3>
                    <div className="space-y-4">
                      <div className="bg-green-600/20 p-4 rounded-lg border border-green-500/30">
                        <h4 className="text-green-200 font-medium mb-2">Collaborative</h4>
                        <p className="text-green-100 text-sm">Proven track record in research partnerships and team projects</p>
                      </div>
                      <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                        <h4 className="text-blue-200 font-medium mb-2">Growth-Oriented</h4>
                        <p className="text-blue-100 text-sm">Continuous learning mindset with adaptability to new technologies</p>
                      </div>
                      <div className="bg-purple-600/20 p-4 rounded-lg border border-purple-500/30">
                        <h4 className="text-purple-200 font-medium mb-2">Problem Solver</h4>
                        <p className="text-purple-100 text-sm">Research background demonstrates analytical thinking and persistence</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-4 flex items-center gap-2"><Target size={20} /> Fun Facts</h3>
                    <div className="space-y-3">
                      {portfolioData.about.funFacts.map((fact, index) => (
                        <motion.div
                          key={index}
                          className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-4 rounded-lg border border-indigo-500/30"
                          whileHover={{ scale: 1.02 }}
                        >
                          <p className="text-white/90">{fact}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-500/30">
                      <h4 className="text-yellow-200 font-medium mb-2">Personal Quote</h4>
                      <blockquote className="text-yellow-100 italic">"{portfolioData.personal.quote}"</blockquote>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-md rounded-xl p-8 border border-green-500/30">
            <h3 className="text-2xl font-playfair text-white mb-4">Ready to Hire?</h3>
            <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
              Vidit is ready to bring his research expertise, technical skills, and collaborative mindset to your team. 
              Let's discuss how he can contribute to your organization's success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Interview
              </motion.button>
              <motion.button 
                onClick={handleDownloadResume}
                className="px-8 py-3 border border-blue-400 text-blue-200 rounded-full font-medium hover:bg-blue-600/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecruiterMode;
