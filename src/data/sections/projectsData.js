// Projects Data - All project information
import {
  Lock,
  Globe,
  Database,
  Code,
  FileText,
  Search,
  Zap,
  Coffee,
  Terminal,
  Server,
  Palette,
  Shield,
  Layers
} from 'lucide-react';

export const projectsData = [
  {
    id: 11,
    title: "IditTrack",
    description: "Micro SaaS Inventory & Order Management system for small businesses.",
    longDescription: "Small businesses often struggle with inventory chaos—lost stock counts, delayed orders, and zero visibility across their supply chain. IditTrack solves this by providing an affordable, scalable platform that handles product management, order tracking, FTP file uploads, and seamless POS API integration. Built with a modular architecture, it's designed to grow with your business without breaking the bank or requiring a tech team to manage it.",
    image: "/images/projects/idittrack_landing.png",
    githubUrl: "https://github.com/viditkulsh/idittrack",
    liveUrl: "#",
    showLiveDemo: false,
    technologies: [
      { name: "React.js", icon: Zap },
      { name: "Node.js", icon: Server },
      { name: "MongoDB", icon: Database },
      { name: "Express.js", icon: Layers }
    ],
    category: "SaaS",
    featured: true,
    status: "Completed",
    problem: "Small businesses lack affordable, scalable inventory and order tracking tools.",
    solution: "Created a modular, easy-to-use platform with advanced order and product management.",
    impact: "Potential to cut manual tracking effort by 60%.",
    highlights: ["POS API integration", "FTP file upload", "Product management"],
    keyLearnings: "Understanding role-based access control at scale was eye-opening. Supply chains aren't linear—they're complex webs of permissions, hierarchies, and workflows. Building this taught me how different user roles (admin, warehouse manager, sales rep) need different data views and action permissions. The complexity grows exponentially with scale, and designing a flexible RBAC system that doesn't become a maintenance nightmare is an art.",
    challenges: "The biggest challenge was integrating legacy POS systems that had inconsistent data formats. Some used XML, others JSON, and one literally sent CSV files via FTP. Building a unified adapter layer that could normalize all this chaos without data loss required careful schema design and extensive error handling.",
    technicalDepth: "Implemented JWT-based authentication with refresh token rotation, designed a flexible permission system using MongoDB's aggregation pipeline for complex role queries, and built a real-time inventory sync engine using WebSockets. The FTP file processor uses Node.js streams to handle large files without memory bloat.",
    year: "2025",
    duration: "1 month",
    teamSize: "Solo project",
    achievements: [
      "Integrated POS APIs successfully",
      "Implemented modular architecture",
      "Dockerized for deployment"
    ]
  },
  {
    id: 10,
    title: "Burger Hut",
    description: "Full-stack food ordering website with PHP and MySQL backend, designed for a smooth ordering experience.",
    longDescription: "Developed a creative landing page and login/signup system using PHP, MySQL, JavaScript, HTML, and CSS. Designed with a clean modular folder structure and hosted locally via XAMPP. Features include secure authentication, order management, and a white-orange themed responsive UI.",
    image: "/images/projects/burger_house_landing.png",
    githubUrl: "https://github.com/viditkulsh/BurgerHut",
    liveUrl: "#",
    showLiveDemo: false, // Control whether to show live demo link
    technologies: [
      { name: "PHP", icon: Server },
      { name: "MySQL", icon: Database },
      { name: "JavaScript", icon: Code },
      { name: "HTML", icon: FileText },
      { name: "CSS", icon: Palette }
    ],
    category: "Full Stack",
    featured: false,
    status: "Completed",
    problem: "Need for a user-friendly food ordering platform for a restaurant.",
    solution: "Built a responsive, database-driven web application with secure login and dynamic menu display.",
    impact: "Provided an intuitive platform to streamline online food ordering.",
    highlights: ["Responsive design", "Secure authentication", "Customizable menu system"],
    year: "2025",
    duration: "1 month",
    teamSize: "Solo project",
    achievements: [
      "Clean modular code structure",
      "Fast load times and smooth UI",
      "Secure user login system"
    ]
  },
  {
    id: 9,
    title: "Adbhut Global Website",
    description: "Mobile-optimized corporate website with SEO and performance enhancements.",
    longDescription: "Developed and deployed a full-stack, mobile-optimized corporate site using HTML, CSS, and JavaScript. Integrated scalable backend logic to handle 500+ form submissions/day, improved SEO, and enhanced load speed by 35% with image compression, lazy loading, and CDN integration.",
    image: "/images/projects/adbhutglobal_landing.jpeg",
    githubUrl: "https://github.com/viditkulsh/adbhutGlobal",
    liveUrl: "https://adbhutglobal.com",
    showLiveDemo: true, // Control whether to show live demo link
    technologies: [
      { name: "HTML", icon: FileText },
      { name: "CSS", icon: Palette },
      { name: "JavaScript", icon: Code },
      { name: "Backend Integration", icon: Server },
      { name: "SEO", icon: Search }
    ],
    category: "Web Development",
    featured: true,
    status: "Completed",
    problem: "Client needed a professional, fast, and mobile-optimized corporate website.",
    solution: "Created a responsive, SEO-optimized platform with improved load speed and backend scalability.",
    impact: "Increased user engagement by 40% and reduced bounce rates by 25%.",
    highlights: ["SEO optimization", "High performance", "Responsive architecture"],
    year: "2025",
    duration: "1 month",
    teamSize: "Solo project",
    achievements: [
      "Improved page speed scores significantly",
      "Handled high daily form submissions",
      "Delivered responsive UX"
    ]
  },
  {
    id: 8,
    title: "Sathi Sahyogi",
    description: "Volunteer coordination platform for disaster relief and community service.",
    longDescription: "When disaster strikes, the challenge isn't just about having volunteers—it's about coordinating them effectively. Sathi Sahyogi connects volunteers with NGOs and communities during crises, providing real-time task allocation, role-based access control, and resource tracking. Think of it as a mission control center for relief efforts, where every volunteer knows exactly what needs to be done, where, and when. The platform ensures that help reaches where it's needed most, without duplication or confusion.",
    image: "/images/projects/SathiSahyogi_landing.png",
    githubUrl: "https://github.com/viditkulsh/SathiSahyogi",
    liveUrl: "#",
    showLiveDemo: false,
    technologies: [
      { name: "React.js", icon: Zap },
      { name: "Node.js", icon: Server },
      { name: "MongoDB", icon: Database },
      { name: "Express.js", icon: Layers }
    ],
    category: "Full Stack",
    featured: true,
    status: "Completed",
    problem: "Need for efficient volunteer coordination during disasters.",
    solution: "Developed a role-based volunteer and task management system.",
    impact: "Improved disaster response efficiency for NGOs.",
    highlights: ["Real-time coordination", "Role-based access", "Resource tracking"],
    keyLearnings: "This project taught me how blockchain should actually be used in the real world. Not everything needs to be decentralized—but when you're dealing with trust, transparency, and immutable records (like volunteer contributions and resource allocation), blockchain makes perfect sense. I learned to identify when blockchain adds real value versus when it's just hype. The key is asking: does this problem benefit from trustless verification, transparency, or censorship resistance? If yes, blockchain. If no, a regular database is probably better and cheaper.",
    challenges: "Building a real-time coordination system that works even with spotty internet (common in disaster zones) was tough. We implemented optimistic UI updates and offline-first architecture, but syncing state when connections are intermittent without creating data conflicts required careful conflict resolution strategies.",
    technicalDepth: "Used Socket.io for real-time task updates with automatic reconnection logic, implemented MongoDB change streams for reactive data flow, and built a task queue system using Bull for background job processing. The role-based access system uses hierarchical permissions where NGO admins can delegate specific capabilities to coordinators without full access.",
    year: "2025",
    duration: "2 months",
    teamSize: "2 developers",
    achievements: [
      "Optimized response time in test scenarios",
      "Streamlined volunteer onboarding",
      "Secured data storage with MongoDB"
    ]
  },
  {
    id: 7,
    title: "Note-e-Movie",
    description: "Movie note-taking app with integrated film database search.",
    longDescription: "Built a platform for movie enthusiasts to take notes, save favorites, and track watchlists. Integrated external movie database APIs for accurate data.",
    image: "/images/projects/noteemovie.jpg",
    githubUrl: "https://github.com/viditkulsh/Note-e-Movie",
    liveUrl: "#",
    showLiveDemo: false, // Control whether to show live demo link
    technologies: [
      { name: "React.js", icon: Zap },
      { name: "Node.js", icon: Server },
      { name: "Express.js", icon: Layers },
      { name: "MongoDB", icon: Database }
    ],
    category: "Full Stack",
    featured: false,
    status: "Completed",
    problem: "Film fans lack tools to take structured notes linked to movie data.",
    solution: "Created a personalized movie note-taking platform with integrated data.",
    impact: "Improved how users organize and recall film experiences.",
    highlights: ["API integration", "User authentication", "Responsive UI"],
    year: "2024",
    duration: "1 month",
    teamSize: "Solo project",
    achievements: [
      "Seamless movie database integration",
      "Mobile-friendly design",
      "Fast search experience"
    ]
  },
  {
    id: 6,
    title: "HemoChain",
    description: "Blockchain-based blood donation tracking system.",
    longDescription: "Blood donation systems face a critical trust problem: How do you verify that blood units are safe, properly stored, and reach the right recipients? HemoChain uses blockchain to create an immutable, transparent chain of custody for every blood donation. From the moment a donor gives blood to when it reaches a patient, every step is recorded on-chain. This isn't just about tracking—it's about building trust in life-saving systems where mistakes or fraud can literally cost lives.",
    image: "/images/projects/hemomain.jpg",
    githubUrl: null,
    liveUrl: "https://hemochain.com",
    showLiveDemo: true,
    technologies: [
      { name: "Solidity", icon: Shield },
      { name: "Ethereum", icon: Lock },
      { name: "Hardhat", icon: Terminal },
      { name: "Web3.js", icon: Globe }
    ],
    category: "Blockchain",
    featured: true,
    status: "Completed",
    problem: "Blood donation tracking systems are prone to inefficiency and data tampering.",
    solution: "Implemented secure blockchain tracking of blood donations.",
    impact: "Improved transparency and trust in donation management.",
    highlights: ["Decentralized storage", "Immutable records", "Smart contracts"],
    keyLearnings: "This project was my introduction to tokenization and how it can transform physical assets (or in this case, biological units) into trackable, verifiable digital tokens. Each blood unit becomes an NFT with metadata about blood type, collection date, storage conditions, and testing results. It taught me that tokenization isn't just for art or finance—it's a powerful tool for managing and tracking any unique item that needs provenance and verification. The concept of 'one token = one unit' with immutable history is incredibly powerful for supply chain and healthcare.",
    challenges: "Balancing privacy with transparency was tricky. Donor information needs to be confidential (HIPAA/medical privacy), but the blood unit's journey needs to be public for trust. We solved this using zero-knowledge proofs for donor identity verification while keeping the blood unit's tracking data fully transparent. Also, Ethereum gas fees were a concern, so we implemented batch processing for multiple donations to reduce costs.",
    technicalDepth: "Smart contracts written in Solidity with ERC-721 (NFT) standard for unique blood unit tokens. Implemented role-based access control using OpenZeppelin's AccessControl for hospitals, blood banks, and donors. Used IPFS for storing medical test reports (linked to tokens via URI) to avoid storing sensitive data on-chain. Deployed on Polygon testnet for lower gas fees while maintaining Ethereum compatibility.",
    year: "2024",
    duration: "2 months",
    teamSize: "2 developers",
    achievements: [
      "Successful PoC deployment",
      "Secure donor data storage",
      "User-friendly blockchain interface"
    ]
  },
  {
    id: 5,
    title: "Spell Checker",
    description: "Lightweight spell-checking utility for text correction.",
    longDescription: "Built a Python-based spell checker that uses dictionary-based matching and NLP techniques for correction suggestions.",
    image: "/images/projects/spellchecker.jpg",
    githubUrl: "https://github.com/viditkulsh/SpellChecker",
    liveUrl: "#",
    showLiveDemo: false, // Control whether to show live demo link
    technologies: [
      { name: "Python", icon: Code },
      { name: "NLTK", icon: FileText }
    ],
    category: "Utility",
    featured: false,
    status: "Completed",
    problem: "Writers need quick offline spell-check tools.",
    solution: "Created a lightweight, accurate, and fast spell-checking utility.",
    impact: "Helps writers correct errors without heavy dependencies.",
    highlights: ["Offline support", "Fast processing", "Custom dictionary"],
    year: "2024",
    duration: "2 weeks",
    teamSize: "Team project",
    achievements: [
      "High accuracy rate",
      "Extensible dictionary feature",
      "CLI interface for quick use"
    ]
  },
  {
    id: 4,
    title: "Graph Crafters",
    description: "Data visualization tool for graph plotting and customization.",
    longDescription: "Built a Java-based tool to plot and customize various graph types for academic and professional use.",
    image: "/images/projects/graphcrafters.jpg",
    githubUrl: "https://github.com/viditkulsh/GraphCrafters",
    liveUrl: "#",
    showLiveDemo: false, // Control whether to show live demo link
    technologies: [
      { name: "Java", icon: Coffee },
      { name: "Python", icon: Code }
    ],
    category: "Data Visualization",
    featured: true,
    status: "Completed",
    problem: "Users need an easy tool for quick, customizable graph plotting.",
    solution: "Provided a Python-based interface for fast, flexible graph creation.",
    impact: "Speeds up data visualization for students and researchers.",
    highlights: ["Multiple graph types", "Custom styling", "Export to image"],
    year: "2023",
    duration: "1 month",
    teamSize: "Team project",
    achievements: [
      "Support for various chart types",
      "User-defined styles",
      "Fast rendering"
    ]
  },
  {
    id: 3,
    title: "Image Carousel",
    description: "Customizable image carousel component for websites.",
    longDescription: "Developed a responsive, touch-friendly image carousel with smooth animations, auto-play, and configurable settings.",
    image: "/images/projects/imagecarousel.jpg",
    githubUrl: "https://github.com/viditkulsh/ImageCarousel",
    liveUrl: "https://idit-image-carousel.vercel.app/",
    showLiveDemo: true, // Control whether to show live demo link
    technologies: [
      { name: "HTML", icon: FileText },
      { name: "CSS", icon: Palette },
      { name: "JavaScript", icon: Code }
    ],
    category: "Frontend",
    featured: false,
    status: "Completed",
    problem: "Websites need lightweight, customizable carousel solutions.",
    solution: "Created a modular image carousel component with responsive design.",
    impact: "Improved visual engagement on websites.",
    highlights: ["Smooth animations", "Customizable options", "Touch-friendly"],
    year: "2023",
    duration: "2 weeks",
    teamSize: "Solo project",
    achievements: [
      "Responsive design for all devices",
      "Configurable autoplay settings",
      "Lightweight implementation"
    ]
  },
  {
    id: 2,
    title: "Mood Dapp",
    description: "Ethereum-based decentralized application for storing user mood.",
    longDescription: "Created a blockchain application allowing users to set and retrieve their mood on the Ethereum network using smart contracts.",
    image: "/images/projects/moodapp.jpg",
    githubUrl: "https://github.com/viditkulsh/Mood_Dapp_myFirstDapp",
    liveUrl: "#",
    showLiveDemo: false, // Control whether to show live demo link
    technologies: [
      { name: "Solidity", icon: Shield },
      { name: "Ethereum", icon: Lock },
      { name: "Hardhat", icon: Terminal }
    ],
    category: "Blockchain",
    featured: false,
    status: "Completed",
    problem: "Simple introduction to decentralized app development.",
    solution: "Built a mood-storing DApp with basic blockchain interactions.",
    impact: "Helped in learning smart contract deployment and interaction.",
    highlights: ["Ethereum smart contracts", "Basic UI", "Blockchain data storage"],
    year: "2023",
    duration: "2 weeks",
    teamSize: "Solo project",
    achievements: [
      "First deployed smart contract",
      "Learned blockchain fundamentals",
      "Basic UI integration"
    ]
  },
  {
    id: 1,
    title: "Aventura De Texto",
    description: "Text-based adventure game implemented in Python.",
    longDescription: "Designed an interactive game where players navigate through a story using text commands, featuring multiple endings.",
    image: "/images/projects/aventura.jpg",
    githubUrl: "https://github.com/viditkulsh/Aventura-De-Texto",
    liveUrl: "#",
    showLiveDemo: false,
    technologies: [
      { name: "Python", icon: Code }
    ],
    category: "Game Development",
    featured: false,
    status: "Completed",
    problem: "Create an engaging text-based adventure for Python practice.",
    solution: "Implemented an interactive storyline with branching paths.",
    impact: "Enhanced player engagement through narrative design.",
    highlights: ["Branching storyline", "Multiple endings", "Replayability"],
    year: "2023",
    duration: "3 weeks",
    teamSize: "Team project",
    achievements: [
      "Interactive storyline",
      "Customizable scenarios",
      "Replay value"
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
