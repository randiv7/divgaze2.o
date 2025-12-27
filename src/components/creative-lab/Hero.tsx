import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Starburst from './Starburst';

const Hero: React.FC = () => {
  const creativeWords = "Creative".split("");
  const labWords = "Lab".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { y: "100%", opacity: 0, rotate: 5 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#FFF4E4] px-6 md:px-12">
      {/* Background Graphic Elements */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 left-12"
      >
         <span className="text-xs tracking-[0.2em] font-medium uppercase text-[#2B1A12]">Creative Lab / Digital Studio</span>
      </motion.div>
      
      <div className="absolute top-12 right-12 text-right hidden md:block">
        <ul className="text-xs space-y-1 tracking-widest uppercase opacity-80">
          <li className="hover:opacity-100 cursor-pointer transition-opacity">About</li>
          <li className="hover:opacity-100 cursor-pointer transition-opacity">Work</li>
          <li className="hover:opacity-100 cursor-pointer transition-opacity">Archive</li>
          <li className="hover:opacity-100 cursor-pointer transition-opacity">Contact</li>
        </ul>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start space-y-[-2vw] md:space-y-[-4vw]">
        {/* Creative Text with Character Stagger */}
        <motion.div 
          className="flex overflow-hidden ml-[-2vw]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {creativeWords.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="text-[18vw] md:text-[14vw] font-serif italic font-light tracking-tighter text-[#2B1A12]/90 leading-none inline-block origin-bottom"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        
        <div className="flex w-full justify-end items-center mt-[-4vw]">
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            className="mr-12 md:mr-24 hidden lg:block"
          >
            <Starburst size={160} />
          </motion.div>
          
          {/* Lab Text with Character Stagger */}
          <motion.div 
            className="flex overflow-hidden"
            variants={{
              ...containerVariants,
              visible: {
                ...containerVariants.visible,
                transition: {
                  ...containerVariants.visible.transition,
                  staggerChildren: 0.1,
                  delayChildren: 0.8,
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {labWords.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="text-[18vw] md:text-[14vw] font-serif font-medium tracking-tighter text-[#2B1A12] leading-none inline-block origin-bottom"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
      >
        <div className="w-px h-16 bg-gradient-to-b from-[#2B1A12] to-transparent opacity-50"></div>
        <span className="text-[10px] tracking-[0.4em] uppercase opacity-60 text-[#2B1A12]">Scroll to Explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;