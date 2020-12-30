import * as React from 'react';

import { useWizard } from '../..';

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
      <p>Step info</p>
      <div className="info">
        Has next step: {!isLastStep ? '✅' : '⛔'}
        <br />
        Has previous step : {!isFirstStep ? '✅' : '⛔'}
      </div>
      Active steps {activeStep + 1} <br />
      <button onClick={previousStep} disabled={isLoading || isFirstStep}>
        Previous
      </button>
      <button onClick={nextStep} disabled={isLoading || isLastStep}>
        Next
      </button>
    </>
  );
});

export default Footer;
