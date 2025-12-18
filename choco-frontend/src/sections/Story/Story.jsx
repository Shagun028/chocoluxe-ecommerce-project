import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Clock, Star } from 'lucide-react';
import styles from './Story.module.css';

const Story = () => {
  const features = [
    {
      icon: <Leaf size={32} />,
      title: 'Sustainable Sourcing',
      description: 'Direct partnerships with ethical cocoa farms',
    },
    {
      icon: <Clock size={32} />,
      title: '72-Hour Process',
      description: 'Slow-crafted for maximum flavor development',
    },
    {
      icon: <Star size={32} />,
      title: 'Award-Winning',
      description: 'Recognized by international chocolate experts',
    },
  ];

  return (
    <section className={`${styles.story} section-padding`}>
      <div className="container">
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={styles.textSection}
          >
            <span className={styles.subtitle}>Our Heritage</span>
            <h2 className={styles.title}>
              Crafting Chocolate Excellence Since 2015
            </h2>
            <div className={styles.description}>
              <p>
                What began as a passion project in a small Brussels kitchen has 
                evolved into an internationally recognized chocolate house. Our 
                founder, Master Chocolatier Alexandre Moreau, combines traditional 
                European techniques with innovative flavor profiles.
              </p>
              <p>
                Each creation tells a story—from the single-origin beans we 
                carefully select to the 72-hour conching process that develops 
                unprecedented smoothness and depth of flavor.
              </p>
            </div>
          </motion.div>

          <div className={styles.features}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={styles.featureCard}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;