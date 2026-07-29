import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import Footer from './components/Footer';

const Logo = () => (
  <div className="relative w-10 h-10 flex items-center justify-center group cursor-pointer">
    <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d8b4fe"></stop>
          <stop offset="100%" stopColor="#9333ea"></stop>
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="none" stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.6"></circle>
      <g opacity="0.8">
        <circle cx="20" cy="8" r="2.5" fill="#d8b4fe"></circle>
        <circle cx="32" cy="20" r="2.5" fill="#9333ea"></circle>
        <circle cx="20" cy="32" r="2.5" fill="#d8b4fe"></circle>
        <circle cx="8" cy="20" r="2.5" fill="#9333ea"></circle>
      </g>
    </svg>
    <svg className="relative w-5 h-5 z-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d8b4fe"></stop>
          <stop offset="100%" stopColor="#9333ea"></stop>
        </linearGradient>
      </defs>
      <path d="M12 2L2 22h20L12 2z" fill="none" stroke="url(#innerGradient)" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="12" cy="15" r="3" fill="url(#innerGradient)"></circle>
    </svg>
  </div>
);

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileScroll = (id: string) => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname === '/') {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen text-white font-sans selection:bg-primary selection:text-white cursor-auto md:cursor-none relative bg-[#050511] overflow-x-hidden">
        {/* Robust Background Gradients */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.15)_0%,rgba(5,5,17,0)_70%)]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(192,132,252,0.1)_0%,rgba(5,5,17,0)_70%)]"></div>
        </div>

        <div className="relative z-10">
          <CustomCursor />
          
          {/* Floating Pill Navigation */}
          <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl z-50 bg-card/80 backdrop-blur-xl border border-white/10 py-3 px-6 md:px-8 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center">
              <Link 
                to="/" 
                className="flex items-center gap-3"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
              >
                <Logo />
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-bold bg-gradient-to-r from-[#d8b4fe] via-[#c084fc] to-[#9333ea] bg-clip-text text-transparent">YUNO</span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-widest">DEVELOPER</span>
                </div>
              </Link>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300 items-center">
                <Link to="/#about" className="hover:text-white transition-colors" onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>About</Link>
                <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
                <Link to="/#contact" className="px-5 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-all transform hover:scale-105" onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>Connect</Link>
              </div>

              {/* Mobile Hamburger Button */}
              <button 
                className="md:hidden text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-card/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 z-40 md:hidden shadow-2xl flex flex-col gap-6 text-center"
              >
                <Link 
                  to="/#about" 
                  className="text-lg font-medium text-gray-200 hover:text-white transition-colors"
                  onClick={(e) => {
                    if (window.location.pathname === '/') {
                      e.preventDefault();
                      handleMobileScroll('about');
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  About
                </Link>
                <div className="h-px w-full bg-white/10"></div>
                <Link 
                  to="/projects" 
                  className="text-lg font-medium text-gray-200 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Projects
                </Link>
                <div className="h-px w-full bg-white/10"></div>
                <Link 
                  to="/#contact" 
                  className="text-lg font-medium text-primary hover:text-white transition-colors"
                  onClick={(e) => {
                    if (window.location.pathname === '/') {
                      e.preventDefault();
                      handleMobileScroll('contact');
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  Connect
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
