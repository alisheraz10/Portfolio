import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { personal } from '../data/personal';
import { socials } from '../data/socials';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-800 bg-slate-950 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/5 blur-[80px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <span className="font-display font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {personal.name}
            </span>
            <span className="text-slate-500 text-sm mt-1">{personal.title}</span>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-sm flex items-center gap-1.5"
          >
            © {year} {personal.name}. Built with
            <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
            &amp; React.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
