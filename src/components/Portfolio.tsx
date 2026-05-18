import React from 'react';
import { motion } from 'framer-motion';
import { Github, Globe } from 'lucide-react';
import type { SectionProps } from '../types';
import { projects } from '../data/projects';

const ProjectCard: React.FC<{ project: (typeof projects)[0] }> = ({ project }) => (
  <div className="group h-[440px] w-full [perspective:1000px]">
    <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] will-change-transform">

      {/* Front */}
      <div
        className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden glass-dark border border-slate-800 group-hover:border-primary/30 transition-colors duration-300"
        style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', transform: 'rotateY(0deg) translateZ(1px)' }}
      >
        <div className="h-[58%] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Category badge */}
          <span className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <div className="p-5 h-[42%] flex flex-col justify-between">
          <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="px-2 py-0.5 text-xs rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-0.5 text-xs rounded-md bg-slate-800 text-slate-500">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Back */}
      <div
        className="absolute inset-0 h-full w-full rounded-2xl p-7 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-primary/20 overflow-hidden"
        style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)' }}
      >
        {/* Glow blob */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <span className="text-xs font-semibold text-primary tracking-wider uppercase">{project.category}</span>
          <h3 className="font-display text-2xl font-bold text-white mt-2 leading-snug">{project.title}</h3>
          <p className="text-slate-400 mt-4 text-sm leading-relaxed">{project.description}</p>
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
            )}
            {project.link && project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-primary hover:bg-primary/90 text-white transition-all"
              >
                <Globe className="w-3.5 h-3.5" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

    </div>
  </div>
);

const Portfolio: React.FC<SectionProps> = ({ id }) => (
  <section id={id} className="py-24 min-h-screen relative bg-slate-900/40 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
        >
          My work
        </motion.p>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold text-white"
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-slate-400 max-w-2xl mx-auto"
        >
          A selection of projects that demonstrate my skills in full stack development,
          UI/UX design, and modern web technologies. Hover to explore details.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
