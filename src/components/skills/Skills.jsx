import { motion, useReducedMotion } from 'framer-motion';
import { BrainCircuit, Cpu, Code2, Globe, Database, Server, Shield } from 'lucide-react';

import { skillsData } from '@/constants/skillsData';
import StaggerContainer from '@/components/animations/StaggerContainer';
import SectionHeader from '@/components/common/SectionHeader';
import TechSphere from './TechSphere';
import ScaleIn from '@/components/animations/ScaleIn';
import { cn } from '@/utils/cn';

const iconMap = {
  BrainCircuit,
  Cpu,
  Code2,
  Globe,
  Database,
  Server,
  Shield
};

const Skills = () => {
  const shouldReduce = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] animate-grid-slow pointer-events-none" />
      
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <SectionHeader number=".02" title="Capabilities System" align="right" />

        {/* Dashboard 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-10">
          
          {/* Tech Sphere Column (Sticky on Desktop, top layout on Mobile) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 order-first lg:order-last w-full flex flex-col items-center gap-6">
            <TechSphere />
            
            {/* Short subtitle status indicators */}
            <div className="hidden lg:flex flex-col w-full max-w-[340px] md:max-w-[400px] bg-black/45 border border-white/5 rounded-2xl p-4 font-mono text-[10px] text-gray-500 gap-2">
              <div className="flex justify-between items-center">
                <span>SYSTEM STATUS:</span>
                <span className="text-emerald-500 font-bold animate-pulse">● OPERATIONAL</span>
              </div>
              <div className="flex justify-between items-center">
                <span>RADAR FIELD:</span>
                <span>3D TECH SPACE (ACTIVE)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>INTEGRATIONS:</span>
                <span>10 LIBRARIES LINKED</span>
              </div>
            </div>
          </div>

          {/* Stacks Cards Column */}
          <div className="lg:col-span-8 w-full">
            <StaggerContainer staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsData.map((category, idx) => {
                const IconComponent = iconMap[category.icon] || Code2;
                const isPrimary = category.theme === "primary";

                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className={cn(
                      "dashboard-card p-6 md:p-8 flex flex-col h-full rounded-2xl group border border-white/5",
                      isPrimary ? "dashboard-card-primary" : "dashboard-card-secondary"
                    )}
                  >
                    {/* Card Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={cn(
                        "p-2.5 rounded-xl bg-white/5 border border-white/10 transition-colors duration-300",
                        isPrimary 
                          ? "text-primary group-hover:text-primary-light" 
                          : "text-secondary group-hover:text-secondary-light"
                      )}>
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-gray-500 tracking-wider block uppercase">STACK // {category.code}</span>
                        <h3 className="text-base md:text-lg font-bold text-white transition-colors duration-300 font-mono tracking-tight mt-0.5">
                          {category.category}
                        </h3>
                      </div>
                    </div>

                    {/* Stack Description */}
                    <p className="text-xs text-gray-400 mb-6 leading-relaxed font-sans">
                      {category.description}
                    </p>
                    
                    {/* Skills Badges Grid */}
                    <StaggerContainer staggerChildren={0.04} isChild={true} className="flex flex-wrap gap-2.5 mt-auto">
                      {category.skills.map((skill, sIdx) => (
                        <ScaleIn key={sIdx} isChild={true}>
                          <div 
                            className="relative group/pill flex flex-col gap-1 items-start px-3 py-2 rounded-lg bg-[#0e0a29]/45 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] transition-all duration-300 hover:border-white/15 hover:bg-[#150f3b]/60 cursor-default shimmer-sweep hover:shadow-[0_0_12px_rgba(255,255,255,0.03)]"
                          >
                            <span className="text-[11px] font-mono text-gray-300 group-hover/pill:text-white transition-colors duration-200">
                              {skill.name}
                            </span>
                            
                            {/* Segmented signal strength proficiency meter */}
                            <div className="flex gap-0.5 opacity-70 group-hover/pill:opacity-100 transition-opacity">
                              {[1, 2, 3, 4, 5].map((step) => (
                                <span 
                                  key={step} 
                                  className={cn(
                                    "w-1 h-1.5 rounded-sm transition-all duration-300",
                                    step <= skill.level
                                      ? isPrimary 
                                        ? 'bg-primary shadow-[0_0_5px_rgba(139,92,246,0.85)]' 
                                        : 'bg-secondary shadow-[0_0_5px_rgba(6,182,212,0.85)]'
                                      : 'bg-white/10'
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        </ScaleIn>
                      ))}
                    </StaggerContainer>
                  </motion.div>
                );
              })}
            </StaggerContainer>
          </div>

        </div>
        
      </div>
    </section>
  );
};

export default Skills;
