export interface SkillItem {
  name: string;
  category: string;
  icon?: string;
  popular?: boolean;
  orbitRing?: 'inner' | 'middle' | 'outer';
  color?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface OrbitTechItem {
  name: string;
  category: string;
  color: string;
  ring: 'inner' | 'middle' | 'outer';
}

// 1. Inner Orbit: Important programming and development technologies (8)
export const innerOrbitLogos: OrbitTechItem[] = [
  { name: "Python", category: "Programming Languages", color: "#3776AB", ring: "inner" },
  { name: "Java", category: "Programming Languages", color: "#ED8B00", ring: "inner" },
  { name: "JavaScript", category: "Programming Languages", color: "#F7DF1E", ring: "inner" },
  { name: "TypeScript", category: "Programming Languages", color: "#3178C6", ring: "inner" },
  { name: "React", category: "Frontend Development", color: "#61DAFB", ring: "inner" },
  { name: "HTML5", category: "Frontend Development", color: "#E34F26", ring: "inner" },
  { name: "CSS3", category: "Frontend Development", color: "#1572B6", ring: "inner" },
  { name: "Node.js", category: "Backend Development", color: "#339933", ring: "inner" },
];

// 2. Middle Orbit: Data Science and AI technologies (9)
export const middleOrbitLogos: OrbitTechItem[] = [
  { name: "Pandas", category: "Data Science & Analytics", color: "#150458", ring: "middle" },
  { name: "NumPy", category: "Data Science & Analytics", color: "#013243", ring: "middle" },
  { name: "Matplotlib", category: "Data Science & Analytics", color: "#11557C", ring: "middle" },
  { name: "Scikit-learn", category: "Machine Learning", color: "#F7931E", ring: "middle" },
  { name: "PyTorch", category: "Deep Learning", color: "#EE4C2C", ring: "middle" },
  { name: "TensorFlow", category: "Deep Learning", color: "#FF6F00", ring: "middle" },
  { name: "OpenCV", category: "Computer Vision", color: "#5C3EE8", ring: "middle" },
  { name: "Hugging Face", category: "AI & Transformers", color: "#FFD21E", ring: "middle" },
  { name: "YOLO", category: "Computer Vision", color: "#00F0FF", ring: "middle" },
];

// 3. Outer Orbit: Tools, databases, automation, and backend frameworks (15)
export const outerOrbitLogos: OrbitTechItem[] = [
  { name: "Git", category: "Version Control", color: "#F05032", ring: "outer" },
  { name: "GitHub", category: "Developer Platform", color: "#181717", ring: "outer" },
  { name: "Docker", category: "Containerization", color: "#2496ED", ring: "outer" },
  { name: "VS Code", category: "Development Environment", color: "#007ACC", ring: "outer" },
  { name: "MySQL", category: "Relational Database", color: "#00758F", ring: "outer" },
  { name: "PostgreSQL", category: "Relational Database", color: "#336791", ring: "outer" },
  { name: "MongoDB", category: "Document Database", color: "#47A248", ring: "outer" },
  { name: "Firebase", category: "Cloud Database", color: "#FFA000", ring: "outer" },
  { name: "Supabase", category: "Backend & Database", color: "#3ECF8E", ring: "outer" },
  { name: "Pinecone", category: "Vector Database", color: "#10B981", ring: "outer" },
  { name: "n8n", category: "Workflow Automation", color: "#EA4B71", ring: "outer" },
  { name: "FastAPI", category: "Backend Framework", color: "#009688", ring: "outer" },
  { name: "Flask", category: "Backend Framework", color: "#1F2937", ring: "outer" },
  { name: "Kubernetes", category: "Container Orchestration", color: "#326CE5", ring: "outer" },
  { name: "Google Colab", category: "Cloud Computing", color: "#F9AB00", ring: "outer" },
];

// PRESERVED COMPLETE SKILLS DIRECTORY FOR THE GRID BELOW
export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core foundation in typed, object-oriented, and scripting languages.",
    skills: [
      { name: "Python", category: "Programming Languages", color: "#3776AB", orbitRing: "inner" },
      { name: "Java", category: "Programming Languages", color: "#ED8B00", orbitRing: "inner" },
      { name: "C", category: "Programming Languages", color: "#A8B9CC", orbitRing: "inner" },
      { name: "C++", category: "Programming Languages", color: "#00599C", orbitRing: "inner" },
      { name: "JavaScript", category: "Programming Languages", color: "#F7DF1E", orbitRing: "inner" },
      { name: "TypeScript", category: "Programming Languages", color: "#3178C6", orbitRing: "middle" },
    ],
  },
  {
    title: "Frontend Development",
    description: "Responsive, dynamic web applications with modern frameworks and styling.",
    skills: [
      { name: "React", category: "Frontend", color: "#61DAFB", orbitRing: "inner" },
      { name: "Next.js", category: "Frontend", color: "#000000", orbitRing: "middle" },
      { name: "Tailwind CSS", category: "Frontend", color: "#06B6D4", orbitRing: "middle" },
      { name: "HTML5", category: "Frontend", color: "#E34F26" },
      { name: "CSS3", category: "Frontend", color: "#1572B6" },
      { name: "Bootstrap", category: "Frontend", color: "#7952B3" },
      { name: "Vite", category: "Frontend", color: "#646CFF", orbitRing: "middle" },
    ],
  },
  {
    title: "Backend Development",
    description: "Robust REST APIs, server-side architectures, and microservices.",
    skills: [
      { name: "Flask", category: "Backend", color: "#000000", orbitRing: "inner" },
      { name: "FastAPI", category: "Backend", color: "#009688", orbitRing: "middle" },
      { name: "Node.js", category: "Backend", color: "#339933", orbitRing: "outer" },
      { name: "Express.js", category: "Backend", color: "#000000" },
      { name: "REST API", category: "Backend", color: "#4A78E0" },
    ],
  },
  {
    title: "Data Science & Analytics",
    description: "Statistical analysis, data pipelines, modeling, and business intelligence.",
    skills: [
      { name: "Pandas", category: "Data Science", color: "#150458", orbitRing: "outer" },
      { name: "NumPy", category: "Data Science", color: "#013243", orbitRing: "outer" },
      { name: "Matplotlib", category: "Data Science", color: "#11557C" },
      { name: "Seaborn", category: "Data Science", color: "#4D7298" },
      { name: "Plotly", category: "Data Science", color: "#3F4F75" },
      { name: "Scikit-learn", category: "Data Science", color: "#F7931E", orbitRing: "outer" },
      { name: "Power BI", category: "Data Science", color: "#F2C811" },
      { name: "Microsoft Excel", category: "Data Science", color: "#217346" },
      { name: "Jupyter Notebook", category: "Data Science", color: "#F37626" },
    ],
  },
  {
    title: "AI & Machine Learning",
    description: "Deep learning models, computer vision, transformers, and LLM integrations.",
    skills: [
      { name: "PyTorch", category: "AI & ML", color: "#EE4C2C", orbitRing: "middle" },
      { name: "TensorFlow", category: "AI & ML", color: "#FF6F00", orbitRing: "middle" },
      { name: "OpenCV", category: "AI & ML", color: "#5C3EE8", orbitRing: "outer" },
      { name: "YOLO", category: "AI & ML", color: "#00FFFF", orbitRing: "outer" },
      { name: "Hugging Face", category: "AI & ML", color: "#FFD21E", orbitRing: "outer" },
      { name: "LangChain", category: "AI & ML", color: "#1C3C3C", orbitRing: "outer" },
      { name: "Ollama", category: "AI & ML", color: "#000000" },
    ],
  },
  {
    title: "Automation & Workflow",
    description: "Self-hosted low-code pipelines and event-driven automation nodes.",
    skills: [
      { name: "n8n", category: "Automation", color: "#EA4B71", orbitRing: "middle" },
    ],
  },
  {
    title: "Databases & Vector Storage",
    description: "Relational RDBMS, document stores, and vector search engines.",
    skills: [
      { name: "MySQL", category: "Databases", color: "#4479A1", orbitRing: "middle" },
      { name: "PostgreSQL", category: "Databases", color: "#4169E1" },
      { name: "SQLite", category: "Databases", color: "#003B57" },
      { name: "MongoDB", category: "Databases", color: "#47A248", orbitRing: "middle" },
      { name: "Firebase", category: "Databases", color: "#FFCA28" },
      { name: "Supabase", category: "Databases", color: "#3ECF8E", orbitRing: "outer" },
      { name: "Pinecone", category: "Databases", color: "#000000" },
    ],
  },
  {
    title: "Development Tools & DevOps",
    description: "Version control, containerization, IDEs, and deployment platforms.",
    skills: [
      { name: "Git", category: "Tools", color: "#F05032", orbitRing: "outer" },
      { name: "GitHub", category: "Tools", color: "#181717", orbitRing: "outer" },
      { name: "Docker", category: "Tools", color: "#2496ED", orbitRing: "middle" },
      { name: "VS Code", category: "Tools", color: "#007ACC" },
      { name: "Linux", category: "Tools", color: "#FCC624" },
      { name: "Google Colab", category: "Tools", color: "#F9AB00" },
      { name: "Postman", category: "Tools", color: "#FF6C37", orbitRing: "outer" },
    ],
  },
  {
    title: "Additional Frameworks & Libraries",
    description: "GUI development, rapid prototyping, and orchestration.",
    skills: [
      { name: "Streamlit", category: "Additional", color: "#FF4B4B" },
      { name: "Gradio", category: "Additional", color: "#FD6F00" },
      { name: "Tkinter", category: "Additional", color: "#3776AB" },
      { name: "Kivy", category: "Additional", color: "#3B82F6" },
      { name: "Kubernetes", category: "Additional", color: "#326CE5" },
    ],
  },
];
