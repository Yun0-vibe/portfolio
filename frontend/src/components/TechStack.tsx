import { 
  Code2, 
  TerminalSquare, 
  Database, 
  Server, 
  Layers, 
  Layout, 
  Cpu, 
  Globe, 
  Settings,
  Cloud
} from "lucide-react";

// Mixing tech names with representative icons
const techStack = [
  { name: "TypeScript", icon: <Code2 className="text-blue-400" /> },
  { name: "React", icon: <Globe className="text-cyan-400" /> },
  { name: "Next.js", icon: <Layers className="text-white" /> },
  { name: "Tailwind CSS", icon: <Layout className="text-teal-400" /> },
  { name: "Node.js", icon: <Server className="text-green-500" /> },
  { name: "Express.js", icon: <Server className="text-gray-400" /> },
  { name: "Java", icon: <Cpu className="text-orange-500" /> },
  { name: "C", icon: <Code2 className="text-blue-500" /> },
  { name: "Python", icon: <TerminalSquare className="text-yellow-400" /> },
  { name: "PHP", icon: <Globe className="text-indigo-400" /> },
  { name: "QBasic", icon: <TerminalSquare className="text-blue-300" /> },
  { name: "MongoDB", icon: <Database className="text-green-500" /> },
  { name: "Firebase", icon: <Database className="text-yellow-500" /> },
  { name: "Git & GitHub", icon: <Code2 className="text-orange-400" /> },
  { name: "Vercel", icon: <Cloud className="text-white" /> },
  { name: "Pterodactyl", icon: <Settings className="text-blue-400" /> },
  { name: "Nginx", icon: <Server className="text-green-600" /> },
  { name: "Oracle Cloud", icon: <Cloud className="text-red-500" /> },
  { name: "AWS & GCP", icon: <Cloud className="text-orange-500" /> }
];

const TechStack = () => {
  return (
    <section className="py-24 border-y border-white/5 bg-[#050511] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase">Technologies I Work With</h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Gradient Masks for smooth fade on edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#050511] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#050511] to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Container scrolling Right to Left */}
        <div className="animate-marquee whitespace-nowrap flex w-max hover:[animation-play-state:paused]">
          {/* First Block */}
          <div className="flex items-center gap-12 pr-12">
            {techStack.map((tech, idx) => (
              <div 
                key={`first-${idx}`} 
                className="flex items-center gap-4 text-xl md:text-2xl font-display font-bold text-gray-700 hover:text-white transition-colors duration-300 cursor-default"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10">
                  {tech.icon}
                </div>
                {tech.name}
              </div>
            ))}
          </div>
          
          {/* Second Block (Duplicate for seamless loop) */}
          <div className="flex items-center gap-12 pr-12">
            {techStack.map((tech, idx) => (
              <div 
                key={`second-${idx}`} 
                className="flex items-center gap-4 text-xl md:text-2xl font-display font-bold text-gray-700 hover:text-white transition-colors duration-300 cursor-default"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10">
                  {tech.icon}
                </div>
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
