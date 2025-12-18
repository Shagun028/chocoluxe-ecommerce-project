import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
            loading="lazy"
          />
          
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className={styles.overlay}
          >
            <button
              onClick={handleAddToCart}
              className={styles.addToCart}
              aria-label="Add to cart"
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>
          </motion.div>
          
          <button
            onClick={toggleFavorite}
            className={styles.favoriteButton}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={20}
              fill={isFavorite ? '#D2691E' : 'transparent'}
              color={isFavorite ? '#D2691E' : 'currentColor'}
            />
          </button>
          
          {product.isNew && (
            <span className={styles.badge}>New</span>
          )}
        </div>
        
        <div className={styles.content}>
          <div className={styles.category}>{product.category}</div>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.description}>{product.description}</p>
          
          <div className={styles.footer}>
            <div className={styles.price}>
              ${product.price.toFixed(2)}
              {product.originalPrice && (
                <span className={styles.originalPrice}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={styles.ctaButton}
            >
              <ShoppingBag size={16} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;