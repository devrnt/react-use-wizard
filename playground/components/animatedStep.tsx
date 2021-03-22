import { motion } from 'framer-motion';
import * as React from 'react';

import { useWizard } from '../../dist';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
};

type Props = {
  previousStep: React.MutableRefObject<number>;
};

const AnimatedStep: React.FC<Props> = ({
  children,
  previousStep: previousStepIndex,
}) => {
  const { activeStep } = useWizard();

  React.useEffect(() => {
    previousStepIndex.current = activeStep;
  }, [activeStep, previousStepIndex]);

  return (
    <motion.div
      custom={activeStep - previousStepIndex.current}
      variants={variants}
      initial="enter"
      animate="center"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedStep;
