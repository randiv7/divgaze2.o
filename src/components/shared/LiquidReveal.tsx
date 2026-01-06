import React, { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EarthScene = React.lazy(() => import('./EarthScene'));

interface LiquidRevealProps {
  ghostText?: string;
}

const LiquidReveal: React.FC<LiquidRevealProps> = ({ 
  ghostText = "From the Future" 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneContainerRef = useRef<HTMLDivElement>(null);
  const ghostTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !sceneContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.fromTo(sceneContainerRef.current, 
        { 
          clipPath: "circle(0% at 50% 50%)",
        },
        { 
          clipPath: "circle(5% at 50% 50%)",
          duration: 0.5,
          ease: "power2.inOut"
        }, 0
      );

      tl.to(sceneContainerRef.current, 
        { 
          clipPath: "circle(150% at 50% 50%)",
          duration: 1.5,
          ease: "power2.inOut"
        }, 0.5
      );

      if (ghostTextRef.current) {
        tl.to(ghostTextRef.current, {
          y: -200,
          opacity: 0,
          duration: 2,
          ease: "none"
        }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="h-screen w-full relative overflow-hidden bg-black"
    >
      {/* Ghost text background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none px-6 sm:px-8 md:px-12 lg:px-16">
        <div 
          ref={ghostTextRef}
          className="text-white/[0.25] font-inter font-bold text-[15vw] sm:text-[16vw] md:text-[18vw] lg:text-[20vw] select-none uppercase tracking-tighter text-center leading-[0.9]"
          style={{
            textShadow: '0 0 80px rgba(255,255,255,0.1)'
          }}
        >
          <span className="block mt-8 sm:mt-10 md:mt-12 lg:mt-16">From the</span>
          <span className="block">Future</span>
        </div>
      </div>

      {/* 3D Scene container with clip-path animation */}
      <div 
        ref={sceneContainerRef}
        className="absolute inset-0 z-10"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      >
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <EarthScene />
        </Suspense>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none z-20" />

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 opacity-50">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-xs uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-white/10 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default LiquidReveal;