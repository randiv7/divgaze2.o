import React from 'react';
import { motion } from 'framer-motion';

interface StarburstProps {
  size?: number;
}

const Starburst: React.FC<StarburstProps> = ({ size = 100 }) => {
  const lineCount = 36;
  const radius = 50;
  
  return (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      initial={{ opacity: 0.6, scale: 1 }}
      whileHover={{ 
        scale: 1.15, 
        opacity: 1,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }
      }}
      animate={{ 
        rotate: 360,
      }}
      transition={{ 
        rotate: {
          repeat: Infinity, 
          duration: 20, 
          ease: "linear" 
        }
      }}
    >
      {[...Array(lineCount)].map((_, i) => {
        const angle = (i * 360) / lineCount;
        const x2 = 50 + radius * Math.cos((angle * Math.PI) / 180);
        const y2 = 50 + radius * Math.sin((angle * Math.PI) / 180);
        return (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-[#2B1A12]"
          />
        );
      })}
    </motion.svg>
  );
};

export default Starburst;