import { motion } from "framer-motion";
import { Terminal, Network, Cpu, Code2 } from "lucide-react";

const services = [
  {
    title: "Multi-Lingual Development",
    description: "Versatile in multiple languages from Java and Python to PHP and React. Adapting to the right tool for the job.",
    icon: <Code2 className="w-8 h-8 text-primary" />
  },
  {
    title: "Prompt Engineering & AI",
    description: "Bypassing boilerplate through advanced AI prompting. Rapid execution of core logic and high-speed delivery.",
    icon: <Cpu className="w-8 h-8 text-secondary" />
  },
  {
    title: "Infrastructure & Bots",
    description: "Building comprehensive Discord bots with complex permissions, and architecting modular Minecraft server networks.",
    icon: <Terminal className="w-8 h-8 text-primary" />
  },
  {
    title: "Systems Architecture",
    description: "Engineering game management panels, custom licensing APIs, and dynamic scalable infrastructures.",
    icon: <Network className="w-8 h-8 text-secondary" />
  }
];

const Services = () => {
  return (
    <section id="services" className="py-32 relative bg-background overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Execution</span>
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Practical experience over titles. Focusing on shipping actual working builds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-3xl p-8 border border-white/5 hover:border-primary/40 transition-colors duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
