import { AnimatePresence } from 'framer-motion';
import * as React from 'react';

import { Wizard } from '../../../../dist';
import { AnimatedStep, Footer, Step } from '../../../components';
import Section from '../../common/section';

const AnimatedSection: React.FC = () => {
  const previousStep = React.useRef<number>(0);

  return (
    <Section title="Animated wizard" description="animation by framer motion">
      <Wizard
        footer={<Footer />}
        wrapper={<AnimatePresence initial={false} exitBeforeEnter />}
      >
        {Array(4)
          .fill(null)
          .map((_, index) => {
            return (
              <AnimatedStep key={index} previousStep={previousStep}>
                <Step number={index + 1} withCallback={false}></Step>
              </AnimatedStep>
            );
          })}
      </Wizard>
    </Section>
  );
};

export default AnimatedSection;
