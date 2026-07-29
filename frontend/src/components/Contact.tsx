import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
// We don't have a specific Discord icon in lucide-react standard, but we can use an SVG or similar. We will use an SVG for Discord.

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" className={className} fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative bg-background">
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-secondary text-sm uppercase tracking-widest font-semibold mb-4 block">Get In Touch</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white tracking-tighter">
            Let's Create <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Something Great.</span>
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Connect with me directly on any of the platforms below.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Email Card */}
          <motion.a
            href="mailto:contact@vibeyuno.me"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group block p-10 bg-card rounded-3xl border border-white/5 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors">contact@vibeyuno.me</p>
            </div>
          </motion.a>

          {/* Discord Card */}
          <motion.a
            href="https://discordapp.com/users/darkwiz.vibe" 
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group block p-10 bg-card rounded-3xl border border-white/5 hover:border-[#5865F2]/50 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#5865F2]/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white group-hover:bg-[#5865F2] group-hover:text-white transition-colors duration-300">
                <DiscordIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Discord</h3>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors">darkwiz.vibe</p>
            </div>
          </motion.a>

          {/* WhatsApp Card */}
          <motion.a
            href="https://wa.me/vibeyuno.dev" 
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group block p-10 bg-card rounded-3xl border border-white/5 hover:border-[#25D366]/50 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#25D366]/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">
                <MessageCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors">vibeyuno.dev</p>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
};

export default Contact;
