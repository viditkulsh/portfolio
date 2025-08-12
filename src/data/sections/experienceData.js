// Experience Data - All work experience and professional background
export const experienceData = [
  {
    id: 1,
    company: "DRDO & Astraeus Next Gen",
    position: "Research Collaborator - Blockchain Interoperability",
    duration: "2023 - Present",
    location: "Research Collaboration",
    type: "Research",
    companyLogo: "/images/companies/drdo.png",
    description: "Working on blockchain interoperability protocols research in collaboration with defense and private sector organizations",
    responsibilities: [
      "Developing novel consensus mechanisms for cross-chain communication",
      "Implementing cryptographic protocols for secure data exchange",
      "Publishing technical documentation and research findings",
      "Collaborating with academic and industry researchers"
    ],
    technologies: [
      { name: "Blockchain", icon: "⛓️" },
      { name: "Cryptography", icon: "🔐" },
      { name: "Distributed Systems", icon: "🌐" },
      { name: "Protocol Design", icon: "📐" }
    ],
    achievements: [
      "Developed innovative interoperability solutions",
      "Contributed to academic research publications",
      "Recognized for technical excellence in research collaboration"
    ],
    skills: ["Research", "Blockchain Development", "Technical Writing", "Collaboration"],
    projectsWorked: [1], // Reference to projects data
    mentors: ["Dr. Research Lead", "Senior Blockchain Architect"],
    impact: "Contributing to next-generation blockchain infrastructure that could revolutionize cross-chain communication"
  },
  {
    id: 2,
    company: "Bennett University",
    position: "Teaching Assistant - Computer Science",
    duration: "Jan 2024 - Present",
    location: "Greater Noida, India",
    type: "Academic",
    companyLogo: "/images/companies/bennett.png",
    description: "Supporting faculty in teaching computer science courses and mentoring junior students",
    responsibilities: [
      "Assisting in algorithm design and data structures courses",
      "Mentoring students in programming assignments",
      "Conducting lab sessions for practical implementations",
      "Grading assignments and providing constructive feedback"
    ],
    technologies: [
      { name: "Java", icon: "☕" },
      { name: "Data Structures", icon: "🏗️" },
      { name: "Algorithms", icon: "🧮" },
      { name: "Teaching", icon: "👨‍🏫" }
    ],
    achievements: [
      "Improved student performance by 25% in programming courses",
      "Developed interactive coding exercises",
      "Received excellent feedback from students and faculty"
    ],
    skills: ["Teaching", "Mentoring", "Algorithm Design", "Programming"],
    projectsWorked: [],
    mentors: ["Prof. Computer Science", "Department Head"],
    impact: "Helping shape the next generation of computer science professionals"
  },
  {
    id: 3,
    company: "Tech Innovation Lab",
    position: "Full Stack Development Intern",
    duration: "Jun 2023 - Aug 2023",
    location: "Remote",
    type: "Internship",
    companyLogo: "/images/companies/tech-lab.png",
    description: "Developed web applications using modern technologies and contributed to multiple client projects",
    responsibilities: [
      "Built responsive web applications using React.js and Node.js",
      "Developed RESTful APIs for client-server communication",
      "Implemented user authentication and authorization systems",
      "Collaborated with design team on UI/UX improvements"
    ],
    technologies: [
      { name: "React.js", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Express.js", icon: "🚂" }
    ],
    achievements: [
      "Delivered 3 client projects on time and within budget",
      "Optimized application performance by 40%",
      "Received offer for full-time position"
    ],
    skills: ["Full Stack Development", "API Design", "Database Management", "Project Management"],
    projectsWorked: [2], // Reference to projects data
    mentors: ["Senior Full Stack Developer", "Project Manager"],
    impact: "Contributed to successful delivery of client projects and gained real-world development experience"
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
