import React from 'react';
import Starburst from './Starburst';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFF4E4] pt-60 pb-12 px-6 md:px-12 text-[#2B1A12]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="mb-24 flex flex-col items-center text-center space-y-8">
          <h2 className="text-4xl md:text-7xl font-serif font-light tracking-tight italic">Let&apos;s build the future together.</h2>
          <p className="text-sm md:text-lg opacity-60 font-light tracking-widest uppercase text-[#2B1A12]">hello@creativelab.studio</p>
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 pt-20 border-t border-[#2B1A12]/5">
          <div className="flex flex-col space-y-4">
             <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">Social</span>
             <ul className="text-xs space-y-2 uppercase tracking-widest">
               <li className="hover:opacity-50 cursor-pointer">Instagram</li>
               <li className="hover:opacity-50 cursor-pointer">Behance</li>
               <li className="hover:opacity-50 cursor-pointer">LinkedIn</li>
             </ul>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <Starburst size={40} />
          </div>

          <div className="flex flex-col md:items-end space-y-4">
             <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">Location</span>
             <p className="text-xs uppercase tracking-widest text-right">
               Stockholm, Sweden <br/>
               Remote Worldwide
             </p>
          </div>
        </div>
        
        <div className="mt-20 w-full flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.5em] opacity-20">
          <span>&copy; 2024 Creative Lab</span>
          <span className="mt-4 md:mt-0 italic">All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;