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
  const createDivgazeText = (screenWidth: number) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    
    // Responsive font size based on screen width
    const fontSize = screenWidth < 768 ? 80 : screenWidth < 1024 ? 140 : 200;
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
    
    // Create plane geometry for text - responsive sizes
    const aspect = canvas.width / canvas.height;
    const planeWidth = screenWidth < 768 ? 16 : screenWidth < 1024 ? 26 : 36;
    const planeHeight = planeWidth / aspect;
    
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    
    // Create glass material for text
    const material = createGlassTextMaterial(screenWidth);
    material.map = texture;
    material.alphaMap = texture;
    
    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.userData.isText = true;
    
    return textMesh;
  };

  useEffect(() => {
    // Only disable for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setShouldRender(false);
      return;
    }

    if (!containerRef.current) return;

    // Get screen width for responsive settings
    const screenWidth = window.innerWidth;

    // Responsive settings based on screen width
    const getSettings = (width: number) => {
      if (width < 768) {
        // Mobile
        return {
          ringCount: 4,
          ringSegments: 32,
          particlesCount: 1500,
          pixelRatio: Math.min(window.devicePixelRatio, 1.5),
          cameraZ: 55,
          dragSpeed: 0.8,
          bounceDamping: 0.6,
          friction: 0.985,
          initialVelocity: 0.006,
          geometryRadius: 1.8,
          geometryTube: 0.7,
          lightIntensity: 3,
          ambientIntensity: 1.0,
          particleSize: 0.08,
          particleOpacity: 0.7,
          ringTransmission: 0.85,
          ringThickness: 2.0,
          ringEmissive: 0x113355,
          ringEmissiveIntensity: 0.2,
          toneMappingExposure: 1.2,
          antialias: false,
        };
      } else if (width < 1024) {
        // Tablet
        return {
          ringCount: 5,
          ringSegments: 48,
          particlesCount: 2000,
          pixelRatio: Math.min(window.devicePixelRatio, 2),
          cameraZ: 45,
          dragSpeed: 1.0,
          bounceDamping: 0.55,
          friction: 0.988,
          initialVelocity: 0.007,
          geometryRadius: 2.5,
          geometryTube: 0.9,
          lightIntensity: 2.5,
          ambientIntensity: 0.7,
          particleSize: 0.06,
          particleOpacity: 0.6,
          ringTransmission: 0.92,
          ringThickness: 1.7,
          ringEmissive: 0x000000,
          ringEmissiveIntensity: 0,
          toneMappingExposure: 1.1,
          antialias: true,
        };
      } else {
        // Desktop
        return {
          ringCount: 8,
          ringSegments: 80,
          particlesCount: 4000,
          pixelRatio: Math.min(window.devicePixelRatio, 2),
          cameraZ: 35,
          dragSpeed: 1.2,
          bounceDamping: 0.5,
          friction: 0.990,
          initialVelocity: 0.008,
          geometryRadius: 3.2,
          geometryTube: 1.0,
          lightIntensity: 2,
          ambientIntensity: 0.5,
          particleSize: 0.05,
          particleOpacity: 0.5,
          ringTransmission: 0.98,
          ringThickness: 1.5,
          ringEmissive: 0x000000,
          ringEmissiveIntensity: 0,
          toneMappingExposure: 1.0,
          antialias: true,
        };
      }
    };

    let settings = getSettings(screenWidth);
    const COLLISION_RADIUS = settings.geometryRadius + settings.geometryTube;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, screenWidth < 768 ? 0.002 : 0.0015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = settings.cameraZ;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: settings.antialias,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(settings.pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = settings.toneMappingExposure;
    containerRef.current.appendChild(renderer.domElement);

    // Calculate Screen Boundaries
    const calculateBounds = () => {
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      
      return {
        x: visibleWidth / 2 - (COLLISION_RADIUS + 0.5),
        y: visibleHeight / 2 - (COLLISION_RADIUS + 0.5),
        z: 15
      };
    };

    let bounds = calculateBounds();

    // Glass Material with responsive properties
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

    // Create Rings
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
        z: (Math.random() - 0.5) * 10
      };
    };

    for (let i = 0; i < settings.ringCount; i++) {
      const ring = new THREE.Mesh(ringGeometry, material);
      
      const pos = getInitialPosition(i, settings.ringCount);
      ring.position.set(pos.x, pos.y, pos.z);

      ring.rotation.set(
        Math.random() * Math.PI, 
        Math.random() * Math.PI, 
        0
      );

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
        isDragging: false
      };

      scene.add(ring);
      rings.push(ring);
    }

    // Create 3D "Divgaze" Glass Text
    const textMesh = createDivgazeText(screenWidth);
    textMesh.position.set(0, 0, 0);
    scene.add(textMesh);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(settings.particlesCount * 3);
    for (let i = 0; i < settings.particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * (screenWidth < 768 ? 120 : 180);
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: settings.particleSize,
      color: 0xffffff,
      transparent: true,
      opacity: settings.particleOpacity,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lights
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

    // Interaction
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
      const newWidth = window.innerWidth;
      const newSettings = getSettings(newWidth);
      
      camera.aspect = newWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      camera.position.z = newSettings.cameraZ;
      
      renderer.setSize(newWidth, window.innerHeight);
      renderer.toneMappingExposure = newSettings.toneMappingExposure;
      
      // Update settings reference
      settings = newSettings;
      bounds = calculateBounds();
      
      // Update particle material
      particlesMaterial.size = newSettings.particleSize;
      particlesMaterial.opacity = newSettings.particleOpacity;
      particlesMaterial.needsUpdate = true;
      
      // Update lights
      light1.intensity = newSettings.lightIntensity;
      light2.intensity = newSettings.lightIntensity;
      light3.intensity = newSettings.lightIntensity;
      ambientLight.intensity = newSettings.ambientIntensity;
      
      // Update material properties
      material.transmission = newSettings.ringTransmission;
      material.thickness = newSettings.ringThickness;
      material.emissive = new THREE.Color(newSettings.ringEmissive);
      material.emissiveIntensity = newSettings.ringEmissiveIntensity;
      material.needsUpdate = true;
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
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

          const checkDistance = window.innerWidth < 768 ? 15 : 20;
          
          for (let j = i + 1; j < rings.length; j++) {
            const otherRing = rings[j];
            
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-black to-blue-600/40 flex items-center justify-center">
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight">
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