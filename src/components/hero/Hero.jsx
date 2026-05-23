import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Terminal, Loader2, Check } from 'lucide-react';
import { FaPython, FaReact, FaDocker } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiFastapi } from 'react-icons/si';

import { heroData } from '@/constants/heroData';
import FloatingElement from '@/components/animations/FloatingElement';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const ambientParticles = [
  { id: 1, size: 2, top: "20%", left: "15%", delay: 0.2, duration: 12, depth: "far" },
  { id: 2, size: 3, top: "35%", left: "85%", delay: 1.5, duration: 16, depth: "near" },
  { id: 3, size: 1.5, top: "60%", left: "10%", delay: 2.1, duration: 14, depth: "far" },
  { id: 4, size: 2.5, top: "75%", left: "75%", delay: 0.8, duration: 18, depth: "near" },
  { id: 5, size: 2, top: "45%", left: "25%", delay: 3.0, duration: 15, depth: "far" },
  { id: 6, size: 3, top: "15%", left: "70%", delay: 1.0, duration: 20, depth: "near" },
  { id: 7, size: 1.5, top: "80%", left: "40%", delay: 4.2, duration: 13, depth: "far" },
  { id: 8, size: 2, top: "50%", left: "60%", delay: 2.5, duration: 17, depth: "near" },
];

