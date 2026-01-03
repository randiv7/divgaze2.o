import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RocketProps {
  isIgniting: boolean;
  isLaunching: boolean;
}

const Rocket: React.FC<RocketProps> = ({ isIgniting, isLaunching }) => {
  const panelRings = useMemo(() => Array.from({ length: 12 }), []);

  const verticalOffset = 50;
  const isActive = isIgniting || isLaunching;

  return (
    <div className="relative" style={{ transform: 'translateZ(0)' }}>
      {/* Ground Heat Glow during ignition - Scaled for mobile */}
      <AnimatePresence>
        {isIgniting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.4, 0.8, 0.6], scale: [1, 1.2, 1.1] }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 0.15 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[50px] sm:w-[300px] sm:h-[75px] md:w-[300px] md:h-[80px] lg:w-[350px] lg:h-[90px] xl:w-[380px] xl:h-[95px] 2xl:w-[400px] 2xl:h-[100px] bg-orange-600/20 blur-[40px] sm:blur-[60px] md:blur-[65px] lg:blur-[70px] xl:blur-[75px] 2xl:blur-[80px] rounded-full z-0"
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={isIgniting ? {
          x: [-0.5, 0.5, -0.5],
          y: [-0.2, 0.2, -0.2],
        } : isLaunching ? {
          x: [-0.2, 0.2, -0.2],
        } : {}}
        transition={{ repeat: Infinity, duration: 0.04, ease: "linear" }}
        style={{ willChange: 'transform' }}
      >
        {/* Responsive SVG - Scales across all devices */}
        <svg
          width="240"
          height="480"
          viewBox="0 0 200 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible w-[140px] h-[280px] sm:w-[180px] sm:h-[360px] md:w-[180px] md:h-[360px] lg:w-[200px] lg:h-[400px] xl:w-[220px] xl:h-[440px] 2xl:w-[240px] 2xl:h-[480px]"
        >
          <defs>
            {/* Volumetric hull gradient */}
            <linearGradient id="3dHullGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0a0a14" />
              <stop offset="12%" stopColor="#1e293b" />
              <stop offset="30%" stopColor="#64748b" />
              <stop offset="48%" stopColor="#f8fafc" />
              <stop offset="65%" stopColor="#94a3b8" />
              <stop offset="88%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Realistic Metal Fin Gradient */}
            <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="rimLightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="92%" stopColor="transparent" />
              <stop offset="97%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
            </linearGradient>

            {/* ENGINE NOZZLE REFINEMENT GRADIENTS */}
            <linearGradient id="nozzleMetalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0a0a14" />
            </linearGradient>

            <linearGradient id="nozzleGlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="30%" stopColor="#fb923c" />
              <stop offset="70%" stopColor="#fdba74" />
              <stop offset="100%" stopColor="#fff7ed" />
            </linearGradient>

            <radialGradient id="nozzleInnerGlow" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stopColor="white" />
              <stop offset="30%" stopColor="#ffedd5" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>

            {/* Thermal protection system pattern */}
            <pattern id="tpsTiles" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="7.5" height="7.5" fill="none" stroke="black" strokeWidth="0.1" opacity="0.2" />
            </pattern>

            <filter id="hullSpecular" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="nozzleHeat">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          <g transform={`translate(60, ${verticalOffset})`}>
            {/* Exhaust Plume */}
            <g transform="translate(40, 290)">
              <motion.path
                d="M-45 0 Q 0 480 45 0 Z"
                initial={false}
                animate={{
                  fill: isActive ? "rgba(251, 146, 60, 0.4)" : "rgba(51, 65, 85, 0.3)",
                  scaleY: isActive ? 1 : 0.15,
                  opacity: isActive ? 1 : 0.4
                }}
                transition={{ duration: 0.5 }}
                style={{ 
                  filter: isActive ? 'blur(15px)' : 'blur(2px)', 
                  mixBlendMode: isActive ? 'screen' : 'normal' 
                }}
              />
              <AnimatePresence>
                {isActive && (
                  <motion.path
                    key="fire-core"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: [0.7, 1, 0.7], scaleY: 1, scaleX: [1, 1.1, 1] }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    d="M-20 0 Q 0 380 20 0 Z"
                    fill="white"
                    transition={{ 
                      opacity: { repeat: Infinity, duration: 0.1, ease: "linear" },
                      scaleY: { duration: 0.4, ease: "easeOut" }
                    }}
                    style={{ filter: 'blur(5px)', mixBlendMode: 'plus-lighter' }}
                  />
                )}
              </AnimatePresence>
            </g>

            {/* Main Assembly */}
            <g transform="translate(0, 0)">
              {/* Fins */}
              <g>
                <g>
                  <path d="M10 185L-45 280V300L10 270V185Z" fill="url(#finGradient)" />
                  <path d="M10 185L-45 280L-43 282L10 190V185Z" fill="rgba(255,255,255,0.15)" />
                </g>
                <g>
                  <path d="M70 185L125 280V300L70 270V185Z" fill="url(#finGradient)" />
                  <path d="M70 185L125 280L123 282L70 190V185Z" fill="rgba(255,255,255,0.1)" />
                </g>
              </g>

              {/* Rocket Hull */}
              <g>
                <path
                  d="M40 0C10 40 10 220 10 260H70C70 220 70 40 40 0Z"
                  fill="url(#3dHullGradient)"
                />
                <path
                  d="M40 0C10 40 10 120 10 140H70C70 120 70 40 40 0Z"
                  fill="url(#tpsTiles)"
                  opacity="0.15"
                  style={{ mixBlendMode: 'overlay' }}
                />
                <path
                  d="M40 0C10 40 10 220 10 260H70C70 220 70 40 40 0Z"
                  fill="url(#rimLightGradient)"
                  style={{ mixBlendMode: 'overlay' }}
                />
                <path 
                  d="M40 1C38 20 38 100 38 260H42C42 100 42 20 40 1Z" 
                  fill="white" 
                  opacity="0.12"
                  filter="url(#hullSpecular)"
                />
              </g>

              {/* Panel Lines */}
              <g opacity="0.4">
                {panelRings.map((_, i) => (
                    <React.Fragment key={i}>
                        <line x1={10 + (i < 3 ? (3 - i) * 3 : 0)} y1={40 + (i * 20)} x2={70 - (i < 3 ? (3 - i) * 3 : 0)} y2={40 + (i * 20)} stroke="black" strokeWidth="1" />
                    </React.Fragment>
                ))}
              </g>

              {/* Integrated Porthole */}
              <g transform="translate(40, 115)">
                <circle r="14" fill="#0f172a" />
                <circle r="12" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <circle r="10" fill="#020617" />
                <path d="M-6 -6 Q 0 -8 6 -6" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
                <motion.circle 
                  r="9" 
                  fill="#38bdf8" 
                  animate={isActive ? { opacity: [0.1, 0.4, 0.1], scale: [1, 1.05, 1] } : { opacity: 0.1 }}
                  transition={{ repeat: Infinity, duration: 0.2 }}
                  style={{ filter: 'blur(3px)' }}
                />
              </g>

              {/* HIGH FIDELITY ENGINE NOZZLE BELL */}
              <g transform="translate(20, 260)">
                {/* Mounting Interface */}
                <rect width="40" height="10" rx="1" fill="#0f172a" stroke="#000" strokeWidth="1" />
                
                {/* Nozzle Bell Parabolic Path */}
                <g>
                  {/* The Main Bell Volume */}
                  <path 
                    d="M4 10 C 4 25, -12 35, -12 48 H 52 C 52 35, 36 25, 36 10 Z" 
                    fill={isActive ? "url(#nozzleGlowGradient)" : "url(#nozzleMetalGradient)"} 
                  />
                  
                  {/* Internal Throat Glow (Hot Zone) */}
                  {isActive && (
                    <path 
                      d="M10 10 C 10 22, 30 22, 30 10" 
                      fill="url(#nozzleInnerGlow)" 
                      opacity="0.9"
                      filter="url(#nozzleHeat)"
                    />
                  )}

                  {/* Vertical Ribbing (Cooling Channels) */}
                  <g opacity="0.4" style={{ mixBlendMode: 'multiply' }}>
                    {[...Array(9)].map((_, i) => {
                      const xStart = 8 + (i * 3);
                      const xEnd = -4 + (i * 6);
                      return (
                        <path 
                          key={i} 
                          d={`M${xStart} 10 C ${xStart} 25, ${xEnd} 35, ${xEnd} 48`} 
                          stroke="black" 
                          strokeWidth="0.8" 
                          fill="none" 
                        />
                      );
                    })}
                  </g>

                  {/* Highlight on ribbing for 3D effect */}
                  <g opacity="0.1" style={{ mixBlendMode: 'screen' }}>
                    {[...Array(5)].map((_, i) => {
                      const xStart = 16 + (i * 2);
                      const xEnd = 16 + (i * 4);
                      return (
                        <path 
                          key={i} 
                          d={`M${xStart} 10 C ${xStart} 25, ${xEnd} 35, ${xEnd} 48`} 
                          stroke="white" 
                          strokeWidth="0.5" 
                          fill="none" 
                        />
                      );
                    })}
                  </g>

                  {/* Bottom Rim Reinforcement */}
                  <path 
                    d="M-12.5 48 H 52.5" 
                    stroke="#1e293b" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d="M-12 47.5 H 52" 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="1" 
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

export default Rocket;