export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  github?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type Theme = 'light' | 'dark';

export interface SectionProps {
  id: string;
  className?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  link: string;
  image?: string;
}
