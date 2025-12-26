import React, { useState, useEffect } from 'react';
import { TeamMember } from '@/types';
import { useInView } from '@/hooks/useInView';

interface MemberCardProps {
  member: TeamMember;
  index?: number;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, index = 0 }) => {
  const [ref, isVisible] = useInView({ threshold: 0.1 });
  const [isExpanded, setIsExpanded] = useState(false);
  const delay = (index % 5) * 150;

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  return (
    <>
      <div 
        ref={ref}
        style={{ transitionDelay: `${delay}ms` }}
        className={`group relative overflow-hidden bg-zinc-900 aspect-[3/4] cursor-pointer reveal-scale ${isVisible ? 'visible' : ''}`}
        onClick={() => setIsExpanded(true)}
      >
        {member.photo && (
          <img 
            src={member.photo} 
            alt={member.name}
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end pb-8 px-6 md:pb-12 md:px-8 transition-all duration-500">
          
          <p className="font-mono text-xs md:text-sm uppercase tracking-wider text-white mb-3 leading-none whitespace-nowrap transition-all duration-500 group-hover:-translate-y-2 group-hover:opacity-80">
            {member.role}
          </p>
          
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white leading-tight max-w-[200px] opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
            {member.name}
          </h3>
          
        </div>
        
        <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-700"></div>
      </div>

      {isExpanded && (
        <div 
          className="fixed inset-0 z-[100] transition-all duration-700 ease-out flex items-center justify-center opacity-100 pointer-events-auto"
        >
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-md" 
            onClick={() => setIsExpanded(false)}
          ></div>
          
          <div 
            className="relative w-[95vw] md:w-[80vw] max-w-6xl h-[90vh] md:h-[70vh] bg-black border border-white/10 flex flex-col md:flex-row items-center overflow-hidden scale-100 opacity-100"
          >
            <button 
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 font-mono text-xs uppercase tracking-[0.3em] hover:line-through transition-all p-4 text-white"
            >
              Close [X]
            </button>

            <div className="w-full md:w-2/5 h-[40%] md:h-full p-4 md:p-6 lg:p-12">
              <div className="relative w-full h-full overflow-hidden">
                {member.photo && (
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale scale-90 opacity-100"
                  />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
              </div>
            </div>

            <div className="w-full md:w-3/5 h-[60%] md:h-full p-6 md:p-12 lg:p-20 flex flex-col justify-center overflow-y-auto">
              <div className="translate-y-0 opacity-100">
                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-zinc-500 mb-4 md:mb-6">
                  {member.role}
                </p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none text-white">
                  {member.name}
                </h2>
                
                <div className="space-y-6 md:space-y-8">
                  <p className="text-lg md:text-xl lg:text-2xl font-light italic text-zinc-200 leading-snug">
                    "{member.quote}"
                  </p>
                  <div className="h-px w-24 bg-white/30"></div>
                  <p className="text-zinc-400 text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-lg">
                    {member.bio}
                  </p>
                  
                  <div className="pt-4 md:pt-6 flex items-center space-x-6 md:space-x-8">
                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-zinc-600 hover:text-white transition-colors cursor-pointer">Portfolio</span>
                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-zinc-600 hover:text-white transition-colors cursor-pointer">LinkedIn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};