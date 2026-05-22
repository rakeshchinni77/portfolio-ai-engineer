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

  // Scroll parallax hooks using Framer Motion's native useScroll & useTransform
  const { scrollY } = useScroll();
  
  // Parallax speed transformations for background elements
  const gridY = useTransform(scrollY, [0, 1000], [0, 120]);
  const orbY1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const orbY2 = useTransform(scrollY, [0, 1000], [0, 80]);
  const orbY3 = useTransform(scrollY, [0, 1000], [0, 180]);
  
  // Parallax speed transformations for floating icons (simulating 3D depth)
  const yPython = useTransform(scrollY, [0, 1000], [0, -180]);
  const yPytorch = useTransform(scrollY, [0, 1000], [0, -280]);
  const yTensorflow = useTransform(scrollY, [0, 1000], [0, -120]);
  const yReact = useTransform(scrollY, [0, 1000], [0, -220]);
  const yDocker = useTransform(scrollY, [0, 1000], [0, -90]);
  const yFastapi = useTransform(scrollY, [0, 1000], [0, -150]);
  
  // Content container parallax & fade out on scroll
  const contentY = useTransform(scrollY, [0, 1000], [0, 60]);
  const opacityFade = useTransform(scrollY, [0, 800], [1, 0]);

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
        staggerChildren: 0.15,
        delayChildren: 0.15
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="home" className="min-h-[100svh] flex items-center justify-center relative overflow-hidden py-16 md:py-24 pointer-events-none">
      
      {/* 1 & 2. Moving Grid Background & Layered Parallax Background */}
      <motion.div 
        style={{ y: shouldReduce ? 0 : gridY, opacity: shouldReduce ? 0.3 : opacityFade }} 
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-grid animate-grid-slow opacity-[0.08]"></div>
      </motion.div>

      {/* Layered Animated Ambient Orbs */}
      <motion.div
        style={{ y: shouldReduce ? 0 : orbY1, opacity: shouldReduce ? 0.15 : opacityFade }}
        animate={shouldReduce ? {} : {
          x: [-20, 20, -20],
          y: [-25, 25, -25],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[10%] left-[5%] w-[280px] md:w-[450px] h-[280px] md:h-[450px] rounded-full bg-primary/10 blur-[110px] pointer-events-none z-0"
      />

      <motion.div
        style={{ y: shouldReduce ? 0 : orbY2, opacity: shouldReduce ? 0.15 : opacityFade }}
        animate={shouldReduce ? {} : {
          x: [25, -25, 25],
          y: [20, -20, 20],
          scale: [1.1, 0.9, 1.1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[10%] right-[5%] w-[280px] md:w-[450px] h-[280px] md:h-[450px] rounded-full bg-secondary/10 blur-[110px] pointer-events-none z-0"
      />

      <motion.div
        style={{ y: shouldReduce ? 0 : orbY3, opacity: shouldReduce ? 0.08 : opacityFade }}
        animate={shouldReduce ? {} : {
          x: [15, -15, 15],
          y: [-15, 15, -15],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[35%] left-[20%] w-[220px] md:w-[350px] h-[220px] md:h-[350px] rounded-full bg-indigo-500/5 blur-[95px] pointer-events-none z-0"
      />

      {/* 3. Floating Technology Elements (hidden on mobile/reduced-motion for visual cleanliness) */}
      {!shouldReduce && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none hidden sm:block">
          <motion.div style={{ y: yPython, opacity: opacityFade }}>
            <FloatingElement className="top-[22%] left-[6%] md:left-[15%] p-3 md:p-4 glass rounded-full opacity-25 md:opacity-35 blur-[0.5px] scale-90 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={0} duration={7}>
              <FaPython className="text-xl md:text-2xl text-secondary" />
            </FloatingElement>
          </motion.div>

          <motion.div style={{ y: yPytorch, opacity: opacityFade }}>
            <FloatingElement className="top-[14%] right-[6%] md:right-[20%] p-3 md:p-4 glass rounded-full opacity-30 md:opacity-40 scale-105 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={1} duration={8}>
              <SiPytorch className="text-xl md:text-2xl text-secondary" />
            </FloatingElement>
          </motion.div>

          <motion.div style={{ y: yTensorflow, opacity: opacityFade }}>
            <FloatingElement className="bottom-[32%] left-[6%] md:left-[18%] p-2 md:p-3 glass rounded-full opacity-15 md:opacity-25 blur-[1px] scale-75 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={2} duration={6.5}>
              <SiTensorflow className="text-lg md:text-xl text-secondary" />
            </FloatingElement>
          </motion.div>

          <motion.div style={{ y: yReact, opacity: opacityFade }}>
            <FloatingElement className="bottom-[28%] right-[6%] md:right-[22%] p-3 md:p-4 glass rounded-full opacity-35 md:opacity-45 scale-110 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={1.5} duration={7.5}>
              <FaReact className="text-xl md:text-2xl text-secondary" />
            </FloatingElement>
          </motion.div>

          <motion.div style={{ y: yDocker, opacity: opacityFade }} className="hidden md:block">
            <FloatingElement className="top-[48%] right-[12%] p-3 glass rounded-full opacity-20 blur-[0.8px] scale-85 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={0.5} duration={9}>
              <FaDocker className="text-xl text-secondary" />
            </FloatingElement>
          </motion.div>

          <motion.div style={{ y: yFastapi, opacity: opacityFade }} className="hidden md:block">
            <FloatingElement className="bottom-[48%] left-[10%] p-4 glass rounded-full opacity-25 scale-100 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={2.5} duration={8.5}>
              <SiFastapi className="text-2xl text-secondary" />
            </FloatingElement>
          </motion.div>
        </div>
      )}

      {/* Main Content Area */}
      <motion.div 
        style={{ y: shouldReduce ? 0 : contentY, opacity: opacityFade }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 w-full flex flex-col items-center text-center pointer-events-auto"
      >
        {/* Status Badge */}
        <motion.div variants={badgeVariants} className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6 md:mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
          </span>
          <span className="text-sm font-mono text-gray-300">{heroData.badge}</span>
        </motion.div>

        {/* 7. Glow Pulse backdrop directly behind the heading */}
        <motion.div
          style={{ opacity: shouldReduce ? 0 : opacityFade }}
          animate={shouldReduce ? {} : {
            scale: [1, 1.08, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -z-10 w-[240px] sm:w-[480px] h-[100px] sm:h-[160px] rounded-full bg-primary/10 blur-[85px] pointer-events-none"
        />

        {/* Main Heading with responsive font sizing */}
        <motion.h1 
          variants={headingVariants}
          className="text-[2.25rem] xs:text-[2.75rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 md:mb-6 leading-[1.1] sm:leading-none"
        >
          <span className="block text-white">{heroData.name}</span>
          <span className="block text-gradient mt-2 pb-1">{heroData.title}</span>
        </motion.h1>

        {/* Subtitle & Rotating Keywords */}
        <motion.div 
          variants={subtitleVariants}
          className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light h-auto"
        >
          <p className="mb-4 md:mb-2 leading-relaxed">
            {heroData.descriptionSegments.map((segment, idx) => (
              <span 
                key={idx} 
                className={segment.highlight ? "text-white font-medium" : undefined}
              >
                {segment.text}
              </span>
            ))}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 font-mono text-sm text-secondary mt-6">
            <span>Specializing in:</span>
            <span className="relative inline-block h-6 overflow-hidden min-w-[160px] xs:min-w-[200px] sm:min-w-[240px] text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={keywordIndex}
                  initial={{ y: shouldReduce ? 0 : 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: shouldReduce ? 0 : -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute left-1/2 -translate-x-1/2 inline-block text-primary font-bold text-glow whitespace-nowrap"
                >
                  {heroData.rotatingKeywords[keywordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </motion.div>

        {/* 6. Premium CTA Buttons with Glow & Lift Hover Effects */}
        <motion.div variants={ctaVariants} className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-none mx-auto">
          <Button 
            as={motion.a} 
            href={heroData.ctas.primary.href} 
            variant="primary" 
            size="lg" 
            className="group overflow-hidden relative cursor-pointer"
            whileHover={shouldReduce ? {} : { 
              y: -4, 
              scale: 1.02, 
              boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)",
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={shouldReduce ? {} : { y: 0, scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2 justify-center">
              {heroData.ctas.primary.label} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <Button 
            as={motion.a} 
            href={heroData.ctas.secondary.href} 
            target={heroData.ctas.secondary.target} 
            variant="glass" 
            size="lg" 
            className="flex items-center gap-2 justify-center cursor-pointer"
            whileHover={shouldReduce ? {} : { 
              y: -4, 
              scale: 1.02, 
              boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)",
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={shouldReduce ? {} : { y: 0, scale: 0.98 }}
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
