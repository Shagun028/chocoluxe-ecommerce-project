import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshReflectorMaterial } from '@react-three/drei';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          {/* Text Content */}
          <motion.div 
            className="text-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="subtitle">Artisan Crafted</span>
            <h1 className="title">
              <span>Indulgence</span>
              <span>Redefined</span>
            </h1>
            <p className="description">
              Experience chocolate like never before. Our award-winning truffles and 
              creations are crafted from single-origin cocoa beans for an unforgettable 
              sensory journey.
            </p>
            <div className="cta-container">
              <motion.button 
                className="cta-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collections
              </motion.button>
              <motion.button 
                className="cta-secondary"
                whileHover={{ x: 10 }}
              >
                Our Story →
              </motion.button>
            </div>
          </motion.div>

          {/* 3D Chocolate Model */}
          <motion.div 
            className="canvas-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
              
              {/* Chocolate Sphere */}
              <Sphere args={[1, 64, 64]} castShadow receiveShadow>
                <MeshReflectorMaterial
                  blur={[300, 100]}
                  resolution={1024}
                  mixBlur={1}
                  mixStrength={40}
                  roughness={0.6}
                  depthScale={1.2}
                  minDepthThreshold={0.4}
                  maxDepthThreshold={1.4}
                  color="#3D1C0A"
                  metalness={0.2}
                  mirror={0.5}
                />
              </Sphere>
              
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
            </Canvas>
            
            <div className="interactive-hint">
              ← Drag to rotate →
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;