import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 100 100"
      initial={{ rotate: -180, scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D1C0A" />
          <stop offset="100%" stopColor="#8B4513" />
        </linearGradient>
      </defs>
      
      <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
      
      <motion.path
        d="M35,35 Q50,20 65,35 T95,50 Q80,65 65,50 T35,65 Q20,50 35,35"
        fill="none"
        stroke="#F5E9DE"
        strokeWidth="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      <circle cx="50" cy="50" r="8" fill="#D2691E" />
    </motion.svg>
  );
};

export default Logo;