import * as React from 'react';

import { useWizard } from '../../../dist';
import { Button } from '../../modules/common';
import { Actions, Info } from './footer';

const FooterGoToStepIndex: React.FC = () => {
  const {
    goToStep,
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
            label="Go to step 3"
            onClick={() => goToStep(2)}
            disabled={isLoading || isLastStep}
          />
        </Actions>
      </code>
    </>
  );
};

export default FooterGoToStepIndex;
