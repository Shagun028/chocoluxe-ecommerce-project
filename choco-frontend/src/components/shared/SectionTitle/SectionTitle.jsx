import React from 'react';
import { motion } from 'framer-motion';
import styles from './SectionTitle.module.css';

const SectionTitle = ({ 
  title, 
  subtitle, 
  align = 'center',
  withDecoration = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${styles.container} ${styles[align]}`}
    >
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={styles.subtitle}
        >
          {subtitle}
        </motion.span>
      )}
      
      <h2 className={styles.title}>
        {title}
        {withDecoration && (
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={styles.underline}
          />
        )}
      </h2>
    </motion.div>
  );
};

export default SectionTitle;