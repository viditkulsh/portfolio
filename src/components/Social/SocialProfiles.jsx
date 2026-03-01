import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, MessageCircle, Twitter, Mail, Code, Coffee, BookOpen } from 'lucide-react';

const SocialProfiles = ({ compact = false }) => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/viditkulsh',
      icon: Github,
      color: '#00FFE0',
      hoverColor: '#00E6CC'
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/viditkulsh',
      icon: Code,
      color: '#FFA116',
      hoverColor: '#FF8F00'
    },
    {
      name: 'Codolio',
      url: 'https://codolio.com/viditkulsh',
      icon: Coffee,
      color: '#A020F0',
      hoverColor: '#8E1FD9'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/viditkulsh',
      icon: Instagram,
      color: '#E4405F',
      hoverColor: '#C13584'
    },
    {
      name: 'Telegram',
      url: 'https://t.me/viditkulsh',
      icon: MessageCircle,
      color: '#0088CC',
      hoverColor: '#0077B5'
    },
    {
      name: 'X (Twitter)',
      url: 'https://twitter.com/viditkulsh',
      icon: Twitter,
      color: '#1DA1F2',
      hoverColor: '#0D8BD9'
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@viditkulsh',
      icon: BookOpen,
      color: '#00AB6C',
      hoverColor: '#00955C'
    },
    {
      name: 'Email',
      url: 'mailto:viditkulsh@gmail.com',
      icon: Mail,
      color: '#00FFE0',
      hoverColor: '#00E6CC'
    },
    {
      name: 'CodeChef',
      url: 'https://codechef.com/users/viditkulsh',
      icon: Code,
      color: '#5B4638',
      hoverColor: '#4A3429'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: compact ? 0.05 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  if (compact) {
    return (
      <motion.div
        className="flex items-center justify-center gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {socialLinks.slice(0, 6).map((social) => {
          const IconComponent = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1,
                boxShadow: `0 0 20px ${social.color}40`
              }}
              whileTap={{ scale: 0.95 }}
            >
              <IconComponent 
                size={16} 
                className="text-primary-text group-hover:text-white transition-colors"
                style={{ color: 'currentColor' }}
              />
            </motion.a>
          );
        })}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 
        className="text-lg font-semibold text-primary-text mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Connect With Me
      </motion.h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 group-hover:bg-white/5">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid currentColor',
                    color: '#EDEDED'
                  }}
                >
                  <IconComponent 
                    size={24} 
                    className="transition-colors duration-300"
                    style={{
                      color: 'currentColor'
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-primary-text group-hover:text-white transition-colors">
                  {social.name}
                </span>
              </div>

              {/* Hover effect with brand color */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${social.color}10, ${social.hoverColor}20)`,
                  boxShadow: `0 0 30px ${social.color}30`
                }}
              />

              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary-dark border border-primary-cyan rounded-lg px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <span className="text-sm text-primary-text whitespace-nowrap">
                  Visit {social.name}
                </span>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-primary-cyan"></div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Additional Info */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p className="text-primary-text/70 text-sm">
          Always open to collaborating on exciting projects!
        </p>
        <motion.div
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-cyan/20 to-primary-purple/20 rounded-full border border-primary-cyan/30"
          whileHover={{ scale: 1.05 }}
        >
          <Mail size={16} className="text-primary-cyan" />
          <a 
            href="mailto:viditkulsh@gmail.com"
            className="text-primary-text hover:text-primary-cyan transition-colors"
          >
            viditkulsh@gmail.com
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SocialProfiles;
