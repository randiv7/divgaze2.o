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
      >
        <img 
          src={member.photo} 
          alt={member.name}
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="overflow-hidden">
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75">
              {member.role}
            </p>
          </div>
          <div className="overflow-hidden">
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
              {member.name}
            </h3>
          </div>
          
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
              className="px-6 py-2 border border-white/40 hover:bg-white hover:text-black transition-all duration-300 font-mono text-[9px] uppercase tracking-widest"
            >
              Read Bio
            </button>
          </div>
        </div>
        
        <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-700"></div>
      </div>

      {/* Expanded Modal */}
      <div 
        className={`fixed inset-0 z-[100] transition-all duration-700 ease-out flex items-center justify-center ${
          isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsExpanded(false)}></div>
        
        <div 
          className={`relative w-[95vw] md:w-[80vw] max-w-6xl h-[90vh] md:h-[70vh] bg-black border border-white/10 flex flex-col md:flex-row items-center overflow-hidden transition-all duration-700 delay-100 ${
            isExpanded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <button 
            onClick={() => setIsExpanded(false)}
            className="absolute top-6 right-6 z-20 font-mono text-xs uppercase tracking-[0.3em] hover:line-through transition-all p-4"
          >
            Close [X]
          </button>

          <div className="w-full md:w-2/5 h-[40%] md:h-full p-6 md:p-12">
            <div className="relative w-full h-full overflow-hidden">
              <img 
                src={member.photo} 
                alt={member.name}
                className={`w-full h-full object-cover grayscale transition-transform duration-[2s] ease-out ${
                  isExpanded ? 'scale-90 opacity-100' : 'scale-110 opacity-0'
                }`}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
            </div>
          </div>

          <div className="w-full md:w-3/5 h-[60%] md:h-full p-8 md:p-20 flex flex-col justify-center overflow-y-auto">
            <div className={`transition-all duration-1000 delay-300 ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-zinc-500 mb-6">
                {member.role}
              </p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                {member.name}
              </h2>
              
              <div className="space-y-8">
                <p className="text-xl md:text-2xl font-light italic text-zinc-200 leading-snug">
                  "{member.quote}"
                </p>
                <div className="h-px w-24 bg-white/30"></div>
                <p className="text-zinc-400 text-sm md:text-lg font-light leading-relaxed max-w-lg">
                  {member.bio}
                </p>
                
                <div className="pt-6 flex items-center space-x-8">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors cursor-pointer">Portfolio</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors cursor-pointer">LinkedIn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};