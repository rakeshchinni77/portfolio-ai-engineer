import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Brain, Database } from 'lucide-react';
import { FaPython, FaReact, FaDocker, FaGithub } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiFastapi, SiHuggingface } from 'react-icons/si';
import { cn } from '@/utils/cn';

const techItems = [
  { name: 'Python', icon: FaPython, color: '#3776AB', radius: 120, tilt: 0, speed: 0.007, phase: 0 },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF9900', radius: 110, tilt: 35, speed: -0.005, phase: 1.2 },
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C', radius: 115, tilt: -30, speed: 0.006, phase: 2.4 },
  { name: 'LangChain', icon: Brain, color: '#1C3C3A', radius: 125, tilt: 55, speed: -0.004, phase: 3.6 },
  { name: 'Docker', icon: FaDocker, color: '#2496ED', radius: 130, tilt: -50, speed: 0.005, phase: 4.8 },
  { name: 'React', icon: FaReact, color: '#61DAFB', radius: 105, tilt: 45, speed: -0.006, phase: 0.5 },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688', radius: 110, tilt: -40, speed: 0.007, phase: 1.8 },
  { name: 'Hugging Face', icon: SiHuggingface, color: '#FFD21E', radius: 120, tilt: 20, speed: -0.005, phase: 3.0 },
  { name: 'FAISS', icon: Database, color: '#8b5cf6', radius: 115, tilt: -15, speed: 0.006, phase: 4.2 },
  { name: 'GitHub', icon: FaGithub, color: '#FFFFFF', radius: 135, tilt: 70, speed: -0.003, phase: 5.4 }
];

