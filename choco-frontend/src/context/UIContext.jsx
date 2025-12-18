import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
    setIsMenuOpen(false);
  };

  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const openMenu = () => {
    setIsMenuOpen(true);
    setIsCartOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <UIContext.Provider
      value={{
        isCartOpen,
        isMenuOpen,
        openCart,
        closeCart,
        toggleCart,
        openMenu,
        closeMenu,
        toggleMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};