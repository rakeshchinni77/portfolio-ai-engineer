import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideUp from '../animations/SlideUp';
import StaggerContainer from '../animations/StaggerContainer';

const experienceData = [
  {
    role: "AI/ML Student",
    company: "University / Self-Taught",
    date: "2023 - Present",
    description: "Specializing in machine learning models, natural language processing, and bridging AI with full-stack web applications."
  },
  {
    role: "Full Stack Developer (Learning)",
    company: "Personal Projects",
    date: "2022 - 2023",
    description: "Built scalable web applications using React, Node.js, and modern CSS frameworks. Focused on component-driven architecture."
  }
];

const Experience = () => {
  const shouldReduce = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, x: shouldReduce ? 0 : 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariantsLeft = {
    hidden: { opacity: 0, x: shouldReduce ? 0 : -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        <SlideUp>
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">04.</span> Journey
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto"></div>
          </div>
        </SlideUp>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-secondary before:to-transparent">
          {experienceData.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-surfaceBorder shadow-glow-primary text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative"
                >
                  <div className="w-3 h-3 bg-primary rounded-full group-hover:bg-secondary transition-colors"></div>
                </motion.div>
                
                {/* Content Card */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-150px" }}
                  variants={isEven ? itemVariants : itemVariantsLeft}
                  className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-xl">{item.role}</h3>
                    <time className="font-mono text-sm text-secondary">{item.date}</time>
                  </div>
                  <div className="text-primary font-medium mb-4">{item.company}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
                
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default Experience;
