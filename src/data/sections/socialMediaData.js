// Social Media Data - All social media links and configurations
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Send,
  Mail,
  MessageCircle,
  PenTool,
  Trophy,
  BarChart3
} from 'lucide-react';

export const socialMediaData = {
  platforms: {
    github: {
      name: "GitHub",
      url: "https://github.com/viditkulsh",
      icon: Github,
      color: "#181717",
      description: "Code repositories and open source contributions"
    },
    leetcode: {
      name: "LeetCode", 
      url: "https://leetcode.com/u/viditkul08",
      icon: Trophy,
      color: "#FFA116",
      description: "Algorithm practice and competitive programming"
    },
    codolio: {
      name: "Codolio",
      url: "https://codolio.com/profile/viditkul08",
      icon: BarChart3,
      color: "#0D6EFD",
      description: "Professional coding portfolio and skill showcase"
    },
    linkedin: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/vidit-kulshrestha/",
      icon: Linkedin,
      color: "#0A66C2",
      description: "Professional network and career updates"
    },
    twitter: {
      name: "X",
      url: "https://x.com/vidit_kulsh",
      icon: Twitter,
      color: "#000000",
      description: "Tech thoughts and industry insights"
    },
    instagram: {
      name: "Instagram",
      url: "https://www.instagram.com/vidit_kulshrestha/",
      icon: Instagram,
      color: "#E4405F",
      description: "Behind the scenes and personal moments"
    },
    telegram: {
      name: "Telegram",
      url: "https://t.me/vidit_kulshrestha",
      icon: Send,
      color: "#26A5E4",
      description: "Quick communication and updates"
    },
    medium: {
      name: "Medium",
      url: "https://medium.com/@viditkul08",
      icon: PenTool,
      color: "#000000",
      description: "Technical articles and insights"
    },
    discord: {
      name: "Discord",
      url: "https://discord.com/users/766609675638276097",
      icon: MessageCircle,
      color: "#5865F2",
      description: "Gaming and community discussions"
    },
    email: {
      name: "Email",
      url: "mailto:viditkulsh.work@gmail.com",
      icon: Mail,
      color: "#D44638",
      description: "Direct contact via email"
    },
    codechef: {
      name: "CodeChef",
      url: "https://www.codechef.com/users/viditkulsh",
      icon: Trophy,
      color: "#5B4638",
      description: "Competitive programming and algorithm challenges"
    }
  },
  
  // Featured platforms (shown prominently)
  featured: ['github', 'linkedin', 'leetcode', 'twitter'],
  
  // Professional platforms (for recruiter mode)
  professional: ['linkedin', 'github', 'codolio', 'medium', 'email'],
  
  // Social platforms (for personal connections)
  social: ['twitter', 'instagram', 'telegram', 'discord'],
  
  // Coding platforms (for technical assessment)
  coding: ['github', 'leetcode', 'codolio']
};

// Utility functions for social media data
export const getFeaturedPlatforms = () => {
  return socialMediaData.featured.map(platform => 
    socialMediaData.platforms[platform]
  ).filter(Boolean);
};

export const getProfessionalPlatforms = () => {
  return socialMediaData.professional.map(platform => 
    socialMediaData.platforms[platform]
  ).filter(Boolean);
};

export const getSocialPlatforms = () => {
  return socialMediaData.social.map(platform => 
    socialMediaData.platforms[platform]
  ).filter(Boolean);
};

export const getCodingPlatforms = () => {
  return socialMediaData.coding.map(platform => 
    socialMediaData.platforms[platform]
  ).filter(Boolean);
};

export const getPlatformByName = (name) => {
  return socialMediaData.platforms[name.toLowerCase()];
};

export const getAllPlatforms = () => {
  return Object.values(socialMediaData.platforms);
};

export default socialMediaData;
