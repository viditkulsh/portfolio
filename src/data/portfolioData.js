// Portfolio Data - Edit this file to update your content easily
// Import dedicated section data files
import { skillsData } from './sections/skillsData.js';
import { projectsData } from './sections/projectsData.js';
import { socialMediaData } from './sections/socialMediaData.js';
import { experienceData } from './sections/experienceData.js';
import { Trophy, Building } from 'lucide-react';

export const portfolioData = {
  // Personal Information
  personal: {
    name: "Vidit Kulshrestha",
    title: "Full Stack & Blockchain Developer",
    tagline: "Engineering scalable solutions at the crossroads of web and blockchain innovation",
    shortIntro: "Tech enthusiast and problem solver with a strong foundation in distributed systems, blockchain interoperability, and full-stack development. Passionate about turning ideas into secure, scalable, and elegant digital solutions.",
    quote: "Read Analyze Execute",
    email: "viditkulsh.work@gmail.com",
    phone: "+91-9205075815",
    location: "Delhi NCR, India",
    profileImage: "/images/profile.jpeg",
    resume: "/resumes/Vidit Kulsh CV Full Stack.pdf",
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
    bio: `I recently wrapped up my BCA (Hons) at Bennett University in 2025 with a GPA of 8.78/10. Over the last few years, I’ve gone deep into algorithm design, operating systems, cryptography, distributed systems, and blockchain technologies. Along the way, I had the chance to work with DRDO and Astraeus Next Gen on blockchain interoperability protocols—turning theory into something that actually works in the real world.
    I like building tech that matters, mixing creativity with solid problem-solving skills. Right now, I’m on the lookout for opportunities that aren’t just “a job,” but the right fit—where I can make an impact and keep learning at the same time.`,
    funFacts: [
      "Can switch from debugging Java to debating blockchain consensus algorithms without caffeine.",
      "Proud owner of consecutive Outstanding Academic Achievement awards.",
      "Known to join hackathons just for the adrenaline."
    ],

    timeline: [
      {
        year: "2020",
        title: "The Economics Breakup 💔📚",
        description: "Chose Commerce with Maths and Computer Science for my senior secondary studies. Broke up with Economics to pursue Computer Science full-time.",
        isHumorous: true,
        lessonLearned: "Sometimes the best decisions come from following your passion, even if it means changing direction completely."
      },
      {
        year: "2021",
        title: "Python & Chill 🐍☕",
        description: "Learned Python during lockdown with nothing else to do. Accidentally fell in love with programming.",
        isHumorous: true,
        lessonLearned: "The best learning happens when you're genuinely curious, not just checking boxes."
      },
      {
        year: "2022",
        title: "School’s Out, Code’s In 🎓💻",
        description: "Completed 10+2 with surprisingly higher marks in CS than any other subject. Followed my interest straight into BCA.",
        isHumorous: false
      },
      {
        year: "2023",
        title: "Projects & Friendships 🤝📂",
        description: "Made great friends in college and worked on multiple projects. Balanced deadlines with fun nights out.",
        isHumorous: true,
        lessonLearned: "Balance is everything - great work comes from great relationships, and both require intentional effort."
      },
      {
        year: "2024",
        title: "Leveling Up 🚀🗂️",
        description: "Started searching for internships and improving my profile. Also perfected the art of taking spontaneous trips with friends.",
        isHumorous: true,
        lessonLearned: "Professional growth and personal adventures aren't mutually exclusive - both fuel each other."
      },
      {
        year: "2025",
        title: "Blockchain & Graduation ⛓️🎓",
        description: "Completed two internships in the blockchain domain and wrapped up my BCA (Hons) degree.",
        isHumorous: false,
        lessonLearned: "Real-world experience is the best teacher - theory builds foundation, but practice builds confidence."
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
      duration: "Sep 2022 – Jul 2025",
      cgpa: "8.78/10",
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
        "Outstanding Academic Achievement consecutively for two semesters",
        "Specialization in Blockchain Technology and Distributed Systems",
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
      title: "Blockchain Platforms",
      issuer: "University at Buffalo (SUNY)",
      date: "April 25, 2024",
      credentialId: "LLQ33LSJH7UQ",
      skills: [],
      image: "/images/certificates/coursera-blockchain-platforms.jpg",
      verificationUrl: "https://coursera.org/verify/LLQ33LSJH7UQ",
      icon: "⛓️",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 2,
      title: "Blockchain Basics",
      issuer: "University at Buffalo (SUNY)",
      date: "April 17, 2024",
      credentialId: "R4JUF8CEGFE5",
      skills: [],
      image: "/images/certificates/coursera-blockchain-basics.jpg",
      verificationUrl: "https://coursera.org/verify/R4JUF8CEGFE5",
      icon: "⛓️",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 3,
      title: "The Bits and Bytes of Computer Networking",
      issuer: "Google",
      date: "February 25, 2024",
      credentialId: "ZHFD5ZA8YQ4G",
      skills: ["OSI Models", "Network Security", "DHCP"],
      image: "/images/certificates/coursera-bits-bytes-networking.jpg",
      verificationUrl: "https://coursera.org/verify/ZHFD5ZA8YQ4G",
      icon: "🌐",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 4,
      title: "AWS Academy Graduate – AWS Academy Cloud Foundations",
      issuer: "AWS Academy",
      date: "",
      credentialId: "c7fa381f-b831-4a8d-a58c-87b0f94f3619",
      skills: ["Cloud Foundations"],
      image: "/images/certificates/credly-aws-academy-cloud-foundations.jpg",
      verificationUrl: "https://www.credly.com/go/5EiLSUn8",
      icon: "☁️",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 5,
      title: "AI, Empathy & Ethics",
      issuer: "University of California, Santa Cruz",
      date: "November 13, 2023",
      credentialId: "RTSATUDW7RSB",
      skills: ["Artificial Intelligence", "Data Ethics", "Machine Learning"],
      image: "/images/certificates/coursera-ai-empathy-ethics.jpg",
      verificationUrl: "https://coursera.org/verify/RTSATUDW7RSB",
      icon: "🤖",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 6,
      title: "Blockchain Specialization",
      issuer: "University at Buffalo (SUNY)",
      date: "April 17, 2024",
      credentialId: "NKNTMAC6QJJ9",
      skills: ["Blockchain"],
      image: "/images/certificates/coursera-blockchain-specialization.jpg",
      verificationUrl: "https://coursera.org/verify/specialization/NKNTMAC6QJJ9",
      icon: "⛓️",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 7,
      title: "Decentralized Applications (Dapps)",
      issuer: "University at Buffalo (SUNY)",
      date: "February 26, 2024",
      credentialId: "VFABPJNPGS6E",
      skills: [],
      image: "/images/certificates/coursera-dapps.jpg",
      verificationUrl: "https://coursera.org/verify/VFABPJNPGS6E",
      icon: "🧩",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 8,
      title: "Cryptography",
      issuer: "University of Maryland, College Park",
      date: "November 7, 2024",
      credentialId: "0WQ67B639L8N",
      skills: ["Algorithms", "Encryption", "Cybersecurity"],
      image: "/images/certificates/coursera-cryptography.jpg",
      verificationUrl: "https://coursera.org/verify/0WQ67B639L8N",
      icon: "🔐",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 9,
      title: "CodeChef Certificate",
      issuer: "CodeChef",
      date: "",
      credentialId: "74009f5",
      skills: [],
      image: "/images/certificates/codechef-74009f5.jpg",
      verificationUrl: "https://www.codechef.com/certificates/verify",
      icon: "👨‍🍳",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 10,
      title: "CodeChef Certificate",
      issuer: "CodeChef",
      date: "",
      credentialId: "e98fdc0",
      skills: [],
      image: "/images/certificates/codechef-e98fdc0.jpg",
      verificationUrl: "https://www.codechef.com/certificates/verify",
      icon: "👨‍🍳",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 11,
      title: "Linux Fundamentals",
      issuer: "LearnQuest",
      date: "September 8, 2023",
      credentialId: "H3XUJMHTZVA8",
      skills: ["Linux", "Bash", "Command-Line Interface"],
      image: "/images/certificates/coursera-linux-fundamentals.jpg",
      verificationUrl: "https://coursera.org/verify/H3XUJMHTZVA8",
      icon: "🐧",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 12,
      title: "Introduction to Mobile App Development",
      issuer: "IBM",
      date: "November 19, 2024",
      credentialId: "PHT1O885P355",
      skills: ["Mobile Development", "Android Development", "iOS Development"],
      image: "/images/certificates/coursera-intro-mobile-app-dev.jpg",
      verificationUrl: "https://coursera.org/verify/PHT1O885P355",
      icon: "📱",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 13,
      title: "Introduction to Intellectual Property",
      issuer: "University of Pennsylvania",
      date: "November 6, 2023",
      credentialId: "YZX7CZR9W6R2",
      skills: ["Intellectual Property", "Legal Strategy", "Business Strategy"],
      image: "/images/certificates/coursera-intro-intellectual-property.jpg",
      verificationUrl: "https://coursera.org/verify/YZX7CZR9W6R2",
      icon: "⚖️",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 14,
      title: "Work Smarter, Not Harder: Time Management for Personal & Professional Productivity",
      issuer: "University of California, Irvine",
      date: "December 5, 2024",
      credentialId: "G5SCH3JYI6TP",
      skills: ["Time Management", "Goal Setting", "Prioritization"],
      image: "/images/certificates/coursera-time-management-uci.jpg",
      verificationUrl: "https://coursera.org/verify/G5SCH3JYI6TP",
      icon: "⏱️",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 15,
      title: "Introduction to Psychology",
      issuer: "Princeton University",
      date: "December 5, 2024",
      credentialId: "W4N5JM7YVYNU",
      skills: ["Psychology"],
      image: "/images/certificates/coursera-intro-psychology-princeton.jpg",
      verificationUrl: "https://coursera.org/verify/W4N5JM7YVYNU",
      icon: "🧠",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 16,
      title: "The Science of Well-Being",
      issuer: "Yale University",
      date: "December 4, 2024",
      credentialId: "MPXPMFILITCQ",
      skills: ["Well-being", "Happiness", "Positive Psychology"],
      image: "/images/certificates/coursera-science-of-well-being.jpg",
      verificationUrl: "https://coursera.org/verify/MPXPMFILITCQ",
      icon: "😊",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 17,
      title: "Introduction to Classical Music",
      issuer: "Yale University",
      date: "December 8, 2024",
      credentialId: "0DT3VCWKTZ59",
      skills: ["Classical Music"],
      image: "/images/certificates/coursera-classical-music.jpg",
      verificationUrl: "https://coursera.org/verify/0DT3VCWKTZ59",
      icon: "🎼",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 18,
      title: "Introduction to Personal Branding",
      issuer: "University of Virginia",
      date: "December 5, 2024",
      credentialId: "DJ2EA5O0DKSX",
      skills: ["Branding", "Personal Development", "Social Media Strategy"],
      image: "/images/certificates/coursera-personal-branding-uva.jpg",
      verificationUrl: "https://coursera.org/verify/DJ2EA5O0DKSX",
      icon: "🧑‍💼",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
    },
    {
      id: 19,
      title: "Moralities of Everyday Life",
      issuer: "Yale University",
      date: "November 13, 2023",
      credentialId: "VVJTVZYQ4V87",
      skills: ["Psychology", "Ethics", "Social Sciences"],
      image: "/images/certificates/coursera-moralities-everyday-life.jpg",
      verificationUrl: "https://coursera.org/verify/VVJTVZYQ4V87",
      icon: "📚",
      trophy: { type: "none", position: { x: 0, y: 0, z: 0 } }
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
      icon: Building,
      stickyNote: "Building the future of blockchain technology! 🚀"
    },
    {
      id: 2,
      title: "Hackathon Participant",
      event: "Various Technical Symposiums",
      description: "Regular participant in hackathons and technical competitions",
      date: "2022-Present",
      type: "competition",
      icon: Trophy,
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
      filename: "Vidit Kulsh CV Full Stack.pdf",
      path: "/resumes/Vidit Kulsh CV Full Stack.pdf",
      highlightedSkills: ["React.js", "Node.js", "MongoDB", "JavaScript"],
      relevantProjects: [2],
      relevantExperience: [1]
    },
    "blockchain-developer": {
      title: "Blockchain Developer Resume", 
      filename: "Vidit Kulsh CV Blockchain.pdf",
      path: "/resumes/Vidit Kulsh CV Blockchain.pdf",
      highlightedSkills: ["Blockchain Development", "Smart Contracts", "Cryptography", "Distributed Systems"],
      relevantProjects: [1],
      relevantExperience: [1]
    },
    "software-engineer": {
      title: "Software Engineer Resume",
      filename: "Vidit Kulsh CV Software Eng.pdf",
      path: "/resumes/Vidit Kulsh CV Software Eng.pdf",
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
      education: "Vidit is pursuing BCA Honours at Bennett University with an outstanding 8.78/10 CGPA, including consecutive Outstanding Academic Achievement awards.",
      navigation: "I can guide you through any section of Vidit's portfolio. Would you like to see his projects, skills, education, or learn about his research work?",
      recruiter: "Perfect! Let me highlight Vidit's key achievements: 8.78/10 CGPA, research collaboration with DRDO, blockchain expertise, and strong full-stack development skills. What specific role are you considering him for?"
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
