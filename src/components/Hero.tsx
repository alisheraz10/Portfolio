import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import HeroScene from './3d/HeroScene';
import type { Theme, SectionProps } from '../types';
import { personal } from '../data/personal';
import { socials } from '../data/socials';

interface HeroProps extends SectionProps {
  theme: Theme;
}

const Hero: React.FC<HeroProps> = ({ id, theme }) => {
  return (
    <section
      id={id}
      className="min-h-screen relative flex items-center justify-center pt-16 overflow-hidden bg-slate-950"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob-primary absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="blob-secondary absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Floating Decorative Blocks (Restored) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.25, 0.1],
              scale: [1, 1.1, 1],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              y: [0, (i % 3 === 0 ? -30 : 30), 0],
            }}
            transition={{
              duration: 7 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            className="absolute w-32 h-32 border border-primary/20 rounded-3xl"
            style={{
              top: `${15 + i * 12}%`,
              right: `${2 + (i % 3) * 6}%`,
              rotate: `${i * 30}deg`,
            }}
          />
        ))}
      </div>

      {/* Grid overlay for futuristic effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="z-10 order-2 lg:order-1 text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass border border-primary/20 text-primary text-sm font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Available for opportunities
          </motion.div>

          {/* Greeting */}
          <p className="text-slate-400 font-medium tracking-widest text-sm uppercase mb-3">
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-black mb-4 leading-tight text-white">
            Muhammad{' '}
            <span className="gradient-text">Ali</span>{' '}
            <span className="text-white">Sheraz</span>
          </h1>

          {/* Static Subtitle (Fixed) */}
          <div className="text-2xl md:text-3xl font-display font-bold mb-6 flex items-center justify-center lg:justify-start">
            <span className="gradient-text">Full Stack Developer | CS Student</span>
          </div>

          {/* Bio */}
          <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
            {personal.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start flex-wrap mb-8">
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-glow hover:shadow-glow-lg hover:scale-[1.03] active:scale-95 transition-all duration-300 group"
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={personal.cv}
              download={personal.cvFilename}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl glass border border-slate-700 hover:border-primary/40 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-300 hover:bg-primary/5 group"
            >
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Download CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl glass border border-slate-700 hover:border-secondary/40 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-300 hover:bg-secondary/5"
            >
              Contact Me
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-2.5 rounded-xl glass border border-slate-700 hover:border-primary/40 text-slate-400 hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="relative h-[400px] md:h-[600px] order-1 lg:order-2 cursor-move flex items-center justify-center overflow-hidden"
        >
          {/* Glow behind the canvas */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl" />
          <div className="w-full h-full relative z-10">
            <HeroScene theme={theme} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-600 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-gradient-to-b from-primary/60 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
