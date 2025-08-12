// Social Media Data - All social media links and configurations
export const socialMediaData = {
  platforms: {
    github: {
      name: "GitHub",
      url: "https://github.com/viditkulsh",
      icon: "🐙",
      color: "#181717",
      description: "Code repositories and open source contributions"
    },
    leetcode: {
      name: "LeetCode",
      url: "https://leetcode.com/viditkulsh",
      icon: "🟨",
      color: "#FFA116",
      description: "Algorithm practice and competitive programming"
    },
    codeforces: {
      name: "Codeforces",
      url: "https://codeforces.com/profile/viditkulsh",
      icon: "🎯",
      color: "#1F8ACB",
      description: "Competitive programming contests"
    },
    codechef: {
      name: "CodeChef",
      url: "https://codechef.com/users/viditkulsh",
      icon: "🍳",
      color: "#5B4638",
      description: "Programming contests and challenges"
    },
    linkedin: {
      name: "LinkedIn",
      url: "https://linkedin.com/in/viditkulsh",
      icon: "💼",
      color: "#0A66C2",
      description: "Professional network and career updates"
    },
    twitter: {
      name: "Twitter",
      url: "https://twitter.com/viditkulsh",
      icon: "🐦",
      color: "#1DA1F2",
      description: "Tech thoughts and industry insights"
    },
    instagram: {
      name: "Instagram",
      url: "https://instagram.com/viditkulsh",
      icon: "📸",
      color: "#E4405F",
      description: "Behind the scenes and personal moments"
    },
    telegram: {
      name: "Telegram",
      url: "https://t.me/viditkulsh",
      icon: "📱",
      color: "#26A5E4",
      description: "Quick communication and updates"
    },
    medium: {
      name: "Medium",
      url: "https://medium.com/@viditkulsh",
      icon: "✍️",
      color: "#000000",
      description: "Technical articles and insights"
    },
    stackoverflow: {
      name: "Stack Overflow",
      url: "https://stackoverflow.com/users/viditkulsh",
      icon: "📚",
      color: "#F58025",
      description: "Community contributions and Q&A"
    },
    discord: {
      name: "Discord",
      url: "https://discord.gg/viditkulsh",
      icon: "🎮",
      color: "#5865F2",
      description: "Gaming and community discussions"
    },
    youtube: {
      name: "YouTube",
      url: "https://youtube.com/@viditkulsh",
      icon: "📺",
      color: "#FF0000",
      description: "Tech tutorials and project walkthroughs"
    }
  },
  
  // Featured platforms (shown prominently)
  featured: ['github', 'linkedin', 'leetcode', 'twitter'],
  
  // Professional platforms (for recruiter mode)
  professional: ['linkedin', 'github', 'stackoverflow', 'medium'],
  
  // Social platforms (for personal connections)
  social: ['twitter', 'instagram', 'telegram', 'discord'],
  
  // Coding platforms (for technical assessment)
  coding: ['github', 'leetcode', 'codeforces', 'codechef', 'stackoverflow']
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
