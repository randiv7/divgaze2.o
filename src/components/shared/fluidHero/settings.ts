export interface Settings {
  ringCount: number;
  ringSegments: number;
  particlesCount: number;
  pixelRatio: number;
  cameraZ: number;
  dragSpeed: number;
  bounceDamping: number;
  friction: number;
  initialVelocity: number;
  geometryRadius: number;
  geometryTube: number;
  lightIntensity: number;
  ambientIntensity: number;
  particleSize: number;
  particleOpacity: number;
  ringTransmission: number;
  ringThickness: number;
  ringEmissive: number;
  ringEmissiveIntensity: number;
  toneMappingExposure: number;
  antialias: boolean;
  orbitSpeed: number; // NEW: orbit speed per device
}

export const getResponsiveSettings = (width: number): Settings => {
  if (width < 768) {
    // Mobile
    return {
      ringCount: 8,
      ringSegments: 32,
      particlesCount: 1500,
      pixelRatio: Math.min(window.devicePixelRatio, 1.5),
      cameraZ: 55,
      dragSpeed: 0.8,
      bounceDamping: 0.6,
      friction: 0.985,
      initialVelocity: 0.006,
      geometryRadius: 1.8,
      geometryTube: 0.7,
      lightIntensity: 3,
      ambientIntensity: 1.0,
      particleSize: 0.08,
      particleOpacity: 0.7,
      ringTransmission: 0.85,
      ringThickness: 2.0,
      ringEmissive: 0x113355,
      ringEmissiveIntensity: 0.2,
      toneMappingExposure: 1.2,
      antialias: false,
      orbitSpeed: 0.003, // ~35 seconds per orbit
    };
  } else if (width < 1024) {
    // Tablet
    return {
      ringCount: 8,
      ringSegments: 48,
      particlesCount: 2000,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      cameraZ: 45,
      dragSpeed: 1.0,
      bounceDamping: 0.55,
      friction: 0.988,
      initialVelocity: 0.007,
      geometryRadius: 2.5,
      geometryTube: 0.9,
      lightIntensity: 2.5,
      ambientIntensity: 0.7,
      particleSize: 0.06,
      particleOpacity: 0.6,
      ringTransmission: 0.92,
      ringThickness: 1.7,
      ringEmissive: 0x000000,
      ringEmissiveIntensity: 0,
      toneMappingExposure: 1.1,
      antialias: true,
      orbitSpeed: 0.004, // ~26 seconds per orbit
    };
  } else {
    // Desktop
    return {
      ringCount: 8,
      ringSegments: 80,
      particlesCount: 4000,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      cameraZ: 35,
      dragSpeed: 1.2,
      bounceDamping: 0.5,
      friction: 0.990,
      initialVelocity: 0.008,
      geometryRadius: 3.2,
      geometryTube: 1.0,
      lightIntensity: 2,
      ambientIntensity: 0.5,
      particleSize: 0.05,
      particleOpacity: 0.5,
      ringTransmission: 0.98,
      ringThickness: 1.5,
      ringEmissive: 0x000000,
      ringEmissiveIntensity: 0,
      toneMappingExposure: 1.0,
      antialias: true,
      orbitSpeed: 0.005, // ~21 seconds per orbit
    };
  }
};