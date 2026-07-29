import { motion } from "framer-motion";
import { Send } from "lucide-react";

const ContactForm = () => {
  return (
    <section id="contact" className="py-32 relative bg-card">
      {/* Mesh background */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white tracking-tighter">
            Let's build <br/><span className="italic text-primary">Together.</span>
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-md">
            Whether you need a high-performance web application, a scalable backend, or an immersive UI—I'm ready to bring it to life.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Send size={20} />
              </div>
              <span className="font-display text-lg">hello@yuno.dev</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form action="http://localhost:3001/api/contact" method="POST" className="bg-background p-10 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <div className="space-y-8">
              <div className="relative">
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-primary transition-colors font-display text-lg"
                />
                <label htmlFor="name" className="absolute left-0 top-3 text-gray-500 font-display text-lg cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-primary peer-valid:text-xs peer-valid:-top-4 transition-all">Your Name</label>
              </div>
              
              <div className="relative">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-primary transition-colors font-display text-lg"
                />
                <label htmlFor="email" className="absolute left-0 top-3 text-gray-500 font-display text-lg cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-primary peer-valid:text-xs peer-valid:-top-4 transition-all">Email Address</label>
              </div>
              
              <div className="relative">
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-primary transition-colors font-display text-lg resize-none"
                ></textarea>
                <label htmlFor="message" className="absolute left-0 top-3 text-gray-500 font-display text-lg cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-primary peer-valid:text-xs peer-valid:-top-4 transition-all">Project Details</label>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-white hover:bg-primary text-background hover:text-white font-display font-bold text-lg py-5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transform hover:-translate-y-1"
              >
                Send Proposal
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
