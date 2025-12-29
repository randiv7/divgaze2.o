import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Navbar } from '@/components/layout/Navbar';
import Hero from '@/components/creative-lab/Hero';
import ServicesHorizontal from '@/components/creative-lab/ServicesHorizontal';
import About from '@/components/creative-lab/About';
import Footer from '@/components/creative-lab/Footer';
import Starburst from '@/components/creative-lab/Starburst';

const CreativeLab: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    (window as any).lenis = lenis;

    // Lock scroll during loading
    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    // Simulate minimal load time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <main className="bg-[#FFF4E4] text-[#2B1A12] font-sans selection:bg-[#2B1A12] selection:text-[#FFF4E4] min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFF4E4]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
              className="flex flex-col items-center space-y-8"
            >
              <Starburst size={64} />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-[10px] uppercase tracking-[0.5em] font-medium"
              >
                Initialising Lab
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          >
            <Hero />
            <About />
            <ServicesHorizontal />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default CreativeLab;