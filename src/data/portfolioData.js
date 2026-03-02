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
      id: 17,
      title: "Project Management: The Basics for Success",
      issuer: "University of California, Irvine",
      date: "December 8, 2024",
      credentialId: "0DT3VCWKTZ59",
      skills: ["Project Management", "Leadership", "Team Management"],
      image: "/images/certificates/coursera-project-management.jpg",
      verificationUrl: "https://www.coursera.org/account/accomplishments/verify/0DT3VCWKTZ59",
      icon: "📊",
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
      verificationUrl: "https://www.coursera.org/account/accomplishments/verify/DJ2EA5O0DKSX",
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
