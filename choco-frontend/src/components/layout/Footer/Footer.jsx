// src/components/layout/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';

const Footer = () => {
  const footerStyle = {
    background: 'linear-gradient(135deg, #5D4037 0%, #3E2723 100%)',
    color: 'white',
    padding: '4rem 2rem 2rem',
    marginTop: 'auto',
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
  };

  const sectionStyle = {
    marginBottom: '2rem',
  };

  const headingStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#FFD700',
  };

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.8rem',
    transition: 'color 0.3s',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Brand Info */}
        <div style={sectionStyle}>
          <h3 style={{...headingStyle, fontSize: '2rem'}}>ChocoLuxe</h3>
          <p style={{color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6', marginBottom: '1.5rem'}}>
            Crafting moments of joy through exquisite chocolate experiences since 2015.
          </p>
          <div style={{display: 'flex', gap: '1rem'}}>
            <a href="#" style={{color: 'white'}}><Facebook size={24} /></a>
            <a href="#" style={{color: 'white'}}><Instagram size={24} /></a>
            <a href="#" style={{color: 'white'}}><Twitter size={24} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={sectionStyle}>
          <h4 style={headingStyle}>Quick Links</h4>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/products" style={linkStyle}>Shop All</Link>
          <Link to="/subscription" style={linkStyle}>Subscription</Link>
          <Link to="/custom" style={linkStyle}>Custom Box</Link>
          <Link to="/about" style={linkStyle}>Our Story</Link>
        </div>

        {/* Support */}
        <div style={sectionStyle}>
          <h4 style={headingStyle}>Support</h4>
          <Link to="/contact" style={linkStyle}>Contact Us</Link>
          <Link to="/faq" style={linkStyle}>FAQ</Link>
          <Link to="/shipping" style={linkStyle}>Shipping Info</Link>
          <Link to="/returns" style={linkStyle}>Returns</Link>
          <Link to="/privacy" style={linkStyle}>Privacy Policy</Link>
        </div>

        {/* Contact Info */}
        <div style={sectionStyle}>
          <h4 style={headingStyle}>Contact Us</h4>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.8)'}}>
            <Phone size={20} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.8)'}}>
            <Mail size={20} />
            <span>hello@chocoluxe.com</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'rgba(255, 255, 255, 0.8)'}}>
            <MapPin size={20} />
            <span>123 Chocolate Ave, Sweet City</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        paddingTop: '2rem',
        marginTop: '3rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '0.9rem',
      }}>
        <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
          Made with <Heart size={16} fill="#ff4757" color="#ff4757" /> © {new Date().getFullYear()} ChocoLuxe. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;