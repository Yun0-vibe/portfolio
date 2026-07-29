import { motion } from "framer-motion";

const timeline = [
  {
    year: "Recently",
    role: "Architect & Prompter",
    company: "Self-Study",
    description: "Embracing AI-assisted development to rapid-prototype complex systems, Discord bots, and robust backend architectures."
  },
  {
    year: "A Year Ago",
    role: "Multi-Lingual Deep Dive",
    company: "Self-Study",
    description: "Expanded beyond web technologies into Java for Minecraft plugins and Python/PHP for specialized scripting and logic."
  },
  {
    year: "The Beginning",
    role: "Hello World",
    company: "Self-Study",
    description: "Started the journey by exploring syntax, messing with servers, and realizing the power of writing code that actually runs."
  }
];

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const textChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 12, stiffness: 100 },
  },
};

const Experience = () => {
  return (
    <section className="py-32 relative bg-card/30 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold text-white"
          >
            <motion.span variants={textChildVariants} className="inline-block mr-3">My</motion.span>
            <motion.span variants={textChildVariants} className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#d8b4fe] via-[#c084fc] to-[#9333ea]">Learning Journey</motion.span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={`relative flex flex-col md:flex-row items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] md:left-1/2 top-0 md:top-1/2 w-3 h-3 bg-secondary rounded-full transform md:-translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_15px_rgba(192,132,252,0.8)] z-10"></div>

                <div className="w-full md:w-5/12 pl-8 md:pl-0">
                  <div className={`bg-card p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="text-primary font-bold tracking-wider text-sm mb-2 block">{item.year}</span>
                    <h3 className="text-2xl font-bold text-white mb-1">{item.role}</h3>
                    <h4 className="text-gray-400 font-medium mb-4">{item.company}</h4>
                    <p className="text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
