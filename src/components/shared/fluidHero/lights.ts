import * as THREE from 'three';
import { Settings } from './settings';

export const createLights = (scene: THREE.Scene, settings: Settings) => {
  const light1 = new THREE.PointLight(0x00ffff, settings.lightIntensity, 50);
  light1.position.set(10, 10, 10);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xff00ff, settings.lightIntensity, 50);
  light2.position.set(-10, -10, 10);
  scene.add(light2);

  const light3 = new THREE.PointLight(0x5500ff, settings.lightIntensity, 60);
  light3.position.set(0, 0, 20);
  scene.add(light3);

  const ambientLight = new THREE.AmbientLight(0x404040, settings.ambientIntensity);
  scene.add(ambientLight);

  return { light1, light2, light3, ambientLight };
};