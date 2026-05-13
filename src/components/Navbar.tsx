import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Sparkles, Moon, Sun, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../App';
import { NAV_LINKS } from '../constants';
import { cn } from '../lib/utils';
import { useFirebase } from '../components/FirebaseProvider';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { cartCount } = useCart();
  const { user, profile, isAdmin, signOut } = useFirebase();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6',
        isScrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10 py-3' : 'bg-black/30 py-4'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black font-sans tracking-tighter logo-gradient">
            DandiyaAI Fashion
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-all hover:opacity-100 uppercase tracking-widest text-[10px] font-bold',
                location.pathname === link.path ? 'opacity-100 text-brand-yellow' : 'opacity-70'
              )}
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className={cn(
                'text-sm font-medium transition-all hover:opacity-100 uppercase tracking-widest text-[10px] font-bold text-brand-pink',
                location.pathname === '/admin' ? 'opacity-100 text-brand-pink underline underline-offset-8' : 'opacity-70'
              )}
            >
              Admin
            </Link>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full border border-white/20"
                />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">{user.displayName?.split(' ')[0]}</span>
              </div>
              <button 
                onClick={() => signOut()}
                className="opacity-70 hover:opacity-100 transition-opacity text-white"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="opacity-70 hover:opacity-100 transition-opacity text-white">
              <User size={20} />
            </Link>
          )}
          
          <Link to="/cart" className="relative group opacity-70 hover:opacity-100 transition-opacity text-white">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-600 dark:text-gray-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 mt-4 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-brand-orange uppercase tracking-widest font-bold text-xs"
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-brand-pink hover:text-brand-pink/80 uppercase tracking-widest font-bold text-xs"
                >
                  Admin Panel
                </Link>
              )}
              <div className="flex items-center gap-6 pt-4 border-t dark:border-gray-800">
                <button onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                {user ? (
                  <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }}>
                    <LogOut size={24} className="text-gray-600 dark:text-gray-300" />
                  </button>
                ) : (
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <User size={24} />
                  </Link>
                )}
                <Link to="/cart" className="relative" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShoppingBag size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
