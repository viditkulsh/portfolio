import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm Vidit's AI assistant. I can help you navigate his portfolio or answer questions about his skills, projects, and experience. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { portfolioData, navigateToSection } = usePortfolio();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Navigation commands
    if (message.includes('show') || message.includes('go to') || message.includes('navigate')) {
      if (message.includes('project')) {
        navigateToSection('projects');
        return "Taking you to Vidit's projects section! You'll see his blockchain platforms, web apps, and AI tools.";
      }
      if (message.includes('skill')) {
        navigateToSection('skills');
        return "Here are Vidit's technical skills! He's proficient in React, Node.js, Python, blockchain technologies, and much more.";
      }
      if (message.includes('education')) {
        navigateToSection('education');
        return "Showing Vidit's educational background. He's currently pursuing B.Tech in CSE with a strong CGPA.";
      }
      if (message.includes('experience')) {
        navigateToSection('experience');
        return "Here's Vidit's professional experience, including his roles at startups and tech companies.";
      }
      if (message.includes('about')) {
        navigateToSection('about');
        return "Let me tell you about Vidit - a passionate full-stack developer with expertise in blockchain and AI!";
      }
    }

    // Skill-related questions
    if (message.includes('blockchain') || message.includes('web3')) {
      return `Vidit has extensive blockchain experience! He's built ${portfolioData.projects.filter(p => p.tags.includes('Blockchain')).length} blockchain projects including decentralized exchanges, NFT platforms, and DeFi applications. His tech stack includes Solidity, Web3.js, and various blockchain frameworks.`;
    }

    if (message.includes('react') || message.includes('frontend')) {
      return "Vidit is highly skilled in React and modern frontend technologies! He's built responsive, interactive applications using React, Next.js, TailwindCSS, and Framer Motion. This very portfolio showcases his frontend expertise!";
    }

    if (message.includes('backend') || message.includes('node')) {
      return "On the backend, Vidit works with Node.js, Express, Python Django/Flask, and database technologies like MongoDB and PostgreSQL. He's built scalable APIs and microservices architectures.";
    }

    // Project-specific questions
    if (message.includes('best project') || message.includes('favorite project')) {
      const featuredProject = portfolioData.projects.find(p => p.featured);
      return `Vidit's most notable project is ${featuredProject?.title || 'his blockchain trading platform'}! It showcases his full-stack capabilities and innovative problem-solving skills.`;
    }

    // General questions
    if (message.includes('hire') || message.includes('why')) {
      return "Vidit combines technical expertise with creative problem-solving! His diverse project portfolio, strong academic background, and passion for emerging technologies make him an ideal candidate for innovative teams.";
    }

    if (message.includes('contact') || message.includes('reach')) {
      return `You can reach Vidit at ${portfolioData.personal.email} or connect with him on LinkedIn. He's always open to discussing exciting opportunities!`;
    }

    if (message.includes('resume') || message.includes('cv')) {
      return "You can download Vidit's resume using the resume selector in the top-right corner! There are different versions optimized for Full Stack, Blockchain, and Software Engineering roles.";
    }

    // Default responses
    const defaultResponses = [
      "That's an interesting question! Could you be more specific? I can help you learn about Vidit's skills, projects, experience, or navigate to different sections.",
      "I'd be happy to help! Try asking about Vidit's blockchain projects, his technical skills, or his experience. You can also ask me to navigate to specific sections!",
      "Great question! I can tell you about Vidit's background, showcase his projects, or help you understand why he'd be perfect for your team. What interests you most?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full shadow-neon flex items-center justify-center ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(0, 255, 224, 0.5)',
            '0 0 30px rgba(160, 32, 240, 0.7)',
            '0 0 20px rgba(0, 255, 224, 0.5)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles size={24} className="text-primary-dark" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-96 h-[32rem] bg-primary-dark/95 backdrop-blur-xl border border-primary-cyan/30 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary-cyan/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full flex items-center justify-center">
                  <Sparkles size={16} className="text-primary-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-text">AI Assistant</h3>
                  <p className="text-xs text-primary-text/60">Portfolio Guide</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={16} className="text-primary-text" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-primary-cyan to-primary-purple text-primary-dark'
                        : 'bg-white/10 text-primary-text'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-cyan rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-primary-cyan/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Vidit's skills, projects, or experience..."
                  className="flex-1 bg-white/10 border border-primary-cyan/30 rounded-xl px-4 py-2 text-primary-text placeholder-primary-text/50 focus:outline-none focus:border-primary-cyan"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send size={16} className="text-primary-dark" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
