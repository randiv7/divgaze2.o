import * as THREE from 'three';

/**
 * Creates a frosted glass material for the "Divgaze" 3D text
 * Responsive based on screen width
 */
export const createGlassTextMaterial = (screenWidth: number) => {
  // Responsive material properties
  const isSmall = screenWidth < 768;
  const isMedium = screenWidth >= 768 && screenWidth < 1024;
  
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: isSmall ? 0.4 : isMedium ? 0.35 : 0.3,
    transmission: isSmall ? 0.7 : isMedium ? 0.8 : 0.9,
    thickness: isSmall ? 2.5 : isMedium ? 2.2 : 2,
    opacity: isSmall ? 0.9 : isMedium ? 0.85 : 0.8,
    transparent: true,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    ior: 1.5,
    attenuationColor: new THREE.Color(0xffffff),
    attenuationDistance: 3,
    emissive: isSmall ? new THREE.Color(0x224466) : new THREE.Color(0x000000),
    emissiveIntensity: isSmall ? 0.3 : 0,
    side: THREE.DoubleSide,
  });

  return material;
};

/**
 * Creates edge glow effect material (optional enhancement)
 */
export const createGlassTextWithGlow = (screenWidth: number) => {
  const isSmall = screenWidth < 768;
  const isMedium = screenWidth >= 768 && screenWidth < 1024;
  
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: isSmall ? 0.4 : isMedium ? 0.35 : 0.3,
    transmission: isSmall ? 0.65 : isMedium ? 0.75 : 0.85,
    thickness: isSmall ? 2.5 : isMedium ? 2.2 : 2,
    opacity: isSmall ? 0.85 : isMedium ? 0.8 : 0.75,
    transparent: true,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1,
    ior: 1.5,
    attenuationColor: new THREE.Color(0xccddff),
    attenuationDistance: 2.5,
    emissive: new THREE.Color(isSmall ? 0x335577 : isMedium ? 0x223344 : 0x112233),
    emissiveIntensity: isSmall ? 0.4 : isMedium ? 0.25 : 0.1,
    side: THREE.DoubleSide,
  });

  return material;
};