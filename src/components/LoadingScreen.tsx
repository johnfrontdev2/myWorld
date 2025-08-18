import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  setIsLoading: (loading: boolean) => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ setIsLoading }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => setIsLoading(false), 800);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [setIsLoading]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-white flex items-center justify-center"
        >
          <div className="text-center">
            {/* Brand mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-steel-highlight to-silver rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4">
                <span className="text-obsidian font-display font-black text-xl">JS</span>
              </div>
              <h1 className="text-2xl font-display font-bold text-obsidian mb-2">
                johnnightsteel
              </h1>
              <p className="text-sm text-gunmetal tracking-wider uppercase font-medium">
                Digital Architect
              </p>
            </motion.div>
            
            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="w-64 h-px bg-silver/30 relative overflow-hidden"
            >
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-midnight to-steel-highlight"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.div>
            
            {/* Progress text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="text-xs text-gunmetal mt-4 tracking-wider font-display"
            >
              {Math.round(progress)}%
            </motion.p>
            
            {/* Loading message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="text-xs text-gunmetal/60 mt-2 font-light"
            >
              Crafting your experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;