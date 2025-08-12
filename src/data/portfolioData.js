// Portfolio Data - Edit this file to update your content easily
// Import dedicated section data files
import { skillsData } from './sections/skillsData.js';
import { projectsData } from './sections/projectsData.js';
import { socialMediaData } from './sections/socialMediaData.js';
import { experienceData } from './sections/experienceData.js';

export const portfolioData = {
  // Personal Information
  personal: {
    name: "Vidit Kulshrestha",
    title: "Full Stack & Blockchain Developer",
    tagline: "Engineering scalable solutions at the crossroads of web and blockchain innovation",
    shortIntro: "Tech enthusiast and problem solver with a strong foundation in distributed systems, blockchain interoperability, and full-stack development. Passionate about turning ideas into secure, scalable, and elegant digital solutions.",
    quote: "Build with precision, scale with vision.",
    email: "vidit.Kulshrestha@example.com",
    phone: "+91 9876543210",
    location: "Greater Noida, Uttar Pradesh, India",
    profileImage: "/images/profile.jpg",
    resume: "/resume/vidit_resume.pdf",
    social: {
      github: socialMediaData.platforms.github.url,
      leetcode: socialMediaData.platforms.leetcode.url,
      linkedin: socialMediaData.platforms.linkedin.url,
      instagram: socialMediaData.platforms.instagram.url,
      telegram: socialMediaData.platforms.telegram.url,
      twitter: socialMediaData.platforms.twitter.url,
      medium: socialMediaData.platforms.medium.url,
      codechef: socialMediaData.platforms.codechef.url
    }
  },

  // About Section
  about: {
    bio: "I am currently pursuing a Bachelor of Computer Applications (Honours) at Bennett University with a CGPA of 8.88/10. My academic journey is backed by deep dives into algorithm design, operating systems, cryptography, distributed systems, and blockchain technologies. I have collaborated with DRDO and Astraeus Next Gen on research in blockchain interoperability protocols, blending academic rigor with real-world applications. Beyond my technical expertise, I bring a blend of creativity, analytical thinking, and a passion for building technology that matters.",
    funFacts: [
      "Can switch from debugging Java to debating blockchain consensus algorithms without caffeine.",
      "Proud owner of consecutive Outstanding Academic Achievement awards.",
      "Known to join hackathons just for the adrenaline."
    ],
    timeline: [
      {
        year: "2024",
        title: "Senior Developer Journey Begins",
        description: "Started working on enterprise-level applications and leading development teams.",
        isHumorous: false
      },
      {
        year: "2023",
        title: "The Great Debugging Adventure",
        description: "Spent 3 weeks debugging a production issue, only to find out it was a missing semicolon. Character development: +100",
        isHumorous: true
      },
      {
        year: "2022",
        title: "Full Stack Mastery",
        description: "Achieved proficiency in React, Node.js, and blockchain development.",
        isHumorous: false
      },
      {
        year: "2021",
        title: "First 'Hello World' Addiction",
        description: "Started programming journey and immediately got addicted to the satisfaction of solving problems.",
        isHumorous: true
      }
    ]
  },

  // Education Section
  education: [
    {
      id: 1,
      institution: "Bennett University",
      degree: "Bachelor of Computer Applications (Honours)",
      field: "Computer Applications",
      duration: "Sep 2022 – Jul 2025 (Expected)",
      cgpa: "8.88/10",
      location: { x: -2, y: 0, z: 0 },
      keyCourses: [
        "Algorithm Design Strategies",
        "Operating Systems", 
        "OOP in Java",
        "Blockchain",
        "Cryptography",
        "DBMS",
        "Distributed Systems"
      ],
      capstone: "Blockchain interoperability protocols — in collaboration with DRDO and Astraeus Next Gen",
      achievements: [
        "Outstanding Academic Achievement - Semester 1 (SGPA: 9.48)",
        "Outstanding Academic Achievement - Semester 2 (SGPA: 9.2)",
        "Active member of ICB Student Chapter"
      ]
    }
  ],

  // Import skills from dedicated file
  skills: skillsData,

  // Import projects from dedicated file
  projects: projectsData,

  // Import experience from dedicated file
  experience: experienceData,

  // Certificates
  certificates: [
    {
      id: 1,
      title: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-12345",
      skills: ["Cloud Computing", "AWS", "DevOps"],
      image: "/images/certificates/aws.jpg",
      verificationUrl: "https://aws.amazon.com/verification/12345",
      icon: "☁️",
      trophy: {
        type: "gold",
        position: { x: -2, y: 0, z: 0 }
      }
    },
    {
      id: 2,
      title: "Certified Ethereum Developer",
      issuer: "ConsenSys Academy",
      date: "2023",
      credentialId: "ETH-67890",
      skills: ["Blockchain", "Solidity", "Smart Contracts"],
      image: "/images/certificates/ethereum.jpg",
      verificationUrl: "https://consensys.net/academy/verification/67890",
      icon: "💎",
      trophy: {
        type: "silver",
        position: { x: 0, y: 0, z: 0 }
      }
    },
    {
      id: 3,
      title: "React Advanced Certification",
      issuer: "Meta",
      date: "2022",
      credentialId: "META-11111",
      skills: ["React", "JavaScript", "Frontend"],
      image: "/images/certificates/react.jpg",
      verificationUrl: "https://www.coursera.org/account/accomplishments/verify/11111",
      icon: "⚛️",
      trophy: {
        type: "bronze",
        position: { x: 2, y: 0, z: 0 }
      }
    },
    {
      id: 4,
      title: "MongoDB Developer",
      issuer: "MongoDB University",
      date: "2022",
      credentialId: "MONGO-22222",
      skills: ["MongoDB", "Database", "NoSQL"],
      image: "/images/certificates/mongodb.jpg",
      verificationUrl: "https://university.mongodb.com/course_completion/22222",
      icon: "🍃",
      trophy: {
        type: "gold",
        position: { x: -1, y: 0, z: 1 }
      }
    }
  ],

  // Co-curricular Activities
  activities: [
    {
      id: 1,
      title: "ICB Student Chapter Member",
      event: "Bennett University",
      description: "Active member contributing to blockchain and technology initiatives",
      date: "2022-Present",
      type: "organization",
      icon: "🏛️",
      stickyNote: "Building the future of blockchain technology! 🚀"
    },
    {
      id: 2,
      title: "Hackathon Participant",
      event: "Various Technical Symposiums",
      description: "Regular participant in hackathons and technical competitions",
      date: "2022-Present",
      type: "competition",
      icon: "🏆",
      stickyNote: "Turning caffeine into code since 2022! ☕"
    },
    {
      id: 3,
      title: "Research Publication",
      event: "Academic Conferences",
      description: "Contributed to research papers on blockchain interoperability",
      date: "2023-Present",
      type: "academic",
      icon: "📄",
      stickyNote: "Making blockchain dreams into reality!"
    },
    {
      id: 4,
      title: "Technical Writing",
      event: "Various Platforms",
      description: "Writing technical articles and documentation for blockchain projects",
      date: "2022-Present",
      type: "writing",
      icon: "✍️",
      stickyNote: "Explaining complex tech in simple words!"
    }
  ],

  // Social Media (import from dedicated file)
  socialMedia: socialMediaData,

  // Resume Variants for different roles
  resumeVariants: {
    "full-stack-developer": {
      title: "Full Stack Developer Resume",
      filename: "Vidit_Kulshrestha_FullStack.pdf",
      highlightedSkills: ["React.js", "Node.js", "MongoDB", "JavaScript"],
      relevantProjects: [2],
      relevantExperience: [1]
    },
    "blockchain-developer": {
      title: "Blockchain Developer Resume", 
      filename: "Vidit_Kulshrestha_Blockchain.pdf",
      highlightedSkills: ["Blockchain Development", "Smart Contracts", "Cryptography", "Distributed Systems"],
      relevantProjects: [1],
      relevantExperience: [1]
    },
    "software-engineer": {
      title: "Software Engineer Resume",
      filename: "Vidit_Kulshrestha_SWE.pdf",
      highlightedSkills: ["Java", "JavaScript", "Algorithm Design", "System Design"],
      relevantProjects: [1, 2],
      relevantExperience: [1]
    }
  },

  // AI Assistant Personality
  aiAssistant: {
    name: "VidiAI",
    personality: "professional, knowledgeable, slightly enthusiastic about blockchain",
    responses: {
      greeting: "Hello! I'm VidiAI, Vidit's AI assistant. I'm here to help you explore his impressive journey in blockchain and full-stack development. What would you like to know about his work?",
      skills: "Vidit has expertise in {skillList}. His strongest areas are blockchain development and full-stack web technologies. Would you like to see projects where he's applied these skills?",
      projects: "Let me tell you about {projectName} - {projectDescription}. This project showcases Vidit's ability to work on cutting-edge technology.",
      experience: "Vidit is currently collaborating with {company} on {achievement}. His research in blockchain interoperability is quite impressive!",
      education: "Vidit is pursuing BCA Honours at Bennett University with an outstanding 8.88/10 CGPA, including consecutive Outstanding Academic Achievement awards.",
      navigation: "I can guide you through any section of Vidit's portfolio. Would you like to see his projects, skills, education, or learn about his research work?",
      recruiter: "Perfect! Let me highlight Vidit's key achievements: 8.88/10 CGPA, research collaboration with DRDO, blockchain expertise, and strong full-stack development skills. What specific role are you considering him for?"
    }
  },

  // Site Configuration
  siteConfig: {
    title: "Vidit Kulshrestha - Portfolio",
    description: "Full Stack & Blockchain Developer engineering scalable solutions at the crossroads of web and blockchain innovation",
    keywords: ["Vidit Kulshrestha", "Full Stack Developer", "Blockchain Developer", "Bennett University", "DRDO", "Portfolio"],
    url: "https://viditKulshrestha.com",
    image: "/images/og-image.jpg",
    favicon: "/favicon.ico"
  }
};

// Utility function to get data by category
export const getDataByCategory = (category) => {
  return portfolioData[category] || null;
};

// Utility function to get project by ID
export const getProjectById = (id) => {
  return portfolioData.projects.find(project => project.id === parseInt(id));
};

// Utility function to get featured projects
export const getFeaturedProjects = () => {
  return portfolioData.projects.filter(project => project.featured);
};

// Utility function to get skills by category
export const getSkillsByCategory = (categoryName) => {
  const category = portfolioData.skills.categories.find(cat => cat.name === categoryName);
  return category ? category.skills : [];
};

export default portfolioData;
