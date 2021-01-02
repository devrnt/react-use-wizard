import { motion } from 'framer-motion';
import * as React from 'react';

const variants = {
  enter: {
    x: -1000,
    opacity: 0,
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    x: 1000,
    opacity: 0,
  },
};

const AnimatedStep: React.FC = React.memo(({ children }) => {
  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      {children}
    </motion.div>
  );
});

export default AnimatedStep;
