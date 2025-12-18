// src/pages/Cart/Cart.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

const Cart = () => {
  const { 
    cart, 
    total, 
    itemCount, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.emptyContent}
        >
          <ShoppingBag size={80} className={styles.emptyIcon} />
          <h2>Your Chocolate Cart is Empty</h2>
          <p>Add some delicious chocolates to get started!</p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.shopButton}
            >
              Browse Chocolates
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartContent}>
        {/* Cart Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.cartHeader}
        >
          <h1>Your Chocolate Cart</h1>
          <p>{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
        </motion.div>

        <div className={styles.cartLayout}>
          {/* Cart Items */}
          <div className={styles.cartItems}>
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={styles.cartItem}
              >
                <div className={styles.itemImage}>
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200'} 
                    alt={item.name}
                  />
                </div>
                
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p className={styles.description}>{item.description}</p>
                  <div className={styles.flavors}>
                    {item.flavors?.map(flavor => (
                      <span key={flavor} className={styles.flavorTag}>{flavor}</span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.itemQuantity}>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className={styles.quantityButton}
                  >
                    <Minus size={16} />
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={styles.quantityButton}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className={styles.itemPrice}>
                  <span className={styles.price}>${(item.price * item.quantity).toFixed(2)}</span>
                  <span className={styles.unitPrice}>${item.price} each</span>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeButton}
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Cart Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={styles.cartSummary}
          >
            <h2>Order Summary</h2>
            
            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span>Subtotal ({itemCount} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              
              <div className={styles.summaryDivider} />
              
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total</span>
                <span>${(total * 1.1).toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.summaryActions}>
              <button 
                onClick={clearCart}
                className={styles.clearButton}
              >
                Clear Cart
              </button>
              
              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.checkoutButton}
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              
              <Link to="/" className={styles.continueShopping}>
                Continue Shopping
              </Link>
            </div>

            <div className={styles.securityNote}>
              <p>🔒 Secure checkout · 256-bit encryption</p>
              <p>🎁 Free gift wrapping available at checkout</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;