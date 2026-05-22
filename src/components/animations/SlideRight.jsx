import { motion, useReducedMotion } from 'framer-motion';

const SlideRight = ({ children, delay = 0, duration = 0.6, xOffset = 30, className = "", isChild = false }) => {
  const shouldReduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, x: shouldReduce ? 0 : xOffset },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: shouldReduce ? 0 : duration,
        delay: shouldReduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1] // Premium ease-out
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

export default SlideRight;
