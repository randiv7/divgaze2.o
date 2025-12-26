import React from 'react';
import { TeamMember } from '@/types';
import { useInView } from '@/hooks/useInView';

interface MemberCardProps {
  member: TeamMember;
  index?: number;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, index = 0 }) => {
  const [ref, isVisible] = useInView({ threshold: 0.1 });
  const delay = (index % 5) * 150;

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative overflow-hidden bg-zinc-900 aspect-[3/4] reveal-scale ${isVisible ? 'visible' : ''}`}
    >
      {member.photo && (
        <img 
          src={member.photo} 
          alt={member.name}
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end pb-6 px-4 sm:pb-8 sm:px-6 md:pb-12 md:px-8 transition-all duration-500">
        
        {/* Role - Always visible, responsive sizing */}
        <p className="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-white mb-2 sm:mb-3 leading-none whitespace-nowrap transition-all duration-500 group-hover:-translate-y-2 group-hover:opacity-80">
          {member.role}
        </p>
        
        {/* Name - Visible on mobile, hidden on desktop until hover */}
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-tight text-white leading-tight max-w-[90%] sm:max-w-[85%] md:max-w-[200px] opacity-100 md:opacity-0 translate-y-0 md:translate-y-8 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-75">
          {member.name}
        </h3>
        
      </div>
      
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-700"></div>
    </div>
  );
};