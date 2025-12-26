import { useEffect, useRef, useState } from 'react';

interface KineticHeroProps {
  className?: string;
}

export const KineticHero = ({ className = '' }: KineticHeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Check if mobile/tablet (< 1024px)
    const checkMobile = () => window.innerWidth < 1024;
    setIsMobile(checkMobile());

    // Wait for Syncopate font to load before doing anything
    const loadFont = async () => {
      try {
        await document.fonts.load('700 16px Syncopate');
        setFontLoaded(true);
      } catch (error) {
        console.error('Font loading failed:', error);
        setFontLoaded(true); // Proceed anyway
      }
    };

    loadFont();
  }, []);

  useEffect(() => {
    // Don't run if font not loaded
    if (!fontLoaded) return;

    // If mobile/tablet, don't run animation
    if (isMobile) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Show static text only
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const fontSize = Math.min(canvas.width / 8, 120);
      ctx.fillStyle = '#ffffff';
      ctx.font = `700 ${fontSize}px 'Syncopate', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('DIVGAZE', canvas.width / 2, canvas.height / 2);
      
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let width: number, height: number;
    
    // Desktop Configuration
    const getConfig = () => {
      return {
        WORDS: ["DIVGAZE"],
        PARTICLE_DENSITY: 5,
        MOUSE_RADIUS: 80,
        STAY_DURATION: 10000,
        TRANSITION_DURATION: 1000,
        PARTICLE_SIZE_BASE: 1.5,
        EASE_RANGE: [0.03, 0.06],
      };
    };

    let config = getConfig();
    const CYCLE_DURATION = config.STAY_DURATION + config.TRANSITION_DURATION;

    // State
    const mouse = { x: -1000, y: -1000 };
    let currentWordIndex = 0;
    let lastWordChangeTime = 0;
    let animationFrameId: number;
    let isTouch = false;

    class Particle {
      targetX: number;
      targetY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      ease: number;
      size: number;
      active: boolean;

      constructor(x: number, y: number) {
        this.targetX = x;
        this.targetY = y;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.ease = config.EASE_RANGE[0] + Math.random() * (config.EASE_RANGE[1] - config.EASE_RANGE[0]);
        this.size = Math.random() * config.PARTICLE_SIZE_BASE + 0.5;
        this.active = true;
      }

      update() {
        if (!this.active) return;

        const friction = 0.9;

        // Mouse/Touch Interaction (Repulsion)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.MOUSE_RADIUS) {
          const force = (config.MOUSE_RADIUS - distance) / config.MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          const forceMultiplier = 5;
          this.vx -= Math.cos(angle) * force * forceMultiplier;
          this.vy -= Math.sin(angle) * force * forceMultiplier;
        }

        // Move to Target (Morphing)
        const tx = this.targetX - this.x;
        const ty = this.targetY - this.y;
        this.vx += tx * this.ease;
        this.vy += ty * this.ease;

        // Apply velocity and friction
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= friction;
        this.vy *= friction;
      }

      draw() {
        if (!this.active) return;
        
        const speed = Math.abs(this.vx) + Math.abs(this.vy);
        let alpha = Math.max(0.2, 1 - speed * 0.05);
        
        ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx!.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    // Resize handling
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      setIsMobile(window.innerWidth < 1024);
      
      if (width > 0 && height > 0) {
        updateTextLayout(config.WORDS[currentWordIndex]);
      }
    };

    // Touch/Mouse interaction
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (e.type.startsWith('touch')) {
        isTouch = true;
        const touch = (e as TouchEvent).touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
      } else {
        mouse.x = (e as MouseEvent).clientX;
        mouse.y = (e as MouseEvent).clientY;
      }
    };

    const handlePointerEnd = () => {
      if (isTouch) {
        mouse.x = -1000;
        mouse.y = -1000;
      }
    };

    const handleMouseLeave = () => {
      if (!isTouch) {
        mouse.x = -1000;
        mouse.y = -1000;
      }
    };

    // Core function to calculate text positions
    const updateTextLayout = (text: string) => {
      if (!width || width <= 0 || !height || height <= 0) return;

      const buffer = document.createElement('canvas');
      buffer.width = width;
      buffer.height = height;
      const bCtx = buffer.getContext('2d');
      if (!bCtx) return;
      
      let fontSize: number;
      
      if (width < 1440) {
        fontSize = 160;
      } else {
        fontSize = 200;
      }

      bCtx.fillStyle = '#000000';
      bCtx.fillRect(0, 0, width, height);
      
      bCtx.fillStyle = '#ffffff';
      bCtx.font = `700 ${fontSize}px 'Syncopate', sans-serif`;
      bCtx.textAlign = 'center';
      bCtx.textBaseline = 'middle';
      bCtx.fillText(text, width / 2, height / 2);
      
      // Scan pixel data
      const imageData = bCtx.getImageData(0, 0, width, height).data;
      const targets: { x: number; y: number }[] = [];

      // Find target coordinates
      for (let y = 0; y < height; y += config.PARTICLE_DENSITY) {
        for (let x = 0; x < width; x += config.PARTICLE_DENSITY) {
          const index = (y * width + x) * 4;
          if (imageData[index] > 128) {
            targets.push({ x, y });
          }
        }
      }
      
      // Ensure enough particles
      if (particles.length < targets.length) {
        const numToAdd = targets.length - particles.length;
        for (let i = 0; i < numToAdd; i++) {
          particles.push(new Particle(width / 2, height / 2));
        }
      }

      // Assign targets to particles
      for (let i = 0; i < particles.length; i++) {
        if (i < targets.length) {
          particles[i].active = true;
          particles[i].targetX = targets[i].x;
          particles[i].targetY = targets[i].y;
        } else {
          particles[i].active = false;
        }
      }
    };

    const animate = () => {
      // Check timer for word cycle
      const now = Date.now();
      if (now - lastWordChangeTime > CYCLE_DURATION) {
        lastWordChangeTime = now;
        currentWordIndex = (currentWordIndex + 1) % config.WORDS.length;
        updateTextLayout(config.WORDS[currentWordIndex]);
      }

      // Clear canvas to show stars behind
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      if (!width || width <= 0 || !height || height <= 0) {
        animationFrameId = requestAnimationFrame(init);
        return;
      }

      lastWordChangeTime = Date.now();
      updateTextLayout(config.WORDS[0]);
      animate();
    };

    // Font is already loaded, start immediately
    init();

    // Add event listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerEnd, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerEnd);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [fontLoaded, isMobile]);

  // Don't render anything until font is loaded
  if (!fontLoaded) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
      </div>
    );
  }

  // Render static text for mobile/tablet
  if (isMobile) {
    return (
      <div ref={containerRef} className={`absolute inset-0 flex items-center justify-center ${className}`}>
        <h1 
          className="text-white text-6xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tight"
          style={{ fontFamily: "'Syncopate', sans-serif", fontWeight: 700 }}
        >
          DIVGAZE
        </h1>
      </div>
    );
  }

  // Render canvas animation for desktop
  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full touch-none z-10"
        style={{
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'pan-y pinch-zoom',
          background: 'transparent'
        }}
      />
    </div>
  );
};