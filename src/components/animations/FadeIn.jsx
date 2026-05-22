import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const FadeIn = ({ children, delay = 0, duration = 0.5, className = "" }) => {
  const shouldReduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: shouldReduce ? 0 : duration,
        delay: shouldReduce ? 0 : delay,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
