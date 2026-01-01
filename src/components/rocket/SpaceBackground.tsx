import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpaceBackgroundProps {
  isLaunching: boolean;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  color: string;
  twinkleDelay: number;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ isLaunching }) => {
  const starColors = ['#ffffff', '#e0f2fe', '#fef3c7', '#ffedd5', '#f8fafc'];

  const generateStars = (count: number, sizeRange: [number, number]): Star[] => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      duration: Math.random() * 12 + 10,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      twinkleDelay: Math.random() * 5,
    }));
  };

  const starLayers = useMemo(() => [
    { stars: generateStars(80, [0.3, 0.7]), speedFactor: 0.5, opacity: 0.15 }, // Distant background
    { stars: generateStars(45, [0.8, 1.5]), speedFactor: 1.2, opacity: 0.35 }, // Mid-field
    { stars: generateStars(15, [1.8, 2.8]), speedFactor: 3.0, opacity: 0.6 },  // Near-field
  ], []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black" style={{ transform: 'translateZ(0)' }}>
      {/* Deep Space Atmosphere - Subtle gradients for depth */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(14,165,233,0.05)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_rgba(168,85,247,0.03)_0%,_transparent_50%)]" />
      </div>

      {starLayers.map((layer, layerIdx) => (
        <div key={layerIdx} className="absolute inset-0" style={{ willChange: isLaunching ? 'transform' : 'auto' }}>
          {layer.stars.map((star) => (
            <motion.div
              key={`${layerIdx}-${star.id}`}
              className="absolute rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                backgroundColor: star.color,
                boxShadow: star.size > 2 ? `0 0 ${star.size * 2}px ${star.color}` : 'none',
                willChange: 'transform, opacity, height'
              }}
              animate={isLaunching ? {
                y: [0, 1500],
                height: [star.size, star.size * 30],
                opacity: [layer.opacity, layer.opacity, 0]
              } : {
                opacity: [layer.opacity * 0.4, layer.opacity, layer.opacity * 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={isLaunching ? {
                duration: star.duration / (layer.speedFactor * 6),
                repeat: Infinity,
                ease: "linear",
                delay: -(Math.random() * 10)
              } : {
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.twinkleDelay
              }}
            />
          ))}
        </div>
      ))}
      
      {/* Ground/Planetary Reflection - Fades out on launch */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent pointer-events-none"
        animate={isLaunching ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 5, ease: "easeOut" }}
      />

      {/* Speed Lines for Warp feel */}
      <AnimatePresence>
        {isLaunching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`warp-${i}`}
                className="absolute bg-white/40 w-[1px] h-[30vh]"
                style={{ left: `${Math.random() * 100}%` }}
                animate={{ y: [-1000, 2000] }}
                transition={{
                  duration: 0.2 + Math.random() * 0.3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random()
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpaceBackground;