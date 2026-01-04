import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { ServiceItem } from '@/types';

const services: ServiceItem[] = [
  {
    category: "Commerce",
    title: "Online Stores",
    description: "E-commerce platforms built for conversion, from Shopify customizations to fully custom solutions tailored for global scale."
  },
  {
    category: "Operations",
    title: "POS & Internal Systems",
    description: "Point-of-sale integrations and bespoke internal tools that streamline your complex operations into effortless workflows."
  },
  {
    category: "Product",
    title: "Custom Web Apps",
    description: "Bespoke web applications engineered to solve unique business challenges with high-performance digital infrastructure."
  },
  {
    category: "Integrations",
    title: "API Integrations",
    description: "Seamlessly connect your ecosystem with third-party services for automated, real-time data flow across all touchpoints."
  }
];

export const WhatWeBuild: React.FC = () => {
  return (
    <section className="py-40 md:py-60 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-32">
            <h2 className="text-neutral-500 uppercase tracking-[0.3em] text-xs mb-8">What We Build</h2>
            <h3 className="text-4xl md:text-6xl font-serif italic max-w-3xl leading-tight">
              Digital infrastructure, <br />
              <span className="not-italic">done right.</span>
            </h3>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.1}>
              <div className="group border-t border-neutral-800 pt-8 hover:border-white transition-all duration-700 cursor-default">
                <span className="text-neutral-500 uppercase tracking-[0.2em] text-[10px] mb-6 block font-medium group-hover:text-white group-hover:tracking-[0.4em] transition-all duration-1000 ease-[0.22,1,0.36,1]">
                  {service.category}
                </span>
                <h4 className="text-2xl md:text-3xl font-medium mb-6 group-hover:translate-x-3 transition-transform duration-1000 ease-[0.22,1,0.36,1]">
                  {service.title}
                </h4>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1.5, 
                    delay: (index * 0.1) + 0.4, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="text-neutral-400 group-hover:text-neutral-200 text-lg leading-relaxed max-w-md font-light transition-colors duration-700"
                >
                  {service.description}
                </motion.p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};