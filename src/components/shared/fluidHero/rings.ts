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

  for (let i = 0; i < settings.ringCount; i++) {
    const ring = new THREE.Mesh(ringGeometry, material);

    // Start rings in orbital positions
    const orbitAngle = (i / settings.ringCount) * Math.PI * 2;
    const ovalRadiusX = window.innerWidth < 768 ? 15 : window.innerWidth < 1024 ? 20 : 25;
    const ovalRadiusY = ovalRadiusX * 0.6;

    ring.position.set(
      Math.cos(orbitAngle) * ovalRadiusX,
      Math.sin(orbitAngle) * ovalRadiusY,
      0
    );

    ring.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    ring.userData = {
      velocity: new THREE.Vector3(0, 0, 0),
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        0
      ),
      isDragging: false,
      orbitAngle: orbitAngle,
      orbitSpeed: settings.orbitSpeed, // Use settings orbit speed
      isOrbiting: true, // Start in orbit mode
    };

    scene.add(ring);
    rings.push(ring);
  }

  return { rings, ringGeometry, material };
};