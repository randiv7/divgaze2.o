import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LiquidRevealProps {
  imageUrl?: string;
  ghostText?: string;
}

const LiquidReveal: React.FC<LiquidRevealProps> = ({ 
  imageUrl = "/sl.png", 
  ghostText = "Vision" 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ghostTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageContainerRef.current || !imageRef.current) return;

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

      // Animate clip-path from circle to full screen
      tl.fromTo(imageContainerRef.current, 
        { 
          clipPath: "circle(0% at 50% 50%)",
        },
        { 
          clipPath: "circle(5% at 50% 50%)",
          duration: 0.5,
          ease: "power2.inOut"
        }, 0
      );

      tl.to(imageContainerRef.current, 
        { 
          clipPath: "circle(150% at 50% 50%)",
          duration: 1.5,
          ease: "power2.inOut"
        }, 0.5
      );

      // Image scale and filter animation
      tl.fromTo(imageRef.current, 
        { 
          scale: 1.5, 
          filter: "brightness(0.4) blur(20px)" 
        },
        { 
          scale: 1, 
          filter: "brightness(1) blur(0px)", 
          duration: 2, 
          ease: "power2.out" 
        },
        0
      );

      // Ghost text parallax
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
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <h2 
          ref={ghostTextRef}
          className="text-white/[0.03] font-inter font-bold text-[30vw] md:text-[25vw] select-none uppercase tracking-tighter"
        >
          {ghostText}
        </h2>
      </div>

      {/* Image container with clip-path animation */}
      <div 
        ref={imageContainerRef}
        className="absolute inset-0 z-10"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      >
        <div 
          ref={imageRef}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
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