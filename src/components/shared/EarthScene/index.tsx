import React, { Suspense, useState, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Earth from './Earth';

const EarthScene: React.FC = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showWeather] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const sunPosition = useMemo(() => new THREE.Vector3(15, 5, 10), []);

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
        inset: 0,
        touchAction: screenSize === 'mobile' ? 'pan-y' : 'none'
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

        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          rotateSpeed={screenSize === 'mobile' ? 0.3 : 0.5}
          enableDamping={true}
          dampingFactor={0.05}
          onStart={() => {
            setIsHovered(true);
            setAutoRotate(false);
          }}
          onEnd={() => {
            setIsHovered(false);
            setTimeout(() => setAutoRotate(true), 2000);
          }}
        />
      </Suspense>
    </Canvas>
  );
};

export default EarthScene;