import { useEffect, useRef } from 'react';

interface SpaceBackgroundProps {
  isLaunching: boolean;
}

interface Star {
  x: number;
  y: number;
  baseY: number;
  size: number;
  opacity: number;
  distance: number;
  angle: number;
  angularVelocity: number;
  speed: number;
  layer: number; // 0 = far, 1 = mid, 2 = near
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ isLaunching }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const isLaunchingRef = useRef(isLaunching);
  const mouseRef = useRef({ x: 0, y: 0 });
  const transitionRef = useRef(0); // 0 = idle, 1 = full launch

  useEffect(() => {
    isLaunchingRef.current = isLaunching;
  }, [isLaunching]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      ctx.fillStyle = '#fff';
      
      for (let i = 0; i < count; i++) {
        ctx.globalAlpha = Math.random() * 0.5 + 0.1;
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.2, 0, Math.PI * 2);
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
      const count = Math.floor((canvas.width * canvas.height) / 3500);

      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        // Assign layer based on random distribution
        const layerRand = Math.random();
        const layer = layerRand < 0.6 ? 0 : layerRand < 0.85 ? 1 : 2;
        
        // Size and speed based on layer (parallax)
        const layerSize = [0.5, 1.0, 1.8][layer];
        const layerSpeed = [6, 14, 28][layer];
        const layerOpacity = [0.25, 0.45, 0.7][layer];

        starsRef.current.push({
          x,
          y,
          baseY: y,
          size: Math.random() * layerSize + 0.3,
          opacity: Math.random() * layerOpacity + 0.1,
          distance,
          angle,
          angularVelocity: -(Math.random() * 0.0015 + 0.0003),
          speed: layerSpeed + Math.random() * layerSpeed * 0.5,
          layer,
        });
      }
    };

    const draw = () => {
      // Smooth transition
      const targetTransition = isLaunchingRef.current ? 1 : 0;
      transitionRef.current += (targetTransition - transitionRef.current) * 0.08;
      const t = transitionRef.current;

      // Clear with black
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      starsRef.current.forEach((star) => {
        // Blend between rotation mode and streak mode
        if (t < 0.01) {
          // Pure rotation mode
          star.angle += star.angularVelocity;
          
          const mX = (mouseRef.current.x - centerX) * 0.015;
          const mY = (mouseRef.current.y - centerY) * 0.015;
          
          star.x = centerX + Math.cos(star.angle) * star.distance + mX;
          star.y = centerY + Math.sin(star.angle) * star.distance + mY;

          // Draw simple star
          ctx.globalAlpha = star.opacity;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Twinkle
          if (Math.random() > 0.99) {
            star.opacity = Math.random() * [0.25, 0.45, 0.7][star.layer] + 0.1;
          }
        } else {
          // Streak/warp mode
          star.y += star.speed * t;

          // Reset when off screen
          if (star.y > canvas.height + 100) {
            star.y = -50 - Math.random() * 100;
            star.x = Math.random() * canvas.width;
          }

          // Calculate streak length based on transition and layer
          const streakLength = star.speed * t * 3 * (star.layer + 1);

          // Draw streak with gradient
          const gradient = ctx.createLinearGradient(
            star.x, star.y - streakLength,
            star.x, star.y
          );
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
          gradient.addColorStop(0.7, `rgba(255, 255, 255, ${star.opacity * 0.3 * t})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity * t})`);

          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = star.size * (0.5 + t * 0.5);
          ctx.lineCap = 'round';
          ctx.moveTo(star.x, star.y - streakLength);
          ctx.lineTo(star.x, star.y);
          ctx.stroke();

          // Bright head
          ctx.globalAlpha = star.opacity * (0.5 + t * 0.5);
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * (1 + t * 0.3), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
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
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

export default SpaceBackground;