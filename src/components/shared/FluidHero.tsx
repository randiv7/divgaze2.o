import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FluidHeroProps {
  className?: string;
}

export const FluidHero = ({ className = '' }: FluidHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // 1. Device detection & Config
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ((isMobile && isLowEnd) || prefersReducedMotion) {
      setShouldRender(false);
      return;
    }

    if (!containerRef.current) return;

    // General Settings
    const settings = {
      ringSegments: isMobile ? 32 : isTablet ? 64 : 100,
      particlesCount: isMobile ? 1000 : isTablet ? 3000 : 5000,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      cameraZ: isMobile ? 55 : isTablet ? 45 : 35,
      ringCount: isMobile ? 3 : isTablet ? 4 : 6,
      // PHYSICS TWEAKS HERE:
      dragSpeed: 1.0,      // Reduced throw power slightly (was 1.5)
      bounceDamping: 0.5,  // Rings lose 50% energy on hit (was 0.8) - makes them "heavier"
    };

    // Geometry Scaling
    const geometryConfig = {
      radius: isMobile ? 2.0 : isTablet ? 2.8 : 3.5,
      tube: isMobile ? 0.8 : isTablet ? 1.0 : 1.2,
    };

    const COLLISION_RADIUS = geometryConfig.radius + geometryConfig.tube;

    // 2. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, isMobile ? 0.002 : 0.0015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = settings.cameraZ;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(settings.pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    containerRef.current.appendChild(renderer.domElement);

    // Calculate Screen Boundaries
    const calculateBounds = () => {
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const visibleHeight = 2 * Math.tan(vFOV / 2) * settings.cameraZ;
      const visibleWidth = visibleHeight * camera.aspect;
      
      return {
        x: visibleWidth / 2 - (COLLISION_RADIUS + 0.5),
        y: visibleHeight / 2 - (COLLISION_RADIUS + 0.5),
        z: 15
      };
    };

    let bounds = calculateBounds();

    // 3. Material (Glass)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xaaccff,
      metalness: 0,
      roughness: 0.01,
      transmission: 0.98,
      thickness: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      emissive: 0x000000,
      ior: 1.52,
      attenuationColor: new THREE.Color(0xffffff),
      attenuationDistance: Infinity,
    });

    // 4. Create Rings
    const rings: THREE.Mesh[] = [];
    const ringGeometry = new THREE.TorusGeometry(
      geometryConfig.radius, 
      geometryConfig.tube, 
      32, 
      settings.ringSegments
    );

    for (let i = 0; i < settings.ringCount; i++) {
        const ring = new THREE.Mesh(ringGeometry, material);
        
        ring.position.set(
            (Math.random() - 0.5) * (bounds.x * 1.5),
            (Math.random() - 0.5) * (bounds.y * 1.5),
            (Math.random() - 0.5) * 10
        );

        ring.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

        ring.userData = {
            // PHYSICS TWEAK: Slower initial drift (0.008 instead of 0.02)
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
        };

        scene.add(ring);
        rings.push(ring);
    }

    // 5. Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(settings.particlesCount * 3);
    for (let i = 0; i < settings.particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * (isMobile ? 120 : 180);
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 6. Lights
    const light1 = new THREE.PointLight(0x00ffff, 2, 50);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xff00ff, 2, 50);
    light2.position.set(-10, -10, 10);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x5500ff, 2, 60);
    light3.position.set(0, 0, 20);
    scene.add(light3);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // 7. Interaction
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
                
                const deltaMove = new THREE.Vector3().copy(draggedObject.position).sub(previousMousePosition);
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

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        bounds = calculateBounds();
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
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

      rings.forEach((ring, i) => {
        ring.rotation.x += ring.userData.rotationSpeed.x;
        ring.rotation.y += ring.userData.rotationSpeed.y;

        if (!ring.userData.isDragging) {
            ring.position.add(ring.userData.velocity);

            // BOUNDARY CHECK
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

            // COLLISION CHECK
            for (let j = i + 1; j < rings.length; j++) {
                const otherRing = rings[j];
                const distance = ring.position.distanceTo(otherRing.position);
                const minDistance = COLLISION_RADIUS * 2;

                if (distance < minDistance) {
                    const normal = new THREE.Vector3().subVectors(ring.position, otherRing.position).normalize();
                    const overlap = minDistance - distance;
                    const separation = normal.clone().multiplyScalar(overlap / 2);
                    
                    ring.position.add(separation);
                    otherRing.position.sub(separation);

                    const relativeVelocity = new THREE.Vector3().subVectors(ring.userData.velocity, otherRing.userData.velocity);
                    const impulse = relativeVelocity.dot(normal);

                    if (impulse < 0) {
                        const bounceImpulse = normal.multiplyScalar(impulse * settings.bounceDamping);
                        ring.userData.velocity.sub(bounceImpulse);
                        otherRing.userData.velocity.add(bounceImpulse);
                        
                        ring.userData.rotationSpeed.x += (Math.random() - 0.5) * 0.05;
                        otherRing.userData.rotationSpeed.y += (Math.random() - 0.5) * 0.05;
                    }
                }
            }
            
            // PHYSICS TWEAK: Higher Friction (0.990 instead of 0.998)
            // This slows them down faster after interaction
            ring.userData.velocity.multiplyScalar(0.990);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);
      
      ringGeometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!shouldRender) {
    return (
      <div className={`absolute top-0 left-0 w-full h-full ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 left-0 w-full h-full cursor-grab active:cursor-grabbing ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};