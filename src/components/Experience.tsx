import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import type { SectionProps } from '../types';
import { experiences } from '../data/experience';

const ExperienceSection: React.FC<SectionProps> = ({ id }) => {
  return (
    <section
      id={id}
      className="py-24 min-h-screen bg-slate-900/40 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
          >
            My journey
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-bold text-white"
          >
            Work <span className="gradient-text">Experience</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px w-px h-full bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } items-start md:items-center`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-slate-950 z-10 mt-1.5 md:mt-0 shadow-glow" />

                {/* Spacer */}
                <div className="hidden md:block w-1/2" />

                {/* Card */}
                <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-8">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="glass-dark p-6 rounded-2xl border border-slate-800 hover:border-primary/30 transition-all duration-300 relative"
                  >
                    {/* Arrow pointer (desktop) */}
                    <div
                      className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-900 border-slate-800 transform rotate-45 ${
                        index % 2 === 0
                          ? '-right-1.5 border-t border-r'
                          : '-left-1.5 border-b border-l'
                      }`}
                    />

                    {/* Role + date */}
                    <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                      <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                        {exp.role}
                      </h3>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1 whitespace-nowrap">
                        <Calendar className="w-3 h-3" />
                        {exp.date}
                      </span>
                    </div>

                    <h4 className="text-secondary font-semibold text-sm mb-3">{exp.company}</h4>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/15"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
