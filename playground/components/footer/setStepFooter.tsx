import * as React from 'react';

import { useWizard } from '../../../dist';
import { Button } from '../../modules/common';
import { Actions, Info } from './footer';

const SetStepFooter: React.FC = () => {
  const {
    setStep,
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
            onClick={() => setStep(1)}
            disabled={isLoading || isFirstStep}
          >
            Previous
          </Button>
          <Button
            label="Next"
            onClick={() => setStep(4)}
            disabled={isLoading || isLastStep}
          />
        </Actions>
      </code>
    </>
  );
};

export default SetStepFooter;
