import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const projects = [
  {
    title: "Vanguard",
    category: "Identity / 2024",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Elysium",
    category: "Campaign / 2024",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop"
  }
];

const ProjectCard: React.FC<{ project: typeof projects[0]; idx: number }> = ({ project, idx }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific container for parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Vertical parallax offset - subtle movement from -10% to 10%
  const yRaw = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  // Apply physics-based smoothing to the parallax for a more premium feel
  const y = useSpring(yRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
      className={`space-y-6 ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
    >
      <div className="overflow-hidden bg-[#F5EAD7] aspect-[4/5] relative group cursor-pointer border border-[#2B1A12]/5">
        <motion.img 
          src={project.image} 
          alt={project.title}
          style={{ y, scale: 1.2 }} 
          whileHover={{ scale: 1.25, filter: "grayscale(0%)" }}
          transition={{ 
            scale: { duration: 1, ease: [0.16, 1, 0.3, 1] as any },
            filter: { duration: 0.8, ease: "easeInOut" }
          }}
          className="absolute inset-0 w-full h-full object-cover grayscale pointer-events-none origin-center"
        />
        <div className="absolute inset-0 bg-[#FFF4E4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center z-10 pointer-events-none">
           <span className="text-[10px] uppercase tracking-[0.5em] font-medium border border-[#2B1A12]/20 px-8 py-3 text-[#2B1A12] bg-[#FFF4E4]/90 backdrop-blur-sm shadow-sm transition-all group-hover:border-[#2B1A12]">View Case</span>
        </div>
      </div>
      <div className="flex justify-between items-baseline pt-4 border-t border-[#2B1A12]/5">
        <h3 className="text-3xl md:text-5xl font-serif italic tracking-tight text-[#2B1A12]">{project.title}</h3>
        <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-medium text-[#2B1A12]">{project.category}</span>
      </div>
    </motion.div>
  );
};

const SelectedWork: React.FC = () => {
  return (
    <section className="bg-[#FFF4E4] py-40 px-6 md:px-24 text-[#2B1A12]">
      <div className="max-w-7xl mx-auto space-y-40">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#2B1A12]/10 pb-12">
           <div className="overflow-hidden">
             <motion.h2 
               initial={{ y: "100%" }}
               whileInView={{ y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
               className="text-6xl md:text-9xl font-serif italic tracking-tighter leading-[0.9]"
             >
               Selected <br/> Works
             </motion.h2>
           </div>
           <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mt-8 md:mt-0 font-medium">Archive 01 — 25</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>

        <div className="flex justify-center pt-20">
           <button className="group relative px-16 py-5 overflow-hidden border border-[#2B1A12]/10 transition-all hover:border-[#2B1A12] duration-700">
             <span className="relative z-10 text-[10px] uppercase tracking-[0.5em] font-medium text-[#2B1A12]">Browse All Projects</span>
             <div className="absolute inset-0 bg-[#2B1A12] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]"></div>
             <span className="absolute inset-0 flex items-center justify-center text-[#FFF4E4] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[10px] uppercase tracking-[0.5em] font-medium">Browse All Projects</span>
           </button>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;