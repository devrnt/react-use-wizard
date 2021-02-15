import * as React from 'react';

import { Wizard } from '../../../../dist';
import { AsyncStep, FooterStepIndex, Step } from '../../../components';
import Section from '../../common/section';

const CustomNextStepIndex: React.FC = () => {
  return (
    <Section
      title="Custom step index"
      description="With custom step index on next step"
    >
      <Wizard footer={<FooterStepIndex />}>
        <AsyncStep number={1} />
        <Step number={2} />
        <AsyncStep number={3} />
        <Step number={4} />
      </Wizard>
    </Section>
  );
};

export default CustomNextStepIndex;
