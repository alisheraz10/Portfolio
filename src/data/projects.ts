import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Perfume Brand Website',
    category: 'Web Design & Development',
    description:
      'A premium luxury perfume brand landing page with an elegant dark aesthetic, smooth scroll animations, parallax effects, and a glassmorphism-inspired product showcase. Built for maximum visual impact and conversion.',
    image: '/images/projects/perfume-brand.webp',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: '#',
    github: 'https://github.com/muhammadalisheraz',
  },
  {
    id: 2,
    title: 'E-Commerce Website',
    category: 'Full Stack Application',
    description:
      'A full-featured e-commerce platform with product listings, cart management, user authentication, and payment integration. Includes an admin dashboard for inventory management and order tracking.',
    image: '/images/projects/ecommerce.webp',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript'],
    link: '#',
    github: 'https://github.com/muhammadalisheraz',
  },
  {
    id: 3,
    title: 'AI Portfolio Builder',
    category: 'AI-Powered Tool',
    description:
      'An intelligent portfolio builder that uses AI to generate personalized portfolio content. Users input their skills and experience, and the AI crafts professional copy, suggests layouts, and generates a deployable portfolio.',
    image: '/images/projects/ai-portfolio.webp',
    tech: ['React', 'TypeScript', 'Node.js', 'Firebase', 'OpenAI API'],
    link: '#',
    github: 'https://github.com/muhammadalisheraz',
  },
  {
    id: 4,
    title: 'Spotify Clone',
    category: 'Web Application',
    description:
      'A feature-rich Spotify clone with real-time music playback, playlist management, search functionality, and a responsive player UI. Integrates with the Spotify Web API for authentic music data.',
    image: '/images/projects/spotify-clone.webp',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Spotify API', 'Firebase'],
    link: '#',
    github: 'https://github.com/muhammadalisheraz',
  },
];
