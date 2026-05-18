import React from 'react';
import { motion } from 'framer-motion';
import type { SectionProps } from '../types';
import { skillCategories, allSkillTags } from '../data/skills';

const Skills: React.FC<SectionProps> = ({ id }) => {
  return (
    <section
      id={id}
      className="py-24 relative bg-slate-950 overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full" />
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
            What I work with
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-bold text-white"
          >
            Skills &amp; <span className="gradient-text">Technologies</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-400 max-w-xl mx-auto"
          >
            My current technical stack, refined through real-world projects and continuous learning.
          </motion.p>
        </div>

        {/* Skill category cards with progress bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="glass-dark rounded-2xl p-6 border border-slate-800 hover:border-primary/30 transition-all duration-300 group"
            >
              <h3 className="font-display font-bold text-white text-lg mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                {category.name}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.1 + skillIdx * 0.05 }}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{skill.icon}</span>
                        <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full skill-bar-shimmer rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: catIdx * 0.1 + skillIdx * 0.05, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tag cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-slate-500 text-sm uppercase tracking-widest mb-6 font-medium">Quick view</p>
          <div className="flex flex-wrap justify-center gap-3">
            {allSkillTags.map((tag, idx) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-4 py-2 text-sm font-medium rounded-full glass-dark border border-slate-700 hover:border-primary/40 text-slate-300 hover:text-primary transition-all duration-200 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