const Hero = () => {
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [downloadStatus, setDownloadStatus] = useState('idle');
  const [showTooltip, setShowTooltip] = useState(false);
  const shouldReduce = useReducedMotion();

  const handleDownload = () => {
    if (downloadStatus !== 'idle') return;
    setDownloadStatus('downloading');
    setTimeout(() => {
      setDownloadStatus('success');
      setTimeout(() => {
        setDownloadStatus('idle');
      }, 2000);
    }, 1500);
  };

  // Find the longest keyword to size the container dynamically and prevent layout shifts
  const longestKeyword = heroData.rotatingKeywords.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    ""
  );

  // Scroll parallax hooks using Framer Motion's native useScroll & useTransform
  const { scrollY } = useScroll();
  
  // 1. Restrained parallax speed transformations for background elements
  const gridY = useTransform(scrollY, [0, 1000], [0, 35]);
  const orbY1 = useTransform(scrollY, [0, 1000], [0, 50]);
  const orbY2 = useTransform(scrollY, [0, 1000], [0, 35]);
  const orbY3 = useTransform(scrollY, [0, 1000], [0, 60]);
  
  // Parallax speed transformations for floating icons (restrained opposing movement)
  const yPython = useTransform(scrollY, [0, 1000], [0, -35]);
  const yPytorch = useTransform(scrollY, [0, 1000], [0, -65]);
  const yTensorflow = useTransform(scrollY, [0, 1000], [0, -25]);
  const yReact = useTransform(scrollY, [0, 1000], [0, -50]);
  const yDocker = useTransform(scrollY, [0, 1000], [0, -20]);
  const yFastapi = useTransform(scrollY, [0, 1000], [0, -30]);

  // Parallax transforms for particles
  const yPartFar = useTransform(scrollY, [0, 1000], [0, 25]);
  const yPartNear = useTransform(scrollY, [0, 1000], [0, 70]);
  
  // 5. Ambient orbs dynamic opacity shifts on scroll (environmental lighting)
  const orbOpacity1 = useTransform(scrollY, [0, 900], [0.15, 0.02]);
  const orbOpacity2 = useTransform(scrollY, [0, 900], [0.12, 0.02]);
  const orbOpacity3 = useTransform(scrollY, [0, 900], [0.08, 0.01]);

  // Content container parallax & fade out on scroll (restrained translation)
  const contentY = useTransform(scrollY, [0, 1000], [0, 20]);
  const opacityFade = useTransform(scrollY, [0, 900], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % heroData.rotatingKeywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Monitor resize to apply mobile optimization (slice particles list)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeParticles = isMobile ? [] : ambientParticles;

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
      transition: { duration: shouldReduce ? 0 : (isMobile ? 0.4 : 0.8), ease: [0.16, 1, 0.3, 1] }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduce ? 0 : (isMobile ? 0.5 : 1.0), ease: [0.16, 1, 0.3, 1] }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduce ? 0 : (isMobile ? 0.4 : 0.8), ease: "easeOut" }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduce ? 0 : (isMobile ? 0.4 : 0.8), ease: "easeOut" }
    }
  };

  return (
    <section id="home" className="min-h-[100svh] flex items-center justify-center relative overflow-hidden py-16 md:py-24 pointer-events-none">
      
      {/* 3. Layered Double-Grid System (Static base + radial fading moving parallax grid) */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] z-0 pointer-events-none"></div>
      
      <motion.div 
        style={{ y: shouldReduce ? 0 : gridY, opacity: shouldReduce ? 0.05 : opacityFade }} 
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className={cn("absolute inset-0 bg-grid mask-radial-fade opacity-[0.07]", !isMobile && "animate-grid-slow")}></div>
      </motion.div>

      {/* 4. Refined Orb Motion & Blur Profile Layers (Unmounted on mobile to optimize GPU) */}
      {!isMobile && (
        <>
          <motion.div
            style={{ 
              y: shouldReduce ? 0 : orbY1, 
              opacity: shouldReduce ? 0.06 : orbOpacity1 
            }}
            animate={shouldReduce ? {} : {
              x: [-12, 12, -12],
              y: [-15, 15, -15],
              scale: [1, 1.06, 1]
            }}
            transition={shouldReduce ? {} : {
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[8%] left-[8%] w-[260px] md:w-[420px] h-[260px] md:h-[420px] rounded-full bg-gradient-radial from-primary/10 to-transparent pointer-events-none z-0"
          />

          <motion.div
            style={{ 
              y: shouldReduce ? 0 : orbY2, 
              opacity: shouldReduce ? 0.06 : orbOpacity2 
            }}
            animate={shouldReduce ? {} : {
              x: [15, -15, 15],
              y: [12, -12, 12],
              scale: [1.08, 0.95, 1.08]
            }}
            transition={shouldReduce ? {} : {
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-[8%] right-[8%] w-[260px] md:w-[420px] h-[260px] md:h-[420px] rounded-full bg-gradient-radial from-secondary/8 to-transparent pointer-events-none z-0"
          />

          <motion.div
            style={{ 
              y: shouldReduce ? 0 : orbY3, 
              opacity: shouldReduce ? 0.04 : orbOpacity3 
            }}
            animate={shouldReduce ? {} : {
              x: [10, -10, 10],
              y: [-10, 10, -10],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={shouldReduce ? {} : {
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[35%] left-[25%] w-[200px] md:w-[320px] h-[200px] md:h-[320px] rounded-full bg-gradient-radial from-indigo-500/6 to-transparent pointer-events-none z-0"
          />
        </>
      )}

      {/* 2 & 6. Floating Ambient Particles (lightweight, restricted on mobile) */}
      {!shouldReduce && activeParticles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            y: shouldReduce ? 0 : (p.depth === "near" ? yPartNear : yPartFar),
            opacity: opacityFade
          }}
          animate={shouldReduce ? {} : {
            x: [-6, 6, -6],
            y: [-10, 10, -10],
            opacity: [0.04, 0.12, 0.04]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
          className="absolute rounded-full bg-secondary/30 pointer-events-none z-10"
        />
      ))}

      {/* Floating Technology Elements (restrained parallax speeds, completely disabled on mobile to optimize DOM & CPU) */}
      {!(shouldReduce || isMobile) && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none hidden sm:block">
          <motion.div style={{ y: yPython, opacity: opacityFade }}>
            <FloatingElement className="top-[22%] left-[6%] md:left-[15%] p-3 md:p-4 glass rounded-full opacity-20 sm:opacity-30 blur-[0.5px] scale-90 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={0} duration={7}>
              <FaPython className="text-xl md:text-2xl text-secondary" />
            </FloatingElement>
          </motion.div>

          <motion.div style={{ y: yPytorch, opacity: opacityFade }}>
            <FloatingElement className="top-[14%] right-[6%] md:right-[20%] p-3 md:p-4 glass rounded-full opacity-25 sm:opacity-35 scale-105 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={1} duration={8}>
              <SiPytorch className="text-xl md:text-2xl text-secondary" />
            </FloatingElement>
          </motion.div>

          <motion.div style={{ y: yTensorflow, opacity: opacityFade }}>
            <FloatingElement className="bottom-[32%] left-[6%] md:left-[18%] p-2 md:p-3 glass rounded-full opacity-10 sm:opacity-20 blur-[1px] scale-75 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={2} duration={6.5}>
              <SiTensorflow className="text-lg md:text-xl text-secondary" />
            </FloatingElement>
          </motion.div>

          <motion.div style={{ y: yReact, opacity: opacityFade }}>
            <FloatingElement className="bottom-[28%] right-[6%] md:right-[22%] p-3 md:p-4 glass rounded-full opacity-30 sm:opacity-40 scale-110 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={1.5} duration={7.5}>
              <FaReact className="text-xl md:text-2xl text-secondary" />
            </FloatingElement>
          </motion.div>

          <motion.div style={{ y: yDocker, opacity: opacityFade }} className="hidden md:block">
            <FloatingElement className="top-[48%] right-[12%] p-3 glass rounded-full opacity-15 blur-[0.8px] scale-85 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={0.5} duration={9}>
              <FaDocker className="text-xl text-secondary" />
            </FloatingElement>
          </motion.div>

          <motion.div style={{ y: yFastapi, opacity: opacityFade }} className="hidden md:block">
            <FloatingElement className="bottom-[48%] left-[10%] p-4 glass rounded-full opacity-20 scale-100 hover:opacity-90 hover:scale-110 hover:shadow-glow-primary transition-all duration-300" delay={2.5} duration={8.5}>
              <SiFastapi className="text-2xl text-secondary" />
            </FloatingElement>
          </motion.div>
        </div>
      )}

      {/* Mobile Floating Technology Elements (Pure CSS animation, no Framer Motion, unmounted on prefers-reduced-motion) */}
      {isMobile && !shouldReduce && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {/* Top-left: Python */}
          <div className="absolute top-[16%] left-[8%] p-2.5 glass rounded-full opacity-20 animate-float-mobile-slow-1">
            <FaPython className="text-lg text-secondary" />
          </div>

          {/* Top-right: React */}
          <div className="absolute top-[22%] right-[8%] p-2.5 glass rounded-full opacity-20 animate-float-mobile-slow-2">
            <FaReact className="text-lg text-secondary" />
          </div>

          {/* Lower-left: PyTorch */}
          <div className="absolute bottom-[38%] left-[8%] p-2.5 glass rounded-full opacity-20 animate-float-mobile-slow-3">
            <SiPytorch className="text-lg text-secondary" />
          </div>

          {/* Lower-right: Docker */}
          <div className="absolute bottom-[20%] right-[8%] p-2.5 glass rounded-full opacity-20 animate-float-mobile-slow-4">
            <FaDocker className="text-lg text-secondary" />
          </div>
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
            {!isMobile && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            )}
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
          </span>
          <span className="text-sm font-mono text-gray-300">{heroData.badge}</span>
        </motion.div>

        {/* Glow Pulse backdrop directly behind the heading (Unmounted on mobile) */}
        {!isMobile && (
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
            className="absolute -z-10 w-[240px] sm:w-[480px] h-[100px] sm:h-[160px] rounded-full bg-gradient-radial from-primary/10 to-transparent pointer-events-none"
          />
        )}

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
            <span className="relative inline-flex items-center justify-start h-6 overflow-hidden text-left pl-0 pr-4 flex-shrink-0">
              {/* Invisible placeholder to establish the stable width of the container dynamically */}
              <span className="invisible font-bold whitespace-nowrap select-none pointer-events-none text-left">
                {longestKeyword}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={keywordIndex}
                  initial={{ y: shouldReduce ? 0 : 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: shouldReduce ? 0 : -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute left-0 inline-block text-primary font-bold text-glow whitespace-nowrap text-left"
                >
                  {heroData.rotatingKeywords[keywordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </motion.div>

        {/* Premium CTA Buttons with Glow & Lift Hover Effects */}
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
          <div className="relative inline-block w-full sm:w-auto">
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 pointer-events-none z-30 hidden sm:block"
                >
                  <div className="bg-[#030014]/90 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-mono text-secondary whitespace-nowrap shadow-glow-secondary border border-secondary/20">
                    Resume PDF • Updated 2026
                  </div>
                  {/* Tooltip arrow */}
                  <div className="w-2 h-2 bg-[#030014]/90 border-r border-b border-secondary/20 rotate-45 absolute top-full left-1/2 -translate-x-1/2 -translate-y-1"></div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              as={motion.a} 
              href={heroData.ctas.secondary.href} 
              download="Rakesh_AI_Engineer_Resume.pdf"
              target="_blank" 
              rel="noopener noreferrer"
              variant="glass" 
              size="lg" 
              className="flex items-center gap-2 justify-center cursor-pointer w-full sm:w-auto group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Download Rakesh's Resume in PDF format"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={handleDownload}
              whileHover={shouldReduce ? {} : { 
                y: -4, 
                scale: 1.02, 
                boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)",
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={shouldReduce ? {} : { y: 0, scale: 0.98 }}
            >
              {downloadStatus === 'idle' && (
                <>
                  <Terminal size={18} className="text-secondary group-hover:-translate-y-0.5 group-hover:scale-105 transition-transform duration-300 ease-out" />
                  <span>{heroData.ctas.secondary.label}</span>
                </>
              )}
              {downloadStatus === 'downloading' && (
                <>
                  <Loader2 size={18} className="text-secondary animate-spin" />
                  <span>Downloading...</span>
                </>
              )}
              {downloadStatus === 'success' && (
                <>
                  <Check size={18} className="text-emerald-400 animate-bounce" />
                  <span className="text-emerald-400">Resume Saved!</span>
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
