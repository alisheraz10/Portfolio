import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Zap } from 'lucide-react';
import type { Theme } from '../types';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { personal } from '../data/personal';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  isLoaded: boolean;
}

const navItems = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Contact',  href: '#contact' },
];

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-primary origin-left z-50"
      style={{ scaleX }}
    />
  );
};

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, isLoaded }) => {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [canRenderBar,   setCanRenderBar]   = useState(false);
  const [activeSection,  setActiveSection]  = useState('home');

  useEffect(() => {
    if (isLoaded) {
      const t = setTimeout(() => setCanRenderBar(true), 100);
      return () => clearTimeout(t);
    } else {
      setCanRenderBar(false);
    }
  }, [isLoaded]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    navItems.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isLoaded]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      {canRenderBar && <ScrollProgress />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex-shrink-0 flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white uppercase">
              {personal.firstName}
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-primary'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </a>
              );
            })}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="ml-2 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {theme === 'dark'
                ? <Sun className="h-4 w-4 text-yellow-400" />
                : <Moon className="h-4 w-4" />}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
