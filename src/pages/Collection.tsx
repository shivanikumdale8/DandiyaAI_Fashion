import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown, Loader2 } from 'lucide-react';
import { Dress } from '../types';
import { getDresses } from '../lib/firebase/firestore';
import DressCard from '../components/DressCard';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useFirebase } from '../components/FirebaseProvider';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Women', 'Men', 'Couple', 'Kids'];
const COLORS = ['All', 'Pink', 'Purple', 'Orange', 'Maroon', 'Black', 'Yellow'];
const STYLES = ['All', 'Traditional', 'Modern', 'Indo-Western'];

export default function Collection() {
  const { isAdmin } = useFirebase();
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [color, setColor] = useState('All');
  const [style, setStyle] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const data = await getDresses();
        if (data) {
          setDresses(data as Dress[]);
        }
      } catch (error) {
        console.error('Error fetching dresses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDresses();
  }, []);

  const filteredDresses = useMemo(() => {
    return dresses.filter(dress => {
      const matchSearch = dress.name.toLowerCase().includes(search.toLowerCase()) || 
                          dress.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'All' || dress.category === category;
      const matchColor = color === 'All' || dress.color === color;
      const matchStyle = style === 'All' || dress.style === style;
      return matchSearch && matchCategory && matchColor && matchStyle;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Rating') return b.rating - a.rating;
      return 0; // Featured or Default
    });
  }, [dresses, search, category, color, style, sortBy]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-6 flex flex-col items-center justify-center min-h-[70vh]">
        <Loader2 className="animate-spin text-brand-orange mb-4" size={40} />
        <p className="text-gray-500 font-medium tracking-widest uppercase text-[10px]">Loading Collection...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col gap-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-4xl md:text-5xl font-display italic">Festive Collection</h1>
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-yellow transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search designs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-black/20 rounded-2xl border border-white/10 focus:border-brand-yellow transition-all outline-none text-sm font-medium text-white"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          <div className="flex-grow"></div>
          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 px-6 py-3 pr-12 rounded-xl font-bold text-[10px] uppercase tracking-widest outline-none cursor-pointer"
            >
              <option className="bg-brand-maroon">Featured</option>
              <option className="bg-brand-maroon">Price: Low to High</option>
              <option className="bg-brand-maroon">Price: High to Low</option>
              <option className="bg-brand-maroon">Rating</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={16} />
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 glass-panel rounded-[2rem]"
            >
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow mb-6 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                        category === cat ? "bg-brand-orange text-white" : "bg-white/5 hover:bg-white/10 text-white/70"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-pink mb-6 block">Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border",
                        color === c ? "bg-brand-purple text-white border-brand-purple" : "bg-white/5 border-white/10 hover:bg-white/10 text-white/70"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow mb-6 block">Style</label>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map(s => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border",
                        style === s ? "bg-brand-pink text-white border-brand-pink" : "bg-white/5 border-white/10 hover:bg-white/10 text-white/70"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {filteredDresses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredDresses.map((dress) => (
            <DressCard key={dress.id} dress={dress} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center">
          <div className="w-20 h-20 festive-gradient rounded-3xl flex items-center justify-center text-white mx-auto mb-8 opacity-20">
            <Filter size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-2 dark:text-white">No dresses found</h3>
          <p className="text-gray-500 mb-6">Start by adding or seeding the database.</p>
          {isAdmin ? (
            <Link 
              to="/admin" 
              className="inline-flex px-8 py-4 bg-brand-purple rounded-2xl font-bold text-xs uppercase tracking-widest text-white hover:scale-105 transition-all shadow-xl"
            >
              Go to Admin Panel
            </Link>
          ) : (
            <button 
              onClick={() => {setSearch(''); setCategory('All'); setColor('All'); setStyle('All');}}
              className="text-brand-orange font-bold underline"
            >
              Reset all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}


