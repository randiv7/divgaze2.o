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
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const wordContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -120,
      filter: "blur(30px)",
      scale: 1.15,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-50 overflow-hidden px-4 backdrop-blur-[2px]"
    >
      {/* Soft vignetted overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-wrap justify-center gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-2 sm:gap-y-3 md:gap-y-4 max-w-[95vw] sm:max-w-4xl md:max-w-7xl text-center px-2 sm:px-4"
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
                className="inline-block text-white text-2xl sm:text-4xl md:text-6xl lg:text-[8.5rem] font-black tracking-tight sm:tracking-tighter uppercase leading-[0.9] sm:leading-[0.85] md:leading-[0.8] select-none"
                style={{ 
                  textShadow: '0 0 40px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.6)',
                  WebkitTextStroke: '0.5px rgba(255,255,255,0.1)',
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
        transition={{ delay: 2.5, duration: 3, ease: "easeOut" }}
        className="relative z-10 mt-8 sm:mt-12 md:mt-20 font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase text-white tracking-[0.5em] sm:tracking-[1em] md:tracking-[2em] mix-blend-plus-lighter"
      >
        Odyssey Perfected
      </motion.div>

      {/* Premium Return CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(15px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 3.8, duration: 2, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 mt-12 sm:mt-20 md:mt-32"
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
          className="px-10 py-4 sm:px-16 sm:py-5 md:px-28 md:py-6 border border-white/20 text-white font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase transition-all duration-1000 rounded-full bg-white/5 backdrop-blur-3xl overflow-hidden group"
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