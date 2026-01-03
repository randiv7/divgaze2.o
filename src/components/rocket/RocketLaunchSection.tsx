import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Rocket from './Rocket';
import SpaceBackground from './SpaceBackground';
import FinalMessage from './FinalMessage';

enum LaunchState {
  IDLE,
  IGNITION,
  LAUNCHING,
  FINISHED
}

const RocketLaunchSection: React.FC = () => {
  const [state, setState] = useState<LaunchState>(LaunchState.IDLE);
  const [telemetry, setTelemetry] = useState({ velocity: 0, altitude: 0 });
  const [countdown, setCountdown] = useState<number>(3);

  useEffect(() => {
    let interval: number;
    if (state === LaunchState.LAUNCHING) {
      const startTime = Date.now();
      interval = window.setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const v = Math.pow(elapsed * 2.5, 2.5); 
        const a = Math.pow(elapsed * 4, 3.5);
        setTelemetry({ velocity: v, altitude: a });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    let interval: number;
    if (state === LaunchState.IGNITION) {
      setCountdown(3);
      interval = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state]);

  const handleLaunch = useCallback(() => {
    setState(LaunchState.IGNITION);
    setTimeout(() => {
      setState(LaunchState.LAUNCHING);
    }, 5000);
    setTimeout(() => {
      setState(LaunchState.FINISHED);
    }, 10000); // 5s ignition + ~4s flight + 1s after passing top
  }, []);

  const handleReset = useCallback(() => {
    setState(LaunchState.IDLE);
    setTelemetry({ velocity: 0, altitude: 0 });
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center select-none">
      <SpaceBackground isLaunching={state === LaunchState.LAUNCHING} />
      
      <AnimatePresence mode="sync">
        {state !== LaunchState.FINISHED ? (
          <motion.div 
            key="launch-view" 
            className="relative z-10 w-full h-full flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            
            {/* Main Stage: Rocket centered */}
            <div className="relative flex-1 w-full flex flex-col items-center justify-center">
              <motion.div
                animate={state === LaunchState.IGNITION ? {
                  x: [-1, 1, -1.5, 1.5, 0],
                } : {}}
                transition={{
                  repeat: Infinity,
                  duration: 0.1,
                  ease: "linear"
                }}
                className="relative"
              >
                <motion.div
                  initial={{ y: 0 }}
                  animate={state === LaunchState.LAUNCHING ? { 
                    y: "-150vh", 
                    opacity: [1, 1, 0],
                    scale: 0.7,
                  } : {
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{ 
                    duration: 8, 
                    ease: [0.7, 0, 0.3, 1],
                  }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Rocket isIgniting={state === LaunchState.IGNITION && countdown === 0} isLaunching={state === LaunchState.LAUNCHING} />
                </motion.div>
              </motion.div>

              {/* Countdown - Centered on screen */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                  {state === LaunchState.IGNITION && countdown > 0 && (
                    <motion.div 
                      key={countdown}
                      initial={{ opacity: 0, scale: 0.3, filter: 'blur(20px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 2, filter: 'blur(30px)' }}
                      transition={{ 
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="flex flex-col items-center"
                    >
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.05, 1],
                          textShadow: [
                            '0 0 40px rgba(255,255,255,0.3)',
                            '0 0 80px rgba(255,255,255,0.6)',
                            '0 0 40px rgba(255,255,255,0.3)'
                          ]
                        }}
                        transition={{ 
                          duration: 0.8,
                          ease: "easeInOut"
                        }}
                        className="text-white font-mono text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[20rem] 2xl:text-[24rem] font-bold leading-none"
                        style={{
                          textShadow: '0 0 60px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.2)'
                        }}
                      >
                        {countdown}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* UI: Launch button area */}
              <div className="absolute bottom-[12%] sm:bottom-[10%] md:bottom-[8%] lg:bottom-[6%] xl:bottom-[5%] w-full flex flex-col items-center px-4">
                <AnimatePresence>
                  {state === LaunchState.IDLE && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                      className="flex flex-col items-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05, letterSpacing: '0.6em', backgroundColor: '#fff', color: '#000' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLaunch}
                        className="px-8 py-4 sm:px-10 sm:py-4 md:px-12 md:py-5 lg:px-14 lg:py-5 xl:px-16 xl:py-6 border border-white/40 text-white font-mono text-base sm:text-lg md:text-lg lg:text-xl tracking-[0.3em] sm:tracking-[0.4em] uppercase transition-all duration-500 rounded-sm backdrop-blur-md bg-white/5 shadow-2xl"
                      >
                        Launch
                      </motion.button>
                      <div className="mt-4 sm:mt-6 opacity-20 font-mono text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.4em] sm:tracking-[0.5em] uppercase">
                        Unit-07 // Standby
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <FinalMessage key="final-message" onReplay={handleReset} />
        )}
      </AnimatePresence>

      {/* Decorative Frame - Hidden to remove white line */}
      {/* <div className="absolute inset-0 pointer-events-none border border-white/5 z-40 m-3 sm:m-6 md:m-8 lg:m-12 xl:m-16" /> */}
      
      {/* Telemetry Display */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 md:top-10 md:left-10 lg:top-12 lg:left-12 xl:top-16 xl:left-16 hidden md:flex flex-col gap-4 text-white/40 font-mono text-[10px] lg:text-[11px] xl:text-[12px] tracking-widest uppercase z-10">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${state === LaunchState.IDLE ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500 shadow-[0_0_12px_#f43f5e]'}`} />
          <span>Status: {LaunchState[state]}</span>
        </div>
        <div className="h-[1px] w-48 bg-white/10" />
        <div className="flex justify-between"><span>Velocity:</span> <span className="text-white">{telemetry.velocity.toFixed(2)} M/S</span></div>
        <div className="flex justify-between"><span>Altitude:</span> <span className="text-white">{telemetry.altitude.toFixed(3)} KM</span></div>
      </div>
    </main>
  );
};

export default RocketLaunchSection;