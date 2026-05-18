import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';
import type { Theme } from '../types';
import { personal } from '../data/personal';

interface LoadingScreenProps {
  theme: Theme;
  onFinished: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Hybrid progress animation: ensuring movement even if no assets are loading
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        // If Three.js progress is ahead, sync with it
        if (progress > prev) return Math.floor(progress);
        
        // Otherwise, increment slowly to ensure the user sees movement
        // This will reach 100% in approx 2.5 seconds (25ms * 100)
        if (prev < 100) return prev + 1;
        
        return prev;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [progress]);

  // Handle completion when progress hits 100%
  useEffect(() => {
    if (displayProgress === 100) {
      const timer = setTimeout(() => {
        setShow(false);
        onFinished();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [displayProgress, onFinished]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950"
        >
          {/* Ambient blobs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative mb-10 z-10"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-xl opacity-30 scale-150 animate-pulse" />

            {/* Monogram badge */}
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-lg">
              <span className="font-display font-black text-white text-3xl tracking-tighter select-none">
                {personal.initials.split('.').filter(Boolean).map(l => l[0]).join('')}
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-2 z-10 text-center"
          >
            <p className="font-display font-bold text-xl text-white tracking-tight">
              {personal.name}
            </p>
            <p className="text-slate-500 text-sm mt-1">{personal.title}</p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-56 mt-8 z-10"
          >
            <div className="flex justify-between mb-2">
              <span className="text-xs text-slate-500 font-mono">Loading</span>
              <span className="text-xs text-primary font-mono font-semibold">{displayProgress}%</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full skill-bar-shimmer rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
