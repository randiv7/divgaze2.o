import React from 'react';
import { motion } from 'framer-motion';
import Starburst from './Starburst';

const About: React.FC = () => {
  return (
    <section className="min-h-screen bg-[#FFF4E4] flex flex-col justify-center items-center py-40 px-6 md:px-24">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center text-center space-y-12"
        >
          <div className="w-12 h-12 flex items-center justify-center">
             <Starburst size={48} />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-serif italic text-[#2B1A12]/90 leading-snug">
            We are a full-service creative laboratory, dedicated to crafting unparalleled digital experiences through strategy and soul.
          </h2>
          
          <div className="h-px w-24 bg-[#2B1A12]/20"></div>
          
          <p className="text-sm md:text-lg text-[#2B1A12]/60 font-light max-w-2xl leading-relaxed tracking-wide">
            Our mission is to bridge the gap between imagination and execution. We provide our partners with exceptional solutions that bring strategic value and make their businesses thrive in an ever-evolving digital landscape.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;