import React, { Suspense, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Earth from './Earth';

const EarthScene: React.FC = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showWeather] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sunPosition = useMemo(() => new THREE.Vector3(15, 5, 10), []);

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
        inset: 0
      }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={40} />
        
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
          rotateSpeed={0.5}
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