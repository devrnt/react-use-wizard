import { styled } from 'goober';
import * as React from 'react';

import AnimatedSection from './animated';
import GoToStepIndex from './goToStepIndex';
import ReactQuerySection from './reactQuery';
import SimpleSection from './simple';

const Container = styled('section')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WizardModule = () => {
  return (
    <Container>
      <SimpleSection />
      <AnimatedSection />
      <ReactQuerySection />
      <GoToStepIndex />
    </Container>
  );
};

export default WizardModule;
