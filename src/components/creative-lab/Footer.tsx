import React from 'react';
import { Link } from 'react-router-dom';
import Starburst from './Starburst';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFF4E4] min-h-screen flex flex-col text-[#2B1A12]">
      {/* Top Section - Full Screen with Title and Button */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="max-w-7xl w-full mx-auto flex flex-col items-center text-center space-y-8 md:space-y-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight italic px-4">
            Let&apos;s build the future together.
          </h2>
          
          {/* Contact Button - Same style as Selected Work */}
          <Link 
            to="/#contact"
            className="group relative px-12 md:px-16 py-4 md:py-5 overflow-hidden border border-[#2B1A12]/10 transition-all hover:border-[#2B1A12] duration-700"
          >
            <span className="relative z-10 text-[10px] uppercase tracking-[0.5em] font-medium text-[#2B1A12]">
              Contact Us
            </span>
            <div className="absolute inset-0 bg-[#2B1A12] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]"></div>
            <span className="absolute inset-0 flex items-center justify-center text-[#FFF4E4] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[10px] uppercase tracking-[0.5em] font-medium">
              Contact Us
            </span>
          </Link>
        </div>
      </div>
      
      {/* Bottom Section - Pushed to Bottom */}
      <div className="px-6 md:px-12 pb-8 md:pb-12">
        <div className="max-w-7xl w-full mx-auto">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 md:pt-16 border-t border-[#2B1A12]/5">
            <div className="flex flex-col space-y-4 items-center md:items-start">
               <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">Social</span>
               <ul className="text-xs space-y-2 uppercase tracking-widest">
                 <li>
                   <a 
                     href="https://www.instagram.com/divgaze/profilecard/?igsh=dmtsNDIxNzYzOW8x" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="hover:opacity-50 transition-opacity cursor-pointer"
                   >
                     Instagram
                   </a>
                 </li>
                 <li>
                   <a 
                     href="https://www.facebook.com/people/DivGaze/61577558630387/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="hover:opacity-50 transition-opacity cursor-pointer"
                   >
                     Facebook
                   </a>
                 </li>
                 <li>
                   <a 
                     href="https://www.tiktok.com/@divgaze" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="hover:opacity-50 transition-opacity cursor-pointer"
                   >
                     TikTok
                   </a>
                 </li>
                 <li>
                   <a 
                     href="https://x.com/DivGaze" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="hover:opacity-50 transition-opacity cursor-pointer"
                   >
                     X (Twitter)
                   </a>
                 </li>
               </ul>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <Starburst size={40} />
            </div>

            <div className="flex flex-col md:items-end items-center space-y-4">
               <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">Location</span>
               <p className="text-xs uppercase tracking-widest md:text-right text-center">
                 Sri Lanka & Australia <br/>
                 Remote Worldwide
               </p>
            </div>
          </div>
          
          <div className="mt-8 md:mt-12 w-full flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.5em] opacity-20">
            <span>&copy; Creative Lab</span>
            <span className="mt-4 md:mt-0 italic">All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;