import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.reveal');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('visible');
            }, index * 200);
          });
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 md:px-12 lg:px-24 py-24 overflow-hidden bg-black"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start hover-subtle-zoom">
        
        {/* Label Column */}
        <div className="lg:col-span-3 flex flex-col">
          <span className="reveal text-xs tracking-[0.5em] uppercase font-medium opacity-50 mb-4 inline-block text-white">
            ABOUT US
          </span>
          <div className="reveal h-[1px] w-12 bg-white/30 hidden lg:block"></div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-9">
          <h2 className="reveal heading-lg leading-tight mb-12 tracking-tight text-white font-inter">
            Divgaze is a creative tech studio <br className="hidden md:block" />
            <span className="italic opacity-80 font-normal">pushing ideas beyond boundaries.</span>
          </h2>

          <div className="reveal max-w-2xl">
            <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-300 mb-16">
              We blend design, technology, and AI to craft future-ready digital experiences, 
              from websites and apps to content and intelligent solutions. Based in Sri Lanka 
              with a global vision, we don't just build products. We shape what's next.
            </p>

            <div className="reveal">
              <Link to="/team">
                <button 
                  className="group relative px-12 py-4 overflow-hidden border border-white/20 rounded-full transition-all duration-500 hover:border-white"
                >
                  <div className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full"></div>
                  <span className="relative z-10 text-sm tracking-widest uppercase font-medium transition-colors duration-500 group-hover:text-black text-white">
                    Our Team
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury aesthetic background accent */}
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-white opacity-[0.02] rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};