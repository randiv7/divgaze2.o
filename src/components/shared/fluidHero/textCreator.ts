import * as THREE from 'three';
import { createGlassTextMaterial } from '../glassTextMaterial';

export const createDivgazeText = (screenWidth: number) => {
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