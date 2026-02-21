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
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const AIAssistant = ({ isRecruiterMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [rateLimitReset, setRateLimitReset] = useState(null);
  const [error, setError] = useState(null);
  const chatRef = useRef(null);
  const lastMessageTime = useRef(Date.now());
  
  const { 
    chatMessages, 
    addChatMessage,
    currentMode
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
        const greetings = [
          "Hey there! 👋 I'm Vidit's AI assistant. Think of me as your personal tour guide through his portfolio. What would you like to explore?",
          "Hi! I'm here to help you discover what makes Vidit tick. Want to know about his projects, skills, or maybe that time he debugged code at 3 AM? Ask away!",
          "Hello! 🚀 Ready to dive into Vidit's world of blockchain, full-stack dev, and creative problem-solving? I've got all the insider info. What interests you?",
        ];
        addChatMessage({
          id: Date.now(),
          type: 'ai',
          content: greetings[Math.floor(Math.random() * greetings.length)],
          timestamp: new Date().toISOString()
        });
      }, 500);
    }
  }, [isOpen, chatMessages.length, addChatMessage]);

  // Rate limiting check
  const checkRateLimit = () => {
    const now = Date.now();
    if (rateLimitReset && now < rateLimitReset) {
      return false;
    }

      // Allow max 10 messages per minute
      if (messageCount >= 10) {
        const resetTime = lastMessageTime.current + 60000;
        if (now < resetTime) {
          setRateLimitReset(resetTime);
          return false;
        } else {
          setMessageCount(0);
          setRateLimitReset(null);
        }
      }
      return true;
    };

  const generateAIResponse = async (userInput) => {
    // Fallback responses if API unavailable
    const fallbackResponses = {
      projects: "Vidit's worked on some seriously cool stuff! From IditTrack (learned about RBAC and supply chain complexity at scale) to HemoChain (tokenization for blood donation tracking), and Sathi Sahyogi (volunteer coordination using blockchain when it actually makes sense). Want details on any specific project?",
      skills: "Vidit's got a solid blockchain and full-stack foundation: Solidity, Web3.js, React, Node.js, MongoDB. But what's really interesting is his approach—he asks 'when SHOULD we use blockchain?' rather than throwing it at every problem. That's the mark of someone who gets it. 🎯",
      experience: "Currently leading blockchain dev at AGP Webpulse LLC (UAE, remote), building RWA tokenization platforms. Before that: DRDO (cross-chain research), Astraeus Next Gen (smart contracts & bridges). Quick progression from research → product → leadership. The man's hungry to learn.",
      about: "Vidit's from Jaipur, raised in Delhi NCR. Wasn't a standout student in school, but university flipped a switch—8.78 CGPA in BCA (Hons) at Bennett. What changed? He found his passion. Now he's all about building trusted systems in fintech, focusing on verification, transparency, and solving real problems. Analytical, calm under pressure, and believes the best convos happen over chai. ☕",
      default: "That's a great question! While I don't have that specific info handy, I can tell you about Vidit's blockchain expertise, his current work on tokenization platforms, or his journey from research at DRDO to leadership at AGP. What interests you most?"
    };

      // Check if serverless API is available (always try it first)
      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();

        if (response.ok && data.response) {
          return data.response;
        }

        // If server returned a user-facing error message, show it
        if (response.status === 429) {
          throw new Error(data.error || 'Rate limited');
        }

        throw new Error(data.error || 'Server error');
      } catch (error) {
        console.error('Gemini API error:', error);
        setError('Oops! My AI brain hiccuped. Using my fallback responses instead.');

        // Return fallback based on input
        const input = userInput.toLowerCase();
        if (input.includes('project')) return fallbackResponses.projects;
        if (input.includes('skill') || input.includes('tech')) return fallbackResponses.skills;
        if (input.includes('experience') || input.includes('work') || input.includes('job')) return fallbackResponses.experience;
        if (input.includes('about') || input.includes('who') || input.includes('background')) return fallbackResponses.about;
        return fallbackResponses.default;
      }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

      // Check rate limit
      if (!checkRateLimit()) {
        setError('Whoa there! Taking a breather. Try again in a minute. ⏳');
        return;
      }

      // Add user message
      const userMessage = {
      id: Date.now(),
        type: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };
      addChatMessage(userMessage);

      // Update rate limiting
      setMessageCount(prev => prev + 1);
      lastMessageTime.current = Date.now();

      // Clear input and error
      setMessage('');
      setError(null);
      setIsTyping(true);

      try {
        const aiResponse = await generateAIResponse(message);

        // Simulate typing delay for better UX
        setTimeout(() => {
          addChatMessage({
              id: Date.now() + 1,
              type: 'ai',
              content: aiResponse,
              timestamp: new Date().toISOString()
            });
          setIsTyping(false);
        }, 800 + Math.random() * 400);
      } catch (error) {
        setIsTyping(false);
        setError('Something went wrong. Try asking me something else!');
      }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Don't render in recruiter mode
  if (isRecruiterMode || currentMode === 'recruiter') {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="w-6 h-6" />
            <motion.div
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              AI
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col"
            style={{ maxHeight: isMinimized ? '60px' : '600px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="w-6 h-6 text-white" />
                  <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Vidit's AI Assistant</h3>
                  <p className="text-white/70 text-xs">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={chatRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                  style={{ maxHeight: '440px' }}
                >
                  {chatMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.type === 'user'
                          ? 'bg-blue-600'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600'
                          }`}>
                          {msg.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                        </div>
                        <div className={`px-4 py-2 rounded-2xl ${msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/20 text-white backdrop-blur-sm'
                          }`}>
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start space-x-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-sm">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Error Display */}
                {error && (
                  <div className="px-4 py-2 bg-red-500/20 border-t border-red-500/30 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-300" />
                    <p className="text-sm text-red-200">{error}</p>
                  </div>
                )}

                {/* Rate Limit Warning */}
                {rateLimitReset && (
                  <div className="px-4 py-2 bg-yellow-500/20 border-t border-yellow-500/30 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-300" />
                    <p className="text-sm text-yellow-200">
                      Rate limit reached. Resets in {Math.ceil((rateLimitReset - Date.now()) / 1000)}s
                    </p>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about Vidit..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isTyping}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-white/50 mt-2 text-center">
                    Powered by Gemini AI • {messageCount}/10 messages
                  </p>
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
