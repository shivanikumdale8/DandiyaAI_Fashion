import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/70">
        <div>
          &copy; 2026 DandiyaAI Fashion. Handcrafted in Gujarat.
        </div>
        
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Pinterest</a>
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
        </div>

        <div>
          Dark Mode: <span className="text-brand-yellow">On</span>
        </div>
      </div>
    </footer>
  );
}
