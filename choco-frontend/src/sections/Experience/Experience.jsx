import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import ChocolateScene from '../../components/three/Scene/Scene';
import styles from './Experience.module.css';

const Experience = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className={styles.experience}>
      <div className="container">
        <motion.div
          style={{ y, opacity, scale }}
          className={styles.canvasContainer}
        >
          <Canvas shadows camera={{ position: [0, 2, 8], fov: 60 }}>
            <ChocolateScene modelCount={3} />
          </Canvas>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={styles.textBlock}
          >
            <span className={styles.subtitle}>Immersive Experience</span>
            <h2 className={styles.title}>
              Chocolate in Three Dimensions
            </h2>
            <p className={styles.description}>
              Our interactive 3D visualization allows you to explore every 
              detail of our creations. Rotate, zoom, and appreciate the 
              craftsmanship that goes into each piece.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={styles.stats}
          >
            <div className={styles.stat}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Customer Satisfaction</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>24+</div>
              <div className={styles.statLabel}>International Awards</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Happy Customers</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;