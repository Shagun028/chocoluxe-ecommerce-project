import { useRef } from 'react';
import * as THREE from 'three';

export const useThreeAnimation = () => {
  const meshRef = useRef();

  const animate = (time) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.0005;
      meshRef.current.rotation.y = time * 0.001;
    }
  };

  const createMaterial = (color, roughness = 0.5, metalness = 0.5) => {
    return new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
    });
  };

  return {
    meshRef,
    animate,
    createMaterial,
  };
};