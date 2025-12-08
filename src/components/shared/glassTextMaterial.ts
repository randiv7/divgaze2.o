import * as THREE from 'three';

/**
 * Creates a frosted glass material for the "Divgaze" 3D text
 * Provides see-through effect with subtle frosting
 */
export const createGlassTextMaterial = (isMobile: boolean = false) => {
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: isMobile ? 0.4 : 0.3, // Slightly more frosted on mobile
    transmission: 0.9, // High transparency (see-through)
    thickness: 2,
    opacity: 0.8,
    transparent: true,
    clearcoat: 0.5, // Glossy surface layer
    clearcoatRoughness: 0.1,
    ior: 1.5, // Glass index of refraction
    attenuationColor: new THREE.Color(0xffffff),
    attenuationDistance: 3,
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
    transmission: 0.85,
    thickness: 2,
    opacity: 0.75,
    transparent: true,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1,
    ior: 1.5,
    attenuationColor: new THREE.Color(0xccddff), // Slight blue tint
    attenuationDistance: 2.5,
    emissive: new THREE.Color(0x112233), // Subtle glow
    emissiveIntensity: 0.1,
    side: THREE.DoubleSide,
  });

  return material;
};