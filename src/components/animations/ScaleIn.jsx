import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ScaleIn = ({ 
  children, 
  delay = 0, 
  duration = 0.3, 
  scaleOffset = 0.8, 
  className = "", 
  isChild = true 
}) => {
  const shouldReduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, scale: shouldReduce ? 1 : scaleOffset },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: shouldReduce ? 0 : duration,
        delay: shouldReduce ? 0 : delay,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial={isChild ? undefined : "hidden"}
      whileInView={isChild ? undefined : "visible"}
      viewport={isChild ? undefined : { once: true, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;
