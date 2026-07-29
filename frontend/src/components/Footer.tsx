import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

// Discord SVG icon
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" className={className} fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const quotes = [
  "Code is about the vibe and the flow.",
  "Jumping straight in and shipping projects.",
  "Bypassing boilerplate, focusing on core logic.",
  "Practical experience over titles.",
  "Always learning, always building."
];

const Footer = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000); // Change quote every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (id: string) => {
    if (window.location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#050511] overflow-hidden pt-16 pb-8">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-primary/10 blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Left Column: Brand & Quotes */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex flex-col leading-none">
                  <span className="text-3xl font-bold bg-gradient-to-r from-[#d8b4fe] via-[#c084fc] to-[#9333ea] bg-clip-text text-transparent tracking-tighter">YUNO.</span>
                </div>
              </div>
              
              <div className="h-20 relative text-gray-400 italic text-lg font-light leading-relaxed border-l-2 border-primary/30 pl-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    "{quotes[quoteIndex]}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="md:col-span-3"></div>

          {/* Right Column: Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-2">Navigation</h4>
              <Link to="/#about" onClick={() => handleNavClick('about')} className="text-gray-400 hover:text-white transition-colors text-sm">About</Link>
              <Link to="/projects" className="text-gray-400 hover:text-white transition-colors text-sm">Projects</Link>
              <Link to="/#contact" onClick={() => handleNavClick('contact')} className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-2">Socials</h4>
              <a href="https://discordapp.com/users/darkwiz.vibe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5865F2] transition-colors text-sm flex items-center gap-2">
                <DiscordIcon className="w-4 h-4" /> Discord
              </a>
              <a href="mailto:contact@vibeyuno.me" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-medium tracking-widest uppercase">
          <p>© {new Date().getFullYear()} YUNO. ALL RIGHTS RESERVED.</p>
          <p>DESIGNED & BUILT BY YUNO</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
