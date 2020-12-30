import * as React from 'react';

import { Handler, WizardProps } from './types';
import WizardContext from './wizardContext';

const Wizard: React.FC<WizardProps> = React.memo(
  ({ header, footer, children }) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const hasNextStep = React.useRef(true);
    const hasPreviousStep = React.useRef(false);
    const nextStepHandler = React.useRef<Handler>(() => Promise.resolve());

    hasNextStep.current =
      activeStep < React.Children.toArray(children).length - 1;
    hasPreviousStep.current = activeStep > 0;

    const goToNextStep = React.useCallback(() => {
      if (hasNextStep.current) {
        setActiveStep(activeStep => activeStep + 1);
      }
    }, []);

    const previousStep = React.useCallback(() => {
      if (hasPreviousStep.current) {
        setActiveStep(prev => prev - 1);
      }
    }, [setActiveStep]);

    // Callback to attach the step handler
    const handleStep = React.useCallback((handler: Handler) => {
      nextStepHandler.current = handler;
    }, []);

    const doNextStep = React.useCallback(async () => {
      if (hasNextStep.current && nextStepHandler.current) {
        try {
          setIsLoading(true);
          await nextStepHandler.current();
          setIsLoading(false);
          nextStepHandler.current = null;
          goToNextStep();
        } catch (error) {
          setIsLoading(false);
        }
      } else {
        goToNextStep();
      }
    }, [goToNextStep]);

    const wizardValue = React.useMemo(
      () => ({
        nextStep: doNextStep,
        previousStep,
        handleStep,
        isLoading,
        activeStep,
        isFirstStep: Boolean(!hasPreviousStep.current),
        isLastStep: Boolean(!hasNextStep.current),
      }),
      [doNextStep, previousStep, isLoading, handleStep, activeStep]
    );

    const activeStepContent = React.useMemo(
      () => React.Children.toArray(children)[activeStep],
      [activeStep, children]
    );

    return (
      <WizardContext.Provider value={wizardValue}>
        <>
          {header && header}
          {activeStepContent}
          {footer && footer}
        </>
      </WizardContext.Provider>
    );
  }
);

export default Wizard;
