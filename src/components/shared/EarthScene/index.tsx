import React, { Suspense, useState, useMemo, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Earth from './Earth';

const ResponsiveCamera: React.FC = () => {
  const { camera, size } = useThree();
  
  useEffect(() => {
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;
    
    if (isMobile) {
      camera.position.z = 6.5;
    } else if (isTablet) {
      camera.position.z = 5.5;
    } else {
      camera.position.z = 4.5;
    }
    camera.updateProjectionMatrix();
  }, [camera, size]);
  
  return null;
};

const EarthScene: React.FC = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showWeather] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sunPosition = useMemo(() => new THREE.Vector3(15, 5, 10), []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Canvas 
      shadows 
      gl={{ 
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace
      }}
      style={{ 
        position: 'absolute', 
        inset: 0,
        touchAction: 'pan-y'
      }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={40} />
        <ResponsiveCamera />
        
        <ambientLight intensity={0.05} />
        <directionalLight 
          position={sunPosition} 
          intensity={2.2} 
          color="#fff5e6" 
        />

        <Stars 
          radius={300} 
          depth={50} 
          count={12000} 
          factor={7} 
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
          rotateSpeed={isMobile ? 0.3 : 0.5}
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