import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { experienceData } from '@/constants/experienceData';
import SectionHeader from '@/components/common/SectionHeader';
import { cn } from '@/utils/cn';

const Experience = () => {
  const shouldReduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardVariantsRight = {
    hidden: { opacity: 0, x: shouldReduce ? 0 : 30, y: shouldReduce ? 0 : 15 },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: { duration: shouldReduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const cardVariantsLeft = {
    hidden: { opacity: 0, x: shouldReduce ? 0 : -30, y: shouldReduce ? 0 : 15 },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: { duration: shouldReduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const rowVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.15
      }
    }
  };

  const dotVariants = {
    hidden: { scale: shouldReduce ? 1 : 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: shouldReduce 
        ? { duration: 0 } 
        : { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section id="experience" className="py-16 relative overflow-hidden">
      {/* Background Atmosphere Elements */}
      <div className={cn("absolute inset-0 bg-grid opacity-[0.02] pointer-events-none", !shouldReduce && !isMobile && "animate-grid-slow")} />
      {!isMobile && (
        <>
          <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-gradient-radial from-secondary/5 to-transparent rounded-full pointer-events-none" />
          <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-gradient-radial from-primary/5 to-transparent rounded-full pointer-events-none" />
        </>
      )}

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        
        <SectionHeader number="04." title="System Evolution" align="center" />

        {/* Timeline Container */}
        <div className="space-y-10 relative mt-10">
          
          {/* Animated Central Timeline Signal Pathway Line */}
          <div className="absolute top-0 bottom-0 left-5 md:left-1/2 -translate-x-1/2 w-0.5">
            {/* The line itself with gradient and pulse */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-transparent/10 overflow-hidden">
              {!shouldReduce && (
                <div 
                  className="absolute left-0 right-0 w-full h-24 bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-[1px] animate-timeline-pulse" 
                />
              )}
            </div>
            
            {/* Particles outside the overflow-hidden container so their glow isn't clipped (Disabled on mobile) */}
            {!(shouldReduce || isMobile) && (
              <>
                {/* Subtle Neural Transmission Particles */}
                <div className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-cyan-400 opacity-80 shadow-[0_0_8px_#06b6d4] animate-particle-down-1" />
                <div className="absolute left-1/2 -translate-x-1/2 w-[2.5px] h-[2.5px] rounded-full bg-purple-400 opacity-60 shadow-[0_0_6px_#8b5cf6] animate-particle-up-1" />
                <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-[2px] rounded-full bg-cyan-300 opacity-50 shadow-[0_0_5px_#06b6d4] animate-particle-down-2" />
              </>
            )}
          </div>

          {experienceData.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const isPrimary = item.theme === "primary";
            const isActive = item.phase === "AI ENGINEER";

            return (
              <motion.div 
                key={idx} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={rowVariants}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                
                {/* Timeline Pulsing Node */}
                <motion.div 
                  variants={dotVariants}
                  whileHover={shouldReduce ? {} : { scale: 1.12 }}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-black/85 z-20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300",
                    isActive
                      ? cn("border-primary/60 text-primary-light shadow-[0_0_22px_rgba(139,92,246,0.8)]", !shouldReduce && !isMobile && "animate-node-active")
                      : isPrimary 
                        ? cn("border-primary/20 text-primary-light", !shouldReduce && !isMobile && "animate-node-primary") 
                        : cn("border-secondary/20 text-secondary-light", !shouldReduce && !isMobile && "animate-node-secondary")
                  )}
                >
                  <div className={cn(
                    "rounded-full transition-colors shadow-md",
                    isActive 
                      ? cn("w-[18px] h-[18px] bg-purple-400 shadow-[0_0_12px_#8b5cf6,0_0_24px_rgba(139,92,246,0.6)]", !shouldReduce && !isMobile && "animate-inner-pulse")
                      : "w-2.5 h-2.5",
                    !isActive && (isPrimary ? "bg-primary" : "bg-secondary")
                  )} />
                </motion.div>
                
                {/* Content Evolution Card */}
                <motion.div
                  variants={isEven ? cardVariantsRight : cardVariantsLeft}
                  className={cn(
                    "dashboard-card w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col shimmer-sweep border border-white/5 hover:border-white/10",
                    isPrimary ? "dashboard-card-primary" : "dashboard-card-secondary"
                  )}
                >
                  {/* Card Header Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-white/5 pb-3">
                    <div>
                      <span className="text-[9px] font-mono text-gray-500 tracking-wider block">EVO-STAGE // {item.code}</span>
                      <h3 className="font-bold text-white text-base md:text-lg font-mono mt-0.5 tracking-tight">{item.role}</h3>
                    </div>
                    <time className={cn(
                      "font-mono text-[10px] font-bold px-2 py-0.5 rounded border self-start sm:self-center shadow-sm",
                      isPrimary 
                        ? "text-primary border-primary/20 bg-primary/5 shadow-[0_0_8px_rgba(139,92,246,0.15)]" 
                        : "text-secondary border-secondary/20 bg-secondary/5 shadow-[0_0_8px_rgba(6,182,212,0.15)]"
                    )}>
                      {item.year}
                    </time>
                  </div>

                  {/* Organization & Phase */}
                  <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
                    <span className={cn(
                      "font-mono text-xs font-semibold tracking-wide",
                      isPrimary ? "text-primary-light" : "text-secondary-light"
                    )}>
                      {item.organization}
                    </span>
                    
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-widest border shadow-sm",
                      item.phase === "AI ENGINEER" 
                        ? cn("bg-primary/10 border-primary/35 text-primary-light", !shouldReduce && "animate-pulse") 
                        : item.phase === "BUILDER"
                          ? "bg-secondary/10 border-secondary/35 text-secondary-light"
                          : "bg-white/5 border-white/15 text-gray-400"
                    )}>
                      {item.phase}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Evolution Highlights */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5 mt-auto">
                    {item.highlights.map((hl, hIdx) => (
                      <span 
                        key={hIdx} 
                        className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-mono text-gray-300 bg-white/5 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] cursor-default transition-colors hover:border-white/10 hover:text-white"
                      >
                        • {hl}
                      </span>
                    ))}
                  </div>
                </motion.div>
                
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default Experience;
