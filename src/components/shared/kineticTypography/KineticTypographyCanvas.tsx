import React, { useRef, useEffect, useCallback } from 'react';
import { ColorTheme } from './types';

interface KineticTypographyCanvasProps {
  text: string;
  theme: ColorTheme;
  depth: number;
  rotationSpeed: number;
}

const KineticTypographyCanvas: React.FC<KineticTypographyCanvasProps> = ({ 
  text, 
  theme, 
  depth, 
  rotationSpeed 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const mouseVelocity = useRef(0);
  const frameRef = useRef(0);
  const smoothedMouse = useRef({ x: 0, y: 0 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    const centerX = width / 2;
    const centerY = height * 0.45;

    // Clear background
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate mouse velocity for reactive intensity
    const dx = mouseRef.current.x - prevMouseRef.current.x;
    const dy = mouseRef.current.y - prevMouseRef.current.y;
    const currentVel = Math.sqrt(dx * dx + dy * dy);
    mouseVelocity.current += (currentVel - mouseVelocity.current) * 0.1;
    prevMouseRef.current = { ...mouseRef.current };

    // Smooth mouse movement for extrusion
    smoothedMouse.current.x += (mouseRef.current.x - smoothedMouse.current.x) * 0.08;
    smoothedMouse.current.y += (mouseRef.current.y - smoothedMouse.current.y) * 0.08;

    const targetX = (smoothedMouse.current.x - centerX) * 0.15;
    const targetY = (smoothedMouse.current.y - centerY) * 0.15;

    // Responsive settings
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    // Responsive font scaling
    const characters = text.split('');
    let baseFontSize: number;
    if (isMobile) {
      baseFontSize = Math.min(width, height) * 0.07;
    } else if (isTablet) {
      baseFontSize = Math.min(width, height) * 0.08;
    } else {
      baseFontSize = Math.min(width, height) * 0.09;
    }
    const fontSize = characters.length > 10 ? baseFontSize * (10 / characters.length) : baseFontSize;
    
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Responsive radius
    let radius: number;
    if (isMobile) {
      radius = Math.min(width, height) * 0.32;
    } else if (isTablet) {
      radius = Math.min(width, height) * 0.30;
    } else {
      radius = Math.min(width, height) * 0.28;
    }

    const trailSteps = isMobile ? 30 : 50;
    const trailHeight = height * depth;

    const time = frameRef.current * 0.05;
    const orbitalRotation = frameRef.current * rotationSpeed;
    const jitterBase = 2 + (mouseVelocity.current * 0.05);

    // Draw extrusion trails
    characters.forEach((char, i) => {
      const angle = (i / characters.length) * Math.PI * 2 - Math.PI / 2 + orbitalRotation;
      
      const jitterX = Math.sin(time + i * 0.5) * jitterBase;
      const jitterY = Math.cos(time * 0.8 + i * 0.3) * jitterBase;
      const pulse = 1 + Math.sin(time * 1.5 + i) * 0.05;

      const x = centerX + Math.cos(angle) * radius + jitterX;
      const y = centerY + Math.sin(angle) * radius + jitterY;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.scale(pulse, pulse);

      ctx.font = `900 ${fontSize}px 'Inter', sans-serif`;

      for (let s = trailSteps; s > 0; s--) {
        const t = s / trailSteps;
        const alpha = Math.pow(1 - t, 2.5);
        const offsetY = t * trailHeight;
        const driftX = targetX * t;
        const driftY = targetY * t;

        const grad = ctx.createLinearGradient(0, 0, driftX, offsetY + driftY);
        grad.addColorStop(0, theme.secondary);
        grad.addColorStop(0.4, theme.accent);
        grad.addColorStop(1, 'transparent');

        ctx.globalAlpha = alpha * 0.5;
        ctx.fillStyle = grad;
        ctx.fillText(char, driftX, offsetY + driftY);
      }
      ctx.restore();
    });

    // Draw main text
    ctx.globalAlpha = 1;
    ctx.fillStyle = theme.primary;
    characters.forEach((char, i) => {
      const angle = (i / characters.length) * Math.PI * 2 - Math.PI / 2 + orbitalRotation;
      
      const jitterX = Math.sin(time + i * 0.5) * jitterBase;
      const jitterY = Math.cos(time * 0.8 + i * 0.3) * jitterBase;
      const pulse = 1 + Math.sin(time * 1.5 + i) * 0.05;

      const x = centerX + Math.cos(angle) * radius + jitterX;
      const y = centerY + Math.sin(angle) * radius + jitterY;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.scale(pulse, pulse);
      
      ctx.font = `900 ${fontSize}px 'Inter', sans-serif`;
      ctx.shadowBlur = isMobile ? 10 : 20 + (mouseVelocity.current * 0.2);
      ctx.shadowColor = theme.secondary;
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });

    frameRef.current++;
    requestAnimationFrame(draw);
  }, [text, theme, depth, rotationSpeed]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    handleResize();
    const animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, [draw]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 bg-black cursor-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 32 32%22><line x1=%2216%22 y1=%224%22 x2=%2216%22 y2=%2228%22 stroke=%22white%22 stroke-width=%222%22/><line x1=%224%22 y1=%2216%22 x2=%2228%22 y2=%2216%22 stroke=%22white%22 stroke-width=%222%22/></svg>')_16_16,_crosshair] w-full h-full"
    />
  );
};

export default KineticTypographyCanvas;