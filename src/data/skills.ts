export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string; // emoji or icon key
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 92, icon: '⚛️' },
      { name: 'TypeScript', level: 88, icon: '🔷' },
      { name: 'JavaScript', level: 95, icon: '🟨' },
      { name: 'Next.js', level: 80, icon: '▲' },
      { name: 'Tailwind CSS', level: 92, icon: '🎨' },
      { name: 'Framer Motion', level: 78, icon: '✨' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Express.js', level: 85, icon: '🚀' },
      { name: 'MongoDB', level: 82, icon: '🍃' },
      { name: 'Firebase', level: 75, icon: '🔥' },
      { name: 'REST APIs', level: 90, icon: '🔗' },
    ],
  },
  {
    name: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub', level: 90, icon: '🐙' },
      { name: 'Vite', level: 88, icon: '⚡' },
      { name: 'VS Code', level: 95, icon: '💻' },
      { name: 'Figma', level: 70, icon: '🎭' },
      { name: 'Vercel', level: 82, icon: '▲' },
    ],
  },
];

export const allSkillTags = [
  'React', 'TypeScript', 'JavaScript', 'Tailwind CSS',
  'Node.js', 'Express.js', 'MongoDB', 'Firebase',
  'Framer Motion', 'Next.js', 'Git & GitHub',
];
