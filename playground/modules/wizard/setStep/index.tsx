import * as React from 'react';

import { Wizard } from '../../../../dist';
import { AsyncStep, SetStepFooter, Step } from '../../../components';
import Section from '../../common/section';

const SetStepSection: React.FC = () => {
  return (
    <Section title="Set step Simple wizard" description="mix of async and sync steps">
      <Wizard footer={<SetStepFooter />}>
        <Step number={1} />
        <Step number={2} />
        <Step number={3} />
        <AsyncStep number={4} />
      </Wizard>
    </Section>
  );
};

export default SetStepSection;
