import { styled } from 'goober';
import * as React from 'react';

import { useWizard } from '../../../dist';
import { Button } from '../../modules/common';

export const Actions = styled('div')`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  gap: 1rem;
  flex-direction: row;
`;

export const Info = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0;

  & > p {
    margin: 0.25rem 0;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;

    & > p {
      margin: initial;
    }
  }
`;

const Footer: React.FC = () => {
  const {
    nextStep,
    previousStep,
    isLoading,
    activeStep,
    stepCount,
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
          <br />
          <p>
            Total steps: {stepCount} <br />
          </p>
        </Info>
        <Actions>
          <Button
            label="Previous"
            onClick={() => previousStep()}
            disabled={isLoading || isFirstStep}
          >
            Previous
          </Button>
          <Button
            label="Next"
            onClick={() => nextStep()}
            disabled={isLoading || isLastStep}
          />
        </Actions>
      </code>
    </>
  );
};

export default Footer;
