import * as THREE from 'three';
import { Settings } from './settings';

export const createParticles = (
  scene: THREE.Scene,
  settings: Settings,
  screenWidth: number
) => {
  const particlesGeometry = new THREE.BufferGeometry();
  const posArray = new Float32Array(settings.particlesCount * 3);
  
  for (let i = 0; i < settings.particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * (screenWidth < 768 ? 120 : 180);
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: settings.particleSize,
    color: 0xffffff,
    transparent: true,
    opacity: settings.particleOpacity,
    blending: THREE.AdditiveBlending,
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  return { particlesMesh, particlesGeometry, particlesMaterial };
};