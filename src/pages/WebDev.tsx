import React, { useEffect } from 'react';
import { Hero, WhatWeBuild, Process, ContactCTA } from '@/components/webdev';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const WebDev: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-inter">
      <Navbar />

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