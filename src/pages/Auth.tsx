import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Github, Chrome, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../components/FirebaseProvider';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, user } = useFirebase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn();
      navigate('/');
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    navigate('/');
    return null;
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-gray-800 rounded-[3rem] shadow-2xl overflow-hidden">
        {/* Left Side - Visual */}
        <div className="hidden md:block relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=1200"
            alt="Auth Visual"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-maroon/40 backdrop-blur-[2px] flex items-center justify-center p-12 text-center text-white">
            <div>
              <h2 className="text-4xl font-bold font-display mb-6">Join the Festival</h2>
              <p className="text-lg opacity-90 font-light">Sign up to get early access to our limited Navratri collections and AI stylings.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Forms */}
        <div className="p-10 md:p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h1 className="text-3xl font-bold dark:text-white mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-500">
                  {isLogin ? "We've missed you! Enter your details below." : 'Sign up to start your Navratri journey.'}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 p-4 border-2 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all dark:text-white font-bold"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Chrome size={18} />} 
                  Continue with Google
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100 dark:border-gray-700"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-gray-800 px-2 text-gray-400">Or use email</span></div>
              </div>

              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-4 top-4 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange dark:text-white"
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange dark:text-white"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange dark:text-white"
                  />
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm font-medium text-brand-orange">Forgot password?</button>
                  </div>
                )}

                <button className="w-full py-4 bg-brand-orange text-white font-bold rounded-2xl hover:bg-brand-orange/90 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-brand-orange/20">
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                </button>
              </form>

              <p className="text-center text-sm text-gray-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-bold text-brand-orange hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
