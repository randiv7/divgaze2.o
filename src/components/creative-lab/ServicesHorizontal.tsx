import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

const services = [
  {
    id: "01",
    title: "Campaign Strategy",
    description: "Data-driven campaigns that resonate with your target audience, built for longevity and impact. We analyze market movements to define a unique voice for your brand.",
    image: "/cs.png"
  },
  {
    id: "02",
    title: "Video Production",
    description: "Professional editing, motion graphics, and visual storytelling that captures the essence of your brand. Our lens focuses on the intersection of cinema and digital commerce.",
    image: "/vp.png"
  },
  {
    id: "03",
    title: "AI-Powered Content",
    description: "Leverage generative AI to create unique, engaging content at scale while maintaining human-centric artistry. We blend algorithmic precision with human intuition.",
    image: "/ai.png"
  },
  {
    id: "04",
    title: "Social Media",
    description: "Complete social presence management across all platforms, from community building to aesthetic curation. We design ecosystems that foster genuine connection.",
    image: "/sm.png"
  }
];

const ServicesHorizontal: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Detect screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive scroll distance - more on mobile, less on desktop
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    isMobile ? ["0%", "-240%"] : ["0%", "-75%"]
  );

  return (
    <section ref={targetRef} className="relative h-[500vh] md:h-[400vh] bg-[#FFF4E4]">
      <div className="sticky top-0 flex flex-col justify-end h-screen pb-12 md:pb-20 overflow-hidden">
        
        {/* Capabilities heading positioned above cards */}
        <div className="px-6 md:px-12 mb-6 md:mb-12">
          <h3 className="text-sm md:text-base lg:text-lg uppercase tracking-[0.3em] md:tracking-[0.4em] font-medium text-[#2B1A12]/40">Capabilities</h3>
        </div>
        
        <motion.div style={{ x }} className="flex gap-5 md:gap-6 lg:gap-8 px-6 md:px-12">
          {services.map((service, index) => (
            <div key={service.id} className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1] as any
                }}
                className="group cursor-pointer"
              >
                {/* Card Container */}
                <div className="relative w-[76vw] h-[76vw] sm:w-[66vw] sm:h-[66vw] md:w-[42vw] md:h-[42vw] lg:w-[38vw] lg:h-[38vw] overflow-hidden bg-[#F5EAD7] border border-[#2B1A12]/5 mb-4 md:mb-6 transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:shadow-[0_32px_64px_-16px_rgba(43,26,18,0.12)]">
                  {/* Image with opacity change on hover */}
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-30"
                  />
                  
                  {/* Background overlay that becomes more visible on hover */}
                  <div className="absolute inset-0 bg-[#FFF4E4] opacity-0 group-hover:opacity-90 transition-opacity duration-700"></div>
                  
                  {/* ID Number - visible always */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
                    <span className="font-serif italic text-3xl md:text-4xl opacity-20 block text-[#2B1A12] transition-opacity duration-500 group-hover:opacity-60">{service.id}</span>
                  </div>
                  
                  {/* Description - only visible on hover */}
                  <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8 lg:p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10">
                    <p className="max-w-md text-sm sm:text-base md:text-lg text-[#2B1A12]/90 font-light leading-[1.7] md:leading-[1.8] tracking-normal text-center">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Decorative line */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-8 overflow-hidden">
                    <motion.div 
                      initial={{ x: "100%" }}
                      whileInView={{ x: 0 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="w-6 md:w-8 h-[1px] bg-[#2B1A12]/20"
                    />
                  </div>
                </div>

                {/* Title Below Card - with animation similar to landing page */}
                <div className="space-y-1 md:space-y-2 px-2">
                  <h4 className="relative text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-serif font-light text-[#2B1A12] tracking-[-0.02em] group-hover:translate-x-2 transition-transform duration-500 flex items-center gap-2">
                    <span className="relative">
                      {service.title}
                      {/* Underline Expand Animation */}
                      <span className="absolute left-0 bottom-0 w-0 h-px bg-[#2B1A12] transition-all duration-500 group-hover:w-full" />
                    </span>
                    {/* Arrow Icon Entrance */}
                    <svg 
                      className="w-5 h-5 md:w-6 md:h-6 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 text-[#2B1A12]/40 flex-shrink-0" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </h4>
                </div>
              </motion.div>
            </div>
          ))}
          
          <div className="w-[25vw] sm:w-[20vw] md:w-[15vw] flex-shrink-0 h-[70vh]"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHorizontal;