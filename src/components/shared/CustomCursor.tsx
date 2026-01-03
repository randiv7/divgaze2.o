import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const location = useLocation();
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Only show custom cursor on landing page
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    // Check if device is touch-enabled (mobile/tablet)
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();

    // Don't setup cursor on touch devices or non-landing pages
    if (isTouchDevice || !isLandingPage) return;

    const moveCursor = (e: MouseEvent) => {
      // Only move cursor when hovering on clickable-media
      if (!isHovering) return;
      
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out"
      });

      // Check background color at cursor position
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const section = element.closest('section');
        
        if (section) {
          const sectionBg = window.getComputedStyle(section).backgroundColor;
          const isBlackBg = sectionBg === 'rgb(0, 0, 0)' || section.classList.contains('bg-black') || section.classList.contains('bg-primary');
          setIsDarkBg(isBlackBg);
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if we're in nav or footer - don't activate hover state
      const isInNav = target.closest('nav') !== null;
      const isInFooter = target.closest('footer') !== null;
      
      if (isInNav || isInFooter) {
        setIsHovering(false);
        setHoverText("");
        return;
      }
      
      // Check for clickable media only
      if (target.closest('.clickable-media')) {
        setIsHovering(true);
        setHoverText("VIEW");
        
        // Position cursor at current mouse position when hover starts
        const mouseEvent = e as MouseEvent;
        gsap.set(followerRef.current, {
          x: mouseEvent.clientX,
          y: mouseEvent.clientY
        });
      } 
      else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouchDevice, isLandingPage, isHovering]);

  // Don't render on touch devices or non-landing pages
  if (isTouchDevice || !isLandingPage) return null;

  // Dynamic colors based on background
  const followerHoverBg = isDarkBg ? 'bg-white' : 'bg-black';
  const followerHoverText = isDarkBg ? 'text-black' : 'text-white';

  return (
    <div 
      ref={followerRef} 
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out
        ${isHovering ? `w-28 h-28 ${followerHoverBg} ${followerHoverText} opacity-100` : 'w-0 h-0 opacity-0'}
        ${isClicking ? 'scale-75' : 'scale-100'}
      `}
    >
      {isHovering && hoverText && (
        <span className="text-xs font-bold tracking-widest leading-none">{hoverText}</span>
      )}
    </div>
  );
};

export default CustomCursor;