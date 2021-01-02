import * as React from 'react';
import styled from 'styled-components';

import { useWizard } from '../../dist';
import { Button } from '../modules/common';

const Actions = styled.div`
  display: grid;
  justify-content: center;
  margin: 1rem 0;
  grid-template-columns: min-content min-content;
  gap: 1rem;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Footer: React.FC = React.memo(() => {
  const {
    nextStep,
    previousStep,
    isLoading,
    activeStep,
    isLastStep,
    isFirstStep,
  } = useWizard();

  return (
    <>
      <code>
        <Info>
          <p>Has previous step: {!isFirstStep ? '✅' : '⛔'}</p>
          <br />
          <p>Has next step: {!isLastStep ? '✅' : '⛔'} </p>
          <br />
          <p>
            Active step: {activeStep + 1} <br />
          </p>
        </Info>
        <Actions>
          <Button
            label="Previous"
            onClick={previousStep}
            disabled={isLoading || isFirstStep}
          >
            Previous
          </Button>
          <Button
            label="Next"
            onClick={nextStep}
            disabled={isLoading || isLastStep}
          />
        </Actions>
      </code>
    </>
  );
});

export default Footer;
