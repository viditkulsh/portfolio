import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

// ─────────────────────────────────────────────────────────────────────────────
// Suggested questions — shown as chips when chat is empty or after greeting
// ─────────────────────────────────────────────────────────────────────────────
const SUGGESTED_QUESTIONS = [
  { label: '🧠 How you think', text: 'What\'s your decision-making process like?' },
  { label: '⛓️ Blockchain?', text: 'How did you get into blockchain and what excites you about it?' },
  { label: '💼 Current work', text: 'What are you actually building right now at AGP?' },
  { label: '🛠️ Tech stack', text: 'What technologies do you work with and which ones excite you most?' },
  { label: '🚀 Ambitions', text: 'Where do you see yourself in the next few years?' },
  { label: '🤔 Weaknesses?', text: 'What are your biggest weaknesses as a developer?' },
];

const AIAssistant = ({ isRecruiterMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [rateLimitReset, setRateLimitReset] = useState(null);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const lastMessageTime = useRef(Date.now());
  const pendingMessage = useRef(null);
  
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
  }, [chatMessages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  // Initial greeting when first opened
  useEffect(() => {
    if (isOpen && chatMessages.length === 0) {
      setTimeout(() => {
        const greetings = [
          "Hey! 👋 I'm Mini-Vidit — the digital version. Same brain, slightly better uptime. What do you want to know?",
          "Yo! I'm Vidit's digital clone. Ask me anything — projects, skills, that time I debugged at 3 AM, or why blockchain isn't always the answer. Fire away!",
          "Hey there! I'm Mini-Vidit. Here's the thing — I know everything about my portfolio, my projects, my journey. So ask me anything, and let's have a good conversation over virtual chai ☕",
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

  // Hide suggestions after user sends a couple of messages
  useEffect(() => {
    const userMsgCount = chatMessages.filter(m => m.type === 'user').length;
    if (userMsgCount >= 2) setShowSuggestions(false);
  }, [chatMessages]);

  // Build conversation history for API
  const buildHistory = useCallback(() => {
    return chatMessages
      .filter(msg => msg.type === 'user' || msg.type === 'ai')
      .map(msg => ({
        role: msg.type === 'user' ? 'user' : 'model',
        text: msg.content
      }));
  }, [chatMessages]);

  // Rate limiting check
  const checkRateLimit = () => {
    const now = Date.now();
    if (rateLimitReset && now < rateLimitReset) {
      return false;
    }

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
    // Fallback responses matching Vidit's voice
    const fallbackResponses = {
      projects: "Here's the thing — I've built some interesting stuff. IditTrack taught me supply chains aren't linear, they're complex webs of permissions. HemoChain showed me tokenization isn't just for finance — each blood unit becomes an NFT with provenance. And Sathi Sahyogi? That's where I learned not everything needs blockchain. The key question is always: does this problem benefit from trustless verification? If no, skip the blockchain.",
      skills: "My strongest areas are blockchain (Solidity, smart contracts, cross-chain) and full-stack (React, Node, MongoDB). But the tech doesn't matter as much as knowing WHEN to use it. I ask 'does this problem actually need blockchain?' before jumping in. Systems thinking over feature shipping.",
      experience: "Currently at AGP Webpulse LLC — translating regulatory requirements into technical architecture for RWA tokenization. Before that, DRDO for cross-chain research (pure patience, that one) and Astraeus for smart contracts. The progression: research -> development -> systems architecture. Each step was intentional.",
      about: "Born in Jaipur, raised in Delhi NCR. School wasn't my strongest phase, not gonna lie. But university flipped a switch — 8.78 CGPA at Bennett. What changed? I found what clicks. Three words: Analytical. Strategic. Ambitious. I think in years, not weeks, and I design foundations, not features.",
      blockchain: "I got into blockchain because it solves trust problems elegantly. Started with Mood Dapp (baby steps), then HemoChain, then DRDO research on cross-chain interoperability, and now RWA tokenization at AGP. The journey from 'what is a smart contract' to 'let me architect a tokenization platform' took about 2 years. I don't gamble — I architect risk.",
      ambition: "Long-term? Tech founder or deep systems architect in high-impact infrastructure. Industries that excite me: AI, blockchain infrastructure, financial systems, tokenized assets, decentralized governance. I'm not chasing titles — I'm building leverage for something bigger.",
      default: "Not gonna lie, I don't have specific info on that. But I can tell you about my blockchain work, how I think about systems, or my path from research to production architecture. What interests you?"
    };

    try {
      const history = buildHistory();

      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userInput,
          history: history
        })
      });

      const data = await response.json();

      if (response.ok && data.response) {
        return data.response;
      }

      if (response.status === 429) {
        throw new Error(data.error || 'Rate limited');
      }

      throw new Error(data.error || 'Server error');
    } catch (err) {
      console.error('Gemini API error:', err);
      setError('Brain hiccuped — using backup memory instead.');

      const input = userInput.toLowerCase();
      if (input.includes('project') || input.includes('built') || input.includes('portfolio')) return fallbackResponses.projects;
      if (input.includes('skill') || input.includes('tech') || input.includes('stack')) return fallbackResponses.skills;
      if (input.includes('experience') || input.includes('work') || input.includes('job') || input.includes('role')) return fallbackResponses.experience;
      if (input.includes('about') || input.includes('who') || input.includes('background') || input.includes('journey')) return fallbackResponses.about;
      if (input.includes('blockchain') || input.includes('web3') || input.includes('solidity') || input.includes('crypto')) return fallbackResponses.blockchain;
      if (input.includes('ambition') || input.includes('future') || input.includes('goal') || input.includes('direction') || input.includes('founder')) return fallbackResponses.ambition;
      return fallbackResponses.default;
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    if (!checkRateLimit()) {
      setError('Easy there! Too many messages. Give me a sec to breathe 😄');
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };
    addChatMessage(userMessage);
    pendingMessage.current = text;

    setMessageCount(prev => prev + 1);
    lastMessageTime.current = Date.now();
    setMessage('');
    setError(null);
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(text);

      setTimeout(() => {
        addChatMessage({
          id: Date.now() + 1,
          type: 'ai',
          content: aiResponse,
          timestamp: new Date().toISOString()
        });
        setIsTyping(false);
        pendingMessage.current = null;
      }, 600 + Math.random() * 600);
    } catch (err) {
      setIsTyping(false);
      pendingMessage.current = null;
      setError('Something went sideways. Try asking something else!');
    }
  };

  const handleSendMessage = () => sendMessage(message);

  const handleSuggestionClick = (text) => {
    sendMessage(text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    // Clear messages by reloading — simplest approach since context doesn't have CLEAR action
    window.location.reload();
  };

  // Don't render in recruiter mode
  if (isRecruiterMode || currentMode === 'recruiter') {
    return null;
  }

  const userMessageCount = chatMessages.filter(m => m.type === 'user').length;

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
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-purple-500/25 hover:shadow-xl transition-shadow"
            aria-label="Chat with Mini-Vidit"
          >
            <MessageCircle className="w-6 h-6" />
            <motion.div
              className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              V
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
              height: isMinimized ? 'auto' : undefined
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-96 bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-900/20 border border-white/10 overflow-hidden flex flex-col"
            style={{
              maxHeight: isMinimized ? '60px' : '600px',
              height: isMinimized ? 'auto' : '600px'
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-sm p-3.5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-0.5 -right-0.5" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-purple-600" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Mini-Vidit</h3>
                  <p className="text-white/60 text-[11px]">Same brain, better uptime</p>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={handleClearChat}
                  className="text-white/60 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                  title="New conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/60 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={chatRef}
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                >
                  {chatMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 ${msg.type === 'user'
                          ? 'bg-blue-600/80'
                          : 'bg-gradient-to-br from-purple-500 to-blue-500'
                          }`}>
                          {msg.type === 'user' ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <div className={`px-3.5 py-2.5 rounded-2xl ${msg.type === 'user'
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : 'bg-white/[0.08] text-white/90 border border-white/[0.06] rounded-bl-md'
                          }`}>
                          <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Suggested Questions — show after greeting */}
                  {showSuggestions && chatMessages.length > 0 && chatMessages.length <= 2 && !isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="pt-2"
                    >
                      <p className="text-[11px] text-white/40 mb-2 px-1">Try asking:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {SUGGESTED_QUESTIONS.map((q, i) => (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.08 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleSuggestionClick(q.text)}
                            disabled={isTyping}
                            className="text-[11px] px-2.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.08] hover:border-white/[0.15] text-white/70 hover:text-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {q.label}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-2"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.08] border border-white/[0.06]">
                        <div className="flex space-x-1.5">
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                            className="w-1.5 h-1.5 bg-white/60 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
                            className="w-1.5 h-1.5 bg-white/60 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
                            className="w-1.5 h-1.5 bg-white/60 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Error Display */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 py-2 bg-red-500/10 border-t border-red-500/20 flex items-center space-x-2 flex-shrink-0"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      <p className="text-[11px] text-red-300">{error}</p>
                      <button
                        onClick={() => setError(null)}
                        className="ml-auto text-red-400 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Rate Limit Warning */}
                {rateLimitReset && (
                  <div className="px-4 py-2 bg-yellow-500/10 border-t border-yellow-500/20 flex items-center space-x-2 flex-shrink-0">
                    <AlertCircle className="w-3.5 h-3.5 text-yellow-400" />
                    <p className="text-[11px] text-yellow-300">
                      Taking a breather. Resets in {Math.ceil((rateLimitReset - Date.now()) / 1000)}s
                    </p>
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-white/[0.06] flex-shrink-0 bg-gray-900/50">
                  <div className="flex items-center space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask me anything..."
                      disabled={isTyping}
                      className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/30 transition-all disabled:opacity-50"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isTyping}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <p className="text-[10px] text-white/25 mt-1.5 text-center">
                    Mini-Vidit • Powered by Gemini{userMessageCount > 0 ? ` • ${messageCount}/10 msgs` : ''}
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
