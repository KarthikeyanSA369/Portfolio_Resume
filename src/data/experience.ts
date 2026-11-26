import grapinzLogo from '../assets/certifications/grapinz-logo.jpg';

export interface PracticalWorkItem {
  id: number;
  title: string;
  description: string;
  iconName: 'Code2' | 'Monitor' | 'Cpu' | 'FileJson' | 'Bug' | 'Sparkles';
}

export interface ExperienceData {
  organization: string;
  logo: string;
  role: string;
  duration: string;
  schedule: string;
  location: string;
  fullLocation: string;
  programNature: string;
  status: string;
  overview: string;
  project: {
    title: string;
    description: string;
    technologies: string[];
    slug: string;
  };
  practicalWork: PracticalWorkItem[];
  learningOutcome: string;
}

export const experienceData: ExperienceData = {
  organization: "Grapinz Technology and Institution",
  logo: grapinzLogo,
  role: "Python Full Stack Development – Training & Internship",
  duration: "10 June 2026 – 10 July 2026 (30 Days)",
  schedule: "1 Month | Offline",
  location: "Udumalpet, Tamil Nadu",
  fullLocation: "Dr. Rajendra Prasad Road, Udumalpet, Tamil Nadu – 642126, India",
  programNature: "Completed a 1 Month offline technical internship.",
  status: "Completed",
  overview: "Worked as a Python Full Stack Development Intern at Grapinz Technology and Institution, completing a 1 month offline internship. Gained hands-on experience in Python programming, application development, desktop application integration, and implementing practical software development solutions while strengthening my technical and problem-solving skills.",
  project: {
    title: "QuickBrowse – Browser Profile Manager",
    description: "Worked on a Windows desktop application for managing multiple browser profiles across Google Chrome, Microsoft Edge, and Brave.",
    technologies: ["Python", "PyWebView", "HTML", "CSS", "JavaScript", "JSON"],
    slug: "quickbrowse"
  },
  practicalWork: [
    {
      id: 1,
      title: "Python Programming & OOP",
      description: "Practiced Python programming and object-oriented programming concepts.",
      iconName: "Code2"
    },
    {
      id: 2,
      title: "Desktop Application Development",
      description: "Worked with desktop application functionality and PyWebView integration.",
      iconName: "Monitor"
    },
    {
      id: 3,
      title: "Windows System Integration",
      description: "Explored browser detection, Windows Registry interactions, and filesystem operations.",
      iconName: "Cpu"
    },
    {
      id: 4,
      title: "Configuration & Data Handling",
      description: "Worked with JSON configuration, application settings, and file handling.",
      iconName: "FileJson"
    },
    {
      id: 5,
      title: "Testing & Debugging",
      description: "Practiced debugging, exception handling, and application testing.",
      iconName: "Bug"
    },
    {
      id: 6,
      title: "AI Exploration",
      description: "Learned AI implementation fundamentals and explored AI-assisted development workflows.",
      iconName: "Sparkles"
    }
  ],
  learningOutcome: "Gained practical experience in Python-based application development and a better understanding of how software features are developed, integrated, and tested."
};
