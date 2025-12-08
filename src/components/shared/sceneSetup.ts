import * as THREE from 'three';

export interface DeviceSettings {
  ringSegments: number;
  particlesCount: number;
  pixelRatio: number;
  cameraZ: number;
  ringCount: number;
  dragSpeed: number;
  bounceDamping: number;
  friction: number;
  initialVelocity: number;
}

export interface GeometryConfig {
  radius: number;
  tube: number;
}

export interface Bounds {
  x: number;
  y: number;
  z: number;
}

/**
 * OPTIMIZED: Detect device capabilities and return optimized settings
 * Mobile: 2 rings, 24 segments, 800 particles
 * Tablet: 4 rings, 48 segments, 2000 particles  
 * Desktop: 8 rings, 80 segments, 4000 particles
 */
export const getDeviceSettings = (): DeviceSettings => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  return {
    // OPTIMIZED ring count
    ringCount: isMobile ? 2 : isTablet ? 4 : 8,
    // OPTIMIZED segments for performance
    ringSegments: isMobile ? 24 : isTablet ? 48 : 80,
    // OPTIMIZED particle count
    particlesCount: isMobile ? 800 : isTablet ? 2000 : 4000,
    // OPTIMIZED pixel ratio (mobile capped at 1.5)
    pixelRatio: isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2),
    cameraZ: isMobile ? 55 : isTablet ? 45 : 35,
    // OPTIMIZED physics parameters
    dragSpeed: isMobile ? 0.8 : isTablet ? 1.0 : 1.2,
    bounceDamping: isMobile ? 0.6 : isTablet ? 0.55 : 0.5,
    friction: isMobile ? 0.985 : isTablet ? 0.988 : 0.990,
    initialVelocity: isMobile ? 0.006 : isTablet ? 0.007 : 0.008,
  };
};

/**
 * OPTIMIZED: Get geometry configuration based on device
 * Smaller rings for mobile performance and to fit 8 rings on desktop
 */
export const getGeometryConfig = (): GeometryConfig => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  return {
    // 20% smaller on mobile, slightly smaller on desktop for 8 rings
    radius: isMobile ? 1.8 : isTablet ? 2.5 : 3.2,
    tube: isMobile ? 0.7 : isTablet ? 0.9 : 1.0,
  };
};

/**
 * Initialize Three.js scene with optimized fog
 */
export const initScene = (settings: DeviceSettings) => {
  const scene = new THREE.Scene();
  const isMobile = window.innerWidth < 768;
  scene.fog = new THREE.FogExp2(0x050510, isMobile ? 0.002 : 0.0015);
  return scene;
};

/**
 * Initialize camera with device-specific positioning
 */
export const initCamera = (settings: DeviceSettings) => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = settings.cameraZ;
  return camera;
};

/**
 * OPTIMIZED: Initialize renderer with performance settings
 * Mobile: No antialiasing, capped pixel ratio
 */
export const initRenderer = (container: HTMLDivElement, settings: DeviceSettings) => {
  const isMobile = window.innerWidth < 768;
  
  const renderer = new THREE.WebGLRenderer({
    antialias: !isMobile, // Disabled on mobile for performance
    alpha: true,
    powerPreference: 'high-performance'
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(settings.pixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  
  container.appendChild(renderer.domElement);
  
  return renderer;
};

/**
 * Calculate visible bounds for ring containment
 */
export const calculateBounds = (
  camera: THREE.PerspectiveCamera,
  cameraZ: number,
  collisionRadius: number
): Bounds => {
  const vFOV = THREE.MathUtils.degToRad(camera.fov);
  const visibleHeight = 2 * Math.tan(vFOV / 2) * cameraZ;
  const visibleWidth = visibleHeight * camera.aspect;

  return {
    x: visibleWidth / 2 - (collisionRadius + 0.5),
    y: visibleHeight / 2 - (collisionRadius + 0.5),
    z: 15
  };
};

/**
 * Setup lights for soap bubble effect (Original Colors Preserved)
 */
export const setupLights = (scene: THREE.Scene) => {
  // Soft colored lights for iridescence
  const light1 = new THREE.PointLight(0x00ffff, 2, 50);
  light1.position.set(10, 10, 10);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xff00ff, 2, 50);
  light2.position.set(-10, -10, 10);
  scene.add(light2);

  const light3 = new THREE.PointLight(0x5500ff, 2, 60);
  light3.position.set(0, 0, 20);
  scene.add(light3);

  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  return { light1, light2, light3, ambientLight };
};

/**
 * OPTIMIZED: Create particle system with device-specific count
 */
export const createParticles = (particlesCount: number) => {
  const isMobile = window.innerWidth < 768;
  
  const geometry = new THREE.BufferGeometry();
  const posArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * (isMobile ? 120 : 180);
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
  });
  
  return new THREE.Points(geometry, material);
};

/**
 * OPTIMIZED: Calculate initial ring position for better distribution
 * For 8 rings on desktop, creates a more balanced circular pattern
 */
export const getInitialRingPosition = (
  index: number, 
  total: number, 
  bounds: Bounds
): { x: number; y: number; z: number } => {
  // Create circular distribution pattern
  const angle = (index / total) * Math.PI * 2;
  const radius = bounds.x * 0.6;
  
  return {
    x: Math.cos(angle) * radius * (0.5 + Math.random() * 0.5),
    y: Math.sin(angle) * radius * (0.5 + Math.random() * 0.5),
    z: (Math.random() - 0.5) * 10
  };
};