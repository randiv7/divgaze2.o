import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16 font-inter">
      <div className="container-premium">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              Divgaze
            </Link>
            <p className="mt-2 text-sm opacity-70">Beyond Boundaries.</p>
            <p className="mt-4 text-sm opacity-50">
              Sri Lanka & Australia
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium mb-4">Services</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <Link to="/creative-lab" className="hover:opacity-100 transition-opacity">
                Creative Lab
              </Link>
              <Link to="/ai-solutions" className="hover:opacity-100 transition-opacity">
                AI Solutions
              </Link>
              <Link to="/web-dev" className="hover:opacity-100 transition-opacity">
                Web Dev & Systems
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <Link to="/" className="hover:opacity-100 transition-opacity">
                Home
              </Link>
              <Link to="/about" className="hover:opacity-100 transition-opacity">
                About
              </Link>
              <Link to="/contact" className="hover:opacity-100 transition-opacity">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <Link to="/privacy-policy" className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:opacity-100 transition-opacity">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-50">
            © {new Date().getFullYear()} Divgaze. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-primary-foreground/30 hover:bg-primary-foreground hover:text-primary transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-primary-foreground/30 hover:bg-primary-foreground hover:text-primary transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
