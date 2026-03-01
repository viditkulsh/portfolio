// Skills Data - All skills and technologies information
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
  Key,
  Lock,
  Brain,
  Users,
  Target,
  Repeat,
  Palette,
  Cpu,
  Cloud,
  Container,
  FileCode,
  Puzzle
} from 'lucide-react';

export const skillsData = {
  categories: [
    {
      name: "Technical Skills",
      color: "#0F766E",
      position: { x: 0, y: 2, z: 0 },
      skills: [
        { 
          name: "JavaScript (ES6+)",
          level: 90,
          icon: Code,
          projects: ["BurgerHut", "AdbhutGlobal", "Note-e-Movie", "ImageCarousel"],
          category: "Programming Languages"
        },
        {
          name: "TypeScript",
          level: 88,
          icon: FileCode,
          projects: ["HemoChain", "idittrack", "Mood_Dapp_myFirstDapp"],
          category: "Programming Languages"
        },
        {
          name: "Java",
          level: 90,
          icon: Coffee,
          projects: ["GraphCrafters", "Aventura-De-Texto"],
          category: "Programming Languages"
        },
        {
          name: "C++",
          level: 80,
          icon: Terminal,
          projects: ["GraphCrafters"],
          category: "Programming Languages"
        },
        {
          name: "Python",
          level: 82,
          icon: Code,
          projects: ["SpellChecker", "GraphCrafters"],
          category: "Programming Languages"
        },
        {
          name: "Solidity",
          level: 85,
          icon: Shield,
          projects: ["HemoChain", "Mood_Dapp_myFirstDapp"],
          category: "Programming Languages"
        },
        { 
          name: "React.js", 
          level: 88,
          icon: Zap,
          projects: ["BurgerHut", "AdbhutGlobal", "Note-e-Movie"],
          category: "Frontend Frameworks"
        },
        {
          name: "Tailwind CSS",
          level: 85,
          icon: Palette,
          projects: ["BurgerHut", "AdbhutGlobal", "Note-e-Movie"],
          category: "Frontend Frameworks"
        },
        { 
          name: "Node.js", 
          level: 85,
          icon: Server,
          projects: ["BurgerHut", "AdbhutGlobal", "idittrack"],
          category: "Backend Technologies"
        },
        {
          name: "NestJS",
          level: 78,
          icon: Shield,
          projects: ["idittrack"],
          category: "Backend Technologies"
        },
        { 
          name: "Express.js", 
          level: 82,
          icon: Layers,
          projects: ["BurgerHut", "AdbhutGlobal", "idittrack"],
          category: "Backend Frameworks"
        },
        {
          name: "PostgreSQL",
          level: 80,
          icon: Database,
          projects: ["idittrack"],
          category: "Databases"
        },
        {
          name: "MySQL",
          level: 82,
          icon: Database,
          projects: ["GraphCrafters"],
          category: "Databases"
        },
        { 
          name: "MongoDB", 
          level: 80,
          icon: Database,
          projects: ["BurgerHut", "AdbhutGlobal", "idittrack"],
          category: "Databases"
        },
        {
          name: "Firebase",
          level: 78,
          icon: Zap,
          projects: ["ImageCarousel", "idittrack"],
          category: "Databases"
        },
        {
          name: "Supabase",
          level: 75,
          icon: Cloud,
          projects: ["idittrack"],
          category: "Databases"
        },
        { 
          name: "Docker",
          level: 78,
          icon: Container,
          projects: ["HemoChain", "idittrack"],
          category: "DevOps & Cloud"
        },
        { 
          name: "Git/GitHub", 
          level: 92,
          icon: GitBranch,
          projects: ["All Projects"],
          category: "Development Tools"
        },
        { 
          name: "REST APIs", 
          level: 88,
          icon: Globe,
          projects: ["BurgerHut", "AdbhutGlobal", "idittrack"],
          category: "API Development"
        },
        {
          name: "JWT Auth",
          level: 80,
          icon: Key,
          projects: ["idittrack", "HemoChain"],
          category: "Security"
        }
      ]
    },
    {
      name: "Specialized Skills",
      color: "#5B2C6F",
      position: { x: -3, y: 0, z: 1 },
      skills: [
        { 
          name: "Blockchain Development", 
          level: 88, 
          icon: Layers,
          projects: ["HemoChain", "Mood_Dapp_myFirstDapp"],
          category: "Blockchain"
        },
        { 
          name: "Smart Contracts", 
          level: 85, 
          icon: FileCode,
          projects: ["HemoChain", "Mood_Dapp_myFirstDapp"],
          category: "Blockchain"
        },
        { 
          name: "Cryptography", 
          level: 80, 
          icon: Lock,
          projects: ["HemoChain"],
          category: "Security"
        },
        { 
          name: "Distributed Systems", 
          level: 82, 
          icon: Globe,
          projects: ["idittrack"],
          category: "System Architecture"
        },
        {
          name: "Machine Learning",
          level: 78,
          icon: Cpu,
          projects: ["GraphCrafters", "SpellChecker"],
          category: "AI/ML"
        }
      ]
    },
    {
      name: "Soft Skills",
      color: "#312E81",
      position: { x: 3, y: -1, z: -1 },
      skills: [
        { 
          name: "Problem-solving", 
          level: 92, 
          icon: Puzzle,
          projects: ["All Projects"],
          category: "Analytical Skills"
        },
        { 
          name: "Collaboration", 
          level: 88, 
          icon: Users,
          projects: ["Team Projects", "Research Collaborations"],
          category: "Interpersonal Skills"
        },
        { 
          name: "Leadership", 
          level: 85, 
          icon: Target,
          projects: ["Hackathons", "Capstone Research"],
          category: "Interpersonal Skills"
        },
        {
          name: "Technical Communication",
          level: 85,
          icon: FileCode,
          projects: ["Documentation", "Research Papers"],
          category: "Communication Skills"
        },
        { 
          name: "Adaptability", 
          level: 87, 
          icon: Repeat,
          projects: ["Learning New Tech", "Multi-Stack Projects"],
          category: "Personal Skills"
        },
        { 
          name: "Critical Thinking",
          level: 88,
          icon: Brain,
          projects: ["Blockchain Interoperability Research"],
          category: "Analytical Skills"
        }
      ]
    }
  ]
};

// Utility functions for skills data
export const getSkillsByCategory = (categoryName) => {
  const category = skillsData.categories.find(cat => cat.name === categoryName);
  return category ? category.skills : [];
};

export const getAllSkills = () => {
  return skillsData.categories.flatMap(category => category.skills);
};

export const getSkillByName = (skillName) => {
  const allSkills = getAllSkills();
  return allSkills.find(skill => skill.name.toLowerCase() === skillName.toLowerCase());
};

export const getTopSkills = (count = 5) => {
  const allSkills = getAllSkills();
  return allSkills
    .sort((a, b) => b.level - a.level)
    .slice(0, count);
};

export default skillsData;
