// src/pages/About/About.jsx - WITH INLINE STYLES
import React from 'react';
import { motion } from "framer-motion";
import { Users, Target, Globe, Award, Calendar, Leaf, Heart, Star } from "lucide-react";

const About = () => {
  // Inline styles object
  const styles = {
    aboutContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFF8F0 0%, #FFFFFF 100%)',
    },
    heroSection: {
      background: 'linear-gradient(rgba(93, 64, 55, 0.9), rgba(139, 69, 19, 0.8)), url(https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '4rem 2rem',
      textAlign: 'center',
    },
    heroContent: {
      maxWidth: '800px',
    },
    heroTitle: {
      fontSize: '4rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    },
    heroSubtitle: {
      fontSize: '1.5rem',
      opacity: 0.9,
      lineHeight: '1.6',
    },
    missionSection: {
      padding: '6rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    sectionTitle: {
      textAlign: 'center',
      marginBottom: '3rem',
    },
    title: {
      fontSize: '3rem',
      fontWeight: '700',
      color: '#5D4037',
      marginBottom: '1rem',
      position: 'relative',
      display: 'inline-block',
    },
    titleUnderline: {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '4px',
      background: 'linear-gradient(90deg, #8B4513, #D2691E)',
      borderRadius: '2px',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#795548',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    missionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '3rem',
      marginTop: '3rem',
    },
    missionCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '3rem 2rem',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(93, 64, 55, 0.1)',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(210, 105, 30, 0.1)',
      cursor: 'pointer',
    },
    icon: {
      color: '#D2691E',
      marginBottom: '1.5rem',
    },
    missionCardTitle: {
      fontSize: '1.5rem',
      color: '#5D4037',
      marginBottom: '1rem',
      fontWeight: '600',
    },
    missionCardText: {
      color: '#795548',
      lineHeight: '1.6',
    },
    storySection: {
      padding: '6rem 2rem',
      background: '#F9F5F0',
    },
    storyContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center',
    },
    storyContent: {
      paddingRight: '2rem',
    },
    storyImage: {
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(93, 64, 55, 0.15)',
    },
    milestonesSection: {
      padding: '6rem 2rem',
      background: 'white',
    },
    milestonesContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    milestonesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginTop: '3rem',
    },
    milestoneCard: {
      background: '#FFF8F0',
      borderRadius: '15px',
      padding: '2rem',
      textAlign: 'center',
      border: '2px solid rgba(210, 105, 30, 0.2)',
    },
    milestoneYear: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#D2691E',
      marginBottom: '1rem',
    },
    milestoneTitle: {
      fontSize: '1.2rem',
      color: '#5D4037',
      fontWeight: '600',
      marginBottom: '0.5rem',
    },
    milestoneDescription: {
      color: '#795548',
      fontSize: '0.9rem',
      lineHeight: '1.5',
    },
    valuesSection: {
      padding: '6rem 2rem',
      background: 'linear-gradient(135deg, #5D4037, #8B4513)',
      color: 'white',
      textAlign: 'center',
    },
    valuesContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '3rem',
      marginTop: '3rem',
    },
    valueItem: {
      textAlign: 'center',
    },
    valueIcon: {
      marginBottom: '1.5rem',
      color: '#FFD700',
    },
    valueTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '1rem',
    },
    responsive: {
      mobile: '@media (max-width: 768px)',
    },
  };

  const milestones = [
    { year: '2015', title: 'Founding Vision', description: 'Established with a commitment to outstanding quality.' },
    { year: '2018', title: 'First Award', description: 'Recognized at the International Chocolate Awards.' },
    { year: '2020', title: 'Global Expansion', description: 'Began shipping to over 30 countries worldwide.' },
    { year: '2023', title: 'Sustainable Certification', description: 'Achieved carbon-neutral production status.' },
  ];

  const values = [
    { icon: <Heart size={40} />, title: 'Passion', description: 'Love for exceptional chocolate' },
    { icon: <Star size={40} />, title: 'Excellence', description: 'Uncompromising quality standards' },
    { icon: <Leaf size={40} />, title: 'Sustainability', description: 'Ethical and eco-friendly practices' },
    { icon: <Users size={40} />, title: 'Community', description: 'Supporting farmers and customers' },
  ];

  return (
    <div style={styles.aboutContainer}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.heroContent}
        >
          <h1 style={styles.heroTitle}>A Passion for Perfection</h1>
          <p style={styles.heroSubtitle}>
            For over a decade, we've been redefining chocolate excellence, blending traditional craftsmanship with innovative techniques.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section style={styles.missionSection}>
        <div style={styles.sectionTitle}>
          <h2 style={styles.title}>
            Our Mission
            <span style={styles.titleUnderline}></span>
          </h2>
          <p style={styles.subtitle}>
            To create the world's most exceptional chocolate experiences while positively impacting every life we touch.
          </p>
        </div>
        
        <div style={styles.missionGrid}>
          <motion.div 
            style={styles.missionCard}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Users size={48} style={styles.icon} />
            <h3 style={styles.missionCardTitle}>Community First</h3>
            <p style={styles.missionCardText}>
              Supporting cocoa farming communities through fair trade partnerships and sustainable practices.
            </p>
          </motion.div>
          
          <motion.div 
            style={styles.missionCard}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Target size={48} style={styles.icon} />
            <h3 style={styles.missionCardTitle}>Craftsmanship</h3>
            <p style={styles.missionCardText}>
              Every piece is handcrafted with meticulous attention to detail and passion for perfection.
            </p>
          </motion.div>
          
          <motion.div 
            style={styles.missionCard}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Globe size={48} style={styles.icon} />
            <h3 style={styles.missionCardTitle}>Sustainability</h3>
            <p style={styles.missionCardText}>
              Committed to environmentally responsible practices from bean to bar, reducing our carbon footprint.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section style={styles.storySection}>
        <div style={styles.storyContainer}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={styles.storyContent}
          >
            <h2 style={{...styles.title, textAlign: 'left', marginBottom: '2rem'}}>
              Our Story
              <span style={{...styles.titleUnderline, left: 0, transform: 'none'}}></span>
            </h2>
            <p style={{...styles.subtitle, textAlign: 'left', margin: 0, marginBottom: '1.5rem'}}>
              For over a decade, we've been redefining chocolate excellence, blending traditional craftsmanship with innovative techniques to create unforgettable sensory experiences.
            </p>
            <p style={{color: '#795548', lineHeight: '1.6', marginBottom: '1.5rem'}}>
              From our humble beginnings in a small kitchen to becoming an internationally recognized brand, our journey has been driven by a relentless pursuit of perfection and a deep love for chocolate.
            </p>
            <p style={{color: '#795548', lineHeight: '1.6'}}>
              Today, we continue to push boundaries while staying true to our roots, ensuring every chocolate tells a story of passion, quality, and sustainability.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            style={styles.storyImage}
          >
            <img 
              src="https://images.unsplash.com/photo-1570913199992-91d07c140e7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800" 
              alt="Our chocolate story" 
              style={{width: '100%', height: 'auto', display: 'block'}}
            />
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      <section style={styles.milestonesSection}>
        <div style={styles.milestonesContainer}>
          <div style={styles.sectionTitle}>
            <h2 style={styles.title}>
              Our Journey
              <span style={styles.titleUnderline}></span>
            </h2>
            <p style={styles.subtitle}>
              Key milestones in our pursuit of chocolate excellence
            </p>
          </div>
          
          <div style={styles.milestonesGrid}>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                style={styles.milestoneCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={styles.milestoneYear}>{milestone.year}</div>
                <h3 style={styles.milestoneTitle}>{milestone.title}</h3>
                <p style={styles.milestoneDescription}>{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={styles.valuesSection}>
        <div style={styles.valuesContainer}>
          <div style={styles.sectionTitle}>
            <h2 style={{...styles.title, color: 'white'}}>
              Our Core Values
              <span style={{...styles.titleUnderline, background: 'linear-gradient(90deg, #FFD700, #FFA000)'}}></span>
            </h2>
            <p style={{...styles.subtitle, color: 'rgba(255, 255, 255, 0.9)'}}>
              The principles that guide everything we do
            </p>
          </div>
          
          <div style={styles.valuesGrid}>
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                style={styles.valueItem}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={styles.valueIcon}>{value.icon}</div>
                <h3 style={styles.valueTitle}>{value.title}</h3>
                <p style={{opacity: 0.9}}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 2rem',
        background: '#FFF8F0',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              color: '#5D4037',
              marginBottom: '1.5rem',
              fontWeight: '700',
            }}>
              Join Our Chocolate Journey
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#795548',
              marginBottom: '2.5rem',
              lineHeight: '1.6',
            }}>
              Experience the difference that passion, craftsmanship, and sustainability make in every bite.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '1.2rem 3rem',
                background: 'linear-gradient(135deg, #D2691E, #8B4513)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              Discover Our Collection
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;