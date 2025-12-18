// src/components/layout/Header/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Menu, 
  X,
  Heart,
  ShoppingCart,
  Package,
  Gift
} from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { itemCount } = useCart();

  const navItems = [
    { 
      path: '/', 
      label: 'Home',
      icon: null
    },
    { 
      path: '/products', 
      label: 'Shop',
      icon: <ShoppingBag size={18} />
    },
    { 
      path: '/subscription', 
      label: 'Subscription',
      icon: <Package size={18} />
    },
    { 
      path: '/custom-box', 
      label: 'Custom Box',
      icon: <Gift size={18} />
    },
    { 
      path: '/about', 
      label: 'About',
      icon: null
    },
    { 
      path: '/cart', 
      label: 'Cart',
      icon: <ShoppingCart size={18} />
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
          <ShoppingBag size={32} className={styles.logoIcon} />
          <div className={styles.logoText}>
            <span className={styles.logoMain}>ChocoLuxe</span>
            <span className={styles.logoSub}>Premium Chocolates</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${
                window.location.pathname === item.path ? styles.active : ''
              }`}
            >
              {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
              {item.label}
              {item.path === '/cart' && itemCount > 0 && (
                <span className={styles.cartBadge}>{itemCount}</span>
              )}
              {item.path === '/custom-box' && (
                <span className={styles.newBadge}>New</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search dark chocolate, truffles, gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button 
                type="button" 
                className={styles.clearButton}
                onClick={() => setSearchQuery('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        {/* Action Icons */}
        <div className={styles.actions}>
          <Link to="/wishlist" className={styles.actionIcon} title="Wishlist">
            <Heart size={22} />
            <span className={styles.actionLabel}>Wishlist</span>
          </Link>
          
          <Link to="/auth/login" className={styles.actionIcon} title="Account">
            <User size={22} />
            <span className={styles.actionLabel}>Account</span>
          </Link>
          
          <Link to="/cart" className={`${styles.actionIcon} ${styles.cartIcon}`} title="Cart">
            <ShoppingCart size={22} />
            <span className={styles.actionLabel}>Cart</span>
            {itemCount > 0 && (
              <span className={styles.cartCount}>{itemCount}</span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.mobileOverlay}
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: isMenuOpen ? 0 : '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className={styles.mobileMenu}
        >
          {/* Mobile Menu Header */}
          <div className={styles.mobileHeader}>
            <Link to="/" className={styles.mobileLogo} onClick={() => setIsMenuOpen(false)}>
              <ShoppingBag size={24} />
              <span>ChocoLuxe</span>
            </Link>
            <button 
              className={styles.closeButton}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className={styles.mobileSearch}>
            <div className={styles.mobileSearchWrapper}>
              <Search size={20} className={styles.mobileSearchIcon} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.mobileSearchInput}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className={styles.mobileClearButton}
                  onClick={() => setSearchQuery('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Mobile Navigation */}
          <div className={styles.mobileNav}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.mobileNavLink} ${
                  window.location.pathname === item.path ? styles.mobileActive : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className={styles.mobileNavContent}>
                  {item.icon && <span className={styles.mobileNavIcon}>{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
                {item.path === '/cart' && itemCount > 0 && (
                  <span className={styles.mobileCartBadge}>{itemCount}</span>
                )}
                {item.path === '/custom-box' && (
                  <span className={styles.mobileNewBadge}>New</span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile User Actions */}
          <div className={styles.mobileActions}>
            <Link 
              to="/wishlist" 
              className={styles.mobileAction}
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart size={20} />
              <span>Wishlist</span>
            </Link>
            <Link 
              to="/auth/login" 
              className={styles.mobileAction}
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={20} />
              <span>Account</span>
            </Link>
          </div>

          {/* Mobile Cart Summary */}
          <div className={styles.mobileCartSummary}>
            <Link 
              to="/cart" 
              className={styles.mobileCartButton}
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart size={20} />
              <div className={styles.mobileCartInfo}>
                <span>View Cart</span>
                {itemCount > 0 && (
                  <span className={styles.mobileCartItems}>{itemCount} items</span>
                )}
              </div>
              {itemCount > 0 && (
                <div className={styles.mobileCartArrow}>→</div>
              )}
            </Link>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;