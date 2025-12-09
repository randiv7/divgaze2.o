import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createGlassTextMaterial } from './glassTextMaterial';

interface FluidHeroProps {
  className?: string;
}

export const FluidHero = ({ className = '' }: FluidHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);

  // Helper function to create "Divgaze" text mesh
  const createDivgazeText = (isMobile: boolean, isTablet: boolean) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    
    // INCREASED font sizes for bigger text
    const fontSize = isMobile ? 80 : isTablet ? 140 : 200;
    const fontWeight = 'bold';
    const fontFamily = 'Inter, sans-serif';
    
    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const textWidth = context.measureText('Divgaze').width;
    
    // Set canvas size
    canvas.width = textWidth + 40;
    canvas.height = fontSize * 1.5;
    
    // Re-apply font after canvas resize
    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = 'white';
    context.fillText('Divgaze', canvas.width / 2, canvas.height / 2);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    // Create plane geometry for text - INCREASED sizes
    const aspect = canvas.width / canvas.height;
    const planeWidth = isMobile ? 16 : isTablet ? 26 : 36;
    const planeHeight = planeWidth / aspect;
    
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    
    // Create glass material for text
    const material = createGlassTextMaterial(isMobile);
    material.map = texture;
    material.alphaMap = texture;
    
    const textMesh = new THREE.Mesh(geometry, material);
    
    // Make text non-interactive
    textMesh.userData.isText = true; // Mark as text for raycaster exclusion
    
    return textMesh;
  };

  useEffect(() => {
    // FIXED: Only disable for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setShouldRender(false);
      return;
    }

    if (!containerRef.current) return;

    // Device detection for optimization
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // OPTIMIZED Settings based on device
    const settings = {
      // Ring count: Mobile 2, Tablet 4, Desktop 8
      ringCount: isMobile ? 2 : isTablet ? 4 : 8,
      // Segments: Reduced for better performance
      ringSegments: isMobile ? 24 : isTablet ? 48 : 80,
      // Particles: Optimized for each device
      particlesCount: isMobile ? 800 : isTablet ? 2000 : 4000,
      // Pixel ratio: Capped for mobile
      pixelRatio: isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2),
      cameraZ: isMobile ? 55 : isTablet ? 45 : 35,
      // OPTIMIZED Physics
      dragSpeed: isMobile ? 0.8 : isTablet ? 1.0 : 1.2,
      bounceDamping: isMobile ? 0.6 : isTablet ? 0.55 : 0.5,
      friction: isMobile ? 0.985 : isTablet ? 0.988 : 0.990,
      initialVelocity: isMobile ? 0.006 : isTablet ? 0.007 : 0.008,
    };

    // OPTIMIZED Geometry - Smaller rings for better performance and fit
    const geometryConfig = {
      radius: isMobile ? 1.8 : isTablet ? 2.5 : 3.2,
      tube: isMobile ? 0.7 : isTablet ? 0.9 : 1.0,
    };

    const COLLISION_RADIUS = geometryConfig.radius + geometryConfig.tube;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, isMobile ? 0.002 : 0.0015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = settings.cameraZ;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // No antialiasing on mobile for performance
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

    // Glass Material (Original Color Preserved)
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

    // Create Rings with OPTIMIZED distribution
    const rings: THREE.Mesh[] = [];
    const ringGeometry = new THREE.TorusGeometry(
      geometryConfig.radius, 
      geometryConfig.tube, 
      32, 
      settings.ringSegments
    );

    // OPTIMIZED initial positioning for rings
    const getInitialPosition = (index: number, total: number) => {
      // Create a more balanced distribution
      const angle = (index / total) * Math.PI * 2;
      const radius = bounds.x * 0.6;
      
      return {
        x: Math.cos(angle) * radius * (0.5 + Math.random() * 0.5),
        y: Math.sin(angle) * radius * (0.5 + Math.random() * 0.5),
        z: (Math.random() - 0.5) * 10
      };
    };

    for (let i = 0; i < settings.ringCount; i++) {
      const ring = new THREE.Mesh(ringGeometry, material);
      
      // Better initial distribution
      const pos = getInitialPosition(i, settings.ringCount);
      ring.position.set(pos.x, pos.y, pos.z);

      ring.rotation.set(
        Math.random() * Math.PI, 
        Math.random() * Math.PI, 
        0
      );

      ring.userData = {
        // OPTIMIZED velocity based on device
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
        isDragging: false
      };

      scene.add(ring);
      rings.push(ring);
    }

    // Create 3D "Divgaze" Glass Text
    const textMesh = createDivgazeText(isMobile, isTablet);
    textMesh.position.set(0, 0, 0); // Center of scene
    scene.add(textMesh);

    // OPTIMIZED Particles
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

    // Lights (Original Settings Preserved)
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

    // OPTIMIZED Interaction
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

    // OPTIMIZED Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slower particle rotation for better performance
      particlesMesh.rotation.y = elapsedTime * 0.05;

      // Animate lights for iridescence
      light1.position.x = Math.sin(elapsedTime * 0.7) * 20;
      light1.position.y = Math.cos(elapsedTime * 0.5) * 20;
      light2.position.x = Math.cos(elapsedTime * 0.3) * 25;
      light2.position.y = Math.sin(elapsedTime * 0.5) * 25;

      rings.forEach((ring, i) => {
        ring.rotation.x += ring.userData.rotationSpeed.x;
        ring.rotation.y += ring.userData.rotationSpeed.y;

        if (!ring.userData.isDragging) {
          // Apply velocity
          ring.position.add(ring.userData.velocity);

          // BOUNDARY CHECK with optimized bounce
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

          // OPTIMIZED COLLISION CHECK - Only check nearby rings
          const checkDistance = isMobile ? 15 : 20;
          
          for (let j = i + 1; j < rings.length; j++) {
            const otherRing = rings[j];
            
            // Quick distance check before expensive collision detection
            const quickDistance = Math.abs(ring.position.x - otherRing.position.x) + 
                                 Math.abs(ring.position.y - otherRing.position.y) + 
                                 Math.abs(ring.position.z - otherRing.position.z);
            
            if (quickDistance < checkDistance) {
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
          }
          
          // OPTIMIZED friction per device
          ring.userData.velocity.multiplyScalar(settings.friction);
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-black to-blue-600/30 flex items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
            Divgaze
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 left-0 w-full h-full cursor-grab active:cursor-grabbing ${className}`}
      style={{ 
        zIndex: 0,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    />
  );
};