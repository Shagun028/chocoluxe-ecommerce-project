import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const ChocolateTruffle = ({ position = [0, 0, 0], scale = 1, variant = 'dark' }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  const variants = {
    dark: { color: '#3D1C0A', dust: '#2C1508' },
    milk: { color: '#5D4037', dust: '#4A332C' },
    white: { color: '#F5E9DE', dust: '#E8D9C8' },
  };

  const currentVariant = variants[variant] || variants.dark;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      
      if (hovered) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1, 64, 64]} />
        
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={0.6}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={currentVariant.color}
          metalness={0.2}
          mirror={0.5}
        />
        
        <mesh position={[0, 0.7, 0]} scale={1.05}>
          <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial 
            color={currentVariant.dust} 
            roughness={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[4, 4]} />
        <shadowMaterial transparent opacity={0.3} />
      </mesh>
    </Float>
  );
};

export default ChocolateTruffle;