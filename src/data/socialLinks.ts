import gmailLogo from '../assets/gmail-logo.png';

export interface SocialLink {
  name: string;
  url: string;
  iconName?: 'github' | 'huggingface' | 'leetcode' | 'hackerrank' | 'mail' | 'portfolio' | 'resume';
  label: string;
  logoUrl?: string;
  alt?: string;
  ariaLabel?: string;
}

export interface TechnicalProfile {
  name: string;
  url: string;
  label: string;
  logoUrl: string;
  alt: string;
  ariaLabel: string;
}

export const socialLinks = {
  github: {
    name: "GitHub",
    url: "https://github.com/KarthikeyanSA369",
    label: "github.com/KarthikeyanSA369",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    alt: "GitHub Logo",
    ariaLabel: "GitHub Profile",
  },
  huggingFace: {
    name: "Hugging Face",
    url: "https://huggingface.co/KarthikeyanSA",
    label: "huggingface.co/KarthikeyanSA",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/huggingface/huggingface-original.svg",
    alt: "Hugging Face Logo",
    ariaLabel: "Hugging Face Profile",
  },
  leetCode: {
    name: "LeetCode",
    url: "https://leetcode.com/u/fm9TE15y87/",
    label: "leetcode.com/u/fm9TE15y87",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/leetcode/leetcode-original.svg",
    alt: "LeetCode Logo",
    ariaLabel: "LeetCode Profile",
  },
  hackerRank: {
    name: "HackerRank",
    url: "https://www.hackerrank.com/karthikeyansa369",
    label: "hackerrank.com/karthikeyansa369",
    logoUrl: "https://cdn.simpleicons.org/hackerrank/00EA64",
    alt: "HackerRank Logo",
    ariaLabel: "HackerRank Profile",
  },
  existingPortfolio: {
    name: "Existing Portfolio",
    url: "https://karthikeyansaportfolio.netlify.app/",
    label: "karthikeyansaportfolio.netlify.app",
  },
  gmail: {
    name: "Gmail",
    url: "mailto:karthikeyansa369@gmail.com",
    label: "karthikeyansa369@gmail.com",
    logoUrl: gmailLogo,
    alt: "Gmail Logo",
    ariaLabel: "Email via Gmail",
  },
  resume: {
    name: "Resume",
    url: "https://drive.google.com/file/d/1v6yS8cL6P93JDhJ0UyTeSnPzVZLu2jY6/view?usp=drive_link",
    label: "Google Drive Resume",
  },
  email: "karthikeyansa369@gmail.com",
  phone: "9629012605",
};

export const technicalProfiles: TechnicalProfile[] = [
  socialLinks.github,
  socialLinks.huggingFace,
  socialLinks.leetCode,
  socialLinks.hackerRank,
];
