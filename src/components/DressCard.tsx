import { Link } from 'react-router-dom';
import { Star, ShoppingCart, CalendarRange, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { Dress } from '../types';
import { useCart } from '../App';
import { cn } from '../lib/utils';

interface DressCardProps {
  dress: Dress;
}

export default function DressCard({ dress }: DressCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 border border-white/20"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={dress.image}
          alt={dress.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {dress.featured && (
          <div className="absolute top-4 left-4 bg-brand-yellow text-brand-maroon text-[9px] uppercase font-black px-3 py-1.5 rounded-full tracking-widest shadow-lg">
            Essential
          </div>
        )}
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <Link
            to={`/dress/${dress.id}`}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900 hover:bg-brand-yellow transition-colors whitespace-nowrap shadow-xl"
          >
            <Eye size={14} /> Quick View
          </Link>
        </div>
      </div>

      <div className="p-6 text-center">
        <h3 className="font-display italic text-xl mb-2 text-gray-900 group-hover:text-brand-orange transition-colors line-clamp-1">
          {dress.name}
        </h3>
        
        <div className="flex flex-col items-center mb-6">
          <span className="text-2xl font-black text-brand-maroon leading-none">₹{dress.price.toLocaleString()}</span>
          <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-2">Starting at ₹{dress.rentPrice.toLocaleString()}/day</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => addToCart(dress, 'buy')}
            className="w-full py-4 rounded-2xl bg-gray-900 text-white text-[11px] font-black uppercase tracking-[0.2em] cursor-pointer hover:bg-brand-maroon transition-all shadow-lg active:scale-95"
          >
            Buy Now
          </button>
          <button
            onClick={() => addToCart(dress, 'rent')}
            className="w-full py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-orange transition-colors"
          >
            Or Rent for ₹{dress.rentPrice.toLocaleString()}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
