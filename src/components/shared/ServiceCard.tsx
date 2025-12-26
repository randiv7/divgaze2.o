import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  index: number;
  image?: string;
}

export const ServiceCard = ({ title, description, href, index, image }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Card Staggered Entrance Animation with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        scale: 0.98,
        duration: 1.2,
        ease: "expo.out",
        delay: (index % 3) * 0.1, // Stagger Delay by Index
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className="group cursor-pointer">
      <Link
        to={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block"
      >
        {/* Card with Lift, Shadow Expansion, and Rounded Corners - Responsive Height */}
        <div className="relative w-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px] rounded-2xl md:rounded-[24px] overflow-hidden mb-4 md:mb-6 bg-secondary clickable-media transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)]">
          {/* Background Image with Scale on Hover */}
          {image && (
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] will-change-transform"
              />
              {/* Overlay Fade on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
            </div>
          )}
        </div>

        {/* Title and Description Below Card - Responsive Typography */}
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center justify-between">
            {/* Title Slide on Hover with Underline Expand */}
            <h3 className="relative text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-foreground group-hover:translate-x-2 transition-transform duration-500 flex items-center gap-2">
              <span className="relative">
                {title}
                {/* Underline Expand Animation */}
                <span className="absolute left-0 bottom-0 w-0 h-px bg-black transition-all duration-500 group-hover:w-full" />
              </span>
              {/* Arrow Icon Entrance */}
              <ArrowUpRight 
                className="w-5 h-5 md:w-6 md:h-6 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 text-black/40" 
              />
            </h3>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{description}</p>
        </div>
      </Link>
    </div>
  );
};