// src/pages/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Truck, 
  Gift, 
  Shield, 
  Heart,
  ArrowRight,
  Sparkles,
  Award,
  Leaf
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './Home.module.css';

// Sample featured products
const featuredProducts = [
  {
    id: 1,
    name: "Dark Chocolate Truffles",
    description: "Rich 70% cocoa with raspberry filling",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400",
    rating: 4.8,
    flavors: ["Dark Chocolate", "Raspberry", "Gourmet"]
  },
  {
    id: 2,
    name: "Milk Chocolate Assortment",
    description: "Creamy milk chocolate with hazelnut crunch",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=400",
    rating: 4.9,
    flavors: ["Milk Chocolate", "Hazelnut", "Caramel"]
  },
  {
    id: 3,
    name: "Artisan Chocolate Bars",
    description: "Single-origin cocoa with sea salt",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400",
    rating: 4.7,
    flavors: ["Sea Salt", "Single-Origin", "Artisan"]
  }
];

const Home = () => {
  const { addToCart } = useCart();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { icon: <Truck size={40} />, title: "Free Shipping", description: "On orders over $50" },
    { icon: <Gift size={40} />, title: "Gift Wrapping", description: "Beautiful presentation" },
    { icon: <Shield size={40} />, title: "Secure Payment", description: "256-bit encryption" },
    { icon: <Leaf size={40} />, title: "Sustainable", description: "Ethically sourced" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <div className={styles.heroBadge}>
            <Sparkles size={16} />
            <span>Premium Artisanal Chocolates</span>
          </div>
          <h1 className={styles.heroTitle}>Artisanal Chocolate Experience</h1>
          <p className={styles.heroSubtitle}>
            Handcrafted luxury chocolates, delivered to your doorstep
          </p>
          <div className={styles.heroButtons}>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.heroButtonPrimary}
              >
                Explore Collection
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            <Link to="/subscription">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.heroButtonSecondary}
              >
                Subscribe & Save 20%
              </motion.button>
            </Link>
          </div>
        </motion.div>
        
        {/* Chocolate Particles Animation */}
        <div className={styles.chocolateParticles}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.particle}
              initial={{ y: -100, x: Math.random() * 100 }}
              animate={{ 
                y: window.innerHeight,
                x: Math.random() * 100 - 50 
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                background: i % 3 === 0 ? '#8B4513' : i % 3 === 1 ? '#5D4037' : '#D2691E',
                borderRadius: i % 2 === 0 ? '50%' : '30%'
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.sectionHeader}
          >
            <h2>Why Choose ChocoLuxe?</h2>
            <p>Experience the difference with our premium chocolate selection</p>
          </motion.div>
          
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`${styles.featureCard} ${activeFeature === index ? styles.active : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.productsSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={styles.sectionHeader}
          >
            <div className={styles.sectionTitleRow}>
              <h2>Featured Chocolates</h2>
              <Link to="/products" className={styles.viewAllLink}>
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <p>Our most loved artisanal creations</p>
          </motion.div>
          
          <div className={styles.productsGrid}>
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className={styles.productCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} />
                  <button 
                    className={styles.wishlistButton}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={20} />
                  </button>
                  {product.rating >= 4.5 && (
                    <div className={styles.bestSellerBadge}>
                      <Award size={16} />
                      <span>Best Seller</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.productInfo}>
                  <div className={styles.rating}>
                    <Star size={16} fill="#FFD700" />
                    <span>{product.rating}</span>
                    <span className={styles.reviews}>(128)</span>
                  </div>
                  
                  <h3>{product.name}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  
                  <div className={styles.flavorTags}>
                    {product.flavors.map(flavor => (
                      <span key={flavor} className={styles.flavorTag}>{flavor}</span>
                    ))}
                  </div>
                  
                  <div className={styles.productFooter}>
                    <div className={styles.price}>${product.price.toFixed(2)}</div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={styles.addToCartButton}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Banner */}
      <section className={styles.subscriptionBanner}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={styles.bannerContent}
          >
            <div className={styles.bannerBadge}>
              <Gift size={16} />
              <span>Limited Time Offer</span>
            </div>
            <h2>Monthly Chocolate Journey</h2>
            <p>Subscribe now and receive a curated box of premium chocolates every month. Cancel anytime.</p>
            <div className={styles.bannerFeatures}>
              <span>🎁 Free gift wrapping</span>
              <span>✨ Exclusive flavors</span>
              <span>📦 Free shipping</span>
            </div>
            <Link to="/subscription">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.subscribeButton}
              >
                Start Your Journey
                <Sparkles size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={styles.sectionHeader}
          >
            <h2>Sweet Words from Chocolate Lovers</h2>
            <p>Join thousands of satisfied customers</p>
          </motion.div>
          
          <div className={styles.testimonialsGrid}>
            {[
              {
                name: "Sarah M.",
                text: "The best chocolate I've ever tasted! The subscription box is always a delightful surprise.",
                rating: 5
              },
              {
                name: "James L.",
                text: "Perfect gifts for my team. The custom packaging made it extra special!",
                rating: 5
              },
              {
                name: "Emma R.",
                text: "As a vegan, I struggle to find good chocolate. This is absolutely divine!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className={styles.testimonialCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className={styles.testimonialStars}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="#FFD700" />
                  ))}
                </div>
                <p className={styles.testimonialText}>"{testimonial.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={styles.ctaContent}
          >
            <h2>Ready for a Chocolate Adventure?</h2>
            <p>Join our chocolate community and discover new flavors every month</p>
            <div className={styles.ctaButtons}>
              <Link to="/custom">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.ctaButtonPrimary}
                >
                  Build Your Box
                </motion.button>
              </Link>
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.ctaButtonSecondary}
                >
                  Shop Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;