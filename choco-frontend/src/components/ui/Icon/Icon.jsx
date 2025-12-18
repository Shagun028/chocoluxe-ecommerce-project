import React from 'react';
import * as Icons from 'lucide-react';
import styles from './Icon.module.css';

const Icon = ({ name, size = 24, color, className, ...props }) => {
  const LucideIcon = Icons[name];
  
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      color={color}
      className={`${styles.icon} ${className || ''}`}
      {...props}
    />
  );
};

export default Icon;