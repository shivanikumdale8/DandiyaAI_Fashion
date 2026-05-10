import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, ShoppingBag, CalendarRange, Users, Star, Quote } from 'lucide-react';
import { DRESSES } from '../constants';
import DressCard from '../components/DressCard';

const REVIEWS = [
  {
    name: 'Priya Sharma',
    role: 'Garba Enthusiast',
    text: 'The quality of the Chaniya Choli I rented was amazing. The mirror work was genuine and it looked stunning in the bokeh lights!',
    avatar: 'https://i.pravatar.cc/150?u=priya'
  },
  {
    name: 'Rahul Mehta',
    role: 'Professional Dancer',
    text: 'DandiyaAI made finding my outfit so easy. The AI recommendation perfectly matched my style and the fitting was spot on.',
    avatar: 'https://i.pravatar.cc/150?u=rahul'
  },
  {
    name: 'Anjali & Vikram',
    role: 'Couple',
    text: 'We loved the couple matching outfit section. We were the best-dressed couple at our local Garba event!',
    avatar: 'https://i.pravatar.cc/150?u=couple'
  }
];

export default function Home() {
  const featuredDresses = DRESSES.filter(d => d.featured).slice(0, 3);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1598124837130-99ca0925964f?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=2000"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroIndex}
              src={heroImages[heroIndex]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              alt="Navratri Hero"
              className="w-full h-full object-cover brightness-[0.4]"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8"
          >
            <Sparkles size={18} className="text-brand-orange" />
            <span className="text-sm font-medium tracking-wide uppercase italic">Celebrate with DandiyaAI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-display italic mb-8 leading-[1]"
          >
            Unleash the <br />
            Traditional Magic
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-md mx-auto text-base text-gray-200 mb-10 leading-relaxed"
          >
            Experience the finest hand-stitched Chaniya Cholis and Kediyu sets curated by our AI stylist for your perfect Navratri night.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/collection"
              className="w-full sm:w-auto px-10 py-5 festive-gradient rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-3"
            >
              Explore Trends
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black/50 border-y border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <h3 className="text-3xl font-black font-sans mb-1">500+</h3>
            <p className="text-[10px] text-brand-yellow font-bold uppercase tracking-widest">Designs</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black font-sans mb-1 text-brand-pink">10k+</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Happy Clients</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black font-sans mb-1 text-brand-orange">24h</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Support</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black font-sans mb-1 text-brand-purple">Fast</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Delivery</p>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-[10px] text-brand-yellow font-bold uppercase tracking-[0.2em] mb-4">Trending This Season</div>
            <h2 className="text-4xl font-display italic leading-tight">Hand-picked<br />Garba Favorites</h2>
          </div>
          <Link to="/collection" className="flex items-center gap-2 text-brand-yellow font-bold text-xs uppercase tracking-widest hover:gap-4 transition-all">
            View Full Collection <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredDresses.map((dress) => (
            <DressCard key={dress.id} dress={dress} />
          ))}
        </div>
      </section>

      {/* AI Recommendation Banner */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full text-white fill-current">
            <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16 relative z-10">
          <div className="glass-panel p-12 rounded-[2rem] border-l-4 border-l-brand-pink">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center text-brand-maroon font-black text-lg">AI</div>
              <div>
                <h3 className="text-xl font-bold">Matchmaker Assistant</h3>
                <p className="text-[10px] uppercase font-bold tracking-widest text-brand-pink">Ready to help</p>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-display italic mb-6 leading-tight">
              Confused about the <br />
              <span className="text-brand-yellow underline decoration-brand-orange underline-offset-4 pointer-events-none">Right Fit?</span>
            </h2>
            <p className="text-gray-300 text-sm mb-10 leading-relaxed max-w-sm">
              Our intelligent engine analyzes 500+ hand-stitched patterns and textures to suggest the best outfit for each of the 9 holy nights.
            </p>
            <Link
              to="/recommend"
              className="flex items-center justify-center px-10 py-5 festive-gradient text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-2xl"
            >
              Get Recommendations
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 glass-panel rounded-[2rem]">
               <Users className="text-brand-yellow mb-4" size={32} />
               <p className="text-sm font-bold uppercase tracking-wider">Couples</p>
             </div>
             <div className="p-8 glass-panel rounded-[2rem]">
               <CalendarRange className="text-brand-pink mb-4" size={32} />
               <p className="text-sm font-bold uppercase tracking-wider">9 Days</p>
             </div>
             <div className="p-8 glass-panel rounded-[2rem] col-span-2 flex items-center justify-between">
               <div>
                <p className="text-lg font-bold">Smart Tips</p>
                <p className="text-xs text-gray-400">Based on global trends</p>
               </div>
               <Sparkles className="text-brand-orange" size={24} />
             </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[10px] text-brand-yellow font-bold uppercase tracking-widest mb-4">Real Experiences</div>
            <h2 className="text-4xl font-display italic">Community Tales</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-card p-10 rounded-[2rem] relative border-t-brand-orange border-t-4"
              >
                <div className="flex items-center gap-4 mb-8">
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-brand-yellow" />
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="text-[9px] text-gray-400 tracking-widest uppercase">{review.role}</p>
                  </div>
                </div>
                <p className="text-gray-200 text-sm italic leading-relaxed">
                  "{review.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
