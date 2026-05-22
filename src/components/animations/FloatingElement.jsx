import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

const FloatingElement = ({ 
  children, 
  className, 
  delay = 0, 
  duration = 6, 
  initialX = 0, 
  initialY = 0,
  yRange = -20,
  ...props
}) => {
  const shouldReduce = useReducedMotion();

  // If reduced motion is requested, do not run the infinite floating animation
  if (shouldReduce) {
    return (
      <div 
        className={cn("absolute pointer-events-auto cursor-pointer", className)}
        style={{ transform: `translate(${initialX}px, ${initialY}px)` }}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("absolute pointer-events-auto cursor-pointer", className)}
      initial={{ x: initialX, y: initialY }}
      animate={{
        y: [initialY, initialY + yRange, initialY],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
