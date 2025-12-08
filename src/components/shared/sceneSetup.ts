import * as THREE from 'three';

export interface DeviceSettings {
  ringSegments: number;
  particlesCount: number;
  pixelRatio: number;
  cameraZ: number;
  ringCount: number;
  dragSpeed: number;
  bounceDamping: number;
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
 * Detect device capabilities and return optimized settings
 */
export const getDeviceSettings = (): DeviceSettings => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  return {
    ringSegments: isMobile ? 32 : isTablet ? 64 : 100,
    particlesCount: isMobile ? 1000 : isTablet ? 3000 : 5000,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    cameraZ: isMobile ? 55 : isTablet ? 45 : 35,
    ringCount: isMobile ? 3 : isTablet ? 4 : 6,
    dragSpeed: 1.0,
    bounceDamping: 0.5,
  };
};

/**
 * Get geometry configuration based on device
 */
export const getGeometryConfig = (): GeometryConfig => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  return {
    radius: isMobile ? 2.0 : isTablet ? 2.8 : 3.5,
    tube: isMobile ? 0.8 : isTablet ? 1.0 : 1.2,
  };
};

/**
 * Initialize Three.js scene
 */
export const initScene = (settings: DeviceSettings) => {
  const scene = new THREE.Scene();
  const isMobile = window.innerWidth < 768;
  scene.fog = new THREE.FogExp2(0x050510, isMobile ? 0.002 : 0.0015);
  return scene;
};

/**
 * Initialize camera
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
 * Initialize renderer
 */
export const initRenderer = (container: HTMLDivElement, settings: DeviceSettings) => {
  const isMobile = window.innerWidth < 768;
  
  const renderer = new THREE.WebGLRenderer({
    antialias: !isMobile,
    alpha: true,
    powerPreference: 'high-performance'
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(settings.pixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  
  container.appendChild(renderer.domElement);
  
  return renderer;
};

/**
 * Calculate visible bounds
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
 * Setup lights for soap bubble effect
 */
export const setupLights = (scene: THREE.Scene) => {
  // Soft colored lights for iridescence
  const light1 = new THREE.PointLight(0x00ffff, 1.5, 50);
  light1.position.set(10, 10, 10);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xff00ff, 1.5, 50);
  light2.position.set(-10, -10, 10);
  scene.add(light2);

  const light3 = new THREE.PointLight(0xffaa00, 1.8, 60);
  light3.position.set(0, 0, 20);
  scene.add(light3);

  const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  return { light1, light2, light3, ambientLight, directionalLight };
};

/**
 * Create particle system
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
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
  });
  
  return new THREE.Points(geometry, material);
};