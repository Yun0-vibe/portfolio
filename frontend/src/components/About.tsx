import { motion } from "framer-motion";
import { BookOpen, Cpu, Layers, Sparkles } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Behind the <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #d8b4fe 0%, #9333ea 100%)' }}>Screen</span>
          </motion.h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto]">
          
          {/* Main Biography Card - Spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-card rounded-3xl p-10 border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all duration-700"></div>
            <BookOpen className="text-primary w-10 h-10 mb-6" />
            <h3 className="text-3xl font-display font-bold text-white mb-4">My Journey So Far</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              I'm a 17-year-old student deeply interested in <strong className="text-white">multi-lingual development</strong> and AI. For me, development isn't just about syntax; I'm a prompter before I'm a dev. I use AI tooling to bypass boilerplate and execute logic at high speed.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              I embrace the title of <strong className="text-white tracking-widest italic">Vibe Coder</strong>. I believe in jumping straight in, feeling the flow of the architecture, and shipping actual working builds—from complex game servers to modular plugins.
            </p>
          </motion.div>

          {/* Dev Ideology Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-3xl p-8 border border-primary/20 relative overflow-hidden group hover:border-primary/50 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0"></div>
            <div className="relative z-10 flex flex-col h-full">
              <Sparkles className="text-secondary w-10 h-10 mb-4" />
              <h3 className="text-2xl font-display font-bold text-white mb-4">My Dev Ideology</h3>
              <ul className="space-y-4 text-gray-300 text-sm font-light">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span><strong>Vibe and Flow:</strong> Code is about the vibe and the flow; I believe the best way to learn is by jumping straight in and shipping projects.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span><strong>Prompt-First Execution:</strong> I use AI tooling to bypass the boilerplate and focus heavily on core logic, architecture, and high-speed execution.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span><strong>Practical Experience Over Titles:</strong> I focus on shipping actual working builds—from server setups to custom web logic—rather than relying on fluff or exaggerated roles.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Stat Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-3xl p-8 border border-white/5 flex flex-col justify-center items-center text-center group hover:border-primary/30 transition-colors h-[250px]"
          >
            <Cpu className="text-secondary w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-4xl font-display font-bold text-white mb-2">Vibe</h4>
            <p className="text-gray-400">Coder</p>
          </motion.div>

          {/* Feature Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-card rounded-3xl p-8 border border-white/5 overflow-hidden relative group h-[250px]"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10 flex items-center justify-between h-full">
              <div>
                <Layers className="text-secondary w-10 h-10 mb-4" />
                <h4 className="text-2xl font-bold text-white mb-2">Multi-Lingual Dev</h4>
                <p className="text-gray-400 max-w-sm">From Java plugins to PHP logic and Node.js servers, I adapt to whatever language fits the architecture.</p>
              </div>
              <Layers className="text-white/5 w-48 h-48 absolute -right-10 -bottom-10 group-hover:rotate-12 transition-transform duration-700" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
