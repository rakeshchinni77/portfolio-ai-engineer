import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BrainCircuit, Code2, Database } from 'lucide-react';

import SlideUp from '@/components/animations/SlideUp';
import StaggerContainer from '@/components/animations/StaggerContainer';
import SectionHeader from '@/components/common/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';

const About = () => {
  const shouldReduce = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <SectionHeader number="01." title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <SlideUp delay={0.2}>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
                <div className="w-40 h-40 shrink-0 rounded-2xl overflow-hidden border border-primary/50 shadow-glow-primary">
                  {/* Fallback to placeholder if image not found */}
                  <img 
                    src="/images/profile.png" 
                    alt="Chinni Rakesh" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150/030014/8b5cf6?text=Profile' }} 
                  />
                </div>
                <p className="mt-4 sm:mt-0">
                  I am an AI/ML student with a strong foundation in building scalable, intelligent applications. 
                  My passion lies in merging cutting-edge machine learning models with modern, interactive web interfaces.
                </p>
              </div>
              <p>
                Currently, I am exploring the intersection of Generative AI and full-stack development, 
                focusing on creating tools that empower users through intelligent automation and insightful data analysis.
              </p>
              <p>
                Whether it's fine-tuning language models or designing a pixel-perfect React component, 
                I bring a unique combination of analytical thinking and creative problem-solving to every project.
              </p>
            </div>
          </SlideUp>

          {/* Cards (Staggered Entrance) */}
          <StaggerContainer delayChildren={0.2} staggerChildren={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GlassCard as={motion.div} variants={cardVariants} className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <BrainCircuit size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">AI / ML</h3>
                <p className="text-sm text-gray-400">Deep Learning, NLP, Predictive Modeling, Data Pipelines.</p>
              </GlassCard>
              
              <GlassCard as={motion.div} variants={cardVariants} className="p-6 flex flex-col gap-4 mt-0 sm:mt-8">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <Code2 size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Frontend</h3>
                <p className="text-sm text-gray-400">React, Next.js, Tailwind CSS, Framer Motion.</p>
              </GlassCard>
              
              <GlassCard as={motion.div} variants={cardVariants} className="p-6 flex flex-col gap-4 sm:col-span-2">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Database size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Backend & Ops</h3>
                <p className="text-sm text-gray-400">Python, Node.js, REST APIs, Vector Databases, Deployment.</p>
              </GlassCard>
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default About;
