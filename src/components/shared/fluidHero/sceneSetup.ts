import * as THREE from 'three';
import { Settings } from './settings';

export const setupScene = (
  container: HTMLElement,
  screenWidth: number,
  settings: Settings
) => {
  // Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050510, screenWidth < 768 ? 0.002 : 0.0015);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = settings.cameraZ;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: settings.antialias,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(settings.pixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = settings.toneMappingExposure;
  container.appendChild(renderer.domElement);

  const COLLISION_RADIUS = settings.geometryRadius + settings.geometryTube;

  // Calculate Screen Boundaries
  const calculateBounds = () => {
    const vFOV = THREE.MathUtils.degToRad(camera.fov);
    const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
    const visibleWidth = visibleHeight * camera.aspect;

    return {
      x: visibleWidth / 2 - (COLLISION_RADIUS + 0.5),
      y: visibleHeight / 2 - (COLLISION_RADIUS + 0.5),
      z: 15,
    };
  };

  const bounds = calculateBounds();

  return { scene, camera, renderer, bounds, calculateBounds, COLLISION_RADIUS };
};