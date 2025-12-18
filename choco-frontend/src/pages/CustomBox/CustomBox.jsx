import React, { useState, useEffect } from 'react';
import './CustomBox.css';

function CustomBox() {
  const [products, setProducts] = useState([]);
  const [boxItems, setBoxItems] = useState([]);
  const [boxName, setBoxName] = useState('');
  const [occasion, setOccasion] = useState('');
  const [message, setMessage] = useState('');
  const [userBoxes, setUserBoxes] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchUserBoxes();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchUserBoxes = async () => {
    try {
      const response = await fetch('http://localhost:8080/custom-boxes/user/1'); // Demo user ID
      const data = await response.json();
      setUserBoxes(data.boxes || []);
    } catch (error) {
      console.error('Error fetching boxes:', error);
    }
  };

  const addToBox = (product) => {
    const existingItem = boxItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      setBoxItems(boxItems.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setBoxItems([
        ...boxItems,
        {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          pricePerItem: product.price
        }
      ]);
    }
  };

  const removeFromBox = (productId) => {
    setBoxItems(boxItems.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromBox(productId);
      return;
    }
    
    setBoxItems(boxItems.map(item =>
      item.productId === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const calculateTotal = () => {
    return boxItems.reduce((total, item) => 
      total + (item.pricePerItem * item.quantity), 0
    ).toFixed(2);
  };

  const createCustomBox = async () => {
    if (boxItems.length === 0) {
      alert('Please add at least one item to your box');
      return;
    }

    if (!boxName.trim()) {
      alert('Please give your box a name');
      return;
    }

    const customBoxData = {
      boxName: boxName,
      occasion: occasion,
      message: message,
      totalItems: boxItems.length,
      totalPrice: parseFloat(calculateTotal()),
      items: boxItems,
      status: "DRAFT"
    };

    try {
      const response = await fetch('http://localhost:8080/custom-boxes/user/1', { // Demo user ID
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customBoxData)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Custom box created successfully!');
        setBoxItems([]);
        setBoxName('');
        setOccasion('');
        setMessage('');
        fetchUserBoxes(); // Refresh list
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating custom box:', error);
      alert('Failed to create custom box');
    }
  };

  const updateBoxStatus = async (boxId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/custom-boxes/${boxId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        alert('Box status updated');
        fetchUserBoxes(); // Refresh list
      }
    } catch (error) {
      console.error('Error updating box status:', error);
    }
  };

  return (
    <div className="custom-box-page">
      <div className="custom-box-header">
        <h1>Create Your Custom Chocolate Box</h1>
        <p className="subtitle">Mix and match your favorite chocolates to create the perfect gift</p>
      </div>

      <div className="custom-box-container">
        <div className="products-section">
          <h2>Available Chocolates</h2>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-item">
                <div className="product-image">
                  <img 
                    src={product.imageUrl || '/default-chocolate.jpg'} 
                    alt={product.name}
                  />
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <p className="product-stock">
                    {product.stockQuantity > 0 ? 'In stock' : 'Out of stock'}
                  </p>
                  <button
                    className="add-to-box-btn"
                    onClick={() => addToBox(product)}
                    disabled={product.stockQuantity === 0}
                  >
                    Add to Box
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="box-section">
          <div className="box-details">
            <h2>Your Custom Box</h2>
            
            <div className="box-form">
              <input
                type="text"
                placeholder="Box Name (e.g., Birthday Gift)"
                value={boxName}
                onChange={(e) => setBoxName(e.target.value)}
                className="box-input"
              />
              
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="box-select"
              >
                <option value="">Select Occasion (Optional)</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Thank You">Thank You</option>
                <option value="Just Because">Just Because</option>
                <option value="Holiday">Holiday</option>
              </select>
              
              <textarea
                placeholder="Add a personal message (Optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="box-textarea"
                rows="3"
              />
            </div>

            <div className="box-items">
              <h3>Items in Box ({boxItems.length})</h3>
              
              {boxItems.length === 0 ? (
                <p className="empty-box">Your box is empty. Add some chocolates!</p>
              ) : (
                <div className="items-list">
                  {boxItems.map(item => (
                    <div key={item.productId} className="box-item">
                      <div className="item-info">
                        <span className="item-name">{item.productName}</span>
                        <span className="item-price">${item.pricePerItem.toFixed(2)} each</span>
                      </div>
                      <div className="item-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="item-quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromBox(item.productId)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="item-total">
                        ${(item.pricePerItem * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="box-summary">
              <div className="summary-row">
                <span>Items:</span>
                <span>{boxItems.length}</span>
              </div>
              <div className="summary-row">
                <span>Total:</span>
                <span className="grand-total">${calculateTotal()}</span>
              </div>
              
              <button
                className="create-box-btn"
                onClick={createCustomBox}
                disabled={boxItems.length === 0}
              >
                Create Custom Box
              </button>
            </div>
          </div>
        </div>
      </div>

      {userBoxes.length > 0 && (
        <div className="your-boxes">
          <h2>Your Custom Boxes</h2>
          <div className="boxes-list">
            {userBoxes.map(box => (
              <div key={box.id} className="box-card">
                <div className="box-card-header">
                  <h3>{box.boxName}</h3>
                  <span className={`box-status status-${box.status.toLowerCase()}`}>
                    {box.status}
                  </span>
                </div>
                
                {box.occasion && (
                  <p className="box-occasion">Occasion: {box.occasion}</p>
                )}
                
                <div className="box-card-details">
                  <p>Items: {box.totalItems}</p>
                  <p>Total: ${box.totalPrice.toFixed(2)}</p>
                  <p>Created: {new Date(box.createdAt).toLocaleDateString()}</p>
                </div>
                
                {box.items && box.items.length > 0 && (
                  <div className="box-card-items">
                    <h4>Items:</h4>
                    <ul>
                      {box.items.map((item, index) => (
                        <li key={index}>
                          {item.productName} x{item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {box.message && (
                  <p className="box-message">"{box.message}"</p>
                )}
                
                <div className="box-actions">
                  {box.status === 'DRAFT' && (
                    <>
                      <button 
                        className="action-btn order-btn"
                        onClick={() => updateBoxStatus(box.id, 'ORDERED')}
                      >
                        Place Order
                      </button>
                      <button className="action-btn edit-btn">Edit</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomBox;