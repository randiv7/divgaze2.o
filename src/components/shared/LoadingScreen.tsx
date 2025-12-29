import { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export const LoadingScreen = ({ 
  onComplete, 
  duration = 2500 // Shorter for better UX
}: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (time: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = time;
      }
      
      const elapsed = time - startTimeRef.current;
      const progressValue = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(progressValue);

      if (elapsed < duration) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        if (onComplete) onComplete();
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [duration, onComplete]);

  const displayProgress = Math.floor(progress).toString().padStart(3, '0');

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      {/* Center Progress Bar */}
      <div className="w-64 h-8 bg-gray-800/50 overflow-hidden">
        <div 
          className="h-full bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bottom Left Counter */}
      <div className="absolute bottom-0 left-0 leading-none">
        <h1 className="text-[12vw] sm:text-[180px] font-inter font-normal tracking-tighter text-white tabular-nums p-4 sm:pl-8 sm:pb-4 select-none">
          {displayProgress}
        </h1>
      </div>
    </div>
  );
};