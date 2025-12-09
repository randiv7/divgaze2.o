import * as THREE from 'three';
import { Settings } from './settings';

export const createRings = (
  scene: THREE.Scene,
  settings: Settings,
  bounds: { x: number; y: number; z: number }
) => {
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xaaccff,
    metalness: 0,
    roughness: 0.01,
    transmission: settings.ringTransmission,
    thickness: settings.ringThickness,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
    emissive: settings.ringEmissive,
    emissiveIntensity: settings.ringEmissiveIntensity,
    ior: 1.52,
    attenuationColor: new THREE.Color(0xffffff),
    attenuationDistance: Infinity,
  });

  const rings: THREE.Mesh[] = [];
  const ringGeometry = new THREE.TorusGeometry(
    settings.geometryRadius,
    settings.geometryTube,
    32,
    settings.ringSegments
  );

  const getInitialPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = bounds.x * 0.6;

    return {
      x: Math.cos(angle) * radius * (0.5 + Math.random() * 0.5),
      y: Math.sin(angle) * radius * (0.5 + Math.random() * 0.5),
      z: (Math.random() - 0.5) * 10,
    };
  };

  for (let i = 0; i < settings.ringCount; i++) {
    const ring = new THREE.Mesh(ringGeometry, material);

    const pos = getInitialPosition(i, settings.ringCount);
    ring.position.set(pos.x, pos.y, pos.z);

    ring.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    ring.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * settings.initialVelocity,
        (Math.random() - 0.5) * settings.initialVelocity,
        (Math.random() - 0.5) * settings.initialVelocity
      ),
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        0
      ),
      isDragging: false,
    };

    scene.add(ring);
    rings.push(ring);
  }

  return { rings, ringGeometry, material };
};