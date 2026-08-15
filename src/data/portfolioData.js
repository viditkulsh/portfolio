// Portfolio Data - Edit this file to update your content easily
// Import dedicated section data files
import { skillsData } from './sections/skillsData.js';
import { projectsData } from './sections/projectsData.js';
import { socialMediaData } from './sections/socialMediaData.js';
import { experienceData } from './sections/experienceData.js';
import { certificatesData } from './sections/certificatesData.js';
import { researchThreads } from './sections/researchData.js';
import { architectureData } from './sections/architectureData.js';
import { Trophy, Building } from 'lucide-react';

export const portfolioData = {
  // Personal Information
  personal: {
    name: "Vidit Kulshrestha",
    title: "Software Engineer — Blockchain & Fintech Systems",
    // Short enough to read in one breath, specific enough to be falsifiable.
    tagline: "I build blockchain and fintech systems — researched first, then shipped.",
    // The three claims the whole site exists to evidence: build, depth, delivery.
    // Every noun here maps to something on the page.
    shortIntro:
      "I build tokenization infrastructure at AGP Webpulse, researched cross-chain interoperability at DRDO, and shipped smart contracts and full-stack platforms in between. I go deep on how a system actually works before I commit to building it.",
    // Discipline-level summary used under the hero.
    positioning: {
      build: {
        label: "Build",
        claim: "Production systems, not demos.",
        evidence: "Tokenization platform at AGP Webpulse · IditTrack SaaS · SathiSahyogi on Ethereum",
      },
      depth: {
        label: "Depth",
        claim: "I investigate before I implement.",
        evidence: "Cross-chain interoperability research at DRDO · BCA capstone on interoperability protocols",
      },
      delivery: {
        label: "Delivery",
        claim: "Concept through to something running.",
        evidence: "3,300+ contract test cases at AGP Webpulse · 365+ backend APIs · adbhutglobal.com live in production",
      },
    },
    quote: "Read. Analyze. Execute.",
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
    introduction: "Born in Jaipur, raised in Delhi NCR. I'm someone who prefers understanding a problem deeply before jumping into solutions. My father worked as a Tech Project Manager, and growing up around conversations about how systems work at scale made technology feel familiar, not intimidating.",
    bio: `I completed my BCA (Hons) at Bennett University in 2025 with a GPA of 8.78/10. To be honest, school wasn't my strongest phase—I was decent but not outstanding. But when I got to university, something clicked. I started actually enjoying the learning process, and my passion for computers grew naturally from there. I became more focused, my grades improved, and I found myself exploring topics outside the classroom simply because I wanted to.

One area that caught my attention early was blockchain. It wasn't the hype that interested me—it was the practical side: verification, transparency, and privacy. In fintech or supply chain, these aren't just nice features; they determine whether a system gets trusted or ignored. I wanted to understand blockchain beyond surface concepts, so I pursued a research internship at DRDO, working on cross-chain interoperability. That experience taught me patience—research doesn't give you clean answers quickly. You test assumptions, revise your approach, and keep going.

After that, I moved into industry roles where I learned how products are built in real teams. At Astraeus Next Gen, I worked on a Universal Registry Protocol Dashboard and wallet integrations, coordinating across teams. That's where I realized building something useful isn't just about writing code. You have to communicate clearly, align with others, and keep things moving even when requirements shift.

Currently, I work as Assistant Manager IT Web3 at AGP Webpulse LLC, focusing on blockchain development for tokenization platforms. This role has shown me the gap between theory and production—real users behave differently than test environments, and performance, security, and reliability matter every single day.

I'd describe myself as calm and analytical. I don't rush decisions. I prefer to understand the problem fully, think through risks, and then commit. This approach has helped me in both research and product work, especially in security-sensitive areas where small mistakes create big consequences.

Right now, I'm focused on building impactful systems in fintech and management domains. I'm always open to new ideas and genuinely enthusiastic about turning those ideas into reality. Whether it's tokenization, distributed systems, or trusted infrastructure—if it solves real problems, I'm in.`,
    funFacts: [
      "Can debug production blockchain bugs at 3 AM while simultaneously explaining consensus algorithms to confused teammates.",
      "Went from average school student to 8.78 CGPA holder—proof that passion beats talent when you find what clicks.",
      "Known to join hackathons not for prizes, but for the pure adrenaline rush of building something from scratch under pressure."
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
      },
      {
        year: "2025-Present",
        title: "Building Tokenization Infrastructure 🪙",
        description: "Leading blockchain development at AGP Webpulse LLC, architecting platforms for tokenizing financial instruments and managing cross-functional collaboration.",
        isHumorous: false,
        lessonLearned: "Production teaches what textbooks can't—user behavior, system reliability, and the importance of security at scale."
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

  // Certificates (real PDF-backed entries — see certificatesData.js)
  certificates: certificatesData,

  // Co-curricular Activities
  activities: [
    {
      id: 1,
      title: "ICB Student Chapter Member",
      event: "Bennett University",
      description: "Active member contributing to blockchain and technology initiatives",
      type: "organization",
      icon: Building,
      stickyNote: "Building the future of blockchain technology! 🚀"
    },
    {
      id: 2,
      title: "Hackathon Participant",
      event: "Various Technical Symposiums",
      description: "Regular participant in hackathons and technical competitions",
      type: "competition",
      icon: Trophy,
      stickyNote: "Turning caffeine into code since 2022! ☕"
    },
    {
      id: 3,
      title: "Technical Writing",
      event: "Various Platforms",
      description: "Writing technical articles and documentation for blockchain projects",
      type: "writing",
      icon: "✍️",
      stickyNote: "Explaining complex tech in simple words!"
    }
  ],

  // Research dimension — how questions became shipped systems
  research: researchThreads,

  // Flagship system architecture (grounded; see architectureData.js)
  architecture: architectureData,

  // Social Media (import from dedicated file)
  socialMedia: socialMediaData,

  // Resume Variants for different roles
  resumeVariants: {
    // The only variant that includes the current AGP Webpulse role.
    // Last revised 24 Jun 2026 — the three role-specific PDFs below predate it.
    "current": {
      title: "General Resume",
      filename: "Vidit_Kulsh_CV.pdf",
      path: "/resumes/Vidit_Kulsh_CV.pdf",
      highlightedSkills: ["Solidity", "Foundry", "TypeScript", "PostgreSQL", "Next.js"],
      relevantProjects: [11, 8, 6],
      relevantExperience: [1]
    },
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

  // Site Configuration
  siteConfig: {
    title: "Vidit Kulshrestha - Portfolio",
    description: "Full Stack & Blockchain Developer engineering scalable solutions at the crossroads of web and blockchain innovation",
    keywords: ["Vidit Kulshrestha", "Full Stack Developer", "Blockchain Developer", "Bennett University", "DRDO", "Portfolio"],
    url: "https://viditkulshrestha.com",
    image: "/images/profile.jpeg",
    favicon: "/Logo/Icon1.jpg"
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
