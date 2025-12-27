import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const services = [
  {
    id: "01",
    title: "Campaign Strategy",
    description: "Data-driven campaigns that resonate with your target audience, built for longevity and impact. We analyze market movements to define a unique voice for your brand.",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Video Production",
    description: "Professional editing, motion graphics, and visual storytelling that captures the essence of your brand. Our lens focuses on the intersection of cinema and digital commerce.",
    image: "https://images.unsplash.com/photo-1492691523567-6170f0295dbd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "AI-Powered Content",
    description: "Leverage generative AI to create unique, engaging content at scale while maintaining human-centric artistry. We blend algorithmic precision with human intuition.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Social Media",
    description: "Complete social presence management across all platforms, from community building to aesthetic curation. We design ecosystems that foster genuine connection.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop"
  }
];

const ServicesHorizontal: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#FFF4E4]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-12 left-12 z-20">
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#2B1A12]/40">Capabilities</h3>
        </div>
        
        <motion.div style={{ x }} className="flex gap-4 px-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1] as any
              }}
              className="group relative h-[70vh] w-[80vw] md:w-[45vw] flex-shrink-0 overflow-hidden bg-[#F5EAD7] flex flex-col justify-end p-8 md:p-12 border border-[#2B1A12]/5"
            >
              {/* IMAGE REMOVED - Structure kept for future */}
              {/* <div 
                className="absolute inset-0 bg-cover bg-center grayscale opacity-10 transition-all duration-1000 group-hover:opacity-30 group-hover:scale-105"
                style={{ backgroundImage: `url(${service.image})` }}
              /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFF4E4] via-[#FFF4E4]/40 to-transparent"></div>
              
              <div className="relative z-10 space-y-6">
                <span className="font-serif italic text-4xl opacity-20 block text-[#2B1A12] transition-opacity group-hover:opacity-60">{service.id}</span>
                <h4 className="text-4xl md:text-6xl font-serif font-light text-[#2B1A12] tracking-[-0.03em] leading-[1.1]">{service.title}</h4>
                <p className="max-w-md text-sm md:text-[15px] text-[#2B1A12]/70 font-light leading-[1.8] tracking-normal">
                  {service.description}
                </p>
              </div>
              
              <div className="absolute top-8 right-8 overflow-hidden">
                <motion.div 
                  initial={{ x: "100%" }}
                  whileInView={{ x: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="w-8 h-[1px] bg-[#2B1A12]/20"
                />
              </div>
            </motion.div>
          ))}
          
          {/* End cap to give visual space */}
          <div className="w-[15vw] flex-shrink-0 h-[70vh]"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHorizontal;