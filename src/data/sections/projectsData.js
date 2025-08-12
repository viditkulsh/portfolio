// Projects Data - All project information
export const projectsData = [
  {
    id: 1,
    title: "Blockchain Interoperability Protocol",
    description: "Research and development project aimed at enabling seamless communication between distinct blockchain networks.",
    longDescription: "Advanced research project in collaboration with DRDO and Astraeus Next Gen, focusing on developing novel protocols for cross-chain communication. The project involves designing consensus mechanisms, implementing cryptographic protocols, and creating secure bridge architectures.",
    image: "/images/projects/blockchain-interop.jpg",
    githubUrl: "#",
    liveUrl: "#",
    technologies: [
      { name: "Solidity", icon: "📜" },
      { name: "Ethereum", icon: "💎" },
      { name: "Interledger Protocol", icon: "🔗" },
      { name: "Node.js", icon: "🟢" }
    ],
    category: "Blockchain",
    featured: true,
    status: "Active Research",
    collaborators: ["DRDO", "Astraeus Next Gen"],
    problem: "Existing blockchain networks operate in isolation, limiting their potential for widespread adoption",
    solution: "Developed interoperability protocols enabling secure cross-chain transactions and data exchange",
    impact: "Contributing to academic research and future blockchain infrastructure development",
    highlights: [
      "Enabling cross-chain communication",
      "Collaboration with DRDO research team", 
      "Advanced cryptographic implementations"
    ],
    year: "2023-2024",
    duration: "12 months (ongoing)",
    teamSize: "5 researchers",
    achievements: [
      "Successfully implemented prototype cross-chain bridge",
      "Published preliminary research findings",
      "Achieved 95% transaction success rate in testing"
    ]
  },
  {
    id: 2,
    title: "Full Stack Web Application",
    description: "A scalable MERN stack web application for managing distributed resources.",
    longDescription: "Comprehensive web application built using the MERN stack, featuring real-time data synchronization, user authentication, and responsive design. The application demonstrates modern web development practices and scalable architecture patterns.",
    image: "/images/projects/fullstack-app.jpg",
    githubUrl: "#",
    liveUrl: "#",
    technologies: [
      { name: "React.js", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "MongoDB", icon: "🍃" }
    ],
    category: "Full Stack",
    featured: true,
    status: "Completed",
    problem: "Need for efficient resource management across distributed systems",
    solution: "Built scalable web application with real-time updates and intuitive user interface",
    impact: "Demonstrated proficiency in full-stack development and modern web technologies",
    highlights: [
      "Scalable architecture design",
      "Real-time data management", 
      "Responsive user interface"
    ],
    year: "2023",
    duration: "4 months",
    teamSize: "Solo project",
    achievements: [
      "Achieved 99.9% uptime in production",
      "Implemented real-time collaboration features",
      "Optimized performance for 1000+ concurrent users"
    ]
  },
  {
    id: 3,
    title: "Smart Contract Portfolio",
    description: "Collection of secure and efficient smart contracts for various DeFi applications.",
    longDescription: "Developed a comprehensive suite of smart contracts including token contracts, staking mechanisms, and governance protocols. Each contract is thoroughly tested and optimized for gas efficiency.",
    image: "/images/projects/smart-contracts.jpg",
    githubUrl: "#",
    liveUrl: "#",
    technologies: [
      { name: "Solidity", icon: "📜" },
      { name: "Hardhat", icon: "🔨" },
      { name: "OpenZeppelin", icon: "🛡️" },
      { name: "Web3.js", icon: "🌐" }
    ],
    category: "Blockchain",
    featured: false,
    status: "Completed",
    problem: "Need for secure and gas-efficient smart contracts for DeFi applications",
    solution: "Developed optimized smart contract suite with comprehensive testing",
    impact: "Contributed to DeFi ecosystem with secure and efficient protocols",
    highlights: [
      "Gas-optimized implementations",
      "Comprehensive security testing",
      "Modular contract architecture"
    ],
    year: "2023",
    duration: "3 months",
    teamSize: "Solo project",
    achievements: [
      "30% gas optimization compared to standard implementations",
      "Zero security vulnerabilities in audit",
      "Successfully deployed on multiple testnets"
    ]
  },
  {
    id: 4,
    title: "AI-Powered Code Analyzer",
    description: "Machine learning tool for automated code quality assessment and optimization suggestions.",
    longDescription: "Developed an intelligent code analysis system that uses machine learning to identify code quality issues, suggest optimizations, and provide best practice recommendations. The tool supports multiple programming languages and integrates with popular IDEs.",
    image: "/images/projects/code-analyzer.jpg",
    githubUrl: "#",
    liveUrl: "#",
    technologies: [
      { name: "Python", icon: "🐍" },
      { name: "TensorFlow", icon: "🧠" },
      { name: "Flask", icon: "🌶️" },
      { name: "Docker", icon: "🐳" }
    ],
    category: "AI/ML",
    featured: false,
    status: "Completed",
    problem: "Developers need automated tools for code quality assessment and optimization",
    solution: "Built ML-powered analyzer with real-time feedback and optimization suggestions",
    impact: "Improved code quality and development efficiency for multiple teams",
    highlights: [
      "Multi-language support",
      "Real-time analysis",
      "IDE integration"
    ],
    year: "2022",
    duration: "5 months",
    teamSize: "3 developers",
    achievements: [
      "85% accuracy in code quality prediction",
      "Integrated with 5+ popular IDEs",
      "Reduced code review time by 40%"
    ]
  }
];

// Utility functions for projects data
export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured);
};

export const getProjectById = (id) => {
  return projectsData.find(project => project.id === parseInt(id));
};

export const getProjectsByCategory = (category) => {
  return projectsData.filter(project => 
    project.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProjectsByStatus = (status) => {
  return projectsData.filter(project => 
    project.status.toLowerCase() === status.toLowerCase()
  );
};

export const getProjectsByYear = (year) => {
  return projectsData.filter(project => 
    project.year.includes(year.toString())
  );
};

export const getAllTechnologies = () => {
  const allTechs = projectsData.flatMap(project => project.technologies);
  const uniqueTechs = allTechs.filter((tech, index, self) => 
    index === self.findIndex(t => t.name === tech.name)
  );
  return uniqueTechs;
};

export default projectsData;
