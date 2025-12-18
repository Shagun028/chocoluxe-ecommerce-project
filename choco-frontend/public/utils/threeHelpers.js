import * as THREE from 'three';

export const createChocolateMaterial = (type = 'dark') => {
  const materials = {
    dark: {
      color: 0x3D1C0A,
      roughness: 0.6,
      metalness: 0.2,
    },
    milk: {
      color: 0x5D4037,
      roughness: 0.5,
      metalness: 0.3,
    },
    white: {
      color: 0xF5E9DE,
      roughness: 0.7,
      metalness: 0.1,
    },
  };

  const config = materials[type] || materials.dark;

  return new THREE.MeshStandardMaterial({
    color: config.color,
    roughness: config.roughness,
    metalness: config.metalness,
  });
};

export const createGeometry = (type = 'sphere', size = 1) => {
  const geometries = {
    sphere: new THREE.SphereGeometry(size, 64, 64),
    box: new THREE.BoxGeometry(size, size, size),
    cylinder: new THREE.CylinderGeometry(size, size, size * 2, 32),
  };

  return geometries[type] || geometries.sphere;
};

export const setupLights = (scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  return { ambientLight, directionalLight };
};