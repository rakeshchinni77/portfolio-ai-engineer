import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import { portfolioProjects } from '@/constants/portfolio';
import SlideUp from '@/components/animations/SlideUp';
import StaggerContainer from '@/components/animations/StaggerContainer';
import SectionHeader from '@/components/common/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

const Projects = () => {
  const shouldReduce = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <SectionHeader 
          number="03." 
          title="Projects Showcase" 
          subtitle="Selected works bridging AI architecture with backend perfection." 
          align="center" 
        />

        <StaggerContainer staggerChildren={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, idx) => (
              <GlassCard 
                key={idx} 
                as={motion.div}
                variants={cardVariants}
                className="flex flex-col h-full rounded-2xl overflow-hidden group"
              >
                {/* Abstract Visual Placeholder instead of plain image */}
                <div className="h-48 bg-surfaceBorder/30 relative overflow-hidden flex items-center justify-center p-6 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
                  <div className="absolute inset-0 bg-grid opacity-20"></div>
                  <h3 className="text-2xl font-bold text-white z-20 text-glow opacity-80 group-hover:scale-105 transition-transform duration-500">{project.title}</h3>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow z-20 bg-background/50">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-xs font-mono text-secondary mb-4">{project.subtitle}</p>
                  <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, tIdx) => (
                      <Badge key={tIdx} variant="tech">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-auto">
                    <a href={project.github} className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                      <FaGithub size={18} /> <span className="text-sm">Code</span>
                    </a>
                    {project.live !== "#" && (
                      <a href={project.live} className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-1">
                        <ExternalLink size={18} /> <span className="text-sm">Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </StaggerContainer>
        
      </div>
    </section>
  );
};

export default Projects;
