import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star, ShoppingCart, CalendarRange, Heart, ArrowLeft, Shield, Truck, RefreshCcw, Info, Loader2 } from 'lucide-react';
import { Dress } from '../types';
import { getDressById } from '../lib/firebase/firestore';
import { useCart } from '../App';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function DressDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [dress, setDress] = useState<Dress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDress = async () => {
      if (!id) return;
      try {
        const data = await getDressById(id);
        if (data) {
          setDress(data as Dress);
        }
      } catch (error) {
        console.error('Error fetching dress details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDress();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-6 flex flex-col items-center justify-center min-h-[70vh]">
        <Loader2 className="animate-spin text-brand-orange mb-4" size={40} />
        <p className="text-gray-500 font-medium tracking-widest uppercase text-[10px]">Fetching Details...</p>
      </div>
    );
  }

  if (!dress) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold dark:text-white">Dress not found</h2>
        <Link to="/collection" className="text-brand-orange font-bold mt-4 block">Back to collection</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <Link to="/collection" className="flex items-center gap-2 text-gray-500 hover:text-brand-orange transition-colors mb-12 self-start w-fit">
        <ArrowLeft size={18} /> Back to collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Left - Images */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl relative group"
          >
            <img src={dress.image} alt={dress.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute top-6 right-6">
              <button className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 hover:text-brand-pink transition-colors">
                <Heart size={20} />
              </button>
            </div>
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 opacity-50 cursor-pointer hover:opacity-100 transition-opacity">
                <img src={dress.image} alt="Thumbnail" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Right - Info */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full">{dress.category}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-purple bg-brand-purple/10 px-3 py-1 rounded-full">{dress.style}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-display dark:text-white mb-4 leading-tight">{dress.name}</h1>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-1.5 text-yellow-500">
                  <Star size={18} fill="currentColor" />
                  <span className="font-bold text-lg">{dress.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">124 Reviews</span>
            </div>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            {dress.description} This exquisite piece is a blend of traditional values and modern comfort, perfect for long hours of dancing at your favorite Navratri venue.
          </p>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Select Size</label>
            <div className="flex gap-3">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "w-14 h-14 rounded-2xl border-2 font-bold transition-all flex items-center justify-center",
                    selectedSize === size ? "border-brand-orange bg-brand-orange text-white shadow-lg shadow-brand-orange/20" : "border-gray-100 dark:border-gray-700 dark:text-white hover:border-brand-orange"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-800/50 p-8 rounded-[2rem] border dark:border-gray-700">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase mb-1 block">Purchase Price</span>
              <span className="text-3xl font-bold dark:text-white">₹{dress.price.toLocaleString()}</span>
              <button
                onClick={() => addToCart(dress, 'buy')}
                className="w-full mt-6 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                <ShoppingCart size={20} /> Buy Now
              </button>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-6 md:pt-0 md:pl-8">
              <span className="text-xs font-bold text-gray-400 uppercase mb-1 block">Rental / Day</span>
              <span className="text-3xl font-bold text-brand-pink">₹{dress.rentPrice.toLocaleString()}</span>
              <button
                onClick={() => addToCart(dress, 'rent')}
                className="w-full mt-6 py-4 border-2 border-brand-orange text-brand-orange font-bold rounded-2xl hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <CalendarRange size={20} /> Rent Now
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-brand-purple">
                <Truck size={20} />
              </div>
              <span className="text-xs font-medium dark:text-gray-300">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-brand-pink">
                <RefreshCcw size={20} />
              </div>
              <span className="text-xs font-medium dark:text-gray-300">Easy Returns</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-brand-orange">
                <Shield size={20} />
              </div>
              <span className="text-xs font-medium dark:text-gray-300">Secure Payment</span>
            </div>
          </div>
          
          <div className="p-6 bg-gray-100 dark:bg-gray-800/80 rounded-2xl flex gap-3 text-sm italic text-gray-500 dark:text-gray-400">
             <Info size={20} className="shrink-0 mt-1" />
             <p>Rentals require a fully refundable security deposit of 50% of the dress price. Return within 10 days of Navratri.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


