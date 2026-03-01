# Portfolio Data Management Guide

This guide explains how to easily update all sections of your portfolio website. The data is now organized in dedicated files for easy maintenance.

## 📁 **File Structure Overview**

```
src/data/
├── portfolioData.js          # Main configuration file
└── sections/
    ├── skillsData.js         # All skills and technologies
    ├── projectsData.js       # All projects information
    ├── socialMediaData.js    # Social media links and configs
    └── experienceData.js     # Work experience details
```

## 🔧 **How to Update Each Section**

### 1. **Personal Information**
**File:** `src/data/portfolioData.js`

```javascript
personal: {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  phone: "+91 1234567890",
  // ... update other personal details
}
```

### 2. **Skills & Technologies**
**File:** `src/data/sections/skillsData.js`

To add a new skill:
```javascript
{
  name: "New Technology",
  level: 85,                    // Proficiency percentage
  icon: "🔥",                  // Emoji icon
  projects: ["Project 1"],      // Related projects
  category: "Programming Languages"
}
```

To add a new skill category:
```javascript
{
  name: "New Category",
  color: "#FF5733",            // Category color
  skills: [/* skills array */]
}
```

### 3. **Projects**
**File:** `src/data/sections/projectsData.js`

To add a new project:
```javascript
{
  id: 5,                       // Unique ID
  title: "Project Title",
  description: "Short description",
  technologies: [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" }
  ],
  githubUrl: "https://github.com/...",
  liveUrl: "https://demo.com",
  featured: true,              // Show on featured projects
  status: "Completed",         // Project status
  year: "2024"
}
```

### 4. **Work Experience**
**File:** `src/data/sections/experienceData.js`

To add new experience:
```javascript
{
  id: 4,
  company: "Company Name",
  position: "Your Position",
  duration: "Jan 2024 - Present",
  description: "Role description",
  technologies: [
    { name: "Technology", icon: "🚀" }
  ],
  achievements: [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

### 5. **Social Media Links**
**File:** `src/data/sections/socialMediaData.js`

To add new platform:
```javascript
newplatform: {
  name: "Platform Name",
  url: "https://platform.com/yourprofile",
  icon: "🌐",
  color: "#1DA1F2",
  description: "Platform description"
}
```

Then add it to featured/professional arrays:
```javascript
featured: ['github', 'linkedin', 'newplatform'],
```

### 6. **Education**
**File:** `src/data/portfolioData.js`

```javascript
education: [
  {
    institution: "University Name",
    degree: "Degree Name",
    duration: "2022 - 2025",
    cgpa: "9.0/10",
    achievements: ["Achievement 1", "Achievement 2"]
  }
]
```

### 7. **Certificates**
**File:** `src/data/portfolioData.js`

```javascript
{
  title: "Certificate Name",
  issuer: "Issuing Organization",
  date: "2024",
  icon: "🏆",
  skills: ["Skill1", "Skill2"]
}
```

## 📄 **Resume Management**

### Adding New Resume Variants
1. Add PDF files to `public/resumes/` directory
2. Update `resumeVariants` in `portfolioData.js`:

```javascript
"new-role": {
  title: "Role Title Resume",
  filename: "Your_Resume_File.pdf",
  path: "/resumes/Your_Resume_File.pdf",
  highlightedSkills: ["Skill1", "Skill2"]
}
```

### Current Resume Files
- **Blockchain Developer:** `/resumes/Vidit Kulsh CV Blockchain.pdf`
- **Full Stack Developer:** `/resumes/Vidit Kulsh CV Full Stack.pdf`
- **Software Engineer:** `/resumes/Vidit Kulsh CV Software Eng.pdf`

## 🎨 **Styling & Assets**

### Icons
- **Website Icon:** `public/Logo/Icon1.jpg`
- **Skill Icons:** Use emojis in the `icon` field
- **Social Media Icons:** Defined in `socialMediaData.js`

### Colors
- Each skill category has a `color` field
- Social media platforms have `color` fields
- Use hex color codes (#FF5733)

## 🔄 **Auto-Sync Features**

When you update any data file, changes automatically reflect in:
- ✅ Story Mode sections
- ✅ Explore Mode sections  
- ✅ Recruiter Mode dashboard
- ✅ Landing page content
- ✅ Resume download links

## 🛠️ **Quick Update Checklist**

### For New Projects:
1. [ ] Add to `projectsData.js`
2. [ ] Include technology icons
3. [ ] Set `featured: true` for homepage display
4. [ ] Add GitHub/demo links

### For New Skills:
1. [ ] Add to appropriate category in `skillsData.js`
2. [ ] Include proficiency level (0-100)
3. [ ] Add relevant emoji icon
4. [ ] Link to related projects

### For Experience Updates:
1. [ ] Add to `experienceData.js`
2. [ ] Include technology stack with icons
3. [ ] List key achievements
4. [ ] Update duration if ongoing

### For Social Media:
1. [ ] Add platform to `socialMediaData.js`
2. [ ] Include icon and brand color
3. [ ] Add to relevant category arrays
4. [ ] Update personal.social links

## 🚀 **Development Commands**

```bash
# Start development server
npm start

# Build for production
npm run build

# Install dependencies (after updates)
npm install
```

## 📝 **Notes**

- **Consistent Naming:** Use consistent naming across all data files
- **Icon Standards:** Use emojis for visual consistency
- **URL Validation:** Ensure all external links are valid
- **Performance:** Keep image assets optimized
- **Backup:** Keep backups of your data files before major changes

## 🔧 **Troubleshooting**

### Common Issues:
1. **Build Errors:** Check for syntax errors in JSON/JS files
2. **Missing Icons:** Ensure emoji icons are properly formatted
3. **Broken Links:** Verify all URLs are accessible
4. **Image Issues:** Check file paths and extensions

### File Dependencies:
- `portfolioData.js` imports from all section files
- Components automatically use updated data
- No manual component updates needed

---

**💡 Tip:** Always test your changes locally before deploying by running `npm start`!
