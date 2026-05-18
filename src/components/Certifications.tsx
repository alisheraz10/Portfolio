import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import MetaLogo from './svgs/Meta';
import CourseraLogo from './svgs/Coursera';
import CiscoLogo from './svgs/Cisco';
import MicrosoftLogo from './svgs/Microsoft';
import type { Certification, SectionProps } from '../types';

const certifications: Certification[] = [
  {
    id: 1,
    title: 'NAVTTC Web Development Course',
    issuer: 'NAVTTC',
    date: '2024',
    link: '#',
    image: 'award',
  },
  {
    id: 2,
    title: 'Zynx Solutions Full Stack Development',
    issuer: 'Zynx Solutions',
    date: '2025',
    link: '#',
    image: 'award',
  },
];

const CertCard = ({ cert, idx }: { cert: Certification; idx: number }) => {
  const renderLogo = () => {
    switch (cert.image) {
      case 'meta':      return <MetaLogo className="w-24 h-12 text-white transition-colors" />;
      case 'coursera':  return <CourseraLogo className="w-28 h-10 fill-white transition-colors" />;
      case 'cisco':     return <CiscoLogo className="w-20 h-12 fill-white transition-colors" />;
      case 'microsoft': return <MicrosoftLogo className="w-10 h-10" />;
      default:          return <Award className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="glass-dark p-6 rounded-2xl border border-slate-800 hover:border-primary/30 flex flex-col items-center text-center group transition-all duration-300 hover:shadow-glow h-full"
    >
      {/* Logo */}
      <div className="w-full h-20 mb-5 flex items-center justify-center overflow-hidden">
        {renderLogo()}
      </div>

      <h3 className="font-display font-bold text-white text-base mb-2 leading-snug min-h-[3rem] flex items-center justify-center">
        {cert.title}
      </h3>

      <p className="text-sm text-primary font-semibold mb-1">{cert.issuer}</p>
      <p className="text-xs text-slate-500 mb-6">Issued: {cert.date}</p>

      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center text-xs font-medium text-slate-400 hover:text-primary transition-colors py-2 px-4 rounded-full bg-slate-800/60 hover:bg-primary/10 border border-slate-700 hover:border-primary/30"
      >
        Verify Credential <ExternalLink size={11} className="ml-1.5" />
      </a>
    </motion.div>
  );
};

const Certifications: React.FC<SectionProps> = ({ id }) => (
  <section id={id} className="py-24 bg-slate-950 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
        >
          Credentials
        </motion.p>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold text-white"
        >
          <span className="gradient-text">Certifications</span>
        </motion.h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-8 max-w-5xl mx-auto">
        {certifications.map((cert, idx) => (
          <div key={cert.id} className="w-full sm:w-[320px]">
            <CertCard cert={cert} idx={idx} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
