import * as React from 'react';

import { Wizard } from '../../../../dist';
import { AsyncStep, Footer, Step } from '../../../components';
import Section from '../../common/section';

const SimpleSection: React.FC = () => {
  return (
    <Section title="Simple wizard" description="mix of async and sync steps">
      <Wizard footer={<Footer />}>
        <AsyncStep number={1} />
        <Step number={2} />
        <AsyncStep number={3} />
        <Step number={4} />
      </Wizard>
    </Section>
  );
};

export default SimpleSection;
