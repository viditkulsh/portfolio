// Skills Data - All skills and technologies information
export const skillsData = {
  categories: [
    {
      name: "Technical Skills",
      color: "#0F766E",
      position: { x: 0, y: 2, z: 0 },
      skills: [
        { 
          name: "Java", 
          level: 90, 
          icon: "☕", 
          projects: ["Blockchain Protocols", "Enterprise Apps"],
          category: "Programming Languages"
        },
        { 
          name: "JavaScript", 
          level: 88, 
          icon: "🟨", 
          projects: ["Web Applications", "Interactive UIs"],
          category: "Programming Languages"
        },
        { 
          name: "React.js", 
          level: 85, 
          icon: "⚛️", 
          projects: ["Modern Web Apps", "Component Libraries"],
          category: "Frontend Frameworks"
        },
        { 
          name: "Node.js", 
          level: 82, 
          icon: "🟢", 
          projects: ["Backend Services", "API Development"],
          category: "Backend Technologies"
        },
        { 
          name: "Express.js", 
          level: 80, 
          icon: "🚂", 
          projects: ["REST APIs", "Web Services"],
          category: "Backend Frameworks"
        },
        { 
          name: "MongoDB", 
          level: 78, 
          icon: "🍃", 
          projects: ["Database Design", "Data Management"],
          category: "Databases"
        },
        { 
          name: "SQL", 
          level: 85, 
          icon: "🗄️", 
          projects: ["Database Optimization", "Complex Queries"],
          category: "Databases"
        },
        { 
          name: "Git/GitHub", 
          level: 90, 
          icon: "🐙", 
          projects: ["Version Control", "Collaboration"],
          category: "Development Tools"
        },
        { 
          name: "REST APIs", 
          level: 85, 
          icon: "🔌", 
          projects: ["Service Integration", "API Design"],
          category: "API Development"
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
          icon: "⛓️", 
          projects: ["Interoperability Protocols", "DeFi Solutions"],
          category: "Blockchain"
        },
        { 
          name: "Smart Contracts", 
          level: 85, 
          icon: "📜", 
          projects: ["Ethereum DApps", "Protocol Development"],
          category: "Blockchain"
        },
        { 
          name: "Cryptography", 
          level: 80, 
          icon: "🔐", 
          projects: ["Security Implementations", "Protocol Design"],
          category: "Security"
        },
        { 
          name: "Distributed Systems", 
          level: 82, 
          icon: "🌐", 
          projects: ["Scalable Architecture", "System Design"],
          category: "System Architecture"
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
          icon: "🧩", 
          projects: ["Complex Debugging", "Algorithm Design"],
          category: "Analytical Skills"
        },
        { 
          name: "Collaboration", 
          level: 88, 
          icon: "🤝", 
          projects: ["Team Projects", "Research Partnerships"],
          category: "Interpersonal Skills"
        },
        { 
          name: "Research-oriented mindset", 
          level: 85, 
          icon: "🔬", 
          projects: ["Academic Research", "Technology Innovation"],
          category: "Research Skills"
        },
        { 
          name: "Adaptability", 
          level: 87, 
          icon: "🔄", 
          projects: ["New Technology Adoption", "Rapid Learning"],
          category: "Personal Skills"
        },
        { 
          name: "Technical Writing", 
          level: 80, 
          icon: "✍️", 
          projects: ["Documentation", "Research Papers"],
          category: "Communication Skills"
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
