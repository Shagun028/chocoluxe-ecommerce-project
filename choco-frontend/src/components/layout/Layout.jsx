import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="main-content"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;