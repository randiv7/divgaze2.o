import * as THREE from 'three';

/**
 * ENHANCED: Creates a glass/soap bubble material with better iridescence
 * Using MeshPhysicalMaterial for realistic glass effect
 * Compatible with Three.js r128
 */
export const createSoapBubbleMaterial = (isMobile: boolean = false) => {
  // Use MeshPhysicalMaterial for realistic glass effect
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xaaccff,
    metalness: 0,
    roughness: 0.01,
    transmission: 0.98, // High transmission for glass
    thickness: 1.5,
    clearcoat: 1.0, // Adds glossy layer
    clearcoatRoughness: 0.01,
    emissive: 0x000000,
    ior: 1.52, // Index of refraction for glass
    attenuationColor: new THREE.Color(0xffffff),
    attenuationDistance: Infinity,
    side: THREE.DoubleSide, // Render both sides for soap bubble effect
  });

  return material;
};

/**
 * ENHANCED: Creates a custom shader material for advanced iridescence
 * Use this for more dramatic rainbow effects
 */
export const createCustomIridescenceMaterial = (isMobile: boolean = false) => {
  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float time;
    uniform vec3 lightPosition;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    
    // HSV to RGB conversion for rainbow colors
    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }
    
    void main() {
      // Calculate view direction
      vec3 viewDir = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);
      
      // Enhanced Fresnel effect for edge glow
      float fresnel = pow(1.0 - abs(dot(viewDir, normal)), 3.0);
      
      // Iridescence based on angle and position
      float iridescence = dot(normal, viewDir);
      iridescence = abs(iridescence);
      
      // Add animated variation based on world position
      float pattern = sin(vWorldPosition.x * 2.0 + time * 0.5) * 
                     cos(vWorldPosition.y * 2.0 + time * 0.3) * 0.5 + 0.5;
      
      // Create rainbow hue based on viewing angle
      float hue = iridescence * 0.8 + pattern * 0.2 + time * 0.05;
      hue = fract(hue); // Keep in 0-1 range
      
      // Convert to RGB (rainbow colors)
      vec3 rainbowColor = hsv2rgb(vec3(hue, 0.8, 1.0));
      
      // Mix with fresnel for soap bubble effect
      vec3 finalColor = mix(vec3(1.0), rainbowColor, fresnel * 0.6);
      
      // Add transparency with fresnel
      float alpha = 0.3 + fresnel * 0.4;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: { value: 0 },
      lightPosition: { value: new THREE.Vector3(10, 10, 10) }
    },
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return material;
};

/**
 * Update shader uniforms for animation (if using custom shader)
 */
export const updateSoapBubbleMaterial = (
  material: THREE.ShaderMaterial, 
  time: number,
  lightPos?: THREE.Vector3
) => {
  if (material.uniforms) {
    material.uniforms.time.value = time;
    if (lightPos && material.uniforms.lightPosition) {
      material.uniforms.lightPosition.value.copy(lightPos);
    }
  }
};

/**
 * ENHANCED: Create material based on device capability
 * Uses simpler material on mobile for performance
 */
export const createOptimizedMaterial = (isMobile: boolean = false) => {
  if (isMobile) {
    // Simpler material for mobile performance
    return new THREE.MeshPhysicalMaterial({
      color: 0xaaccff,
      metalness: 0,
      roughness: 0.05,
      transmission: 0.95,
      thickness: 1.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.02,
      ior: 1.5,
      side: THREE.DoubleSide,
    });
  } else {
    // Full quality for desktop/tablet
    return createSoapBubbleMaterial(false);
  }
};