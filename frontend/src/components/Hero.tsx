import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Using a simpler animation structure to prevent clipping bugs with gradient text in Framer Motion
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="z-10 text-center px-4 max-w-5xl mt-20">
        <motion.div
          animate={{ x: mousePos.x * -20, y: mousePos.y * -20 }}
          transition={{ type: "spring", stiffness: 75, damping: 15 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md"
          >
            <span className="text-primary text-sm font-semibold tracking-widest">Always Learning & Building</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-6 leading-tight drop-shadow-2xl flex flex-wrap justify-center gap-4"
          >
            <span>Hi, I'm</span>
            {/* Fixed explicitly defined gradient background that smoothly blends left to right */}
            <span style={{ 
              backgroundImage: 'linear-gradient(to right, #d8b4fe 0%, #c084fc 50%, #9333ea 100%)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block'
            }}>
              Yuno.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
          >
            I'm a 17-year-old student, <span className="font-semibold text-white">Vibe Coder</span>, and AI Prompter. I'm passionate about multi-lingual development, jumping straight into complex logic, and shipping software that feels alive.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-6 items-center"
          >
            <a href="#projects" className="group relative px-8 py-4 rounded-full bg-white text-background font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              View My Work
              <div className="absolute inset-0 rounded-full border-2 border-white scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></div>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-gray-500 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
