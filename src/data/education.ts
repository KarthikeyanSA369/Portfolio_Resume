import lourdeMathaImg from '../assets/education/lourdes-matha-school-original.jpg';
import vsbCollegeImg from '../assets/education/vsb-college-original.jpg';

export interface EducationCard {
  level: string;
  badge: string;
  institution: string;
  duration: string;
  scoreLabel: string;
  scoreValue: string;
  details?: string;
  image: string;
  hierarchyTier: 'first' | 'second' | 'third';
}

export interface AcademicOverview {
  cgpa: string;
  department: string;
  university: string;
  regulation: string;
  expectedGraduation: string;
  relevantCoursework: string[];
}

// Strictly ordered: Card 1 (SSLC) -> Card 2 (HSC) -> Card 3 (Bachelor's Degree)
export const educationCards: EducationCard[] = [
  {
    level: "Secondary School (X)",
    badge: "SSLC (2021–2022)",
    institution: "Lourde Matha Convent Matric Hr Sec School",
    duration: "2021 – 2022",
    scoreLabel: "Percentage",
    scoreValue: "84.6%",
    details: "Foundational academic curriculum with distinction.",
    image: lourdeMathaImg,
    hierarchyTier: "first"
  },
  {
    level: "Higher Secondary (XII)",
    badge: "HSC (2022–2024)",
    institution: "Lourde Matha Convent Matric Hr Sec School",
    duration: "2022 – 2024",
    scoreLabel: "Percentage",
    scoreValue: "78.5%",
    details: "Group: Computer Science with Mathematics (471 / 600 marks).",
    image: lourdeMathaImg, // Same actual uploaded school photograph
    hierarchyTier: "second"
  },
  {
    level: "Bachelor's Degree",
    badge: "B.E. AI & DS (2024–2028)",
    institution: "V.S.B. College of Engineering Technical Campus, Coimbatore",
    duration: "2024 – 2028",
    scoreLabel: "Current CGPA",
    scoreValue: "8.52 / 10",
    details: "Anna University (Regulation R2021) • Section B",
    image: vsbCollegeImg, // Actual uploaded V.S.B. College photograph
    hierarchyTier: "third"
  }
];

export const academicOverview: AcademicOverview = {
  cgpa: "8.52 / 10",
  department: "Artificial Intelligence and Data Science",
  university: "Anna University",
  regulation: "R2021",
  expectedGraduation: "2028",
  relevantCoursework: [
    "Machine Learning",
    "Deep Learning",
    "Data Structures & Algorithms",
    "Operating Systems",
    "Computer Networks",
    "Database Design",
    "Cloud Computing",
    "Probability and Statistics"
  ]
};
