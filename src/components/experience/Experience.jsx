import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { experienceData } from '@/constants/experienceData';
import SlideUp from '@/components/animations/SlideUp';
import SectionHeader from '@/components/common/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';

const themeMaps = {
  primary: {
    text: "text-primary",
    dotBg: "bg-primary",
    glow: "shadow-glow-primary"
  },
  secondary: {
    text: "text-secondary",
    dotBg: "bg-secondary",
    glow: "shadow-glow-secondary"
  }
};

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
        
        <SectionHeader number="04." title="Journey" align="center" />

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-secondary before:to-transparent">
          {experienceData.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const activeTheme = themeMaps[item.theme] || themeMaps.primary;

            return (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-surfaceBorder ${activeTheme.glow} ${activeTheme.text} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative`}
                >
                  <div className={`w-3 h-3 ${activeTheme.dotBg} rounded-full transition-colors`}></div>
                </motion.div>
                
                {/* Content Card */}
                <GlassCard 
                  as={motion.div}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-150px" }}
                  variants={isEven ? itemVariants : itemVariantsLeft}
                  className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-xl">{item.role}</h3>
                    <time className="font-mono text-sm text-secondary">{item.year}</time>
                  </div>
                  <div className={`font-medium mb-4 ${activeTheme.text}`}>{item.organization}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </GlassCard>
                
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default Experience;
