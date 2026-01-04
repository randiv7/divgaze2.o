import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { name: 'Creative Lab', href: '/creative-lab' },
  { name: 'AI Solutions', href: '/ai-solutions' },
  { name: 'Web Dev & Systems', href: '/web-dev' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isCreativeLabPage = location.pathname === '/creative-lab';

  // Detect background color at navbar position
  const detectBackground = useCallback(() => {
    const navbarHeight = 96; // h-24 = 96px
    const checkPoint = navbarHeight / 2; // Check at middle of navbar
    
    // Get all sections and elements that might have backgrounds
    const elements = document.elementsFromPoint(window.innerWidth / 2, checkPoint);
    
    for (const element of elements) {
      const computedStyle = window.getComputedStyle(element);
      const bgColor = computedStyle.backgroundColor;
      
      // Skip transparent elements
      if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
        continue;
      }
      
      // Parse the background color
      const rgb = bgColor.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        const r = parseInt(rgb[0]);
        const g = parseInt(rgb[1]);
        const b = parseInt(rgb[2]);
        
        // Calculate luminance (perceived brightness)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // If luminance < 0.5, it's a dark background
        setIsDarkBackground(luminance < 0.5);
        return;
      }
    }
    
    // Default to dark background if nothing found
    setIsDarkBackground(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      detectBackground();
    };
    
    // Initial detection
    detectBackground();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', detectBackground);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', detectBackground);
    };
  }, [detectBackground]);

  // Re-detect on route change
  useEffect(() => {
    setTimeout(detectBackground, 100);
  }, [location.pathname, detectBackground]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    } else {
      e.preventDefault();
      navigate('/', { state: { scrollTo: targetId } });
    }
  };

  const handleServicesClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  // Dynamic text color based on background
  const textColorClass = isDarkBackground ? 'text-white' : 'text-black';
  const hoverColorClass = isDarkBackground ? 'hover:opacity-60' : 'hover:opacity-60';

  const navLinkClass = () => {
    return `text-sm font-medium transition-all duration-300 ${textColorClass} ${hoverColorClass}`;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-inter ${
      isScrolled 
        ? isDarkBackground 
          ? 'bg-black/80 backdrop-blur-md shadow-md' 
          : 'bg-white/80 backdrop-blur-md shadow-md'
        : 'bg-transparent'
    }`}>
      <nav className="container-premium">
        <div className="flex items-center justify-between h-24 px-4 md:px-8">
          {/* Logo Image - Conditional based on page and background */}
          <Link to="/" className="transition-opacity hover:opacity-80 py-4">
            <img 
              src={isCreativeLabPage ? "/blogo.png" : "/logo.png"} 
              alt="Divgaze Logo" 
              className={`h-12 md:h-14 w-auto transition-all duration-300 ${
                isDarkBackground ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          <div className="hidden md:flex items-center gap-12">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={navLinkClass()}>
              Home
            </a>

            <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button onClick={handleServicesClick} className={`flex items-center gap-1 ${navLinkClass()}`}>
                Services
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 10 }} 
                    transition={{ duration: 0.2 }} 
                    className={`absolute top-full left-0 mt-2 w-48 backdrop-blur-md border shadow-xl rounded-lg overflow-hidden ${
                      isDarkBackground 
                        ? 'bg-black/90 border-white/10' 
                        : 'bg-white/90 border-black/10'
                    }`}
                  >
                    {services.map((service) => (
                      <Link 
                        key={service.name} 
                        to={service.href} 
                        className={`block px-4 py-3 text-sm font-medium transition-colors ${
                          isDarkBackground 
                            ? 'text-white hover:bg-white/10' 
                            : 'text-black hover:bg-black/5'
                        }`}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={navLinkClass()}>
              About
            </a>

            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={navLinkClass()}>
              Contact
            </a>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`md:hidden p-2 transition-colors duration-300 ${textColorClass}`} 
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }} 
              transition={{ duration: 0.3 }} 
              className={`md:hidden overflow-hidden backdrop-blur-md border-t ${
                isDarkBackground 
                  ? 'bg-black/95 border-white/10' 
                  : 'bg-white/95 border-black/10'
              }`}
            >
              <div className="px-4 py-6 space-y-4">
                <a 
                  href="#home" 
                  onClick={(e) => handleNavClick(e, 'home')} 
                  className={`block text-sm font-medium transition-all duration-300 ${textColorClass} hover:opacity-60`}
                >
                  Home
                </a>
                <button 
                  onClick={handleServicesClick} 
                  className={`block w-full text-left text-sm font-medium transition-all duration-300 ${textColorClass} hover:opacity-60`}
                >
                  Services
                </button>
                <div className="pl-4 space-y-2">
                  {services.map((service) => (
                    <Link 
                      key={service.name} 
                      to={service.href} 
                      onClick={() => setIsOpen(false)} 
                      className={`block text-sm transition-all duration-300 ${
                        isDarkBackground ? 'text-white/80' : 'text-black/80'
                      } hover:opacity-60`}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
                <a 
                  href="#about" 
                  onClick={(e) => handleNavClick(e, 'about')} 
                  className={`block text-sm font-medium transition-all duration-300 ${textColorClass} hover:opacity-60`}
                >
                  About
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, 'contact')} 
                  className={`block text-sm font-medium transition-all duration-300 ${textColorClass} hover:opacity-60`}
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};