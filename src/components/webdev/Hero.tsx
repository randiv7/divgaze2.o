import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-white/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 text-center max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <span className="text-neutral-500 uppercase tracking-[0.4em] text-[10px] md:text-xs font-medium">
            Divgaze Systems Engineering
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-serif italic tracking-tighter leading-[0.9] mb-2"
        >
          Web Dev &
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-sans font-extralight tracking-tight leading-[0.9] mb-12"
        >
          Systems.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <p className="text-neutral-400 text-lg md:text-2xl font-light tracking-wide leading-relaxed mb-2">
            Architecting robust digital infrastructure.
          </p>
          <p className="text-neutral-600 text-lg md:text-2xl font-light tracking-wide leading-relaxed">
            Built for performance, engineered for growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors duration-300"
          >
            Start Project
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <span className="text-neutral-600 uppercase tracking-[0.3em] text-[10px]">
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-neutral-800" />
      </motion.div>
    </section>
  );
};