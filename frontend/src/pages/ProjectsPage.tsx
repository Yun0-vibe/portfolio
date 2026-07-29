import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const allProjects = [
  {
    title: "Aerodactyl",
    description: "A custom game management panel.",
    tech: ["PHP", "React", "Node.js", "Docker"],
    status: "Ongoing",
    type: "Management Panel",
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "AxeMC License",
    description: "Custom licensing system integration.",
    tech: ["Java", "API", "MySQL"],
    status: "Finished",
    type: "License Management",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Hosting Dashboard",
    description: "Engineered a customized management interface for hosting infrastructure.",
    tech: ["React", "Node.js", "Tailwind"],
    status: "Finished",
    type: "Dashboard, Website",
    color: "from-emerald-400 to-teal-500"
  },
  {
    title: "Veltrix Store",
    description: "E-commerce platform build.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    status: "Finished",
    type: "Store, Website",
    color: "from-[#d8b4fe] to-[#9333ea]"
  },
  {
    title: "XShop Plugin",
    description: "A modular economy and auction system built from scratch for 1.18+ Paper/Spigot networks.",
    tech: ["Java", "Spigot API", "MySQL"],
    status: "Finished",
    type: "Minecraft Plugin",
    color: "from-orange-400 to-amber-500"
  },
  {
    title: "XNova Community Bot",
    description: "A comprehensive, multi-purpose Discord bot designed to handle complex permission architectures and automated roles.",
    tech: ["Node.js", "Discord.js", "MongoDB"],
    status: "Finished",
    type: "Discord Bot",
    color: "from-[#5865F2] to-blue-600"
  },
  {
    title: "NVCH Team Platform",
    description: "A full-stack, multilingual web build utilizing PHP and Tailwind CSS.",
    tech: ["PHP", "Tailwind CSS", "MySQL"],
    status: "Finished",
    type: "Web Platform",
    color: "from-red-400 to-rose-500"
  },
  {
    title: "Minor Webs & Products",
    description: "Various full-stack deployments, web platforms, and mini-products.",
    tech: ["HTML", "CSS", "JS", "Firebase"],
    status: "Finished",
    type: "Various Projects",
    color: "from-gray-400 to-gray-600"
  }
];

export const TiltCard = ({ project, idx }: { project: any, idx: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 2000 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[450px] rounded-3xl bg-card border border-white/10 overflow-hidden group cursor-crosshair transform-style-3d"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        
        {/* Tags */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full backdrop-blur-md border ${project.status === 'Finished' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'}`}>
            {project.status}
          </span>
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-primary/20 border border-primary/50 text-primary backdrop-blur-md">
            {project.type}
          </span>
        </div>

        <div className="absolute inset-0 p-8 flex flex-col justify-end translate-z-10">
          <h3 className="font-display text-4xl font-bold text-white mb-4 drop-shadow-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{project.title}</h3>
          <p className="text-gray-300 text-lg mb-8 line-clamp-3 leading-relaxed">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t: string, i: number) => (
              <span key={i} className="text-xs font-semibold px-4 py-2 rounded-full bg-white/5 text-white backdrop-blur-md border border-white/10">
                {t}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
            <span className="text-white hover:text-primary transition-colors flex items-center gap-2 font-bold uppercase tracking-wider text-sm cursor-pointer">
              Learn More <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

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

const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 font-semibold uppercase tracking-widest text-sm">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <motion.h1 
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl md:text-7xl font-bold text-white tracking-tighter"
        >
          <motion.span variants={textChildVariants} className="inline-block mr-4">All</motion.span>
          <motion.span variants={textChildVariants} className="inline-block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #d8b4fe 0%, #9333ea 100%)' }}>Projects.</motion.span>
        </motion.h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allProjects.map((project, idx) => (
          <TiltCard key={idx} project={project} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
