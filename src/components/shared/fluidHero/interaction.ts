import * as THREE from 'three';
import { Settings } from './settings';

export const setupInteraction = (
  camera: THREE.PerspectiveCamera,
  rings: THREE.Mesh[],
  settings: Settings
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
      draggedObject.userData.isDragging = true;
      
      // Break out of orbit when user grabs ring - STAY BROKEN FOREVER
      draggedObject.userData.isOrbiting = false;

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
        draggedObject.userData.velocity.copy(deltaMove).multiplyScalar(settings.dragSpeed);

        previousMousePosition.copy(draggedObject.position);
      }
    }
  };

  const onPointerUp = () => {
    if (draggedObject) {
      draggedObject.userData.isDragging = false;
      draggedObject = null;
    }
  };

  window.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);
  window.addEventListener('touchstart', onPointerDown, { passive: false });
  window.addEventListener('touchmove', onPointerMove, { passive: false });
  window.addEventListener('touchend', onPointerUp);

  return {
    cleanup: () => {
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    },
  };
};