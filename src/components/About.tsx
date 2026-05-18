import React from 'react';
import { motion } from 'framer-motion';
import AboutObject from './3d/AboutObject';
import type { Theme, SectionProps } from '../types';
import { Code, Server, Wrench, Zap } from 'lucide-react';
import { personal } from '../data/personal';

interface AboutProps extends SectionProps {
  theme: Theme;
}

const highlights = [
  {
    icon: Code,
    label: 'Frontend',
    desc: 'React, Next.js, TypeScript, Tailwind CSS, Framer Motion',
    color: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
  },
  {
    icon: Server,
    label: 'Backend',
    desc: 'Node.js, Express.js, MongoDB, Firebase, REST APIs',
    color: 'text-secondary',
    bg: 'bg-secondary/10 border-secondary/20',
  },
  {
    icon: Wrench,
    label: 'DevOps & Tools',
    desc: 'Git, GitHub, Vite, Vercel, Figma, VS Code',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: Zap,
    label: 'Specialties',
    desc: '3D Visuals, Animations, Performance Optimization, UI/UX',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
];

const About: React.FC<AboutProps> = ({ id, theme }) => {
  return (
    <section
      id={id}
      className="py-24 min-h-screen flex items-center relative bg-slate-900/40 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Get to know me
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-bold text-white"
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* 3D Avatar */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[420px] w-full rounded-2xl overflow-hidden shadow-glow relative cursor-move border border-primary/10 glass-dark"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
            <AboutObject theme={theme} />
          </motion.div>

          {/* Bio & cards */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-lg leading-relaxed mb-8"
            >
              I'm{' '}
              <strong className="text-white font-semibold">{personal.name}</strong>, a{' '}
              <span className="text-primary font-semibold">{personal.title}</span>{' '}
              from Pakistan. {personal.bio}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * idx }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`p-4 rounded-xl border glass-dark ${item.bg} group cursor-default`}
                >
                  <div className={`flex items-center gap-2.5 mb-2 ${item.color}`}>
                    <item.icon size={20} />
                    <h3 className="font-display font-bold text-white text-sm">{item.label}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
