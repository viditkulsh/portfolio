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
    // Rewritten from Vidit_Kulsh_CV.pdf (updated 24 Jun 2026), which carries
    // far more concrete detail than the earlier placeholder copy.
    description: "Building a real-world-asset (RWA) and financial infrastructure platform supporting regulated investment workflows and asset lifecycle management — backend services, access control, and the smart-contract validation suite behind it.",
    responsibilities: [
      "Developing and maintaining 365+ backend APIs across onboarding, governance, compliance, transaction and operational workflows",
      "Designing backend services, access-control systems, audit mechanisms and business logic for multi-role enterprise applications",
      "Building the platform data layer — 60+ tables and 140+ migrations — with a focus on security, data integrity and maintainability",
      "Building workflow-driven tooling used across 5 user roles for business, compliance and administrative processes",
      "Evaluating third-party identity, compliance, custody, wallet and blockchain providers — technical due diligence and integration planning",
      "Implementing identity verification, governance, approval, reporting and asset-management workflows in a regulated environment"
    ],
    technologies: [
      { name: "Next.js", icon: FileCode },
      { name: "TypeScript", icon: FileCode },
      { name: "PostgreSQL", icon: Database },
      { name: "Supabase", icon: Database },
      { name: "Foundry", icon: Settings },
      { name: "Solidity", icon: Contract },
      { name: "Tokenization", icon: Layers },
      { name: "Access Control", icon: Lock }
    ],
    achievements: [
      "Built the complete smart-contract validation suite in Foundry: 3,300+ test cases across 130+ suites, covering unit, fuzz, invariant, RBAC, integration, attack-vector and state-machine testing",
      "Delivered 365+ backend APIs and a 60+ table data layer with 140+ migrations",
      "Built automated testing frameworks covering authorization, workflow validation, business rules and critical platform operations"
    ],
    skills: ["Smart Contract Testing", "Backend Architecture", "Access Control", "Tokenization Architecture", "PostgreSQL", "TypeScript", "Regulatory Compliance", "Technical Due Diligence"],
    projectsWorked: [],
    mentors: [],
    impact: "Building production-grade RWA tokenization infrastructure that bridges traditional finance and blockchain — where the test suite matters as much as the contracts, because the failure mode is someone else's money."
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
    // Corrected to match all three résumé PDFs, which state Jan–May 2025.
    duration: "Jan 2025 – May 2025",
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
    projectsWorked: [],
    // Placeholder mentor names removed — they were never real records.
    mentors: [],
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
    projectsWorked: [],
    // Placeholder mentor names removed — they were never real records.
    mentors: [],
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
