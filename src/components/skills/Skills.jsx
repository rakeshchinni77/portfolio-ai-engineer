import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BrainCircuit, Code2, Globe, Database } from 'lucide-react';

import { skillsData } from '@/constants/skillsData';
import SlideUp from '@/components/animations/SlideUp';
import ScaleIn from '@/components/animations/ScaleIn';
import StaggerContainer from '@/components/animations/StaggerContainer';
import SectionHeader from '@/components/common/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

const iconMap = {
  BrainCircuit,
  Code2,
  Globe,
  Database
};

const themeMaps = {
  primary: {
    border: "border-t-primary/50",
    glow: "hover:shadow-glow-primary",
    text: "text-primary"
  },
  secondary: {
    border: "border-t-secondary/50",
    glow: "hover:shadow-glow-secondary",
    text: "text-secondary"
  }
};

const Skills = () => {
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
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <SectionHeader number=".02" title="Skills Dashboard" align="right" />

        <StaggerContainer staggerChildren={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsData.map((category, idx) => {
              const IconComponent = iconMap[category.icon] || Code2;
              const activeTheme = themeMaps[category.theme] || themeMaps.primary;

              return (
                <GlassCard 
                  key={idx} 
                  as={motion.div}
                  variants={cardVariants}
                  className={`p-8 flex flex-col h-full border-t-4 ${activeTheme.border} ${activeTheme.glow}`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <IconComponent className={`${activeTheme.text}`} size={24} />
                    <h3 className="text-2xl font-bold text-white font-mono">{category.category}</h3>
                  </div>
                  
                  <StaggerContainer staggerChildren={0.05} className="flex flex-wrap gap-3">
                    {category.skills.map((skill, sIdx) => (
                      <ScaleIn key={sIdx} isChild={true}>
                        <Badge variant="default">
                          {skill}
                        </Badge>
                      </ScaleIn>
                    ))}
                  </StaggerContainer>
                </GlassCard>
              );
            })}
          </div>
        </StaggerContainer>
        
      </div>
    </section>
  );
};

export default Skills;
