import * as THREE from 'three';

/**
 * Creates a frosted glass material for the "Divgaze" 3D text
 * FIXED: Mobile-optimized visibility
 */
export const createGlassTextMaterial = (isMobile: boolean = false) => {
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: isMobile ? 0.4 : 0.3,
    // FIXED: Less transparent on mobile for better visibility
    transmission: isMobile ? 0.7 : 0.9,
    thickness: isMobile ? 2.5 : 2,
    opacity: isMobile ? 0.9 : 0.8,
    transparent: true,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    ior: 1.5,
    attenuationColor: new THREE.Color(0xffffff),
    attenuationDistance: 3,
    // FIXED: Add emissive glow on mobile
    emissive: isMobile ? new THREE.Color(0x224466) : new THREE.Color(0x000000),
    emissiveIntensity: isMobile ? 0.3 : 0,
    side: THREE.DoubleSide,
  });

  return material;
};

/**
 * Creates edge glow effect material (optional enhancement)
 */
export const createGlassTextWithGlow = (isMobile: boolean = false) => {
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: isMobile ? 0.4 : 0.3,
    transmission: isMobile ? 0.65 : 0.85,
    thickness: isMobile ? 2.5 : 2,
    opacity: isMobile ? 0.85 : 0.75,
    transparent: true,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1,
    ior: 1.5,
    attenuationColor: new THREE.Color(0xccddff),
    attenuationDistance: 2.5,
    emissive: new THREE.Color(isMobile ? 0x335577 : 0x112233),
    emissiveIntensity: isMobile ? 0.4 : 0.1,
    side: THREE.DoubleSide,
  });

  return material;
};