const TechSphere = () => {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const shouldReduce = useReducedMotion();
  
  const anglesRef = useRef(techItems.map(item => item.phase));
  const mousePosRef = useRef({ x: 0, y: 0 });
  const targetMousePosRef = useRef({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const inViewRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle visibility changes and intersection observer to pause updates when tab is hidden or element is out of viewport
  useEffect(() => {
    // Performance Hardening: Completely pause requestAnimationFrame loop on mobile devices (< 768px)
    // or if the user prefers reduced motion to ensure Lighthouse scores remain >= 85.
    // CSS-based animations will handle mobile orbiting with 0% CPU cycles.
    if (shouldReduce || isMobile) {
      Promise.resolve().then(() => {
        setIsAnimating(false);
      });
      return;
    }

    const checkActive = () => {
      const visible = document.visibilityState === 'visible';
      const inView = inViewRef.current;
      setIsAnimating(visible && inView);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
      checkActive();
    }, { threshold: 0.05 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVis = () => checkActive();
    document.addEventListener('visibilitychange', handleVis);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVis);
    };
  }, [shouldReduce, isMobile]);

  // Handle mouse move for parallax
  const handleMouseMove = (e) => {
    if (shouldReduce || isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetMousePosRef.current = { x, y };
  };

  const handleMouseLeave = () => {
    targetMousePosRef.current = { x: 0, y: 0 };
  };

  // Animation Loop (Orbit + Mouse Easing via Direct DOM Manipulation)
  useEffect(() => {
    const update = () => {
      // Ease mouse position for organic delay feel
      if (!isMobile) {
        mousePosRef.current.x += (targetMousePosRef.current.x - mousePosRef.current.x) * 0.08;
        mousePosRef.current.y += (targetMousePosRef.current.y - mousePosRef.current.y) * 0.08;
      } else {
        mousePosRef.current = { x: 0, y: 0 };
      }

      // Increment angles (slowed down on mobile to save CPU/GPU)
      const speedMultiplier = isMobile ? 0.4 : 1.0;
      anglesRef.current = anglesRef.current.map((angle, idx) => {
        return angle + techItems[idx].speed * speedMultiplier;
      });

      // Render updates directly to DOM styles (avoids 60 React re-renders per second)
      techItems.forEach((item, idx) => {
        const el = itemRefs.current[idx];
        if (!el) return;

        const angle = anglesRef.current[idx];
        const rad = angle;
        const tiltRad = (item.tilt * Math.PI) / 180;

        // 3D coordinates on virtual sphere
        const X = item.radius * Math.cos(rad);
        const yFlat = item.radius * Math.sin(rad);
        
        // Rotate around X-axis by tilt angle
        const Y = yFlat * Math.cos(tiltRad);
        const Z = yFlat * Math.sin(tiltRad);

        // Project to 2D
        const depth = (Z + item.radius) / (2 * item.radius);
        const scale = 0.5 + depth * 0.6; // Scale ranges from 0.5 to 1.1
        const opacity = 0.35 + depth * 0.65; // Opacity ranges from 0.35 to 1.0
        const zIndex = Math.round(scale * 100);
        const blurValue = shouldReduce ? 0 : Math.max(0, (1 - scale) * 4.5);

        // Parallax translation based on depth scale
        const xParallax = mousePosRef.current.x * 60 * scale;
        const yParallax = mousePosRef.current.y * 60 * scale;

        el.style.left = `calc(50% + ${X + xParallax}px)`;
        el.style.top = `calc(50% + ${Y + yParallax}px)`;
        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;
        // Optimization: Disable blur filters on mobile to protect rendering efficiency
        if (!shouldReduce && !isMobile) {
          el.style.filter = `blur(${blurValue}px)`;
        } else {
          el.style.filter = 'none';
        }
      });
    };

    // Run once to initialize styling even if animation is paused
    update();

    if (!isAnimating) return;

    let animFrame;
    const loop = () => {
      update();
      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    
    return () => {
      if (animFrame) {
        cancelAnimationFrame(animFrame);
      }
    };
  }, [isAnimating, shouldReduce, isMobile]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[340px] md:max-w-[400px] mx-auto flex items-center justify-center dashboard-card p-6 border-white/5 rounded-3xl bg-[#09061a]/30 backdrop-blur-xl shadow-glow-primary/10 overflow-hidden cursor-pointer select-none group/sphere"
    >
      {/* Moving Grid Background (Disabled on mobile to save CPU/GPU) */}
      <div className={`absolute inset-0 bg-grid opacity-10 pointer-events-none ${!isMobile ? 'animate-grid-slow' : ''}`} />
      
      {/* Outer subtle glowing ring */}
      <div className={`absolute w-4/5 h-4/5 rounded-full border border-white/5 pointer-events-none flex items-center justify-center ${!isMobile ? 'animate-spin' : ''}`} style={{ animationDuration: '60s' }}>
        <div className="absolute top-0 w-2 h-2 rounded-full bg-secondary/30 blur-[2px]" />
      </div>

      {/* Central Engine Core */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Pulsing Core Glow */}
        <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 border border-white/5 blur-xl group-hover/sphere:scale-110 transition-transform duration-700" />
        
        {/* Core Card */}
        <div className="relative w-16 h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.2)] backdrop-blur-md">
          {/* Optimization: Disable Brain icon pulse animation on mobile */}
          <Brain className={cn("w-8 h-8 text-primary-light", !isMobile && "animate-pulse")} />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-gray-400 mt-3 font-semibold bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
          AI CORE
        </span>
      </div>

      {/* Orbiting Tech Items wrapper (Uses CSS rotation on mobile for performance safety) */}
      <div className={cn("absolute inset-0 pointer-events-none z-20", isMobile && "animate-orbit-mobile-wrapper")}>
        {techItems.map((item, idx) => {
          const Icon = item.icon;
          
          return (
            <div
              key={item.name}
              ref={el => itemRefs.current[idx] = el}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0,
                pointerEvents: 'none',
                transition: 'filter 0.3s ease'
              }}
              className="flex flex-col items-center gap-1.5"
            >
              {/* Inner wrapper that counter-rotates on mobile to keep icons/text upright */}
              <div className={cn("flex flex-col items-center gap-1.5", isMobile && "animate-orbit-mobile-node")}>
                {/* Tech Node Badge */}
                <div 
                  style={{ 
                    borderColor: `${item.color}33`,
                    boxShadow: `0 0 15px ${item.color}15, inset 0 1px 1px rgba(255, 255, 255, 0.05)`
                  }}
                  className="w-10 h-10 rounded-xl bg-black/60 border flex items-center justify-center backdrop-blur-md"
                >
                  <Icon style={{ color: item.color }} className="w-5 h-5" />
                </div>

                {/* Micro Badge Text */}
                <span 
                  className="text-[8px] font-mono text-gray-400 bg-black/80 px-1.5 py-0.5 rounded border border-white/5 shadow-md pointer-events-none"
                >
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechSphere;
