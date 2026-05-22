import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SlideUp = ({ children, delay = 0, duration = 0.6, yOffset = 40, className = "", isChild = false }) => {
  const shouldReduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : yOffset },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduce ? 0 : duration,
        delay: shouldReduce ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1] // smooth easeOut
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

export default SlideUp;
