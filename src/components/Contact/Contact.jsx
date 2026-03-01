import React from 'react';
import { Mail, Instagram, Github, Twitter, Linkedin, MapPin } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './Contact.css';

const Contact = () => {
  const socialPlatforms = [
    {
      name: 'Email',
      url: `mailto:${portfolioData.personal.email}?subject=Regarding%20Opportunity&body=Hello%20${portfolioData.personal.name},%0A%0AI%20hope%20this%20email%20finds%20you%20well.%20I%20am%20reaching%20out%20regarding%20a%20potential%20opportunity...`,
      icon: <Mail className="w-6 h-6" />,
      color: 'text-red-400 hover:text-red-300'
    },
    {
      name: 'LinkedIn',
      url: portfolioData.personal.social.linkedin,
      icon: <Linkedin className="w-6 h-6" />,
      color: 'text-blue-400 hover:text-blue-300'
    },
    {
      name: 'GitHub',
      url: portfolioData.personal.social.github,
      icon: <Github className="w-6 h-6" />,
      color: 'text-gray-400 hover:text-gray-300'
    },
    {
      name: 'Twitter',
      url: portfolioData.personal.social.twitter,
      icon: <Twitter className="w-6 h-6" />,
      color: 'text-blue-400 hover:text-blue-300'
    },
    {
      name: 'Instagram',
      url: portfolioData.personal.social.instagram,
      icon: <Instagram className="w-6 h-6" />,
      color: 'text-pink-400 hover:text-pink-300'
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="max-w-4xl mx-auto">
        <h2 className="contact-title text-center mb-8">Let's Connect</h2>
        
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30">
            <img 
              src={portfolioData.personal.profileImage}
              alt={portfolioData.personal.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">{portfolioData.personal.name}</h3>
            <p className="text-blue-200 text-lg mb-3">{portfolioData.personal.title}</p>
            <div className="flex flex-col sm:flex-row gap-4 text-blue-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{portfolioData.personal.location}</span>
              </div>
              <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                <Mail className="w-4 h-4" />
                <span>{portfolioData.personal.email}</span>
              </a>
            </div>
          </div>
        </div>

        <p className="contact-description text-center text-blue-200 mb-8">
          Ready to collaborate on exciting projects or discuss opportunities? 
          Feel free to reach out through any of these platforms!
        </p>
        
        {/* Social Links */}
        <div className="contact-footer flex justify-center gap-6 flex-wrap">
          {socialPlatforms.map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-icon flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20 ${platform.color}`}
              title={`Connect on ${platform.name}`}
            >
              {platform.icon}
              <span className="hidden sm:inline text-sm font-medium">{platform.name}</span>
            </a>
          ))}
        </div>

        {/* Professional Tagline */}
        <div className="text-center mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
          <p className="text-purple-200 italic">"{portfolioData.personal.quote}"</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;