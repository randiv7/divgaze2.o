import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  index: number;
  image?: string;
}

export const ServiceCard = ({ title, description, href, index, image }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) {
      if (!isTapped) {
        e.preventDefault();
        setIsTapped(true);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Link
        to={href}
        onClick={handleTap}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsTapped(false);
        }}
        className="block"
      >
        <motion.div
          className="relative overflow-hidden bg-secondary p-8 md:p-12 min-h-[300px] md:min-h-[400px] flex flex-col justify-end"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundColor: isHovered || isTapped ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
          }}
        >
          {/* Background Image */}
          {image && (
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500"
                style={{
                  transform: isHovered || isTapped ? 'scale(1.1)' : 'scale(1)',
                }}
              />
              {/* Dark overlay on hover */}
              <div 
                className="absolute inset-0 bg-black transition-opacity duration-500"
                style={{
                  opacity: isHovered || isTapped ? 0.7 : 0,
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10">
            <h3
              className={`heading-md mb-4 transition-colors duration-300 ${
                image ? 'text-primary-foreground' : (isHovered || isTapped ? 'text-primary-foreground' : 'text-foreground')
              }`}
            >
              {title}
            </h3>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered || isTapped ? 1 : 0,
                height: isHovered || isTapped ? 'auto' : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-primary-foreground/80 mb-4">{description}</p>
              <span className="inline-flex items-center gap-2 text-primary-foreground font-medium">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};