import { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getDresses } from '../lib/firebase/firestore';
import DressCard from '../components/DressCard';
import { Dress, RecommendationCriteria } from '../types';

export default function AIRecommendation() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Dress[]>([]);
  const [criteria, setCriteria] = useState<RecommendationCriteria>({
    budget: 5000,
    favoriteColor: 'Pink',
    day: 1,
    style: 'Traditional'
  });

  const handleRecommend = async () => {
    setLoading(true);
    setStep(5); // Show results section
    
    try {
      const allDresses = await getDresses() as Dress[];
      
      // AI logic: Filter based on criteria
      const filtered = allDresses.filter(d => {
        const matchStyle = d.style === criteria.style;
        const matchBudget = d.price <= criteria.budget * 2;
        return matchStyle && matchBudget;
      }).slice(0, 3);
      
      // Fallback if no exact matches
      setRecommendations(filtered.length > 0 ? filtered : allDresses.slice(0, 3));
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "What's your maximum budget?",
      subtitle: "Choose a price range that suits you best.",
      field: 'budget',
      options: [
        { label: '₹2,000 - ₹5,000', value: 5000 },
        { label: '₹5,000 - ₹10,000', value: 10000 },
        { label: '₹10,000+', value: 20000 }
      ]
    },
    {
      title: "Choose your favorite color",
      subtitle: "Navratri is all about vibrant hues.",
      field: 'favoriteColor',
      options: [
        { label: 'Vibrant Pink', value: 'Pink' },
        { label: 'Royal Purple', value: 'Purple' },
        { label: 'Energetic Orange', value: 'Orange' },
        { label: 'Zesty Yellow', value: 'Yellow' }
      ]
    },
    {
      title: "Which day are you attending?",
      subtitle: "Each day has its own significance and traditional color.",
      field: 'day',
      options: [
        { label: 'Day 1-3 (Beginnings)', value: 1 },
        { label: 'Day 4-6 (The Peak)', value: 4 },
        { label: 'Day 7-9 (Grand Celebration)', value: 7 }
      ]
    },
    {
      title: "What's your preferred style?",
      subtitle: "Traditional roots or modern flare?",
      field: 'style',
      options: [
        { label: 'Pure Traditional', value: 'Traditional' },
        { label: 'Modern Fusion', value: 'Modern' },
        { label: 'Indo-Western', value: 'Indo-Western' }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-[80vh]">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-brand-orange/10 px-4 py-2 rounded-full mb-6 text-brand-orange border border-brand-orange/20">
          <Sparkles size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">AI Stylist</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-display dark:text-white">Personalized Recommendations</h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">Our AI engine analyzes your preferences to find the perfect Navratri outfit that resonates with your spirit.</p>
      </div>

      <div className="glass-panel rounded-[2.5rem] shadow-2xl p-8 md:p-12 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step <= 4 ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-8"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-[0.2em]">Step {step} of 4</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-12 h-1 rounded-full transition-all ${i <= step ? 'bg-brand-orange' : 'bg-white/10'}`}></div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-display italic mb-2">{steps[step - 1].title}</h2>
                <p className="text-gray-400 text-sm italic">{steps[step - 1].subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {steps[step - 1].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setCriteria({ ...criteria, [steps[step - 1].field]: opt.value });
                      if (step < 4) setStep(step + 1);
                      else handleRecommend();
                    }}
                    className="group p-6 text-left border border-white/10 rounded-2xl bg-black/20 hover:bg-white/10 transition-all outline-none"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">{opt.label}</span>
                      <ArrowRight size={18} className="text-gray-500 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>

              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-4 text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors self-start"
                >
                  ← Go Back
                </button>
              )}
            </motion.div>
          ) : step === 5 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-12"
            >
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full mb-8"
                  />
                  <h3 className="text-2xl font-display italic">Curating your perfect look...</h3>
                  <p className="text-gray-400 mt-2 text-sm">Matching textures and traditions</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <h2 className="text-3xl font-display italic mb-2">Our AI Curates...</h2>
                      <p className="text-gray-400 text-sm">Specially matched for your taste</p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all"
                    >
                      <RefreshCw size={16} /> Start Over
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recommendations.map(dress => (
                      <DressCard key={dress.id} dress={dress} />
                    ))}
                  </div>

                  <div className="bg-black/40 p-10 rounded-[2rem] border-l-4 border-l-brand-pink relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <h4 className="font-bold text-brand-yellow uppercase tracking-widest mb-4 flex items-center gap-2 text-xs">
                       <Sparkles size={16} /> AI Style Note
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-200">
                      "For Day {criteria.day}, these outfits offer a perfect balance of heritage and comfort. The {criteria.favoriteColor} palette will vibrate beautifully with the festive lighting. We recommend heavy silver accents for a complete traditional feel."
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
