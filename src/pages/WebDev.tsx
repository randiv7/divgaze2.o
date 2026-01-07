import React from 'react';
import { Hero, WhatWeBuild, Process, ContactCTA } from '@/components/webdev';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const WebDev: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-inter">
      <Navbar />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white z-50 origin-left"
        style={{ scaleX }}
      />

      <Hero />
      
      <section className="px-6 md:px-12 lg:px-24">
        <WhatWeBuild />
        <Process />
      </section>

      <ContactCTA />

      <Footer />
    </main>
  );
};

export default WebDev;