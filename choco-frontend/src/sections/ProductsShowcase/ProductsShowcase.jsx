import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle';
import ProductCard from '../../components/shared/ProductCard/ProductCard';
import Button from '../../components/ui/Button/Button';
import { ArrowRight } from 'lucide-react';
import styles from './ProductsShowcase.module.css';

// Mock data - replace with API call
const products = [
  {
    id: 1,
    name: 'Dark Chocolate Truffles',
    description: 'Rich 85% dark chocolate with sea salt',
    price: 28.99,
    originalPrice: 34.99,
    category: 'Truffles',
    image: 'https://images.unsplash.com/photo-1590099033615-be195f8d575c?w=800',
    isNew: true,
  },
  {
    id: 2,
    name: 'Hazelnut Praline Donut',
    description: 'Chocolate-glazed donut with hazelnut filling',
    price: 18.50,
    category: 'Donuts',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w-800',
  },
  {
    id: 3,
    name: 'Artisan Chocolate Bar',
    description: 'Single-origin Madagascar 70%',
    price: 12.99,
    category: 'Bars',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800',
    isNew: true,
  },
  {
    id: 4,
    name: 'Caramel Sea Salt Collection',
    description: 'Assorted caramel-filled chocolates',
    price: 42.99,
    originalPrice: 49.99,
    category: 'Gift Sets',
    image: 'https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=800',
  },
];

const ProductsShowcase = () => {
  return (
    <section className={`${styles.showcase} section-padding`}>
      <div className="container">
        <div className={styles.header}>
          <SectionTitle
            title="Signature Collections"
            subtitle="Handcrafted Excellence"
            align="center"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.controls}
          >
            <div className={styles.categories}>
              {['All', 'Truffles', 'Donuts', 'Bars', 'Gift Sets'].map((cat) => (
                <button
                  key={cat}
                  className={`${styles.categoryButton} ${
                    cat === 'All' ? styles.active : ''
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <Link to="/shop">
              <Button
                variant="outline"
                endIcon={<ArrowRight size={20} />}
              >
                View All Products
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className={styles.productsGrid}>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.ctaSection}
        >
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>
              Ready to Experience Luxury Chocolate?
            </h3>
            <p className={styles.ctaDescription}>
              Join thousands of satisfied customers and discover why our 
              chocolates are award-winning.
            </p>
          </div>
          <Button size="large">
            Start Your Chocolate Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsShowcase;