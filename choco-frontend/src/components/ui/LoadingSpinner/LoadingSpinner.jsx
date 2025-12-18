import React from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  const sizeMap = {
    small: 24,
    medium: 48,
    large: 72,
  };

  const colorMap = {
    primary: 'var(--color-primary)',
    accent: 'var(--color-accent)',
    light: 'var(--color-light)',
    white: 'var(--color-white)',
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          borderColor: colorMap[color],
        }}
      >
        <div className={styles.innerCircle} />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;