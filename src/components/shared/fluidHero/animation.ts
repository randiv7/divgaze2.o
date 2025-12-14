import * as THREE from 'three';
import { Settings } from './settings';

export const createAnimationLoop = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  rings: THREE.Mesh[],
  particlesMesh: THREE.Points,
  light1: THREE.PointLight,
  light2: THREE.PointLight,
  light3: THREE.PointLight,
  bounds: { x: number; y: number; z: number },
  settings: Settings,
  COLLISION_RADIUS: number
) => {
  let animationId: number;
  const clock = new THREE.Clock();

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.05;

    light1.position.x = Math.sin(elapsedTime * 0.7) * 20;
    light1.position.y = Math.cos(elapsedTime * 0.5) * 20;
    light2.position.x = Math.cos(elapsedTime * 0.3) * 25;
    light2.position.y = Math.sin(elapsedTime * 0.5) * 25;

    // Define oval size based on screen width
    const ovalRadiusX = window.innerWidth < 768 ? 15 : window.innerWidth < 1024 ? 20 : 25;
    const ovalRadiusY = ovalRadiusX * 0.6;

    rings.forEach((ring, i) => {
      ring.rotation.x += ring.userData.rotationSpeed.x;
      ring.rotation.y += ring.userData.rotationSpeed.y;

      if (ring.userData.isOrbiting) {
        // ORBITAL MOTION - rings that were never touched
        ring.userData.orbitAngle += ring.userData.orbitSpeed;

        const targetX = Math.cos(ring.userData.orbitAngle) * ovalRadiusX;
        const targetY = Math.sin(ring.userData.orbitAngle) * ovalRadiusY;
        const targetZ = 0;

        // Smoothly move toward orbital position
        ring.position.x += (targetX - ring.position.x) * 0.05;
        ring.position.y += (targetY - ring.position.y) * 0.05;
        ring.position.z += (targetZ - ring.position.z) * 0.05;

      } else {
        // PHYSICS MODE - rings that were touched or hit
        
        if (!ring.userData.isDragging) {
          ring.position.add(ring.userData.velocity);

          // Boundary checks
          if (ring.position.x > bounds.x || ring.position.x < -bounds.x) {
            ring.userData.velocity.x *= -1;
            ring.position.x = Math.sign(ring.position.x) * bounds.x;
          }
          if (ring.position.y > bounds.y || ring.position.y < -bounds.y) {
            ring.userData.velocity.y *= -1;
            ring.position.y = Math.sign(ring.position.y) * bounds.y;
          }
          if (ring.position.z > bounds.z || ring.position.z < -bounds.z) {
            ring.userData.velocity.z *= -1;
            ring.position.z = Math.sign(ring.position.z) * bounds.z;
          }

          // Apply friction
          ring.userData.velocity.multiplyScalar(settings.friction);
        }
      }
    });

    // COLLISION DETECTION - Check ALL rings against each other
    const checkDistance = window.innerWidth < 768 ? 15 : 20;

    for (let i = 0; i < rings.length; i++) {
      const ring = rings[i];
      
      for (let j = i + 1; j < rings.length; j++) {
        const otherRing = rings[j];

        const quickDistance =
          Math.abs(ring.position.x - otherRing.position.x) +
          Math.abs(ring.position.y - otherRing.position.y) +
          Math.abs(ring.position.z - otherRing.position.z);

        if (quickDistance < checkDistance) {
          const distance = ring.position.distanceTo(otherRing.position);
          const minDistance = COLLISION_RADIUS * 2;

          if (distance < minDistance) {
            // Break both rings out of orbit on collision - STAY BROKEN FOREVER
            ring.userData.isOrbiting = false;
            otherRing.userData.isOrbiting = false;

            const normal = new THREE.Vector3()
              .subVectors(ring.position, otherRing.position)
              .normalize();
            const overlap = minDistance - distance;
            const separation = normal.clone().multiplyScalar(overlap / 2);

            ring.position.add(separation);
            otherRing.position.sub(separation);

            const relativeVelocity = new THREE.Vector3().subVectors(
              ring.userData.velocity,
              otherRing.userData.velocity
            );
            const impulse = relativeVelocity.dot(normal);

            if (impulse < 0) {
              const bounceImpulse = normal.multiplyScalar(
                impulse * settings.bounceDamping
              );
              ring.userData.velocity.sub(bounceImpulse);
              otherRing.userData.velocity.add(bounceImpulse);

              ring.userData.rotationSpeed.x += (Math.random() - 0.5) * 0.05;
              otherRing.userData.rotationSpeed.y += (Math.random() - 0.5) * 0.05;
            }
          }
        }
      }
    }

    renderer.render(scene, camera);
  };

  animate();

  return {
    stop: () => {
      cancelAnimationFrame(animationId);
    },
  };
}; 