import nptelLogo from '../assets/certifications/nptel-logo.png';
import grapinzLogo from '../assets/certifications/grapinz-logo.jpg';
import isteLogo from '../assets/certifications/iste-logo.png';
import udemyLogo from '../assets/certifications/udemy-logo.png';

export type DocumentType = 
  | 'Certificate' 
  | 'Internship' 
  | 'Patent Application' 
  | 'Research Publication' 
  | 'Professional Membership';

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  docType: DocumentType;
  typeBadge: string;
  gradeBadge?: string;
  description: string;
  tags: string[];
  driveUrl: string;
  date?: string;
  logoUrl?: string;
}

export interface AchievementItem {
  title: string;
  badge: string;
  description: string;
  iconType: 'trophy' | 'code' | 'star' | 'file';
}

export const certificationsData: CertificationItem[] = [
  {
    id: "nptel-python-ds",
    title: "Python for Data Science",
    issuer: "NPTEL (IIT Madras)",
    docType: "Certificate",
    typeBadge: "NPTEL Certificate",
    gradeBadge: "Elite • 66%",
    description: "A comprehensive course on Python for data analysis, numerical computing, visualization, and foundational machine learning.",
    tags: ["Python", "Data Analysis", "Visualization", "Scikit-Learn"],
    driveUrl: "https://drive.google.com/file/d/1FI5H-oE6MiL6qxwG1g4JK0t-zoqDwaFn/view?usp=drive_link",
    date: "Jan – Apr 2025",
    logoUrl: nptelLogo
  },
  {
    id: "patent-hybrid-cloud-iot",
    title: "Hybrid Cloud–IoT Architectures With Machine Learning for Predictive Analysis in Fluid Mechanics and Thermodynamic System",
    issuer: "Intellectual Property India",
    docType: "Patent Application",
    typeBadge: "Patent Application Publication",
    gradeBadge: "Published",
    description: "Co-authored published patent application detailing cloud-IoT telemetry integration with predictive machine learning algorithms for thermodynamic analysis.",
    tags: ["Patent", "Cloud-IoT", "Machine Learning", "Thermodynamics"],
    driveUrl: "https://drive.google.com/file/d/1Xc2OjMxQFLmzloF6ZcuJkQsLcOdEfyOo/view?usp=drive_link"
  },
  {
    id: "research-drug-delivery",
    title: "Discourse Engineering of Patient Instructions for Advanced Drug Delivery: An English-Language Framework for AI-Assisted Medication Adherence Communication",
    issuer: "Academic Research Publication",
    docType: "Research Publication",
    typeBadge: "Research Publication",
    gradeBadge: "Published",
    description: "Peer-reviewed research exploring NLP discourse engineering for patient adherence through structured AI communication frameworks.",
    tags: ["Research", "NLP", "AI Framework", "Healthcare Tech"],
    driveUrl: "https://drive.google.com/file/d/19HCtgYNsUpOEzfgdyg6Iq7dUXu92xszE/view?usp=drive_link"
  },
  {
    id: "grapinz-internship-1",
    title: "Python Full Stack Internship",
    issuer: "Grapinz Technologies",
    docType: "Internship",
    typeBadge: "Internship Document",
    gradeBadge: "Verified",
    description: "Hands-on industrial training on developing web & desktop applications using Python, backend logic, and modern tools.",
    tags: ["Python", "Flask", "Systems", "Deployment"],
    driveUrl: "https://drive.google.com/file/d/1saLVV_sVMBCIMKh0SKQi_XmcazN5bQez/view?usp=drive_link",
    date: "Jan 2026",
    logoUrl: grapinzLogo
  },
  {
    id: "grapinz-internship-2",
    title: "Python Full Stack Internship II",
    issuer: "Grapinz Technologies",
    docType: "Internship",
    typeBadge: "Internship Document",
    gradeBadge: "Verified",
    description: "Advanced phase internship documentation focused on full-stack architecture, deployment, and AI-assisted workflows.",
    tags: ["Full Stack", "Python", "AI Integration", "Desktop Apps"],
    driveUrl: "https://drive.google.com/file/d/1Yujmch41oy4PKDZTgx2oi3Ih3m88PUxb/view?usp=drive_link",
    date: "Jun – Jul 2026",
    logoUrl: grapinzLogo
  },
  {
    id: "digital-marketing",
    title: "Fundamentals of Digital Marketing",
    issuer: "NPTEL / Online Certification",
    docType: "Certificate",
    typeBadge: "Course Certificate",
    gradeBadge: "Silver + Elite",
    description: "Comprehensive study of digital distribution channels, analytics, web discovery, and user acquisition strategies.",
    tags: ["Analytics", "Marketing", "Web Optimization"],
    driveUrl: "https://drive.google.com/file/d/1g2JKtG6JfLFd4ohiQWRt1NYR32gXpjS1/view?usp=drive_link",
    logoUrl: nptelLogo
  },
  {
    id: "udemy-cpp",
    title: "C++ Programming Mastery",
    issuer: "Udemy",
    docType: "Certificate",
    typeBadge: "Course Certificate",
    gradeBadge: "Completed",
    description: "Deep dive into C++ syntax, memory allocation, pointers, standard template library (STL), and object-oriented programming.",
    tags: ["C++", "Data Structures", "Algorithms", "OOP"],
    driveUrl: "https://drive.google.com/file/d/1SqLPzJJ-bNaKEsnSeONLadKbHU27JBvx/view?usp=drive_link",
    logoUrl: udemyLogo
  },
  {
    id: "iste-membership",
    title: "ISTE Membership",
    issuer: "Indian Society for Technical Education",
    docType: "Professional Membership",
    typeBadge: "Professional Membership",
    gradeBadge: "Active Member",
    description: "Official student chapter membership with the Indian Society for Technical Education fostering national engineering excellence.",
    tags: ["Professional Body", "Engineering", "Technical Community"],
    driveUrl: "https://drive.google.com/file/d/1ssw1gRLnOdlbW0pVi84FraH88H2tVOu1/view?usp=drive_link",
    logoUrl: isteLogo
  }
];

export const achievementsData: AchievementItem[] = [
  {
    title: "NPTEL Elite Grade",
    badge: "Academic Honor",
    description: "Secured Elite grade (66%) in Python for Data Science from IIT Madras.",
    iconType: "trophy"
  },
  {
    title: "Project Development",
    badge: "Technical Craft",
    description: "Architected and delivered 8+ end-to-end applications across AI/DS, desktop utilities, and full-stack systems.",
    iconType: "code"
  },
  {
    title: "Patent Application Publication",
    badge: "IP Publication",
    description: "Co-authored and published patent application on Hybrid Cloud-IoT architectures with machine learning.",
    iconType: "file"
  },
  {
    title: "Research Publication",
    badge: "Scholarship",
    description: "Authored English-language AI framework paper on patient medication adherence discourse engineering.",
    iconType: "star"
  }
];
