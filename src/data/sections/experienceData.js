// Experience Data - All work experience and professional background
import { FileText, Palette, FileCode, Wrench, Search, Link, Shield, BookOpen, Settings, Radio, FileText as Contract, Layers, Database, Lock } from 'lucide-react';
export const experienceData = [
  {
    id: 1,
    company: "AGP Webpulse LLC",
    position: "Assistant Manager - IT Web3",
    duration: "Dec 2025 – Present",
    location: "UAE (Remote)",
    type: "Full-time",
    companyLogo: "/images/companies/agp.png",
    description: "Leading blockchain development for a regulated platform focused on tokenizing financial instruments, architecting secure infrastructure for asset tokenization while collaborating with cross-functional teams across multiple domains.",
    responsibilities: [
      "Architecting and developing full-stack blockchain solutions for tokenizing financial instruments",
      "Designing and implementing permission management systems for multi-tier admin and issuer workflows",
      "Collaborating with legal, compliance, and business teams to ensure regulatory alignment",
      "Conducting comprehensive research on tokenization standards and security best practices",
      "Managing development lifecycle from requirements analysis to production deployment"
    ],
    technologies: [
      { name: "Blockchain", icon: Link },
      { name: "Smart Contracts", icon: Contract },
      { name: "Tokenization", icon: Layers },
      { name: "Full Stack Development", icon: FileCode },
      { name: "Database Architecture", icon: Database },
      { name: "Security Systems", icon: Lock }
    ],
    achievements: [
      "Successfully completed comprehensive research phase for financial instrument tokenization platform architecture",
      "Designed scalable permission management framework for multi-role access control",
      "Established cross-functional collaboration protocols with 5-person core team and extended company departments"
    ],
    skills: ["Blockchain Development", "Tokenization Architecture", "Permission Management", "Full Stack Development", "Cross-functional Collaboration", "Security Design"],
    projectsWorked: [],
    mentors: [],
    impact: "Building production-grade tokenization infrastructure bridging traditional finance with blockchain technology, enabling compliant equity tokenization for real-world assets."
  },
  {
    id: 2,
    company: "Adbhut Global",
    position: "Freelance Web Developer",
    duration: "Apr 2025",
    location: "Remote, India",
    type: "Freelance",
    companyLogo: "/images/companies/adbhutglobal.png",
    description: "Developed and deployed a full-stack, mobile-optimized website focusing on responsive design and UX improvements.",
    responsibilities: [
      "Developed full-stack website using HTML, CSS, and JavaScript",
      "Boosted user engagement by 40% and reduced bounce rates by 25%",
      "Integrated scalable backend logic handling 500+ form submissions per day",
      "Enhanced load speed by 35% with image compression, lazy loading, and CDN integration"
    ],
    technologies: [
      { name: "HTML", icon: FileText },
      { name: "CSS", icon: Palette },
      { name: "JavaScript", icon: FileCode },
      { name: "Backend Integration", icon: Wrench },
      { name: "SEO", icon: Search }
    ],
    achievements: [
      "Significantly improved user engagement metrics",
      "Delivered scalable and performance-optimized web solution"
    ],
    skills: ["Full Stack Development", "Responsive Design", "Performance Optimization", "Backend Logic"],
    projectsWorked: [],
    mentors: [],
    impact: "Elevated web presence and usability for Adbhut Global with measurable engagement growth."
  },
  {
    id: 3,
    company: "DRDO (Defence Research and Development Organization)",
    position: "Blockchain Research Intern",
    duration: "Jan 2025 – Apr 2025",
    location: "Delhi, India",
    type: "Internship",
    companyLogo: "/images/companies/drdo.png",
    description: "Researched cross-chain communication and trustless blockchain interoperability protocols.",
    responsibilities: [
      "Conducted research on cross-chain asset transfer protocols",
      "Drafted technical documentation and architectural diagrams for academic publications",
      "Supported development of trustless blockchain interoperability systems"
    ],
    technologies: [
      { name: "Blockchain", icon: Link },
      { name: "Cryptography", icon: Shield },
      { name: "Research", icon: BookOpen }
    ],
    achievements: [
      "Produced research documentation contributing to academic proposals",
      "Advanced knowledge of cross-chain interoperability"
    ],
    skills: ["Blockchain Research", "Technical Writing", "Cross-chain Communication"],
    projectsWorked: [1], // Assuming project 1 relates to this research
    mentors: ["Dr. Research Lead"],
    impact: "Contributed to foundational research advancing blockchain interoperability in defense tech."
  },
  {
    id: 4,
    company: "Astraeus Next Gen",
    position: "Blockchain Developer Intern",
    duration: "Dec 2024 – Apr 2025",
    location: "Remote, India",
    type: "Internship",
    companyLogo: "/images/companies/astraeus.png",
    description: "Developed and maintained smart contracts and cross-chain bridges for Ethereum-compatible networks.",
    responsibilities: [
      "Maintained 90%+ smart contract test coverage",
      "Built proof-of-concept cross-chain bridges using Solidity, Hardhat, and Ethers.js",
      "Conducted peer reviews and participated in weekly agile sprints",
      "Documented architecture and deployment processes to aid onboarding"
    ],
    technologies: [
      { name: "Solidity", icon: Wrench },
      { name: "Hardhat", icon: Settings },
      { name: "Ethers.js", icon: Radio },
      { name: "Smart Contracts", icon: Contract }
    ],
    achievements: [
      "Ensured high-quality test coverage and code reliability",
      "Delivered cross-chain bridge prototypes enabling interoperability"
    ],
    skills: ["Smart Contract Development", "Cross-chain Bridges", "Code Review", "Agile Development"],
    projectsWorked: [1], // Assuming overlap with research project
    mentors: ["Senior Blockchain Architect"],
    impact: "Enabled interoperability solutions between Ethereum-compatible networks enhancing project scope."
  }
];

// Utility functions for experience data
export const getExperienceById = (id) => {
  return experienceData.find(exp => exp.id === parseInt(id));
};

export const getExperienceByType = (type) => {
  return experienceData.filter(exp => 
    exp.type.toLowerCase() === type.toLowerCase()
  );
};

export const getCurrentExperience = () => {
  return experienceData.filter(exp => 
    exp.duration.includes('Present')
  );
};

export const getPastExperience = () => {
  return experienceData.filter(exp => 
    !exp.duration.includes('Present')
  );
};

export const getAllTechnologiesFromExperience = () => {
  const allTechs = experienceData.flatMap(exp => exp.technologies);
  const uniqueTechs = allTechs.filter((tech, index, self) => 
    index === self.findIndex(t => t.name === tech.name)
  );
  return uniqueTechs;
};

export const getSkillsFromExperience = () => {
  const allSkills = experienceData.flatMap(exp => exp.skills);
  return [...new Set(allSkills)];
};

export const getTotalExperienceMonths = () => {
  // Calculate total experience in months
  // This is a simplified calculation
  let totalMonths = 0;
  experienceData.forEach(exp => {
    // Parse duration and calculate months
    // For now, return a placeholder
    totalMonths += 12; // Placeholder
  });
  return totalMonths;
};

export default experienceData;
