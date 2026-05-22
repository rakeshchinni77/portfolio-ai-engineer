import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const StaggerContainer = ({ children, delayChildren = 0, staggerChildren = 0.1, className = "" }) => {
  const shouldReduce = useReducedMotion();

  const variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduce ? 0 : delayChildren,
        staggerChildren: shouldReduce ? 0 : staggerChildren
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

export default StaggerContainer;
