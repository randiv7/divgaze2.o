import React, { Suspense, useState, useMemo, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Earth from './Earth';

// WebGL support detection
const isWebGLSupported = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

// Fallback component when WebGL is not supported
const WebGLFallback: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black">
    <div className="text-center text-white/60 p-8">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
        <span className="text-4xl">🌍</span>
      </div>
      <p className="text-sm">3D view unavailable</p>
    </div>
  </div>
);

const EarthScene: React.FC = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showWeather] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [webGLSupported, setWebGLSupported] = useState(true);
  
  // Ref to store timeout for cleanup
  const autoRotateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sunPosition = useMemo(() => new THREE.Vector3(15, 5, 10), []);

  // Check WebGL support on mount
  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);

  // Detect screen size for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
    };
  }, []);

  // Handle orbit control events
  const handleOrbitStart = () => {
    // Clear any existing timeout
    if (autoRotateTimeoutRef.current) {
      clearTimeout(autoRotateTimeoutRef.current);
    }
    setIsHovered(true);
    setAutoRotate(false);
  };

  const handleOrbitEnd = () => {
    setIsHovered(false);
    // Set new timeout and store reference
    autoRotateTimeoutRef.current = setTimeout(() => {
      setAutoRotate(true);
    }, 2000);
  };

  // Responsive camera settings
  const cameraSettings = useMemo(() => {
    switch (screenSize) {
      case 'mobile':
        return { position: [0, 0, 6.5] as [number, number, number], fov: 45 };
      case 'tablet':
        return { position: [0, 0, 5.5] as [number, number, number], fov: 42 };
      default:
        return { position: [0, 0, 4.5] as [number, number, number], fov: 40 };
    }
  }, [screenSize]);

  // Responsive star count for performance
  const starCount = useMemo(() => {
    switch (screenSize) {
      case 'mobile':
        return 6000;
      case 'tablet':
        return 8000;
      default:
        return 12000;
    }
  }, [screenSize]);

  // Show fallback if WebGL not supported
  if (!webGLSupported) {
    return <WebGLFallback />;
  }

  return (
    <Canvas 
      shadows 
      gl={{ 
        antialias: screenSize === 'desktop',
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: screenSize === 'mobile' ? 'low-power' : 'high-performance',
      }}
      dpr={screenSize === 'mobile' ? [1, 1.5] : [1, 2]}
      style={{ 
        position: 'absolute', 
        inset: 0
      }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera 
          makeDefault 
          position={cameraSettings.position} 
          fov={cameraSettings.fov} 
        />
        
        <ambientLight intensity={0.05} />
        <directionalLight 
          position={sunPosition} 
          intensity={2.2} 
          color="#fff5e6" 
        />

        <Stars 
          radius={300} 
          depth={50} 
          count={starCount} 
          factor={screenSize === 'mobile' ? 5 : 7} 
          saturation={0} 
          fade 
          speed={0.5} 
        />

        <Earth 
          autoRotate={autoRotate && !isHovered} 
          sunPosition={sunPosition}
          showWeather={showWeather}
        />

        {screenSize !== 'mobile' && (
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            rotateSpeed={1.2}
            enableDamping={true}
            dampingFactor={0.05}
            onStart={handleOrbitStart}
            onEnd={handleOrbitEnd}
          />
        )}
      </Suspense>
    </Canvas>
  );
};

export default EarthScene;