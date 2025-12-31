import { useEffect, useState } from 'react';

interface AISolutionsLoadingProps {
  onComplete: () => void;
}

const AISolutionsLoading = ({ onComplete }: AISolutionsLoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const intervalTime = 20;
    const increment = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 800); // Allow time for exit fade
          }, 200);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* AI Solutions Text */}
        <div className="mb-12 overflow-hidden">
          <h1 className="text-xs sm:text-sm font-light tracking-[0.8em] sm:tracking-[1.2em] uppercase text-white/90 animate-pulse font-space-grotesk">
            AI SOLUTIONS
          </h1>
        </div>
        
        {/* Ultra-thin Progress Line */}
        <div className="w-32 sm:w-40 h-[1px] bg-white/10 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Minimalist Progress Percentage */}
        <div className="mt-8">
          <span className="text-[9px] tracking-[0.5em] text-white/20 uppercase font-light font-space-grotesk">
            {Math.round(progress).toString().padStart(3, '0')}
          </span>
        </div>
      </div>

      {/* Very subtle ambient glow in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};

export default AISolutionsLoading;