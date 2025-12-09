import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createDivgazeText } from '@/components/shared/fluidHero/textCreator';
import { getResponsiveSettings } from '@/components/shared/fluidHero/settings';
import { setupScene } from '@/components/shared/fluidHero/sceneSetup';
import { createRings } from '@/components/shared/fluidHero/rings';
import { createParticles } from '@/components/shared/fluidHero/particles';
import { createLights } from '@/components/shared/fluidHero/lights';
import { setupInteraction } from '@/components/shared/fluidHero/interaction';
import { createAnimationLoop } from '@/components/shared/fluidHero/animation';

interface FluidHeroProps {
  className?: string;
}

export const FluidHero = ({ className = '' }: FluidHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);

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
    let settings = getResponsiveSettings(screenWidth);

    // Scene Setup
    const { scene, camera, renderer, bounds, calculateBounds, COLLISION_RADIUS } = setupScene(
      containerRef.current,
      screenWidth,
      settings
    );

    // Create Rings
    const { rings, ringGeometry, material } = createRings(scene, settings, bounds);

    // Create Text
    const textMesh = createDivgazeText(screenWidth);
    textMesh.position.set(0, 0, 0);
    scene.add(textMesh);

    // Create Particles
    const { particlesMesh, particlesGeometry, particlesMaterial } = createParticles(
      scene,
      settings,
      screenWidth
    );

    // Create Lights
    const { light1, light2, light3, ambientLight } = createLights(scene, settings);

    // Setup Interaction
    const { cleanup: cleanupInteraction } = setupInteraction(camera, rings, settings);

    // Handle Resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newSettings = getResponsiveSettings(newWidth);
      
      camera.aspect = newWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      camera.position.z = newSettings.cameraZ;
      
      renderer.setSize(newWidth, window.innerHeight);
      renderer.toneMappingExposure = newSettings.toneMappingExposure;
      
      // Update settings reference
      settings = newSettings;
      const newBounds = calculateBounds();
      bounds.x = newBounds.x;
      bounds.y = newBounds.y;
      bounds.z = newBounds.z;
      
      // Update ring orbit speeds on resize
      rings.forEach(ring => {
        ring.userData.orbitSpeed = newSettings.orbitSpeed;
      });
      
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
    const { stop: stopAnimation } = createAnimationLoop(
      renderer,
      scene,
      camera,
      rings,
      particlesMesh,
      light1,
      light2,
      light3,
      bounds,
      settings,
      COLLISION_RADIUS
    );

    return () => {
      stopAnimation();
      cleanupInteraction();
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