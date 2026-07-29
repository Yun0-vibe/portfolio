import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { allProjects, TiltCard } from "../pages/ProjectsPage";

const Projects = () => {
  // Only take the first 3 projects for the home page
  const homeProjects = allProjects.slice(0, 3);

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl font-bold text-white tracking-tighter"
          >
            Recent <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #d8b4fe 0%, #9333ea 100%)' }}>Builds.</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/projects" className="group flex items-center gap-2 px-6 py-3 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all font-semibold">
              View All Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeProjects.map((project, idx) => (
            <TiltCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
