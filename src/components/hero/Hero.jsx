import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { FaPython, FaReact, FaDocker } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiFastapi } from 'react-icons/si';

const keywords = [
  "Autonomous Agents",
  "Large Language Models",
  "Semantic Search",
  "MLOps Pipelines",
  "Neural Networks",
  "Intelligent Systems"
];

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
      setKeywordIndex((prev) => (prev + 1) % keywords.length);
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

  const floatingIcon = (Icon, className, delay, duration = 6, initialX = 0, initialY = 0) => {
    if (shouldReduce) return null;
    return (
      <motion.div
        className={`absolute p-4 glass rounded-full opacity-35 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300 pointer-events-auto cursor-pointer ${className}`}
        initial={{ x: initialX, y: initialY }}
        animate={{
          y: [initialY, initialY - 20, initialY],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
      >
        <Icon className="text-2xl text-secondary" />
      </motion.div>
    );
  };

  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden py-20 pointer-events-none">
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
        {floatingIcon(FaPython, "top-[20%] left-[15%]", 0, 7, 0, 0)}
        {floatingIcon(SiPytorch, "top-[15%] right-[20%]", 1, 8, 0, 0)}
        {floatingIcon(SiTensorflow, "bottom-[30%] left-[20%]", 2, 6, 0, 0)}
        {floatingIcon(FaReact, "bottom-[25%] right-[25%]", 1.5, 7.5, 0, 0)}
        {floatingIcon(FaDocker, "top-[45%] right-[10%]", 0.5, 9, 0, 0)}
        {floatingIcon(SiFastapi, "bottom-[45%] left-[8%]", 2.5, 8.5, 0, 0)}
      </div>

      <motion.div 
        style={{ y: shouldReduce ? 0 : contentY, opacity: opacityFade }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 w-full flex flex-col items-center text-center pointer-events-auto"
      >
        {/* Status Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
          </span>
          <span className="text-sm font-mono text-gray-300">Available for Opportunities</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="block text-white">Chinni Rakesh</span>
          <span className="block text-gradient mt-2">AI Engineer</span>
        </motion.h1>

        {/* Subtitle & Rotating Keywords */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light h-[80px]"
        >
          <p className="mb-2">
            I build intelligent systems and modern interfaces. Bridging the gap between 
            <span className="text-white font-medium"> machine learning models</span> and 
            <span className="text-white font-medium"> human-centric web experiences</span>.
          </p>
          <div className="flex items-center justify-center space-x-2 font-mono text-sm text-secondary">
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
                  {keywords[keywordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="group relative px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all shadow-glow-primary overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a href="/resume.pdf" target="_blank" className="px-8 py-4 glass text-white font-medium rounded-lg hover:bg-white/10 transition-all flex items-center gap-2 justify-center">
            <Terminal size={18} className="text-secondary" />
            Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
