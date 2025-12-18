// Update src/App.jsx to include Footer
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import './App.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Products = lazy(() => import('./pages/Products/Products'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Subscription = lazy(() => import('./pages/Subscription'));
const CustomBox = lazy(() => import('./pages/CustomBox'));

const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#FFF8F0'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '4px solid #F3F3F3',
      borderTop: '4px solid #D2691E',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/custom-box" element={<CustomBox />} />
                {/* Add more routes as needed */}
                <Route path="*" element={
                  <div style={{ textAlign: 'center', padding: '4rem', minHeight: '50vh' }}>
                    <h1 style={{ color: '#5D4037' }}>404 - Page Not Found</h1>
                    <p style={{ color: '#795548' }}>The page you're looking for doesn't exist.</p>
                  </div>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;