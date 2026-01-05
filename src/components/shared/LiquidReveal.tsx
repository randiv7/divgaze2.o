import React, { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KineticTypographyCanvas, DEFAULT_THEME } from './kineticTypography';

gsap.registerPlugin(ScrollTrigger);

const EarthScene = React.lazy(() => import('./EarthScene'));

interface LiquidRevealProps {
  ghostText?: string;
}

const LiquidReveal: React.FC<LiquidRevealProps> = ({ 
  ghostText = "Vision" 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneContainerRef = useRef<HTMLDivElement>(null);
  const kineticContainerRef = useRef<HTMLDivElement>(null);

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

      // Earth scene clip-path reveal - from center of text circle (50% horizontal, 45% vertical)
      tl.fromTo(sceneContainerRef.current, 
        { 
          clipPath: "circle(0% at 50% 45%)",
        },
        { 
          clipPath: "circle(5% at 50% 45%)",
          duration: 0.5,
          ease: "power2.inOut"
        }, 0
      );

      tl.to(sceneContainerRef.current, 
        { 
          clipPath: "circle(150% at 50% 45%)",
          duration: 1.5,
          ease: "power2.inOut"
        }, 0.5
      );

      // Fade out kinetic typography as earth reveals
      if (kineticContainerRef.current) {
        tl.to(kineticContainerRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.out"
        }, 0.3);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="h-screen w-full relative overflow-hidden bg-black"
    >
      {/* Kinetic Typography background (replaces ghost text) */}
      <div 
        ref={kineticContainerRef}
        className="absolute inset-0 z-0"
      >
        <KineticTypographyCanvas 
          text="THE VOID IS WHISPERING BACK"
          theme={DEFAULT_THEME}
          depth={0.65}
          rotationSpeed={0.005}
        />
      </div>

      {/* 3D Earth Scene container with clip-path animation */}
      <div 
        ref={sceneContainerRef}
        className="absolute inset-0 z-10"
        style={{ clipPath: "circle(0% at 50% 45%)" }}
      >
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <EarthScene />
        </Suspense>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none z-20" />

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 opacity-30">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-white animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default LiquidReveal;