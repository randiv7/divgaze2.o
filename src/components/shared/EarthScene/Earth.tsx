import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EarthProps {
  autoRotate: boolean;
  sunPosition: THREE.Vector3;
  showWeather: boolean;
}

const Earth: React.FC<EarthProps> = ({ autoRotate, sunPosition, showWeather }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const weatherRef = useRef<THREE.Mesh>(null);

  const [textures, setTextures] = useState<{
    dayMap: THREE.Texture | null;
    nightMap: THREE.Texture | null;
    normalMap: THREE.Texture | null;
    specularMap: THREE.Texture | null;
    cloudsMap: THREE.Texture | null;
  }>({
    dayMap: null,
    nightMap: null,
    normalMap: null,
    specularMap: null,
    cloudsMap: null,
  });

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const textureUrls = {
      dayMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
      nightMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png',
      normalMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
      specularMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
      cloudsMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
    };

    Promise.all([
      loader.loadAsync(textureUrls.dayMap),
      loader.loadAsync(textureUrls.nightMap),
      loader.loadAsync(textureUrls.normalMap),
      loader.loadAsync(textureUrls.specularMap),
      loader.loadAsync(textureUrls.cloudsMap),
    ]).then(([dayMap, nightMap, normalMap, specularMap, cloudsMap]) => {
      setTextures({ dayMap, nightMap, normalMap, specularMap, cloudsMap });
    });
  }, []);

  const earthShaderMaterial = useMemo(() => {
    if (!textures.dayMap || !textures.nightMap || !textures.normalMap || !textures.specularMap) {
      return null;
    }
    return new THREE.ShaderMaterial({
      uniforms: {
        sunDirection: { value: sunPosition.clone().normalize() },
        dayTexture: { value: textures.dayMap },
        nightTexture: { value: textures.nightMap },
        normalTexture: { value: textures.normalMap },
        specularTexture: { value: textures.specularMap },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;
        void main() {
          vUv = uv;
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          vNormal = normalize(normalMatrix * normal);
          vViewPosition = - (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 sunDirection;
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform sampler2D normalTexture;
        uniform sampler2D specularTexture;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 sunDir = normalize(sunDirection);
          float dotNormalSun = dot(normal, sunDir);
          float dayWeight = smoothstep(-0.15, 0.15, dotNormalSun);
          vec3 dayColor = texture2D(dayTexture, vUv).rgb;
          vec3 nightColor = texture2D(nightTexture, vUv).rgb;
          float specMask = texture2D(specularTexture, vUv).r;
          vec3 color = mix(nightColor * 2.5, dayColor, dayWeight);
          vec3 viewDir = normalize(vViewPosition);
          vec3 reflectionDir = reflect(-sunDir, normal);
          float specAmount = pow(max(dot(reflectionDir, viewDir), 0.0), 32.0);
          vec3 specular = vec3(0.5) * specAmount * specMask * dayWeight;
          gl_FragColor = vec4(color + specular, 1.0);
        }
      `
    });
  }, [textures, sunPosition]);

  const weatherShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float opacity;
        varying vec2 vUv;
        varying vec3 vPosition;

        float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(13.0 * p.y + p.x)))); }
        float noise(vec2 x) {
          vec2 i = floor(x);
          vec2 f = fract(x);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main() {
          float lat = abs(vPosition.y);
          float temp = 1.0 - smoothstep(0.0, 1.0, lat);
          
          float n = noise(vUv * 10.0 + time * 0.1);
          float n2 = noise(vUv * 20.0 - time * 0.05);
          float pattern = n * 0.6 + n2 * 0.4;
          
          vec3 hot = vec3(1.0, 0.3, 0.1);
          vec3 mid = vec3(0.2, 0.8, 0.3);
          vec3 cold = vec3(0.1, 0.4, 1.0);
          
          float combined = mix(temp, pattern, 0.3);
          vec3 weatherColor = mix(cold, mid, smoothstep(0.2, 0.5, combined));
          weatherColor = mix(weatherColor, hot, smoothstep(0.6, 0.9, combined));
          
          float storm = smoothstep(0.7, 0.8, n * n2);
          weatherColor += storm * vec3(1.0, 1.0, 1.5);

          gl_FragColor = vec4(weatherColor, opacity * (0.4 + pattern * 0.3));
        }
      `
    });
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (earthRef.current && earthShaderMaterial) {
      if (autoRotate) {
        earthRef.current.rotation.y += delta * 0.05;
        if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.07;
        if (weatherRef.current) weatherRef.current.rotation.y += delta * 0.05;
      }
      
      const sunDir = sunPosition.clone().normalize();
      earthShaderMaterial.uniforms.sunDirection.value.copy(sunDir);
    }

    if (weatherRef.current) {
      const mat = weatherRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.time.value = t;
      const targetOpacity = showWeather ? 1.0 : 0.0;
      mat.uniforms.opacity.value = THREE.MathUtils.lerp(mat.uniforms.opacity.value, targetOpacity, 0.1);
    }
  });

  if (!earthShaderMaterial || !textures.cloudsMap) {
    return null;
  }

  return (
    <group rotation={[0, 0, THREE.MathUtils.degToRad(23.44)]}>
      <mesh ref={earthRef} material={earthShaderMaterial}>
        <sphereGeometry args={[1, 128, 128]} />
      </mesh>

      <mesh ref={weatherRef} material={weatherShaderMaterial}>
        <sphereGeometry args={[1.008, 128, 128]} />
      </mesh>

      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.015, 128, 128]} />
        <meshPhongMaterial
          map={textures.cloudsMap}
          transparent={true}
          opacity={0.35}
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.04, 128, 128]} />
        <shaderMaterial
          transparent={true}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
              gl_FragColor = vec4(0.3, 0.6, 1.0, 0.8) * intensity;
            }
          `}
        />
      </mesh>
    </group>
  );
};

export default Earth;