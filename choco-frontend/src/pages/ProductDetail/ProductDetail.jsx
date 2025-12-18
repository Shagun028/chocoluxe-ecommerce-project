import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import Button from '../../components/ui/Button/Button';
import ChocolateScene from '../../components/three/Scene/Scene';
import styles from './ProductDetail.module.css';

// Mock product data
const product = {
  id: 1,
  name: 'Dark Chocolate Truffles Collection',
  description: 'An exquisite collection of 85% dark chocolate truffles, each hand-finished with premium ingredients. Features sea salt, raspberry, and espresso varieties.',
  longDescription: `Our Dark Chocolate Truffles Collection represents the pinnacle of our craft. Each truffle is made from single-origin cocoa beans sourced directly from ethical farms in Madagascar. The 72-hour conching process develops unparalleled smoothness, while the careful tempering creates that perfect snap.

  The collection includes three distinct varieties:
  • Sea Salt Dark: 85% dark chocolate with Himalayan pink salt
  • Raspberry Infusion: Dark chocolate ganache with real raspberry puree
  • Espresso Crunch: Intense dark chocolate with arabica coffee beans
  
  Each box contains 16 truffles (approximately 250g) and makes for an impressive gift or personal indulgence.`,
  price: 42.99,
  originalPrice: 49.99,
  rating: 4.8,
  reviewCount: 127,
  category: 'Truffles',
  weight: '250g',
  ingredients: 'Cocoa beans, cocoa butter, sugar, sea salt, raspberry puree, coffee beans',
  allergens: 'Contains milk. May contain traces of nuts.',
  images: [
    'https://images.unsplash.com/photo-1590099033615-be195f8d575c?w=800',
    'https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=800',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800',
  ],
  features: [
    'Single-origin Madagascar cocoa',
    '72-hour conching process',
    'Handcrafted in Belgium',
    'Ethically sourced ingredients',
    'Award-winning recipe',
  ],
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.productDetail}
    >
      <div className="container">
        {/* Product Header */}
        <div className={styles.breadcrumb}>
          <span>Shop</span>
          <span>›</span>
          <span>{product.category}</span>
          <span>›</span>
          <span>{product.name}</span>
        </div>

        <div className={styles.productContent}>
          {/* Left Column - Images & 3D */}
          <div className={styles.mediaColumn}>
            <div className={styles.mainImage}>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={styles.image}
              />
            </div>

            <div className={styles.imageThumbnails}>
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${
                    selectedImage === index ? styles.active : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`View ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className={styles.threeDView}>
              <h3 className={styles.viewTitle}>3D View</h3>
              <div className={styles.canvasContainer}>
                <ChocolateScene modelCount={1} autoRotate={true} />
              </div>
              <p className={styles.viewHint}>
                Drag to rotate • Scroll to zoom
              </p>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className={styles.infoColumn}>
            <div className={styles.productHeader}>
              <span className={styles.category}>{product.category}</span>
              <h1 className={styles.productName}>{product.name}</h1>
              
              <div className={styles.rating}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < Math.floor(product.rating) ? '#D2691E' : 'none'}
                      color="#D2691E"
                    />
                  ))}
                </div>
                <span className={styles.ratingText}>
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <p className={styles.productDescription}>{product.description}</p>

            <div className={styles.features}>
              {product.features.map((feature, index) => (
                <div key={index} className={styles.feature}>
                  <div className={styles.featureDot} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className={styles.pricing}>
              <div className={styles.priceContainer}>
                <span className={styles.currentPrice}>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className={styles.saveBadge}>
                  Save {((1 - product.price / product.originalPrice) * 100).toFixed(0)}%
                </span>
              </div>
              <span className={styles.weight}>{product.weight}</span>
            </div>

            <div className={styles.actions}>
              <div className={styles.quantitySelector}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={styles.quantityButton}
                >
                  −
                </button>
                <span className={styles.quantity}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={styles.quantityButton}
                >
                  +
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                size="large"
                fullWidth
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>

            <div className={styles.shippingInfo}>
              <div className={styles.shippingItem}>
                <Truck size={24} />
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over $50</p>
                </div>
              </div>
              <div className={styles.shippingItem}>
                <Shield size={24} />
                <div>
                  <strong>Quality Guarantee</strong>
                  <p>30-day satisfaction or return</p>
                </div>
              </div>
              <div className={styles.shippingItem}>
                <RefreshCw size={24} />
                <div>
                  <strong>Freshness Promise</strong>
                  <p>Made to order, shipped daily</p>
                </div>
              </div>
            </div>

            <div className={styles.details}>
              <h3>Product Details</h3>
              <p>{product.longDescription}</p>
              
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <strong>Weight:</strong>
                  <span>{product.weight}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Ingredients:</strong>
                  <span>{product.ingredients}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Allergens:</strong>
                  <span>{product.allergens}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Shelf Life:</strong>
                  <span>3 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;