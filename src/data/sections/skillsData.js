// Skills Data - Redesigned: tier-based + domain-based, no percentages
import {
  Code,
  Database,
  Globe,
  Zap,
  Shield,
  Layers,
  Coffee,
  Terminal,
  Server,
  GitBranch,
  Lock,
  Cpu,
  Cloud,
  Container,
  FileCode,
  Network,
  BarChart2,
  Settings
} from 'lucide-react';

export const skillsData = {
  // Engineering identity statement
  identity: "Systems-focused Web3 infrastructure engineer.",
  identityNote: "I design reliable systems with Web3 foundations — not just a collection of tools.",

  // Tier-based expertise: shows maturity, not self-scored percentages
  tiers: [
    {
      name: "Core Expertise",
      description: "Production-grade, deeply applied",
      color: "#0F766E",
      accent: "teal",
      skills: [
        "Java",
        "TypeScript",
        "Solidity",
        "System Design",
        "Blockchain Architecture",
        "Cryptography",
        "Distributed Systems"
      ]
    },
    {
      name: "Strong Working Knowledge",
      description: "Built real systems with these",
      color: "#7C3AED",
      accent: "purple",
      skills: [
        "React.js",
        "Node.js",
        "PostgreSQL",
        "Docker",
        "NestJS",
        "Express.js",
        "Git",
        "Authentication & Authorization"
      ]
    },
    {
      name: "Familiar / Applied",
      description: "Applied in projects, actively growing",
      color: "#1D4ED8",
      accent: "blue",
      skills: [
        "Machine Learning",
        "AWS Fundamentals",
        "CI/CD Pipelines",
        "Python ML Ecosystem",
        "C++",
        "MongoDB",
        "Firebase"
      ]
    }
  ],

  // Domain-based view: tells a story about what you build
  domains: [
    {
      name: "Smart Contract Engineering",
      icon: Shield,
      color: "#7C3AED",
      description: "Production Solidity on EVM chains",
      skills: [
        { name: "Solidity", note: "Smart contract architecture" },
        { name: "ERC Standards", note: "ERC-20, ERC-721, ERC-1155" },
        { name: "Gas Optimization", note: "Reduce transaction costs" },
        { name: "Security Patterns", note: "Reentrancy, overflow, access control" },
        { name: "Wallet Integration", note: "MetaMask, WalletConnect" },
        { name: "On-chain / Off-chain Design", note: "" },
        { name: "DeFi Protocol Fundamentals", note: "" }
      ]
    },
    {
      name: "Backend Systems",
      icon: Server,
      color: "#0F766E",
      description: "APIs, services, and data layers",
      skills: [
        { name: "Node.js + NestJS", note: "" },
        { name: "Java", note: "GraphCrafters, Aventura-De-Texto" },
        { name: "Express.js", note: "" },
        { name: "Auth Systems", note: "JWT, OAuth, Role-based access" },
        { name: "Databases", note: "PostgreSQL · MySQL · MongoDB · Firebase · Supabase" }
      ]
    },
    {
      name: "Systems & Architecture",
      icon: Network,
      color: "#0369A1",
      description: "Design for scale and reliability",
      skills: [
        { name: "Distributed System Design", note: "" },
        { name: "Microservices Architecture", note: "" },
        { name: "Event-driven Systems", note: "" },
        { name: "API Gateway Patterns", note: "" },
        { name: "CAP Theorem", note: "Consistency, availability tradeoffs" },
        { name: "Consensus Mechanisms", note: "PoS, PoW fundamentals" },
        { name: "Load Balancing Fundamentals", note: "" }
      ]
    },
    {
      name: "DevOps & Infrastructure",
      icon: Container,
      color: "#065F46",
      description: "Ship and operate with confidence",
      skills: [
        { name: "Docker & Containerization", note: "" },
        { name: "CI/CD Pipelines", note: "" },
        { name: "AWS Fundamentals", note: "EC2, S3, IAM" },
        { name: "Environment Config Management", note: "" },
        { name: "Logging & Monitoring", note: "" }
      ]
    },
    {
      name: "Languages & Frontend",
      icon: Code,
      color: "#B45309",
      description: "From type-safe backends to reactive UIs",
      skills: [
        { name: "TypeScript", note: "" },
        { name: "JavaScript (ES6+)", note: "" },
        { name: "Java", note: "" },
        { name: "Python", note: "" },
        { name: "C++", note: "" },
        { name: "React.js", note: "" },
        { name: "Tailwind CSS", note: "" }
      ]
    },
    {
      name: "AI / Data Foundations",
      icon: Cpu,
      color: "#9D174D",
      description: "Theory and tooling for ML-adjacent work",
      skills: [
        { name: "Supervised Learning Basics", note: "" },
        { name: "Model Evaluation Metrics", note: "" },
        { name: "Feature Engineering", note: "" },
        { name: "Data Preprocessing", note: "" },
        { name: "Python ML Ecosystem", note: "NumPy, Pandas, scikit-learn" }
      ]
    }
  ],

  // Legacy categories field kept for backward compatibility with other components
  // (maps to domains for any code that reads skillsData.categories)
  get categories() {
    return this.domains.map(domain => ({
      name: domain.name,
      color: domain.color,
      skills: domain.skills.map(s => ({
        name: typeof s === 'string' ? s : s.name,
        icon: domain.icon,
        projects: []
      }))
    }));
  }
};

// Utility functions
export const getAllSkills = () => {
  return skillsData.domains.flatMap(domain =>
    domain.skills.map(s => (typeof s === 'string' ? s : s.name))
  );
};

export const getSkillsByTier = (tierName) => {
  const tier = skillsData.tiers.find(t => t.name === tierName);
  return tier ? tier.skills : [];
};

export const getTopSkills = (count = 5) => {
  return skillsData.tiers[0].skills.slice(0, count);
};

export default skillsData;
