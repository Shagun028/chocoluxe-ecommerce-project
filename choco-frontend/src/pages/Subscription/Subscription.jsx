import React, { useState, useEffect } from 'react';
import './Subscription.css';

const subscriptionPlans = [
  {
    id: 1,
    name: "Monthly Delight",
    type: "MONTHLY",
    price: 24.99,
    barsPerMonth: 4,
    description: "Perfect for chocolate lovers",
    features: ["4 premium chocolate bars", "Free shipping", "Flexible cancellation"]
  },
  {
    id: 2,
    name: "Quarterly Feast",
    type: "QUARTERLY",
    price: 69.99,
    barsPerMonth: 6,
    description: "Great value for regular indulgence",
    features: ["6 bars per month", "15% discount", "Priority shipping", "Surprise bonus"]
  },
  {
    id: 3,
    name: "Yearly Celebration",
    type: "YEARLY",
    price: 249.99,
    barsPerMonth: 8,
    description: "The ultimate chocolate experience",
    features: ["8 bars per month", "25% discount", "Free gift wrapping", "VIP support", "Birthday surprise"]
  }
];

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [preferences, setPreferences] = useState({
    darkChocolate: true,
    milkChocolate: true,
    whiteChocolate: false,
    nuts: true,
    fruits: false
  });
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  useEffect(() => {
    // Fetch user's existing subscriptions
    fetchUserSubscriptions();
  }, []);

  const fetchUserSubscriptions = async () => {
    try {
      // In real app, you'd get userId from auth context
      const response = await fetch('http://localhost:8080/subscriptions/user/1'); // Demo user ID
      const data = await response.json();
      setUserSubscriptions(data.subscriptions || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handleSubscribe = async (plan) => {
    if (!selectedPlan) {
      alert('Please select a subscription plan first');
      return;
    }

    const subscriptionData = {
      subscriptionType: plan.type,
      price: plan.price,
      chocolateBarsPerMonth: plan.barsPerMonth,
      preferences: JSON.stringify(preferences),
      status: "ACTIVE"
    };

    try {
      const response = await fetch('http://localhost:8080/subscriptions/user/1', { // Demo user ID
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriptionData)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Subscription created successfully!');
        fetchUserSubscriptions(); // Refresh list
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('Failed to create subscription');
    }
  };

  const handleCancelSubscription = async (subscriptionId) => {
    if (window.confirm('Are you sure you want to cancel this subscription?')) {
      try {
        const response = await fetch(`http://localhost:8080/subscriptions/${subscriptionId}/cancel`, {
          method: 'PATCH'
        });

        if (response.ok) {
          alert('Subscription cancelled successfully');
          fetchUserSubscriptions(); // Refresh list
        }
      } catch (error) {
        console.error('Error cancelling subscription:', error);
      }
    }
  };

  return (
    <div className="subscription-page">
      <div className="subscription-header">
        <h1>Chocolate Subscription Plans</h1>
        <p className="subtitle">Get premium chocolates delivered to your door every month</p>
      </div>

      <div className="subscription-plans">
        {subscriptionPlans.map(plan => (
          <div 
            key={plan.id} 
            className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlan(plan)}
          >
            <div className="plan-header">
              <h3>{plan.name}</h3>
              <div className="plan-price">
                <span className="price">${plan.price}</span>
                <span className="period">
                  {plan.type === 'MONTHLY' ? '/month' : 
                   plan.type === 'QUARTERLY' ? '/quarter' : '/year'}
                </span>
              </div>
            </div>
            
            <div className="plan-details">
              <p className="plan-description">{plan.description}</p>
              <div className="bars-count">
                <span className="bars-icon">🍫</span>
                <span>{plan.barsPerMonth} bars/month</span>
              </div>
              
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              className="select-plan-btn"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPlan(plan);
              }}
            >
              {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="subscription-form">
          <h2>Customize Your {selectedPlan.name}</h2>
          
          <div className="preferences-section">
            <h3>Chocolate Preferences</h3>
            <div className="preferences-grid">
              {Object.entries(preferences).map(([key, value]) => (
                <label key={key} className="preference-item">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      [key]: e.target.checked
                    })}
                  />
                  <span className="preference-label">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Plan:</span>
                <span>{selectedPlan.name}</span>
              </div>
              <div className="summary-row">
                <span>Bars per month:</span>
                <span>{selectedPlan.barsPerMonth}</span>
              </div>
              <div className="summary-row">
                <span>Price:</span>
                <span className="total-price">${selectedPlan.price}</span>
              </div>
            </div>
            
            <button 
              className="subscribe-btn"
              onClick={() => handleSubscribe(selectedPlan)}
            >
              Start Subscription
            </button>
          </div>
        </div>
      )}

      {userSubscriptions.length > 0 && (
        <div className="current-subscriptions">
          <h2>Your Current Subscriptions</h2>
          <div className="subscriptions-list">
            {userSubscriptions.map(sub => (
              <div key={sub.id} className="subscription-item">
                <div className="subscription-info">
                  <h4>{sub.subscriptionType} Plan</h4>
                  <p>Status: <span className={`status-${sub.status.toLowerCase()}`}>{sub.status}</span></p>
                  <p>Next Delivery: {new Date(sub.nextDeliveryDate).toLocaleDateString()}</p>
                  <p>Price: ${sub.price}</p>
                </div>
                {sub.status === 'ACTIVE' && (
                  <button 
                    className="cancel-btn"
                    onClick={() => handleCancelSubscription(sub.id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Subscription;