import { useEffect, useRef, useState } from 'react';

interface KineticHeroProps {
  className?: string;
}

export const KineticHero = ({ className = '' }: KineticHeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());

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
      ctx.fillText('Creative', canvas.width / 2, canvas.height / 2);
      
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let width: number, height: number;
    
    // Responsive Configuration
    const getConfig = () => {
      const isMobileView = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      return {
        WORDS: ["Creative", "Visionary", "Beyond"],
        PARTICLE_DENSITY: isMobileView ? 8 : isTablet ? 6 : 5,
        MOUSE_RADIUS: isMobileView ? 60 : 80,
        STAY_DURATION: isMobileView ? 8000 : 10000,
        TRANSITION_DURATION: isMobileView ? 800 : 1000,
        PARTICLE_SIZE_BASE: isMobileView ? 2 : 1.5,
        EASE_RANGE: isMobileView ? [0.04, 0.06] : [0.03, 0.06],
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
          this.vx -= Math.cos(angle) * force * 5;
          this.vy -= Math.sin(angle) * force * 5;
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

    // Resize handling with config update
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Update config on resize
      config = getConfig();
      setIsMobile(window.innerWidth < 768);
      
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
      // On touch devices, clear mouse position after touch ends
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

    // Core function to calculate text positions with responsive font sizing
    const updateTextLayout = (text: string) => {
      if (!width || width <= 0 || !height || height <= 0) return;

      const buffer = document.createElement('canvas');
      buffer.width = width;
      buffer.height = height;
      const bCtx = buffer.getContext('2d');
      if (!bCtx) return;
      
      // Enhanced responsive font sizing
      let fontSize: number;
      
      if (width < 480) {
        // Small mobile (portrait phones)
        fontSize = Math.min(width / (text.length * 0.55), 60);
      } else if (width < 768) {
        // Large mobile (landscape phones)
        fontSize = Math.min(width / (text.length * 0.6), 80);
      } else if (width < 1024) {
        // Tablet
        fontSize = Math.min(width / (text.length * 0.65), 120);
      } else if (width < 1440) {
        // Small desktop
        fontSize = Math.min(width / (text.length * 0.7), 160);
      } else {
        // Large desktop
        fontSize = Math.min(width / (text.length * 0.7), 200);
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

      // Find target coordinates with responsive density
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

      // Clear with trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);

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

    // Wait for font to load
    document.fonts.ready.then(() => {
      init();
    });

    // Add event listeners with passive flag for better mobile performance
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
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="block touch-none"
        style={{
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'pan-y pinch-zoom'
        }}
      />
    </div>
  );
};