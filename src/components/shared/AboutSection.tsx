import React from 'react';

const DIVGAZE_INFO = "Divgaze is a creative tech studio pushing ideas beyond boundaries. We blend design, technology, and AI to craft future-ready digital experiences, from websites and apps to content and intelligent solutions. Based in Sri Lanka with a global vision, we don't just build products. We shape what's next.";

export const AboutSection: React.FC = () => {
  const expertiseItems = [
    { id: '01', title: 'Creative Design' },
    { id: '02', title: 'AI Engineering' },
    { id: '03', title: 'Bespoke Dev' },
    { id: '04', title: 'Content Strategy' },
  ];

  const handleButtonClick = () => {
    console.log("Our team button clicked");
  };

  return (
    <section 
      id="about"
      className="min-h-screen w-full flex items-center justify-center bg-black overflow-hidden relative font-inter"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Main Content Area */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="mb-6 md:mb-10">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-tight tracking-tighter text-white uppercase">
              ABOUT US
            </h1>
          </div>

          <div className="max-w-2xl space-y-6">
            <p className="text-xl md:text-3xl font-light text-white/90 leading-relaxed">
              Divgaze is a <span className="font-bold border-b border-white/30">creative tech studio</span> pushing ideas beyond boundaries.
            </p>
            
            <p className="text-sm md:text-lg text-zinc-400 leading-loose font-light max-w-xl mx-auto">
              We blend design, technology, and AI to craft future-ready digital experiences, 
              from websites and apps to content and intelligent solutions. 
              Based in <span className="text-white font-medium">Sri Lanka</span> with a global vision, we don't just build products. 
              We <span className="text-white font-medium italic">shape what's next</span>.
            </p>

            {/* Button */}
            <div className="pt-4">
              <button
                onClick={handleButtonClick}
                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full overflow-hidden font-medium border-0 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Our team</span>
                <div className="absolute inset-0 bg-gray-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </div>
          
          {/* Expertise Section */}
          <div className="mt-16 w-full max-w-4xl">
            <h2 className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-zinc-500 mb-10">Expertise</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
              {expertiseItems.map((item) => (
                <div key={item.id} className="group cursor-default flex flex-col items-center">
                  <span className="block text-[10px] font-mono text-zinc-600 mb-3 group-hover:text-white transition-colors duration-500">
                    // {item.id}
                  </span>
                  <h3 className="text-xs md:text-sm font-medium text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-500 uppercase tracking-widest whitespace-nowrap">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Footer Line */}
      <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/5 flex justify-end items-center bg-black/50 backdrop-blur-sm">
        <div className="flex space-x-8 text-[10px] md:text-xs uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-zinc-400 transition-colors">Inquiry</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Network</a>
        </div>
      </div>

      {/* Hide cursor in this section */}
      <style>{`
        #about,
        #about * {
          cursor: none !important;
        }
      `}</style>
    </section>
  );
};