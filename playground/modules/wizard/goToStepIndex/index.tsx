import * as React from 'react';

import { Wizard } from '../../../../dist';
import { AsyncStep, FooterStepIndex, Step } from '../../../components';
import Section from '../../common/section';

const GoToStepIndex: React.FC = () => {
  return (
    <Section
      title="Go To Step"
      description="Jump to given certain step index"
      showDivider={false}
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

export default GoToStepIndex;
