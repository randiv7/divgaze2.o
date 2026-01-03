import React from 'react';
import { motion, Variants } from 'framer-motion';

interface FinalMessageProps {
  onReplay: () => void;
}

const FinalMessage: React.FC<FinalMessageProps> = ({ onReplay }) => {
  const text = "We bring you to the next level";
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col items-center justify-center z-40 overflow-hidden px-4 pt-24 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-16 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28 backdrop-blur-[2px]"
    >
      {/* Soft vignetted overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-wrap justify-center gap-x-2 sm:gap-x-4 md:gap-x-5 lg:gap-x-6 xl:gap-x-8 gap-y-2 sm:gap-y-3 md:gap-y-4 max-w-[95vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] text-center px-2 sm:px-4 md:px-6"
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            variants={wordContainer}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={charVariants}
                className="inline-block text-white text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[8.5rem] 2xl:text-[10rem] font-light tracking-tight sm:tracking-tighter uppercase leading-[0.9] sm:leading-[0.85] md:leading-[0.8] select-none font-space-grotesk"
                style={{ 
                  textShadow: '0 0 80px rgba(255,255,255,0.15), 0 10px 40px rgba(0,0,0,0.5)',
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.div>

      {/* Minimal Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.4, y: 0, letterSpacing: '0.5em' }}
        transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
        className="relative z-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 font-mono text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] uppercase text-white tracking-[0.5em] sm:tracking-[1em] md:tracking-[1.5em] lg:tracking-[2em] mix-blend-plus-lighter"
      >
        Odyssey Perfected
      </motion.div>

      {/* Premium Return CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 1.8, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 mt-8 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-20"
      >
        <motion.button
          whileHover={{ 
            scale: 1.05, 
            letterSpacing: '0.6em', 
            backgroundColor: 'rgba(255,255,255,1)',
            color: '#000',
            boxShadow: '0 0 120px rgba(255,255,255,0.3)'
          }}
          whileTap={{ scale: 0.98 }}
          onClick={onReplay}
          className="px-10 py-4 sm:px-16 sm:py-5 md:px-20 md:py-5 lg:px-28 lg:py-6 xl:px-32 xl:py-7 border border-white/20 text-white font-mono text-[9px] sm:text-[10px] md:text-[10px] lg:text-[11px] xl:text-[12px] tracking-[0.3em] sm:tracking-[0.4em] uppercase transition-all duration-1000 rounded-full bg-white/5 backdrop-blur-3xl overflow-hidden group"
        >
          <span className="relative z-10">Initiate Re-entry</span>
          <motion.div 
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-1000"
          />
        </motion.button>
      </motion.div>

      {/* Atmosphere Bloom */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay">
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.12, 0.05],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 blur-[150px]" 
        />
      </div>
    </motion.div>
  );
};

export default FinalMessage;