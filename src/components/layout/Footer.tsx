import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16 font-inter">
      <div className="container-premium">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo & Tagline */}
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tight">
              Divgaze
            </Link>
            <p className="mt-2 text-sm opacity-70">Beyond Boundaries.</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-8 text-sm">
            <Link to="/" className="hover:opacity-70 transition-opacity">
              Home
            </Link>
            <Link to="/creative-lab" className="hover:opacity-70 transition-opacity">
              Creative Lab
            </Link>
            <Link to="/ai-solutions" className="hover:opacity-70 transition-opacity">
              AI Solutions
            </Link>
            <Link to="/web-dev" className="hover:opacity-70 transition-opacity">
              Web Dev
            </Link>
            <Link to="/about" className="hover:opacity-70 transition-opacity">
              About
            </Link>
            <Link to="/contact" className="hover:opacity-70 transition-opacity">
              Contact
            </Link>
          </div>

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

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm opacity-50">
          © {new Date().getFullYear()} Divgaze. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
