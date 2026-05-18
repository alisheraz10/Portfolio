import React, { Suspense, lazy, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { useTheme } from './hooks/useTheme';
import Footer from './components/Footer';

// Lazy-load heavy sections for performance
const Hero        = lazy(() => import('./components/Hero'));
const About       = lazy(() => import('./components/About'));
const Skills      = lazy(() => import('./components/Skills'));
const ExperienceSection = lazy(() => import('./components/Experience'));
const Certifications    = lazy(() => import('./components/Certifications'));
const Portfolio   = lazy(() => import('./components/Portfolio'));
const Contact     = lazy(() => import('./components/Contact'));

// Fallback spinner for lazy sections
const SectionFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
  </div>
);

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  // Cleanup unwanted elements (Brain Logo/Chatbot)
  useEffect(() => {
    const cleanup = () => {
      // Find elements that are fixed/absolute and positioned in the bottom right
      const elements = document.querySelectorAll('*');
      elements.forEach((el: any) => {
        const style = window.getComputedStyle(el);
        const isFloating = style.position === 'fixed' || style.position === 'absolute';
        const isBottomRight = (parseInt(style.bottom) >= 0 && parseInt(style.right) >= 0);
        const isHighZ = parseInt(style.zIndex) > 50;
        
        // If it looks like a chatbot or contains "chatbot"/"brain" in its ID/Class/Content
        if (
          isFloating && isBottomRight && isHighZ && 
          (el.id.toLowerCase().includes('chatbot') || 
           el.id.toLowerCase().includes('brain') ||
           el.className?.toString().toLowerCase().includes('chatbot') ||
           el.className?.toString().toLowerCase().includes('brain'))
        ) {
          el.remove();
        }
      });
    };

    // Run once and also observe changes
    cleanup();
    const observer = new MutationObserver(cleanup);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`w-full transition-colors duration-300
        ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}
        ${!isLoaded ? 'h-screen overflow-hidden' : 'min-h-screen'}
      `}
    >
      {/* Loading Screen */}
      <LoadingScreen theme={theme} onFinished={() => setIsLoaded(true)} />

      {/* Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} isLoaded={isLoaded} />

      {/* Main Content */}
      <main>
        <Suspense fallback={<SectionFallback />}>
          <Hero id="home" theme={theme} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <About id="about" theme={theme} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills id="skills" />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ExperienceSection id="experience" />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Certifications id="certifications" />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Portfolio id="portfolio" />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact id="contact" theme={theme} />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
