import { useEffect, useRef } from 'react';

interface SpaceBackgroundProps {
  isLaunching: boolean;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  distance: number;
  angle: number;
  angularVelocity: number;
  speed: number;
  streakLength: number;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ isLaunching }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const isLaunchingRef = useRef(isLaunching);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Update launching ref when prop changes
  useEffect(() => {
    isLaunchingRef.current = isLaunching;
  }, [isLaunching]);

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

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      starsRef.current = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const count = Math.floor((canvas.width * canvas.height) / 2500); // Reduced density

      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        starsRef.current.push({
          x,
          y,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          distance,
          angle,
          angularVelocity: -(Math.random() * 0.002 + 0.0005),
          speed: Math.random() * 15 + 8, // Faster speed
          streakLength: 0,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.3, 0,
        canvas.width * 0.2, canvas.height * 0.3, canvas.width * 0.5
      );
      gradient.addColorStop(0, 'rgba(14, 165, 233, 0.03)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const launching = isLaunchingRef.current;

      starsRef.current.forEach((star) => {
        if (launching) {
          // Launch mode: stars streak downward fast
          star.y += star.speed;
          star.streakLength = Math.min(star.streakLength + 8, star.size * 80); // Longer streaks, faster grow

          // Reset star when it goes off screen
          if (star.y > canvas.height + 50) {
            star.y = -star.streakLength - Math.random() * 100;
            star.x = Math.random() * canvas.width;
            star.streakLength = 0;
          }

          // Draw long streak line
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity * 0.6})`;
          ctx.lineWidth = star.size * 0.8;
          ctx.lineCap = 'round';
          ctx.moveTo(star.x, star.y - star.streakLength);
          ctx.lineTo(star.x, star.y);
          ctx.stroke();

          // Draw bright dot at head
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.arc(star.x, star.y, star.size * 1.2, 0, Math.PI * 2);
          ctx.fill();

        } else {
          // Normal mode: rotating stars with twinkle
          star.angle += star.angularVelocity;
          star.streakLength = Math.max(star.streakLength - 1, 0);

          // Mouse parallax effect
          const mX = (mouseRef.current.x - centerX) * 0.02;
          const mY = (mouseRef.current.y - centerY) * 0.02;

          star.x = centerX + Math.cos(star.angle) * star.distance + mX;
          star.y = centerY + Math.sin(star.angle) * star.distance + mY;

          // Draw star with glow
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Add subtle glow for larger stars
          if (star.size > 1.2) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.3})`;
            ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
            ctx.fill();
          }

          // Random twinkle
          if (Math.random() > 0.98) {
            star.opacity = Math.random() * 0.6 + 0.2;
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
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
      className="absolute inset-0 pointer-events-none z-0 bg-black"
      style={{ filter: 'blur(0.3px)' }}
    />
  );
};

export default SpaceBackground;