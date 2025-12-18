import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  onClick,
  className,
  ...props
}) => {
  const buttonClass = clsx(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.fullWidth]: fullWidth,
      [styles.disabled]: disabled || loading,
      [styles.loading]: loading,
    },
    className
  );

  return (
    <motion.button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading && (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={styles.loadingSpinner}
        />
      )}
      
      {startIcon && !loading && (
        <span className={styles.startIcon}>{startIcon}</span>
      )}
      
      <span className={styles.label}>{children}</span>
      
      {endIcon && !loading && (
        <span className={styles.endIcon}>{endIcon}</span>
      )}
    </motion.button>
  );
};

export default Button;