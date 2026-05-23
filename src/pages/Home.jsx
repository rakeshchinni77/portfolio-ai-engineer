import React, { Suspense } from 'react';
import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';

// Lazy load below-the-fold sections
const Skills = React.lazy(() => import('@/components/skills/Skills'));
const Projects = React.lazy(() => import('@/components/projects/Projects'));
const Experience = React.lazy(() => import('@/components/experience/Experience'));
const Contact = React.lazy(() => import('@/components/contact/Contact'));

const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center text-xs font-mono text-gray-500 tracking-widest">
    [LOADING SYSTEM COMPONENT...]
  </div>
);

const Home = () => {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      <About />
      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </div>
  );
};

export default Home;
