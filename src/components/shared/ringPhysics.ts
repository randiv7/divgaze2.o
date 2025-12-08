import * as THREE from 'three';
import { Bounds } from './sceneSetup';

export interface RingUserData {
  velocity: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
  isDragging: boolean;
}

/**
 * OPTIMIZED: Create a ring with enhanced glass material and physics
 */
export const createRing = (
  geometry: THREE.TorusGeometry,
  material: THREE.Material,
  bounds: Bounds,
  index: number,
  total: number
): THREE.Mesh => {
  const ring = new THREE.Mesh(geometry, material);

  // OPTIMIZED: Better initial distribution for 8 rings
  const angle = (index / total) * Math.PI * 2;
  const radius = bounds.x * 0.6;
  
  ring.position.set(
    Math.cos(angle) * radius * (0.5 + Math.random() * 0.5),
    Math.sin(angle) * radius * (0.5 + Math.random() * 0.5),
    (Math.random() - 0.5) * 10
  );

  ring.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    0
  );

  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  // OPTIMIZED velocity based on device
  const velocityMultiplier = isMobile ? 0.006 : isTablet ? 0.007 : 0.008;

  ring.userData = {
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * velocityMultiplier,
      (Math.random() - 0.5) * velocityMultiplier,
      (Math.random() - 0.5) * velocityMultiplier
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
 * OPTIMIZED: Update ring physics with device-specific friction
 */
export const updateRingPhysics = (
  ring: THREE.Mesh,
  bounds: Bounds,
  friction: number
) => {
  const userData = ring.userData as RingUserData;

  if (!userData.isDragging) {
    // Apply velocity
    ring.position.add(userData.velocity);

    // Boundary collision with bounce
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

    // Apply device-specific friction
    userData.velocity.multiplyScalar(friction);
  }

  // Apply rotation
  ring.rotation.x += userData.rotationSpeed.x;
  ring.rotation.y += userData.rotationSpeed.y;
};

/**
 * OPTIMIZED: Quick distance check before expensive collision detection
 * Essential for performance with 8 rings (28 potential collision pairs)
 */
export const quickDistanceCheck = (
  ring1: THREE.Mesh,
  ring2: THREE.Mesh,
  checkDistance: number
): boolean => {
  // Manhattan distance (faster than Euclidean)
  const quickDistance = Math.abs(ring1.position.x - ring2.position.x) + 
                       Math.abs(ring1.position.y - ring2.position.y) + 
                       Math.abs(ring1.position.z - ring2.position.z);
  
  return quickDistance < checkDistance;
};

/**
 * OPTIMIZED: Check and handle collision between two rings
 * Enhanced for 8-ring scenario with better bounce physics
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

    // Separate rings to prevent overlap
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
 * OPTIMIZED: Setup interaction handlers with device-specific drag speed
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

        // Apply device-specific drag speed
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

/**
 * OPTIMIZED: Process all ring collisions efficiently
 * For 8 rings, this checks 28 potential collision pairs
 * Uses quick distance check to skip unnecessary calculations
 */
export const processRingCollisions = (
  rings: THREE.Mesh[],
  collisionRadius: number,
  bounceDamping: number,
  isMobile: boolean
) => {
  // OPTIMIZED: Smaller check distance on mobile for performance
  const checkDistance = isMobile ? 15 : 20;
  
  for (let i = 0; i < rings.length; i++) {
    for (let j = i + 1; j < rings.length; j++) {
      // Quick check before expensive collision detection
      if (quickDistanceCheck(rings[i], rings[j], checkDistance)) {
        handleRingCollision(rings[i], rings[j], collisionRadius, bounceDamping);
      }
    }
  }
};