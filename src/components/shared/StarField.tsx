import { useEffect, useRef } from 'react';
import { Star } from '@/types/star';

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Render static stars
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const count = Math.floor((canvas.width * canvas.height) / 1000);
      ctx.fillStyle = '#fff';
      
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5;
        
        ctx.globalAlpha = Math.random();
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      return;
    }

    let stars: Star[] = [];
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const count = Math.floor((canvas.width * canvas.height) / 1000);
      
      for (let i = 0; i < count; i++) {
        // Distribute stars randomly across the screen
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        // Calculate polar coordinates relative to center
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        stars.push({
          x,
          y,
          size: Math.random() * 1.5,
          opacity: Math.random(),
          distance,
          angle,
          // Increased angular velocity for faster counter-clockwise rotation
          angularVelocity: -(Math.random() * 0.002 + 0.0005),
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star) => {
        // Update angle for counter-clockwise rotation
        star.angle += star.angularVelocity;

        // Calculate new position based on rotation
        // Added a tiny bit of responsiveness to mouse movement for depth
        const mX = (mouseX - centerX) * 0.02;
        const mY = (mouseY - centerY) * 0.02;
        
        star.x = centerX + Math.cos(star.angle) * star.distance + mX;
        star.y = centerY + Math.sin(star.angle) * star.distance + mY;

        ctx.fillStyle = '#fff';
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Randomly twinkle
        if (Math.random() > 0.98) {
          star.opacity = Math.random();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ filter: 'blur(0.4px)' }}
    />
  );
};

export default StarField;