import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle';
import ProductCard from '../../components/shared/ProductCard/ProductCard';
import Button from '../../components/ui/Button/Button';
import styles from './Shop.module.css';

// Mock data
const allProducts = [
  // Add more products here
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Premium Chocolate ${i + 1}`,
    description: 'Exquisite chocolate creation',
    price: 24.99 + i * 5,
    category: ['Truffles', 'Donuts', 'Bars', 'Gift Sets'][i % 4],
    image: `https://images.unsplash.com/photo-1590099033615-be195f8d575c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    isNew: i < 4,
  })),
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = allProducts.filter(
    (product) => 
      selectedCategory === 'All' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const categories = ['All', 'Truffles', 'Donuts', 'Bars', 'Gift Sets'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.shop}
    >
      <div className="container">
        {/* Hero Section */}
        <div className={styles.hero}>
          <SectionTitle
            title="Artisan Chocolate Shop"
            subtitle="Premium Selection"
            align="center"
          />
          <p className={styles.heroDescription}>
            Discover our curated collection of handcrafted chocolates, 
            each piece a testament to our commitment to excellence.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>
              <Filter size={20} />
              <span>Filter by</span>
            </div>
            <div className={styles.categoryFilters}>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`${styles.categoryFilter} ${
                    selectedCategory === category ? styles.active : ''
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sortGroup}>
            <label htmlFor="sort" className={styles.sortLabel}>Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index % 8}
            />
          ))}
        </div>

        {/* Load More */}
        <div className={styles.loadMore}>
          <Button variant="outline" size="large">
            Load More Products
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;