import React from 'react';
import { Link } from 'react-router-dom';
import { Hero, WhatWeBuild, Process, ContactCTA } from '@/components/webdev';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';

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

      {/* Footer */}
      <footer className="py-20 border-t border-neutral-900 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="group cursor-default">
            <h2 className="text-2xl font-serif italic mb-2 tracking-widest transition-all duration-700 group-hover:tracking-[0.2em]">DIVGAZE</h2>
            <p className="text-neutral-500 text-sm tracking-widest uppercase transition-colors duration-500 group-hover:text-neutral-300">Systems Engineering</p>
          </div>
          <div className="flex gap-12 text-sm text-neutral-400 tracking-wide">
            {[
              { name: 'LinkedIn', href: '#' },
              { name: 'Instagram', href: '#' },
              { name: 'Terms', href: '/terms-of-service' }
            ].map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                className="relative overflow-hidden group py-1"
              >
                <span className="relative z-10 hover:text-white transition-colors duration-500">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.22,1,0.36,1]" />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
};

export default WebDev;