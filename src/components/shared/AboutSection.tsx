import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SVG Stroke animation (white)
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { 
          strokeDasharray: length, 
          strokeDashoffset: length 
        });
        
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        });

        // Parallax drift for the stroke
        gsap.to(pathRef.current, {
          x: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      }

      // Title line animation
      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll('.line');
        gsap.from(lines, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-40 bg-black text-white font-inter">
      {/* Background SVG Stroke (White) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <svg viewBox="0 0 1000 600" fill="none" className="w-full h-full">
          <path 
            ref={pathRef}
            d="M-50,450 C150,350 400,550 600,350 S850,50 1050,150" 
            stroke="#FFFFFF" 
            strokeWidth="4"
            strokeLinecap="round"
            className="md:stroke-[6px] lg:stroke-[8px]"
          />
        </svg>
      </div>

      <div className="container-premium">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          {/* Left: Heading */}
          <div className="space-y-12">
            <span className="text-sm font-medium text-white/60 tracking-widest uppercase mb-4 block">
              About Us
            </span>
            <h2 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.05]">
              <span className="block line">Built for the</span>
              <span className="block line opacity-60">future.</span>
            </h2>
          </div>

          {/* Right: Paragraphs */}
          <div className="space-y-8 pt-4 lg:pt-24 max-w-lg">
            <p className="text-lg md:text-xl text-white/80 leading-[1.7]">
              We're Divgaze - a passionate, creative tech startup based in Sri Lanka, 
              with deep roots extending to Melbourne, Australia.
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-[1.7]">
              At our core, we're a team of curious builders and bold thinkers who believe 
              in creating digital experiences that truly make a difference. We're not just 
              here to deliver services, we're here to partner with you, challenge ideas, 
              and bring visions to life.
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-[1.7]">
              What sets us apart? We put our clients first — always. We dive deep into 
              every project, explore every angle, and give our absolute best to craft 
              solutions that are smart, scalable, and meaningful.
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-[1.7]">
              We embrace experimentation. We welcome risk. Because we know real innovation 
              happens outside the comfort zone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};