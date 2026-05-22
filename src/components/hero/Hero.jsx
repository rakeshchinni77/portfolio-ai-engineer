import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { FaPython, FaReact, FaDocker } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiFastapi } from 'react-icons/si';

import { heroData } from '@/constants/heroData';
import FloatingElement from '@/components/animations/FloatingElement';
import Button from '@/components/ui/Button';

const Hero = () => {
  const [keywordIndex, setKeywordIndex] = useState(0);
  const shouldReduce = useReducedMotion();

  // Scroll parallax hooks
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, 250]);
  const contentY = useTransform(scrollY, [0, 800], [0, 80]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % heroData.rotatingKeywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section id="home" className="min-h-[100svh] md:min-h-[90vh] flex items-center justify-center relative overflow-hidden py-16 md:py-20 pointer-events-none">
      {/* Parallax Background Grid and Glowing Orbs */}
      <motion.div 
        style={{ y: shouldReduce ? 0 : backgroundY, opacity: shouldReduce ? 0.2 : opacityFade }} 
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-grid opacity-[0.25]"></div>
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-primary/10 blur-[130px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-secondary/10 blur-[130px]"></div>
      </motion.div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <FloatingElement className="top-[20%] left-[4%] md:left-[15%] p-2 md:p-4 glass rounded-full opacity-15 md:opacity-35 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={0} duration={7}>
          <FaPython className="text-lg md:text-2xl text-secondary" />
        </FloatingElement>
        <FloatingElement className="top-[12%] right-[4%] md:right-[20%] p-2 md:p-4 glass rounded-full opacity-15 md:opacity-35 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={1} duration={8}>
          <SiPytorch className="text-lg md:text-2xl text-secondary" />
        </FloatingElement>
        <FloatingElement className="bottom-[30%] left-[4%] md:left-[20%] p-2 md:p-4 glass rounded-full opacity-15 md:opacity-35 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={2} duration={6}>
          <SiTensorflow className="text-lg md:text-2xl text-secondary" />
        </FloatingElement>
        <FloatingElement className="bottom-[25%] right-[4%] md:right-[25%] p-2 md:p-4 glass rounded-full opacity-15 md:opacity-35 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={1.5} duration={7.5}>
          <FaReact className="text-lg md:text-2xl text-secondary" />
        </FloatingElement>
        <FloatingElement className="hidden md:block top-[45%] right-[10%] p-4 glass rounded-full opacity-35 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={0.5} duration={9}>
          <FaDocker className="text-2xl text-secondary" />
        </FloatingElement>
        <FloatingElement className="hidden md:block bottom-[45%] left-[8%] p-4 glass rounded-full opacity-35 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={2.5} duration={8.5}>
          <SiFastapi className="text-2xl text-secondary" />
        </FloatingElement>
      </div>

      <motion.div 
        style={{ y: shouldReduce ? 0 : contentY, opacity: opacityFade }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 w-full flex flex-col items-center text-center pointer-events-auto"
      >
        {/* Status Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6 md:mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
          </span>
          <span className="text-sm font-mono text-gray-300">{heroData.badge}</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 md:mb-6"
        >
          <span className="block text-white">{heroData.name}</span>
          <span className="block text-gradient mt-2">{heroData.title}</span>
        </motion.h1>

        {/* Subtitle & Rotating Keywords */}
        <motion.div 
          variants={itemVariants}
          className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light h-auto"
        >
          <p className="mb-4 md:mb-2">
            {heroData.descriptionSegments.map((segment, idx) => (
              <span 
                key={idx} 
                className={segment.highlight ? "text-white font-medium" : undefined}
              >
                {segment.text}
              </span>
            ))}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-sm text-secondary">
            <span>Specializing in:</span>
            <span className="relative inline-block h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={keywordIndex}
                  initial={{ y: shouldReduce ? 0 : 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: shouldReduce ? 0 : -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="inline-block text-primary font-bold text-glow"
                >
                  {heroData.rotatingKeywords[keywordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-none mx-auto">
          <Button 
            as="a" 
            href={heroData.ctas.primary.href} 
            variant="primary" 
            size="lg" 
            className="group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {heroData.ctas.primary.label} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <Button 
            as="a" 
            href={heroData.ctas.secondary.href} 
            target={heroData.ctas.secondary.target} 
            variant="glass" 
            size="lg" 
            className="flex items-center gap-2 justify-center"
          >
            <Terminal size={18} className="text-secondary" />
            {heroData.ctas.secondary.label}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
