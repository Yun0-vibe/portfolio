import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import TechStack from '../components/TechStack';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Experience />
      <TechStack />
      <Projects />
      <Contact />
    </main>
  );
};

export default Home;
