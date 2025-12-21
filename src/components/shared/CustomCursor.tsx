import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isInExcludedArea, setIsInExcludedArea] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled (mobile/tablet)
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();

    // Don't setup cursor on touch devices
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      
      // Check if cursor is in navigation or footer
      const isInNav = element?.closest('nav') !== null;
      const isInFooter = element?.closest('footer') !== null;
      setIsInExcludedArea(isInNav || isInFooter);

      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out"
      });

      // Check background color at cursor position
      if (element) {
        const section = element.closest('section');
        
        // Check if we're in a dark section (black background or dark class)
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
      
      // Check for clickable media first
      if (target.closest('.clickable-media')) {
        setIsHovering(true);
        setHoverText("VIEW");
      } 
      // Check for buttons
      else if (target.closest('button')) {
        setIsHovering(true);
        setHoverText("CLICK");
      }
      // Check for links
      else if (target.closest('a')) {
        setIsHovering(true);
        setHoverText("CLICK");
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
  }, [isTouchDevice]);

  // Don't render on touch devices (mobile/tablet)
  if (isTouchDevice) return null;

  // Dynamic colors based on background
  const followerHoverBg = isDarkBg ? 'bg-white' : 'bg-black';
  const followerHoverText = isDarkBg ? 'text-black' : 'text-white';
  const followerTint = isDarkBg ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';

  return (
    <div 
      ref={followerRef} 
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out
        ${isHovering ? `w-28 h-28 ${followerHoverBg} ${followerHoverText}` : `w-16 h-16`}
        ${isClicking ? 'scale-75' : 'scale-100'}
        ${isInExcludedArea ? 'opacity-0' : 'opacity-100'}
      `}
      style={{
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        backgroundColor: isHovering ? undefined : followerTint
      }}
    >
      {isHovering && hoverText && (
        <span className="text-xs font-bold tracking-widest leading-none">{hoverText}</span>
      )}
    </div>
  );
};

export default CustomCursor;