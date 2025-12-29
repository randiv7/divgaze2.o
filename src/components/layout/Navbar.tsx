import { useState, useEffect } from 'react';
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
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isCreativeLabPage = location.pathname === '/creative-lab';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navLinkClass = (isScrolled: boolean, isHomePage: boolean) => {
    return `text-sm font-medium transition-opacity hover:opacity-60 ${!isScrolled && isHomePage ? 'text-white' : 'text-foreground'}`;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-inter ${
      isScrolled 
        ? 'bg-white/40 backdrop-blur-xl border-b border-black/5' 
        : 'bg-transparent'
    }`}>
      <nav className="container-premium">
        <div className="flex items-center justify-between h-24 px-4 md:px-8">
          {/* Logo Image - Conditional based on page */}
          <Link to="/" className="transition-opacity hover:opacity-80 py-4">
            <img 
              src={isCreativeLabPage ? "/blogo.png" : "/logo.png"} 
              alt="Divgaze Logo" 
              className={`h-12 md:h-14 w-auto transition-all duration-300 ${
                !isScrolled && isHomePage ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          <div className="hidden md:flex items-center gap-12">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={navLinkClass(isScrolled, isHomePage)}>
              Home
            </a>

            <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button onClick={handleServicesClick} className={`flex items-center gap-1 ${navLinkClass(isScrolled, isHomePage)}`}>
                Services
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="absolute top-full left-0 mt-2 w-48 bg-white/90 backdrop-blur-xl border border-black/5 shadow-xl rounded-lg overflow-hidden">
                    {services.map((service) => (
                      <Link key={service.name} to={service.href} className="block px-4 py-3 text-sm font-medium transition-colors hover:bg-black/5">
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={navLinkClass(isScrolled, isHomePage)}>
              About
            </a>

            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={navLinkClass(isScrolled, isHomePage)}>
              Contact
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 ${!isScrolled && isHomePage ? 'text-white' : 'text-foreground'}`} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-black/5">
              <div className="px-4 py-6 space-y-4">
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="block text-sm font-medium hover:opacity-60 transition-opacity">
                  Home
                </a>
                <button onClick={handleServicesClick} className="block w-full text-left text-sm font-medium hover:opacity-60 transition-opacity">
                  Services
                </button>
                <div className="pl-4 space-y-2">
                  {services.map((service) => (
                    <Link key={service.name} to={service.href} onClick={() => setIsOpen(false)} className="block text-sm hover:opacity-60 transition-opacity">
                      {service.name}
                    </Link>
                  ))}
                </div>
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="block text-sm font-medium hover:opacity-60 transition-opacity">
                  About
                </a>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="block text-sm font-medium hover:opacity-60 transition-opacity">
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