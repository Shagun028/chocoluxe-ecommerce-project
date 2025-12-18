import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import { useUI } from '../../../hooks/useUI';
import styles from './CartSidebar.module.css';

const CartSidebar = () => {
  const { isCartOpen, closeCart } = useUI();
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (id, delta) => {
    const item = items.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className={styles.backdrop}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className={styles.sidebar}
          >
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <ShoppingBag size={24} />
                <h2 className={styles.title}>Your Cart</h2>
              </div>
              <button onClick={closeCart} className={styles.closeButton}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.content}>
              {items.length === 0 ? (
                <div className={styles.emptyCart}>
                  <ShoppingBag size={64} />
                  <h3 className={styles.emptyTitle}>Your cart is empty</h3>
                  <p className={styles.emptyText}>
                    Add some delicious chocolates to get started
                  </p>
                  <button onClick={closeCart} className={styles.continueShopping}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.items}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={styles.cartItem}
                      >
                        <div className={styles.itemImage}>
                          <img src={item.image} alt={item.name} />
                        </div>
                        
                        <div className={styles.itemDetails}>
                          <h4 className={styles.itemName}>{item.name}</h4>
                          <p className={styles.itemPrice}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          
                          <div className={styles.itemActions}>
                            <div className={styles.quantityControl}>
                              <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className={styles.quantityButton}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <span className={styles.quantity}>{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className={styles.quantityButton}
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className={styles.removeButton}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className={styles.summary}>
                    <div className={styles.summaryRow}>
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Shipping</span>
                      <span>{total > 50 ? 'Free' : '$5.99'}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Estimated Tax</span>
                      <span>${(total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryDivider} />
                    <div className={`${styles.summaryRow} ${styles.total}`}>
                      <span>Total</span>
                      <span>
                        ${(total + (total > 50 ? 0 : 5.99) + total * 0.08).toFixed(2)}
                      </span>
                    </div>
                    
                    <button className={styles.checkoutButton}>
                      Proceed to Checkout
                    </button>
                    
                    <button onClick={clearCart} className={styles.clearButton}>
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;