import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Navigation,
  Coffee
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const AIAssistant = ({ isRecruiterMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  
  const { 
    chatMessages, 
    addChatMessage, 
    portfolioData, 
    setCurrentSection,
    currentSection 
  } = usePortfolio();

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Initial greeting when first opened
  useEffect(() => {
    if (isOpen && chatMessages.length === 0) {
      setTimeout(() => {
        addChatMessage({
          id: Date.now(),
          type: 'ai',
          content: isRecruiterMode 
            ? "Hello! I'm Vidi, Vidit's AI assistant. I can help you navigate his professional achievements and find exactly what you're looking for. How can I assist you today?"
            : portfolioData.aiAssistant.responses.greeting,
          timestamp: new Date().toISOString()
        });
      }, 500);
    }
  }, [isOpen, chatMessages.length, isRecruiterMode]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    addChatMessage(userMessage);

    // Clear input
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message.toLowerCase());
      addChatMessage({
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date().toISOString(),
        actions: aiResponse.actions
      });
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateAIResponse = (userInput) => {
    const responses = portfolioData.aiAssistant.responses;
    
    // Navigation queries
    if (userInput.includes('project') || userInput.includes('work')) {
      return {
        content: "I'd love to show you Vidit's projects! He's built some really impressive things, from DeFi platforms to AI-powered e-commerce solutions. Which type of project interests you most?",
        actions: [
          { label: 'View All Projects', action: () => navigateToSection('projects') },
          { label: 'Blockchain Projects', action: () => filterProjects('blockchain') },
          { label: 'Full Stack Projects', action: () => filterProjects('fullstack') }
        ]
      };
    }
    
    if (userInput.includes('skill') || userInput.includes('tech')) {
      return {
        content: "Vidit has quite the technical arsenal! He's proficient in React, Node.js, blockchain development, and much more. Want to see his skills in action?",
        actions: [
          { label: 'View Skills Galaxy', action: () => navigateToSection('skills') },
          { label: 'Frontend Skills', action: () => filterSkills('frontend') },
          { label: 'Backend Skills', action: () => filterSkills('backend') }
        ]
      };
    }
    
    if (userInput.includes('experience') || userInput.includes('job') || userInput.includes('career')) {
      return {
        content: "Let me tell you about Vidit's professional journey! He's worked at several companies and has some great achievements. Want to explore his career timeline?",
        actions: [
          { label: 'View Experience', action: () => navigateToSection('experience') },
          { label: 'Current Role', action: () => showCurrentRole() }
        ]
      };
    }
    
    if (userInput.includes('about') || userInput.includes('who') || userInput.includes('bio')) {
      return {
        content: "Vidit is a passionate full-stack developer who loves turning complex problems into elegant solutions. He's got a great sense of humor about his coding journey too! Want to know more?",
        actions: [
          { label: 'About Vidit', action: () => navigateToSection('about') },
          { label: 'Fun Facts', action: () => showFunFacts() }
        ]
      };
    }
    
    if (userInput.includes('education') || userInput.includes('study') || userInput.includes('university')) {
      return {
        content: "Vidit studied Computer Science and has maintained excellent academic performance. His education section has a cool 3D campus visualization! Want to check it out?",
        actions: [
          { label: 'View Education', action: () => navigateToSection('education') }
        ]
      };
    }
    
    if (userInput.includes('certificate') || userInput.includes('cert')) {
      return {
        content: "Vidit has earned several impressive certifications from AWS, Meta, and others. They're displayed in a cool trophy shelf! Want to see them?",
        actions: [
          { label: 'View Certificates', action: () => navigateToSection('certificates') }
        ]
      };
    }
    
    if (userInput.includes('resume') || userInput.includes('cv')) {
      return {
        content: "I can help you get Vidit's resume! We have different versions tailored for specific roles. Which type of position are you considering him for?",
        actions: [
          { label: 'Full Stack Developer', action: () => downloadResume('full-stack-developer') },
          { label: 'Blockchain Developer', action: () => downloadResume('blockchain-developer') },
          { label: 'Frontend Developer', action: () => downloadResume('frontend-developer') },
          { label: 'Software Engineer', action: () => downloadResume('software-engineer') }
        ]
      };
    }
    
    if (userInput.includes('contact') || userInput.includes('reach') || userInput.includes('email')) {
      return {
        content: `You can reach Vidit at ${portfolioData.personal.email} or connect with him on LinkedIn, GitHub, or other social platforms. Would you like me to show you his contact information?`,
        actions: [
          { label: 'Contact Info', action: () => navigateToSection('contact') },
          { label: 'LinkedIn', action: () => window.open(portfolioData.personal.social.linkedin) },
          { label: 'GitHub', action: () => window.open(portfolioData.personal.social.github) }
        ]
      };
    }
    
    if (userInput.includes('fun') || userInput.includes('joke') || userInput.includes('humor')) {
      const funFact = portfolioData.about.funFacts[Math.floor(Math.random() * portfolioData.about.funFacts.length)];
      return {
        content: `Here's a fun fact about Vidit: ${funFact} 😄`,
        actions: [
          { label: 'More Fun Facts', action: () => showFunFacts() },
          { label: 'Behind the Scenes', action: () => showEasterEgg() }
        ]
      };
    }
    
    // Default response
    return {
      content: "I can help you explore Vidit's portfolio! You can ask me about his projects, skills, experience, education, or anything else you'd like to know. I can also navigate you directly to different sections or help you download his resume.",
      actions: [
        { label: 'View Projects', action: () => navigateToSection('projects') },
        { label: 'Skills Overview', action: () => navigateToSection('skills') },
        { label: 'Download Resume', action: () => navigateToSection('resume') }
      ]
    };
  };

  const navigateToSection = (section) => {
    setCurrentSection(section);
    // Add navigation logic here
  };

  const filterProjects = (type) => {
    // Add project filtering logic
  };

  const filterSkills = (category) => {
    // Add skill filtering logic
  };

  const showCurrentRole = () => {
    const currentRole = portfolioData.experience[0];
    addChatMessage({
      id: Date.now(),
      type: 'ai',
      content: `Vidit is currently working as a ${currentRole.position} at ${currentRole.company}. ${currentRole.description}`,
      timestamp: new Date().toISOString()
    });
  };

  const showFunFacts = () => {
    const facts = portfolioData.about.funFacts.join('\n• ');
    addChatMessage({
      id: Date.now(),
      type: 'ai',
      content: `Here are some fun facts about Vidit:\n• ${facts}`,
      timestamp: new Date().toISOString()
    });
  };

  const downloadResume = (variant) => {
    const resumeData = portfolioData.resumeVariants[variant];
    // Trigger download
    addChatMessage({
      id: Date.now(),
      type: 'ai',
      content: `Great choice! I'm preparing the ${resumeData.title} for download. This version highlights his expertise in ${resumeData.highlightedSkills.join(', ')}.`,
      timestamp: new Date().toISOString()
    });
  };

  const showEasterEgg = () => {
    addChatMessage({
      id: Date.now(),
      type: 'ai',
      content: "Psst... want to see something cool? Try typing 'idit' anywhere on the site! 🤫",
      timestamp: new Date().toISOString()
    });
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
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full flex items-center justify-center shadow-lg z-50 animate-pulse-glow"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bot size={24} className="text-primary-dark" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-6 right-6 w-96 h-96 bg-glassmorphism-bg backdrop-blur-xl border border-glassmorphism-border rounded-2xl shadow-2xl z-50 flex flex-col ${
              isMinimized ? 'h-16' : 'h-96'
            }`}
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-glassmorphism-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-primary-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-text">Vidi</h3>
                  <p className="text-xs text-primary-text/70">AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded text-primary-text/70"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div
                  ref={chatRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                >
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          msg.type === 'user'
                            ? 'bg-primary-purple text-white'
                            : 'bg-white/10 text-primary-text'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {msg.type === 'ai' ? (
                            <Bot size={14} className="text-primary-cyan" />
                          ) : (
                            <User size={14} />
                          )}
                          <span className="text-xs opacity-70">
                            {msg.type === 'ai' ? 'Vidi' : 'You'}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-line">{msg.content}</p>
                        
                        {/* Action Buttons */}
                        {msg.actions && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {msg.actions.map((action, index) => (
                              <button
                                key={index}
                                onClick={action.action}
                                className="text-xs bg-primary-cyan/20 hover:bg-primary-cyan/30 text-primary-cyan px-3 py-1 rounded-full transition-colors"
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 p-3 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <Bot size={14} className="text-primary-cyan" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary-cyan rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-primary-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-primary-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-glassmorphism-border">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about Vidit..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-primary-text placeholder-primary-text/50 focus:outline-none focus:border-primary-cyan"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="w-8 h-8 bg-primary-cyan rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-cyan/80 transition-colors"
                    >
                      <Send size={14} className="text-primary-dark" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
