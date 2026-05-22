import { motion, useReducedMotion } from 'framer-motion';
import { BrainCircuit, Code2, Database } from 'lucide-react';

import { aboutData } from '@/constants/aboutData';
import SlideLeft from '@/components/animations/SlideLeft';
import StaggerContainer from '@/components/animations/StaggerContainer';
import SectionHeader from '@/components/common/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';

const iconMap = {
  BrainCircuit,
  Code2,
  Database
};

const themeMaps = {
  primary: {
    bg: "bg-primary/20",
    text: "text-primary"
  },
  secondary: {
    bg: "bg-secondary/20",
    text: "text-secondary"
  },
  blue: {
    bg: "bg-blue-500/20",
    text: "text-blue-400"
  }
};

const About = () => {
  const shouldReduce = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, x: shouldReduce ? 0 : 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <SectionHeader number={aboutData.number} title={aboutData.title} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <SlideLeft delay={0.2}>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
                <div className="w-40 h-40 shrink-0 rounded-2xl overflow-hidden border border-primary/50 shadow-glow-primary">
                  <img 
                    src={aboutData.profileImage} 
                    alt={aboutData.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { e.target.src = aboutData.fallbackImage }} 
                  />
                </div>
                {aboutData.description.length > 0 && (
                  <p className="mt-4 sm:mt-0">
                    {aboutData.description[0]}
                  </p>
                )}
              </div>
              {aboutData.description.slice(1).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </SlideLeft>

          {/* Cards (Staggered Entrance) */}
          <StaggerContainer delayChildren={0.2} staggerChildren={0.15} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutData.highlights.map((card, idx) => {
              const IconComponent = iconMap[card.icon] || Code2;
              const activeTheme = themeMaps[card.theme] || themeMaps.primary;
              const isThird = idx === 2;

              return (
                <GlassCard 
                  key={idx} 
                  as={motion.div} 
                  variants={cardVariants} 
                  className={`p-6 flex flex-col gap-4 ${isThird ? 'sm:col-span-2' : idx === 1 ? 'mt-0 sm:mt-8' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-full ${activeTheme.bg} flex items-center justify-center ${activeTheme.text}`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  <p className="text-sm text-gray-400">{card.description}</p>
                </GlassCard>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default About;
