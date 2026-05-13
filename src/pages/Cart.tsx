import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../App';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, cartCount, clearCart } = useCart();

  const subtotal = cart.reduce((acc, item) => {
    const price = item.type === 'buy' ? item.price : item.rentPrice;
    return acc + price * item.quantity;
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 150;
  const total = subtotal + shipping;

  if (cartCount === 0) {
    return (
      <div className="pt-32 pb-24 px-6 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-32 h-40 md:w-48 md:h-64 bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1595967734995-5809d4cd5216?auto=format&fit=crop&q=80&w=800" 
            alt="New Collection" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-3xl font-bold dark:text-white mb-4">Your bag is empty</h1>
        <p className="text-gray-500 max-w-sm mb-10">Looking for something traditional? Explore our latest Navratri collection and start adding items to your bag.</p>
        <Link
          to="/collection"
          className="px-8 py-4 bg-brand-orange text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-lg"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-display italic mb-12">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {cart.map((item) => (
            <motion.div
              layout
              key={item.id + item.type}
              className="flex gap-6 p-6 bg-white rounded-3xl shadow-sm text-gray-900"
            >
              <div className="w-24 h-32 md:w-32 md:h-40 rounded-2xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={(item.type === 'buy' ? 'text-brand-purple' : 'text-brand-pink') + " text-[10px] font-bold uppercase tracking-widest"}>
                        {item.type === 'buy' ? 'Purchase' : 'Rental'}
                      </span>
                      <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.category}</span>
                    </div>
                    <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-tighter">Color: {item.color}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-xl">
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-gray-400"><Minus size={14} /></button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-gray-400"><Plus size={14} /></button>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block mb-0 leading-none uppercase font-bold tracking-tighter">Price</span>
                    <span className="text-xl font-black text-brand-maroon">
                      ₹{(item.type === 'buy' ? item.price : item.rentPrice).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          <button
            onClick={clearCart}
            className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest self-start transition-colors"
          >
            Clear bag
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <div className="glass-panel p-10 rounded-[2.5rem]">
            <h2 className="text-xl font-bold mb-8 uppercase tracking-widest">Order Summary</h2>
            <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest mb-6 pb-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Shipping</span>
                <span className="text-brand-yellow">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-10">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-black logo-gradient">₹{total.toLocaleString()}</span>
            </div>
            <button className="w-full py-5 festive-gradient text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3">
              Checkout <ArrowRight size={16} />
            </button>
          </div>

          <div className="p-8 glass-panel rounded-[2rem] flex gap-4 border-l-4 border-l-brand-yellow">
            <ShieldCheck className="text-brand-yellow shrink-0" size={24} />
            <div>
              <p className="text-[10px] font-black text-brand-yellow uppercase tracking-widest mb-1">Authenticity Guaranteed</p>
              <p className="text-[10px] text-gray-400 leading-relaxed uppercase font-bold tracking-tighter">Every outfit undergoes a strict quality check for fabric, mirror work, and embroidery before shipment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
