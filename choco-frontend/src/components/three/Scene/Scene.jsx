import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, SoftShadows } from '@react-three/drei';
import ChocolateTruffle from '../ChocolateModel/ChocolateModel';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';

const ChocolateScene = ({ 
  modelCount = 3,
  autoRotate = true,
  controls = true,
  environment = 'sunset'
}) => {
  const positions = [
    [-2, 0, 0],
    [0, 0, 0],
    [2, 0, 0],
  ];

  const variants = ['dark', 'milk', 'white'];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SoftShadows size={25} samples={10} />
          
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
          
          {Array.from({ length: Math.min(modelCount, 3) }).map((_, index) => (
            <ChocolateTruffle
              key={index}
              position={positions[index]}
              scale={0.8}
              variant={variants[index % variants.length]}
            />
          ))}
          
          {controls && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          )}
          
          <Environment preset={environment} />
        </Suspense>
      </Canvas>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'none'
      }}>
        <LoadingSpinner size="medium" color="primary" />
      </div>
    </div>
  );
};

export default ChocolateScene;