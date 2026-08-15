import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

const PortfolioContext = createContext();

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_CURRENT_SECTION: 'SET_CURRENT_SECTION',
  SET_MODE: 'SET_MODE',
  SET_THEME: 'SET_THEME',
  UPDATE_VIEWED_SECTIONS: 'UPDATE_VIEWED_SECTIONS',
  SET_RESUME_VARIANT: 'SET_RESUME_VARIANT',
  TOGGLE_EASTER_EGG: 'TOGGLE_EASTER_EGG',
  SET_ANIMATIONS_ENABLED: 'SET_ANIMATIONS_ENABLED',
};

// Initial state
const initialState = {
  // App state
  isLoading: true,
  currentSection: 'landing',
  mode: 'landing', // 'landing', 'story', 'explore', 'recruiter'
  theme: 'dark',
  animationsEnabled: true,
  
  // Navigation state
  viewedSections: [],
  sectionHistory: [],

  // Resume state
  selectedResumeVariant: 'full-stack-developer',
  
  // Feature toggles
  easterEggActive: false,
  
  // Data
  portfolioData: portfolioData,
};

// Reducer function
const portfolioReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
      
    case ACTIONS.SET_CURRENT_SECTION:
      return { 
        ...state, 
        currentSection: action.payload,
        sectionHistory: [...state.sectionHistory, action.payload]
      };
      
    case ACTIONS.SET_MODE:
      return { ...state, mode: action.payload };
      
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
      
    case ACTIONS.UPDATE_VIEWED_SECTIONS:
      if (!state.viewedSections.includes(action.payload)) {
        return { 
          ...state, 
          viewedSections: [...state.viewedSections, action.payload] 
        };
      }
      return state;

    case ACTIONS.SET_RESUME_VARIANT:
      return { ...state, selectedResumeVariant: action.payload };
      
    case ACTIONS.TOGGLE_EASTER_EGG:
      return { ...state, easterEggActive: !state.easterEggActive };
      
    case ACTIONS.SET_ANIMATIONS_ENABLED:
      return { ...state, animationsEnabled: action.payload };
      
    default:
      return state;
  }
};

// Context Provider Component
export const PortfolioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);
  
  // Load saved preferences from localStorage
  useEffect(() => {
    const savedAnimations = localStorage.getItem('portfolio-animations');
    const savedResumeVariant = localStorage.getItem('portfolio-resume-variant');

    if (savedAnimations !== null) {
      dispatch({ 
        type: ACTIONS.SET_ANIMATIONS_ENABLED, 
        payload: JSON.parse(savedAnimations) 
      });
    }
    
    if (savedResumeVariant) {
      dispatch({ 
        type: ACTIONS.SET_RESUME_VARIANT, 
        payload: savedResumeVariant 
      });
    }
  }, []);
  
  // Save preferences to localStorage.
  // NOTE: theme is deliberately NOT persisted here. ThemeContext is its sole
  // owner; writing it from both places meant whichever effect ran last won,
  // which could silently revert the user's toggle.
  useEffect(() => {
    localStorage.setItem('portfolio-animations', JSON.stringify(state.animationsEnabled));
    localStorage.setItem('portfolio-resume-variant', state.selectedResumeVariant);
  }, [state.animationsEnabled, state.selectedResumeVariant]);
  
  // Action creators
  const actions = {
    setLoading: (loading) => 
      dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
      
    setCurrentSection: (section) => {
      dispatch({ type: ACTIONS.SET_CURRENT_SECTION, payload: section });
      dispatch({ type: ACTIONS.UPDATE_VIEWED_SECTIONS, payload: section });
    },
    
    setMode: (mode) => 
      dispatch({ type: ACTIONS.SET_MODE, payload: mode }),
      
    setTheme: (theme) => 
      dispatch({ type: ACTIONS.SET_THEME, payload: theme }),

    setResumeVariant: (variant) => 
      dispatch({ type: ACTIONS.SET_RESUME_VARIANT, payload: variant }),
      
    toggleEasterEgg: () => 
      dispatch({ type: ACTIONS.TOGGLE_EASTER_EGG }),
      
    setAnimationsEnabled: (enabled) => 
      dispatch({ type: ACTIONS.SET_ANIMATIONS_ENABLED, payload: enabled }),
      
    // Helper functions
    getProjectById: (id) => {
      return state.portfolioData.projects.find(project => project.id === parseInt(id));
    },
    
    getFeaturedProjects: () => {
      return state.portfolioData.projects.filter(project => project.featured);
    },
    
    getSkillsByCategory: (categoryName) => {
      const category = state.portfolioData.skills.categories.find(cat => cat.name === categoryName);
      return category ? category.skills : [];
    },
    
    getExperienceByCompany: (company) => {
      return state.portfolioData.experience.find(exp => exp.company === company);
    },
    
    getCertificatesBySkill: (skill) => {
      return state.portfolioData.certificates.filter(cert => 
        cert.skills.includes(skill)
      );
    },
    
    getActivitiesByType: (type) => {
      return state.portfolioData.activities.filter(activity => 
        activity.type === type
      );
    },
    
    // Analytics helpers
    getCompletionPercentage: () => {
      const totalSections = 8; // landing, about, education, skills, projects, experience, certificates, activities
      return Math.round((state.viewedSections.length / totalSections) * 100);
    },
    
    getTimeSpentInMode: (mode) => {
      // This could track actual time spent in each mode
      return state.sectionHistory.filter(section => section.includes(mode)).length;
    },
    
    // Navigation helpers
    getNextSection: () => {
      const sections = ['about', 'education', 'skills', 'projects', 'experience', 'certificates', 'activities'];
      const currentIndex = sections.indexOf(state.currentSection);
      return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
    },
    
    getPreviousSection: () => {
      const sections = ['about', 'education', 'skills', 'projects', 'experience', 'certificates', 'activities'];
      const currentIndex = sections.indexOf(state.currentSection);
      return currentIndex > 0 ? sections[currentIndex - 1] : null;
    },
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook to use the portfolio context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

// HOC for components that need portfolio data
export const withPortfolioData = (Component) => {
  return (props) => {
    const portfolioContext = usePortfolio();
    return <Component {...props} portfolio={portfolioContext} />;
  };
};

export default PortfolioContext;
