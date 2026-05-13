/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, createContext, useContext, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import AIRecommendation from './pages/AIRecommendation';
import DressDetails from './pages/DressDetails';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import { Dress } from './types';

interface CartItem extends Dress {
  quantity: number;
  type: 'buy' | 'rent';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (dress: Dress, type: 'buy' | 'rent') => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

const PageWrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (dress: Dress, type: 'buy' | 'rent') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dress.id && item.type === type);
      if (existing) {
        return prev.map((item) =>
          item.id === dress.id && item.type === type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...dress, quantity: 1, type }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <PageWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/recommend" element={<AIRecommendation />} />
                <Route path="/dress/:id" element={<DressDetails />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </PageWrapper>
          </main>
          <Footer />
        </div>
      </Router>
    </CartContext.Provider>
  );
}
