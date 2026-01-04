import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { ProcessStep } from '@/types';

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Plan",
    description: "Requirements gathering, deep-dive architecture design, and a meticulous project roadmap."
  },
  {
    number: "02",
    title: "Build",
    description: "Agile development cycles with regular strategic check-ins and high-velocity iterative delivery."
  },
  {
    number: "03",
    title: "Launch",
    description: "Global deployment, rigorous stress testing, hands-on training, and ongoing proactive support."
  }
];

export const Process: React.FC = () => {
  return (
    <section className="py-40 md:py-60 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-32">
            <h2 className="text-neutral-500 uppercase tracking-[0.3em] text-xs mb-8">Our Process</h2>
            <h3 className="text-4xl md:text-6xl font-serif italic max-w-3xl leading-tight">
              From concept <br />
              <span className="not-italic">to launch.</span>
            </h3>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-24">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.1} direction="up">
              <div className="flex flex-col md:flex-row items-start gap-8 md:gap-32 pb-24 border-b border-neutral-900 last:border-0 group">
                <div className="text-6xl md:text-8xl font-serif italic text-neutral-800 group-hover:text-white transition-colors duration-1000 leading-none">
                  {step.number}
                </div>
                <div className="max-w-2xl pt-2">
                  <motion.h4 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.2, 
                      delay: (index * 0.1) + 0.3, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    className="text-2xl md:text-4xl font-medium mb-8 tracking-tight group-hover:translate-x-2 transition-transform duration-1000 ease-[0.22,1,0.36,1]"
                  >
                    {step.title}
                  </motion.h4>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.5, 
                      delay: (index * 0.1) + 0.5, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed group-hover:text-neutral-200 transition-colors duration-700"
                  >
                    {step.description}
                  </motion.p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};