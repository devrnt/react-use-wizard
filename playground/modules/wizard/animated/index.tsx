import * as React from 'react';

import { Wizard } from '../../../../dist';
import { AnimatedStep, Footer, Step } from '../../../components';
import Section from '../../common/section';

const AnimatedSection: React.FC = () => {
  return (
    <Section
      title="Animated wizard"
      description="animation by framer motion"
      showDivider={false}
    >
      <Wizard footer={<Footer />}>
        <AnimatedStep>
          <Step number={1} withCallback={false} />
        </AnimatedStep>
        <AnimatedStep>
          <Step number={2} withCallback={false} />
        </AnimatedStep>
        <AnimatedStep>
          <Step number={3} withCallback={false} />
        </AnimatedStep>
        <AnimatedStep>
          <Step number={4} withCallback={false} />
        </AnimatedStep>
      </Wizard>
    </Section>
  );
};

export default AnimatedSection;
