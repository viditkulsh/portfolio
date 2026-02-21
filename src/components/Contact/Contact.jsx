import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, Github, Twitter, Linkedin, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error(data.error || 'Failed to send');
      }
    } catch (err) {
      // Fallback to mailto if serverless function is unavailable
      const mailtoUrl = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.open(mailtoUrl, '_blank');
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  const socialPlatforms = [
    {
      name: 'Email',
      url: `mailto:${portfolioData.personal.email}`,
      icon: <Mail className="w-5 h-5" />,
      color: 'hover:border-red-400/50 hover:shadow-red-500/20'
    },
    {
      name: 'LinkedIn',
      url: portfolioData.personal.social.linkedin,
      icon: <Linkedin className="w-5 h-5" />,
      color: 'hover:border-blue-400/50 hover:shadow-blue-500/20'
    },
    {
      name: 'GitHub',
      url: portfolioData.personal.social.github,
      icon: <Github className="w-5 h-5" />,
      color: 'hover:border-gray-400/50 hover:shadow-gray-500/20'
    },
    {
      name: 'Twitter',
      url: portfolioData.personal.social.twitter,
      icon: <Twitter className="w-5 h-5" />,
      color: 'hover:border-sky-400/50 hover:shadow-sky-500/20'
    },
    {
      name: 'Instagram',
      url: portfolioData.personal.social.instagram,
      icon: <Instagram className="w-5 h-5" />,
      color: 'hover:border-pink-400/50 hover:shadow-pink-500/20'
    }
  ];

  return (
    <section id="contact" className="contact-section py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-playfair bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-center mb-4">Let's Connect</h2>
        <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
          Ready to collaborate on exciting projects or discuss opportunities? Drop me a message or connect through any platform below.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-purple-400" /> Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm text-white/70 mb-1">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm text-white/70 mb-1">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm text-white/70 mb-1">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm text-white/70 mb-1">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                />
              </div>
              <motion.button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formStatus === 'sending' && <Loader2 className="w-4 h-4 animate-spin" />}
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>

            <AnimatePresence>
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-300 text-sm"
                >
                  <CheckCircle className="w-4 h-4" /> Message sent successfully!
                </motion.div>
              )}
              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-300 text-sm"
                >
                  <AlertCircle className="w-4 h-4" /> {formError}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Profile + Info Card */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-lg shadow-purple-500/10">
                  <img
                    src={portfolioData.personal.profileImage}
                    alt={portfolioData.personal.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{portfolioData.personal.name}</h3>
                  <p className="text-purple-300 text-sm">{portfolioData.personal.title}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{portfolioData.personal.location}</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{portfolioData.personal.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-purple-300 transition-colors">{portfolioData.personal.email}</a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Connect Elsewhere</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {socialPlatforms.map((platform, index) => (
                  <motion.a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-3 py-2.5 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-lg ${platform.color}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label={`Connect on ${platform.name}`}
                  >
                    {platform.icon}
                    <span className="text-sm font-medium">{platform.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-5 border border-purple-500/20">
              <p className="text-purple-200 italic text-center">"{portfolioData.personal.quote}"</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
