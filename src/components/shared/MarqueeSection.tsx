import React from 'react';

interface MarqueeRowProps {
  text: string;
  direction: 'left' | 'right';
  speed?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ text, direction, speed = 60 }) => {
  // Duplicate text enough times to ensure seamless loop
  const repeatedText = Array(12).fill(text);

  const renderInteractiveText = (phrase: string) => {
    return phrase.split('').map((char, index) => (
      <span
        key={index}
        className="inline-block transition-all duration-300 hover:scale-125 hover:-translate-y-2 hover:skew-x-12 cursor-default"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="relative flex overflow-hidden select-none items-center justify-center">
      <div 
        className="whitespace-nowrap flex items-center marquee-track"
        style={{ 
          animation: `${direction === 'left' ? 'marquee-left' : 'marquee-right'} ${speed}s linear infinite`
        }}
      >
        {repeatedText.map((t, i) => (
          <span 
            key={i} 
            className="text-[22vw] md:text-[18vw] font-thin uppercase tracking-tighter px-[3vw] md:px-[4vw] text-black leading-none flex"
            style={{ fontWeight: 100 }}
          >
            {renderInteractiveText(t)}
          </span>
        ))}
      </div>
    </div>
  );
};

export const MarqueeSection: React.FC = () => {
  return (
    <section className="h-auto md:min-h-screen w-full bg-white flex flex-col justify-center relative overflow-hidden font-inter selection:bg-black selection:text-white py-12 md:py-0">
      <style>
        {`
          @keyframes marquee-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .marquee-track {
            will-change: transform;
          }
        `}
      </style>
      <div className="z-10 w-full flex flex-col gap-6 md:gap-0">
        <MarqueeRow 
          text="We Take Care of Your Digital Presence." 
          direction="left" 
          speed={200} 
        />
        
        <MarqueeRow 
          text="Research  Strategy    Create    Grow    Divgaze" 
          direction="right" 
          speed={180} 
        />
      </div>
    </section>
  );
};