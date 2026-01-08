import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Music2 } from 'lucide-react';
import Starburst from './Starburst';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = () => {
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/divgaze/profilecard/?igsh=dmtsNDIxNzYzOW8x',
      icon: Instagram,
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/DivGaze/61577558630387/',
      icon: Facebook,
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@divgaze',
      icon: Music2,
    },
    {
      name: 'X',
      href: 'https://x.com/DivGaze',
      icon: Twitter,
    },
  ];

  const locations = [
    {
      country: 'Sri Lanka',
      city: 'Colombo',
      flag: '/sl.png',
    },
    {
      country: 'Australia',
      city: 'Melbourne',
      flag: '/aus.png',
    },
  ];

  return (
    <footer className="bg-[#FFF4E4] min-h-screen flex flex-col text-[#2B1A12]">
      {/* Top Section - Full Screen with Title and Button */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="max-w-7xl w-full mx-auto flex flex-col items-center text-center space-y-8 md:space-y-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight italic px-4">
            Let&apos;s build the future together.
          </h2>
          
          {/* Contact Button - Same style as Selected Work */}
          <button 
            onClick={handleContactClick}
            className="group relative px-12 md:px-16 py-4 md:py-5 overflow-hidden border border-[#2B1A12]/10 transition-all hover:border-[#2B1A12] duration-700"
          >
            <span className="relative z-10 text-[10px] uppercase tracking-[0.5em] font-medium text-[#2B1A12]">
              Contact Us
            </span>
            <div className="absolute inset-0 bg-[#2B1A12] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]"></div>
            <span className="absolute inset-0 flex items-center justify-center text-[#FFF4E4] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[10px] uppercase tracking-[0.5em] font-medium">
              Contact Us
            </span>
          </button>
        </div>
      </div>
      
      {/* Bottom Section - Landing Page Footer Structure with Creative Lab Colors */}
      <div className="bg-[#FFF4E4] text-[#2B1A12] py-12 md:py-16 lg:py-20 font-inter border-t border-[#2B1A12]/10">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 md:gap-6 lg:gap-8 mb-12 md:mb-16">
            
            {/* Logo & Brand Section */}
            <div className="col-span-2 md:col-span-4 lg:col-span-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="mb-4 md:mb-6 group"
              >
                <span className="text-xl md:text-2xl font-bold tracking-tight hover:opacity-60 transition-opacity duration-300">
                  DivGaze
                </span>
              </button>
              <p className="text-[#2B1A12]/60 text-sm leading-relaxed mb-1 md:mb-2">
                From the future.
              </p>
              <p className="text-[#2B1A12]/40 text-xs leading-relaxed mb-5 md:mb-6 max-w-xs">
                We blend design, technology, and AI to craft future-ready digital experiences.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-2 md:gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 md:p-2.5 border border-[#2B1A12]/20 hover:border-[#2B1A12] hover:bg-[#2B1A12] transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2B1A12]/70 group-hover:text-[#FFF4E4] transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="col-span-1 lg:col-span-2">
              <h4 className="text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#2B1A12]/40 mb-4 md:mb-6 font-medium">
                Navigate
              </h4>
              <nav className="flex flex-col gap-2 md:gap-3">
                {['Home', 'Services', 'About', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-xs md:text-sm text-[#2B1A12]/70 hover:text-[#2B1A12] transition-colors duration-300 text-left w-fit"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            {/* Services Links */}
            <div className="col-span-1 lg:col-span-2">
              <h4 className="text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#2B1A12]/40 mb-4 md:mb-6 font-medium">
                Services
              </h4>
              <nav className="flex flex-col gap-2 md:gap-3">
                <Link to="/creative-lab" className="text-xs md:text-sm text-[#2B1A12]/70 hover:text-[#2B1A12] transition-colors duration-300">
                  Creative Lab
                </Link>
                <Link to="/ai-solutions" className="text-xs md:text-sm text-[#2B1A12]/70 hover:text-[#2B1A12] transition-colors duration-300">
                  AI Solutions
                </Link>
                <Link to="/web-dev" className="text-xs md:text-sm text-[#2B1A12]/70 hover:text-[#2B1A12] transition-colors duration-300">
                  Web Dev
                </Link>
              </nav>
            </div>

            {/* Locations with Flags */}
            <div className="col-span-2 md:col-span-2 lg:col-span-4 mt-4 md:mt-0">
              <h4 className="text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#2B1A12]/40 mb-4 md:mb-6 font-medium">
                Locations
              </h4>
              <div className="flex flex-row md:flex-col gap-6 md:gap-4">
                {locations.map((loc) => (
                  <div key={loc.country} className="flex items-center gap-2 md:gap-3 group">
                    <div className="w-6 h-4 md:w-8 md:h-6 overflow-hidden flex-shrink-0">
                      <img 
                        src={loc.flag} 
                        alt={`${loc.country} flag`}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <p className="text-xs md:text-sm text-[#2B1A12]/70 group-hover:text-[#2B1A12] transition-colors duration-300">
                      {loc.city}, {loc.country}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] md:text-xs text-[#2B1A12]/40 mt-4">
                Remote Worldwide
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 md:pt-8 border-t border-[#2B1A12]/10 flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-6">
            {/* Copyright */}
            <p className="text-[10px] md:text-[11px] text-[#2B1A12]/40 tracking-wider uppercase">
              © 2025 DivGaze. All rights reserved.
            </p>
            
            {/* Legal Links */}
            <div className="flex items-center gap-6 md:gap-8">
              <Link 
                to="/privacy-policy" 
                className="text-[10px] md:text-[11px] text-[#2B1A12]/40 hover:text-[#2B1A12] transition-colors duration-300 tracking-wider uppercase"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service" 
                className="text-[10px] md:text-[11px] text-[#2B1A12]/40 hover:text-[#2B1A12] transition-colors duration-300 tracking-wider uppercase"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;