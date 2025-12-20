import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isDarkBg, setIsDarkBg] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
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
      if (target.closest('button') || target.closest('a') || target.closest('.clickable-media')) {
        setIsHovering(true);
        if (target.closest('.clickable-media')) {
          setHoverText("VIEW");
        } else {
          setHoverText("");
        }
      } else {
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
  }, []);

  // Dynamic colors based on background
  const cursorColor = isDarkBg ? 'bg-white' : 'bg-black';
  const followerBorder = isDarkBg ? 'border-white/20' : 'border-black/20';
  const followerHoverBg = isDarkBg ? 'bg-white' : 'bg-black';
  const followerHoverText = isDarkBg ? 'text-black' : 'text-white';

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-2 h-2 ${cursorColor} rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-colors duration-300`}
      />
      <div 
        ref={followerRef} 
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out
          ${isHovering ? `w-20 h-20 ${followerHoverBg} ${followerHoverText} border-none` : `w-10 h-10 ${followerBorder} bg-transparent`}
          ${isClicking ? 'scale-75' : 'scale-100'}
        `}
      >
        {isHovering && hoverText && (
          <span className="text-[10px] font-bold tracking-widest leading-none translate-y-px">{hoverText}</span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;