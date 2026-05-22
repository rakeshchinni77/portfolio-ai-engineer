import { motion, useReducedMotion } from 'framer-motion';

const StaggerContainer = ({ children, delayChildren = 0, staggerChildren = 0.1, className = "", isChild = false }) => {
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

export default StaggerContainer;
