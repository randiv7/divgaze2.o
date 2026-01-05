import React, { Suspense, useState, useMemo, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Earth from './Earth';

// Component to handle earth-only drag detection
const JsonyControls: React.FC<{
  onHoverStart: () => void;
  onHoverEnd: () => void;
  rotateSpeed: number;
}> = ({ onHoverStart, onHoverEnd, rotateSpeed }) => {
  const controlsRef = useRef<any>(null);
  const { camera, gl, scene } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const isDraggingEarth = useRef(false);

  useEffect(() => {
    const canvas = gl.domElement;

    const getPointerPosition = (e: TouchEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const isOnEarth = (e: TouchEvent | MouseEvent) => {
      getPointerPosition(e);
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      return intersects.some(i => {
        const mesh = i.object as THREE.Mesh;
        return mesh.isMesh && mesh.geometry?.type === 'SphereGeometry';
      });
    };

    const handleTouchStart = (e: TouchEvent) => {
      const onEarth = isOnEarth(e);
      isDraggingEarth.current = onEarth;
      if (controlsRef.current) {
        controlsRef.current.enabled = onEarth;
      }
      if (onEarth) {
        onHoverStart();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingEarth.current) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      isDraggingEarth.current = false;
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }
      onHoverEnd();
    };

    const handleMouseDown = (e: MouseEvent) => {
      const onEarth = isOnEarth(e);
      isDraggingEarth.current = onEarth;
      if (controlsRef.current) {
        controlsRef.current.enabled = onEarth;
      }
      if (onEarth) {
        onHoverStart();
      }
    };

    const handleMouseUp = () => {
      isDraggingEarth.current = false;
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }
      onHoverEnd();
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [camera, gl, scene, raycaster, pointer, onHoverStart, onHoverEnd]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={false}
      enableRotate={true}
      rotateSpeed={rotateSpeed}
      enableDamping={true}
      dampingFactor={0.05}
      enabled={false}
    />
  );
};

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

        <JsonyControls
          onHoverStart={() => {
            setIsHovered(true);
            setAutoRotate(false);
          }}
          onHoverEnd={() => {
            setIsHovered(false);
            setTimeout(() => setAutoRotate(true), 2000);
          }}
          rotateSpeed={screenSize === 'mobile' ? 0.3 : 0.5}
        />
      </Suspense>
    </Canvas>
  );
};

export default EarthScene;