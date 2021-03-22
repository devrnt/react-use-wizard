import { AnimatePresence } from 'framer-motion';
import * as React from 'react';

import { Wizard } from '../../../../dist';
import { AnimatedStep, Footer, Step } from '../../../components';
import Section from '../../common/section';

const AnimatedSection: React.FC = () => {
  const previousStep = React.useRef<number>(0);

  return (
    <Section title="Animated wizard" description="animation by framer motion">
      <AnimatePresence>
        <Wizard footer={<Footer />}>
          {Array(4)
            .fill(null)
            .map((_, index) => {
              return (
                <AnimatedStep key={index} previousStep={previousStep}>
                  <Step number={index} withCallback={false}></Step>
                </AnimatedStep>
              );
            })}
        </Wizard>
      </AnimatePresence>
    </Section>
  );
};

export default AnimatedSection;
