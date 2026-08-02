import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Terminal, Wrench, Globe, Cpu } from 'lucide-react';

const PatchNotes = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set to expire 100 hours from Patch 1.0 deployment (approx Aug 7, 2026)
    const EXPIRY_TIME = new Date("2026-08-07T01:35:00+05:45").getTime();
    
    if (Date.now() < EXPIRY_TIME) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#0a0a1a] border border-primary/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg text-primary">
              <Terminal size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Patch Update 1.0</h2>
              <p className="text-sm text-primary font-medium tracking-wide">SYSTEM OPTIMIZED</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-white font-semibold">Engineered New Custom Cursor</h3>
                <p className="text-gray-400 text-sm">Replaced the laggy React-state cursor with a hyper-optimized Framer Motion physics tracker. It now runs at a butter-smooth 60fps with zero DOM breaking.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Cpu className="text-purple-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-white font-semibold">Mobile Navigation Overhaul</h3>
                <p className="text-gray-400 text-sm">Upgraded to a premium full-screen immersive frosted glass overlay for mobile users.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Wrench className="text-blue-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-white font-semibold">Under-the-Hood Bug Fixes</h3>
                <p className="text-gray-400 text-sm">Fixed strict Type errors, removed dead imports, and resolved the Vercel monorepo deployment routing issue.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="text-teal-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-white font-semibold">Advanced SEO & Open Graph</h3>
                <p className="text-gray-400 text-sm">Injected sitemap.xml, robots.txt, and a custom high-res rendering of the geometric logo for Discord/Twitter link previews.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsVisible(false)}
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all transform hover:scale-[1.02]"
          >
            Acknowledge & Continue
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PatchNotes;
