import React from 'react';
import { motion } from 'framer-motion';
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
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 md:px-12">
      
      {/* MOBILE & DESKTOP RESPONSIVE BACKGROUND IMAGE */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Desktop/Tablet Background */}
        <div 
          className="hidden sm:block w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/back.jpg)' }}
        >
          {/* Light overlay for text contrast */}
          <div className="absolute inset-0 bg-[#FFF4E4]/15"></div>
        </div>
        
        {/* Mobile Background */}
        <div 
          className="block sm:hidden w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/back.jpg)',
            backgroundPosition: 'center center'
          }}
        >
          <div className="absolute inset-0 bg-[#FFF4E4]/25"></div>
        </div>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start space-y-[-3vw] md:space-y-[-4vw]">
        
        {/* Creative Text */}
        <motion.div 
          className="flex overflow-visible ml-0 sm:ml-[-1vw] md:ml-[-2vw]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {creativeWords.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="text-[18vw] sm:text-[20vw] md:text-[14vw] font-serif italic font-light tracking-tighter text-[#2B1A12]/90 leading-none inline-block origin-bottom"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Starburst and Lab Text Container */}
        <div className="flex w-full justify-center sm:justify-end items-center mt-[-3vw] md:mt-[-4vw] pr-0 sm:pr-0">
          
          {/* Starburst Icon - MOBILE: BIGGER & CENTERED */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            className="mr-3 sm:mr-6 md:mr-12 lg:mr-24 mt-[10vw] sm:mt-0"
          >
            {/* MOBILE ONLY - Bigger starburst, more centered */}
            <div className="block sm:hidden">
              <Starburst size={100} />
            </div>
            {/* DESKTOP VERSIONS - UNCHANGED */}
            <div className="hidden sm:block md:hidden">
              <Starburst size={80} />
            </div>
            <div className="hidden md:block lg:hidden">
              <Starburst size={120} />
            </div>
            <div className="hidden lg:block">
              <Starburst size={160} />
            </div>
          </motion.div>
          
          {/* Lab Text */}
          <motion.div 
            className="flex overflow-visible"
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
                className="text-[18vw] sm:text-[20vw] md:text-[14vw] font-serif italic font-light tracking-tighter text-[#2B1A12]/90 leading-none inline-block origin-bottom"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;