import { styled } from 'goober';
import * as React from 'react';

import { Wizard } from '../../../../dist';
import { AsyncStep, Footer, Step } from '../../../components';
import Sidebar from '../../../components/sidebar';
import Section from '../../common/section';

const Flex = styled('div')`
  display: flex;
  width: 100%;
  gap: 1rem;

  & > :nth-child(2) {
    flex-grow: 1;
  }
`;

const SimpleSection: React.FC = () => {
  return (
    <Section title="Simple wizard" description="mix of async and sync steps">
      <Wizard
        footer={<Footer />}
        sidebar={<Sidebar />}
        onStepChange={(stepIndex) => alert(`New step index is ${stepIndex}`)}
        sidebarAndStepWrapper={<Flex />}
      >
        <AsyncStep number={1} name="Async Step 1" />
        <Step number={2} name="Step 2" />
        <AsyncStep number={3} name="Async Step 3" />
        <Step number={4} name="Step 4" />
      </Wizard>
    </Section>
  );
};

export default SimpleSection;
