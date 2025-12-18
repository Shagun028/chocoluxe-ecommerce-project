import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext'; // If you have cart context
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // If using cart context

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products from backend...');
      const response = await fetch('http://localhost:8080/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Backend response:', data);
      
      // Extract products array from response
      // If backend returns {products: [...]}, use data.products
      // If backend returns array directly, use data
      const productsArray = data.products || data;
      
      if (Array.isArray(productsArray)) {
        setProducts(productsArray);
        setError(null);
      } else {
        throw new Error('Invalid response format from backend');
      }
      
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      // Fallback to sample data
      setProducts([
        {
          id: 1,
          name: 'Dark Chocolate Bar',
          description: 'Premium 85% dark chocolate',
          price: 12.99,
          stockQuantity: 50,
          category: 'chocolate',
          imageUrl: 'https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=400'
        },
        {
          id: 2,
          name: 'Milk Chocolate',
          description: 'Creamy milk chocolate bars',
          price: 9.99,
          stockQuantity: 100,
          category: 'chocolate',
          imageUrl: 'https://images.unsplash.com/photo-1606313564200-75f2d4fa383b?w=400'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    
    // If you have cart context
    if (addToCart) {
      addToCart(product);
    } else {
      // Simple alert for now
      alert(`Added ${product.name} to cart! Price: $${product.price}`);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading delicious chocolates from our kitchen...</p>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Our Premium Chocolate Collection</h1>
        <p className="subtitle">Handcrafted with love, delivered fresh</p>
        
        {error && (
          <div className="error-message">
            <p>⚠️ Note: Using sample data. Backend error: {error}</p>
          </div>
        )}
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.imageUrl || '/default-chocolate.jpg'} 
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=400';
                }}
              />
              {product.stockQuantity < 10 && product.stockQuantity > 0 && (
                <span className="low-stock-badge">Low Stock</span>
              )}
              {product.stockQuantity === 0 && (
                <span className="out-of-stock-badge">Sold Out</span>
              )}
            </div>
            
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description || 'Delicious premium chocolate'}</p>
              
              <div className="product-meta">
                <span className="product-category">{product.category || 'chocolate'}</span>
                <span className="product-stock">
                  {product.stockQuantity > 0 ? `${product.stockQuantity} available` : 'Out of stock'}
                </span>
              </div>
              
              <div className="product-footer">
                <span className="product-price">${product.price?.toFixed(2) || '0.00'}</span>
                <button
                  className={`add-to-cart-btn ${product.stockQuantity === 0 ? 'disabled' : ''}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stockQuantity === 0}
                >
                  {product.stockQuantity === 0 ? 'Sold Out' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && !loading && (
        <div className="no-products">
          <p>No chocolates available at the moment.</p>
          <button onClick={fetchProducts} className="retry-btn">
            Refresh Products
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;