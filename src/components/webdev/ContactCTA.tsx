import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn } from './FadeIn';

export const ContactCTA: React.FC = () => {
  return (
    <section className="py-40 md:py-60 bg-black border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-neutral-500 uppercase tracking-[0.3em] text-xs mb-8">Ready to Build?</h2>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif italic max-w-4xl mx-auto leading-tight mb-8">
              Let's create your <br />
              <span className="not-italic">digital infrastructure.</span>
            </h3>
            <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
              From e-commerce platforms to custom applications, we engineer systems that power your growth.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-medium text-black bg-white transition-all duration-700 ease-out hover:scale-105 active:scale-95"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-700 -translate-x-full bg-black group-hover:translate-x-0 ease-[0.16,1,0.3,1]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-700 transform group-hover:translate-x-full ease-[0.16,1,0.3,1] tracking-[0.2em] uppercase text-xs font-medium">Start Your Project</span>
                <span className="relative invisible tracking-[0.2em] uppercase text-xs font-medium">Start Your Project</span>
              </Link>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};