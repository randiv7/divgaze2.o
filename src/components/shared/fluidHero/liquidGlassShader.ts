import * as THREE from 'three';

export const createLiquidGlassShader = (screenWidth: number) => {
  const isSmall = screenWidth < 768;
  const isMedium = screenWidth >= 768 && screenWidth < 1024;

  // Responsive shader settings
  const distortionStrength = isSmall ? 0.3 : isMedium ? 0.5 : 0.8;
  const chromaticAberration = isSmall ? 0.002 : isMedium ? 0.004 : 0.006;
  const fresnelPower = isSmall ? 2.0 : isMedium ? 3.0 : 4.0;
  const animationSpeed = isSmall ? 0.3 : isMedium ? 0.5 : 0.8;
  const rimIntensity = isSmall ? 0.5 : isMedium ? 0.7 : 1.0;
  const blurAmount = isSmall ? 5.0 : isMedium ? 8.0 : 12.0;

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    uniform float uTime;
    uniform float uWaveSpeed;
    uniform float uWaveAmplitude;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec3 transformed = position;
      
      // Wave distortion for liquid effect
      float wave1 = sin(position.x * 2.0 + uTime * uWaveSpeed) * uWaveAmplitude;
      float wave2 = cos(position.y * 2.0 + uTime * uWaveSpeed * 0.7) * uWaveAmplitude;
      transformed.z += wave1 + wave2;
      
      vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uDistortion;
    uniform float uChromaticAberration;
    uniform float uFresnelPower;
    uniform vec3 uRimColor1;
    uniform vec3 uRimColor2;
    uniform float uRimIntensity;
    uniform float uOpacity;
    uniform float uBlur;
    
    void main() {
      // Animated distortion for liquid glass
      vec2 distortedUv = vUv;
      distortedUv.x += sin(vUv.y * 10.0 + uTime * 0.5) * uDistortion * 0.01;
      distortedUv.y += cos(vUv.x * 10.0 + uTime * 0.3) * uDistortion * 0.01;
      
      // Chromatic aberration (RGB split for prism effect)
      float aberration = uChromaticAberration;
      vec2 direction = normalize(vUv - vec2(0.5));
      
      float r = texture2D(uTexture, distortedUv + direction * aberration).r;
      float g = texture2D(uTexture, distortedUv).g;
      float b = texture2D(uTexture, distortedUv - direction * aberration).b;
      
      vec4 texColor = vec4(r, g, b, texture2D(uTexture, distortedUv).a);
      
      // Fresnel effect for edge glow
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), uFresnelPower);
      
      // Animated rim color (cyan to magenta)
      float colorShift = sin(uTime * 0.5) * 0.5 + 0.5;
      vec3 rimColor = mix(uRimColor1, uRimColor2, colorShift);
      vec3 rim = rimColor * fresnel * uRimIntensity;
      
      // Combine effects
      vec3 finalColor = texColor.rgb + rim;
      float finalAlpha = texColor.a * uOpacity;
      
      // Add subtle blur simulation at edges
      float edgeFactor = smoothstep(0.0, 0.1, texColor.a) * smoothstep(1.0, 0.9, texColor.a);
      finalAlpha *= (1.0 - edgeFactor * 0.3);
      
      gl_FragColor = vec4(finalColor, finalAlpha);
    }
  `;

  const uniforms = {
    uTexture: { value: null },
    uTime: { value: 0 },
    uWaveSpeed: { value: animationSpeed },
    uWaveAmplitude: { value: 0.02 },
    uDistortion: { value: distortionStrength },
    uChromaticAberration: { value: chromaticAberration },
    uFresnelPower: { value: fresnelPower },
    uRimColor1: { value: new THREE.Color(0x00ffff) }, // Cyan
    uRimColor2: { value: new THREE.Color(0xff00ff) }, // Magenta
    uRimIntensity: { value: rimIntensity },
    uOpacity: { value: 0.85 },
    uBlur: { value: blurAmount },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    side: THREE.DoubleSide,
  });

  return material;
};