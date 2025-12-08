import * as THREE from 'three';
import { Bounds } from './sceneSetup';

export interface RingUserData {
  velocity: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
  isDragging: boolean;
}

/**
 * Create a ring with soap bubble material and physics
 */
export const createRing = (
  geometry: THREE.TorusGeometry,
  material: THREE.Material,
  bounds: Bounds
): THREE.Mesh => {
  const ring = new THREE.Mesh(geometry, material);

  ring.position.set(
    (Math.random() - 0.5) * (bounds.x * 1.5),
    (Math.random() - 0.5) * (bounds.y * 1.5),
    (Math.random() - 0.5) * 10
  );

  ring.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    0
  );

  ring.userData = {
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 0.008,
      (Math.random() - 0.5) * 0.008,
      (Math.random() - 0.5) * 0.008
    ),
    rotationSpeed: new THREE.Vector3(
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01,
      0
    ),
    isDragging: false
  } as RingUserData;

  return ring;
};

/**
 * Update ring physics
 */
export const updateRingPhysics = (
  ring: THREE.Mesh,
  bounds: Bounds,
  bounceDamping: number
) => {
  const userData = ring.userData as RingUserData;

  if (!userData.isDragging) {
    // Apply velocity
    ring.position.add(userData.velocity);

    // Boundary collision
    if (ring.position.x > bounds.x || ring.position.x < -bounds.x) {
      userData.velocity.x *= -1;
      ring.position.x = Math.sign(ring.position.x) * bounds.x;
    }
    if (ring.position.y > bounds.y || ring.position.y < -bounds.y) {
      userData.velocity.y *= -1;
      ring.position.y = Math.sign(ring.position.y) * bounds.y;
    }
    if (ring.position.z > bounds.z || ring.position.z < -bounds.z) {
      userData.velocity.z *= -1;
      ring.position.z = Math.sign(ring.position.z) * bounds.z;
    }

    // Apply friction
    userData.velocity.multiplyScalar(0.990);
  }

  // Apply rotation
  ring.rotation.x += userData.rotationSpeed.x;
  ring.rotation.y += userData.rotationSpeed.y;
};

/**
 * Check and handle collision between two rings
 */
export const handleRingCollision = (
  ring1: THREE.Mesh,
  ring2: THREE.Mesh,
  collisionRadius: number,
  bounceDamping: number
) => {
  const distance = ring1.position.distanceTo(ring2.position);
  const minDistance = collisionRadius * 2;

  if (distance < minDistance) {
    const userData1 = ring1.userData as RingUserData;
    const userData2 = ring2.userData as RingUserData;

    // Separate rings
    const normal = new THREE.Vector3()
      .subVectors(ring1.position, ring2.position)
      .normalize();
    const overlap = minDistance - distance;
    const separation = normal.clone().multiplyScalar(overlap / 2);

    ring1.position.add(separation);
    ring2.position.sub(separation);

    // Apply bounce physics
    const relativeVelocity = new THREE.Vector3()
      .subVectors(userData1.velocity, userData2.velocity);
    const impulse = relativeVelocity.dot(normal);

    if (impulse < 0) {
      const bounceImpulse = normal.multiplyScalar(impulse * bounceDamping);
      userData1.velocity.sub(bounceImpulse);
      userData2.velocity.add(bounceImpulse);

      // Add spin on collision
      userData1.rotationSpeed.x += (Math.random() - 0.5) * 0.05;
      userData2.rotationSpeed.y += (Math.random() - 0.5) * 0.05;
    }
  }
};

/**
 * Setup interaction handlers
 */
export const setupInteraction = (
  camera: THREE.PerspectiveCamera,
  rings: THREE.Mesh[],
  dragSpeed: number
) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const intersection = new THREE.Vector3();
  const offset = new THREE.Vector3();
  
  let draggedObject: THREE.Mesh | null = null;
  let previousMousePosition = new THREE.Vector3();

  const onPointerDown = (event: MouseEvent | TouchEvent) => {
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(rings);

    if (intersects.length > 0) {
      draggedObject = intersects[0].object as THREE.Mesh;
      (draggedObject.userData as RingUserData).isDragging = true;

      if (raycaster.ray.intersectPlane(plane, intersection)) {
        offset.copy(intersection).sub(draggedObject.position);
        previousMousePosition.copy(draggedObject.position);
      }
    }
  };

  const onPointerMove = (event: MouseEvent | TouchEvent) => {
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;

    if (draggedObject) {
      raycaster.setFromCamera(mouse, camera);
      if (raycaster.ray.intersectPlane(plane, intersection)) {
        draggedObject.position.copy(intersection.sub(offset));

        const deltaMove = new THREE.Vector3()
          .copy(draggedObject.position)
          .sub(previousMousePosition);
        (draggedObject.userData as RingUserData).velocity
          .copy(deltaMove)
          .multiplyScalar(dragSpeed);

        previousMousePosition.copy(draggedObject.position);
      }
    }
  };

  const onPointerUp = () => {
    if (draggedObject) {
      (draggedObject.userData as RingUserData).isDragging = false;
      draggedObject = null;
    }
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp
  };
};