import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';
import Skills from '@/components/skills/Skills';
import Projects from '@/components/projects/Projects';
import Experience from '@/components/experience/Experience';
import Contact from '@/components/contact/Contact';

const Home = () => {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </div>
  );
};

export default Home;
