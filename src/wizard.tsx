import * as React from 'react';

import * as logger from './logger';
import { Handler, WizardProps } from './types';
import WizardContext from './wizardContext';

const Wizard: React.FC<React.PropsWithChildren<WizardProps>> = React.memo(
  ({ header, footer, children, wrapper: Wrapper, startIndex = 0 }) => {
    const [activeStep, setActiveStep] = React.useState(startIndex);
    const [isLoading, setIsLoading] = React.useState(false);
    const hasNextStep = React.useRef(true);
    const hasPreviousStep = React.useRef(false);
    const nextStepHandler = React.useRef<Handler>(() => {});
    const [stepCount, setStepCount] = React.useState(
      React.Children.toArray(children).length,
    );

    // Disable exhaustive-deps warning for this effect.
    // The reason is because we only want this effect to run
    // when the number of children changes, and not also when activeStep changes.
    /* eslint-disable react-hooks/exhaustive-deps */
    React.useEffect(() => {
      const newCount = React.Children.toArray(children).length;
      setStepCount(newCount);

      if (activeStep >= newCount) {
        setActiveStep(newCount - 1);

        if (__DEV__) {
          logger.log(
            'warn',
            `Number of steps have been changed to ${newCount} while activeStep exceeds the new count. The last step will be actived.`,
          );
        }
      }
    }, [children]);
    /* eslint-enable react-hooks/exhaustive-deps */

    hasNextStep.current = activeStep < stepCount - 1;
    hasPreviousStep.current = activeStep > 0;

    const goToNextStep = React.useRef(() => {
      if (hasNextStep.current) {
        setActiveStep((activeStep) => activeStep + 1);
      }
    });

    const goToPreviousStep = React.useRef(() => {
      if (hasPreviousStep.current) {
        nextStepHandler.current = null;
        setActiveStep((activeStep) => activeStep - 1);
      }
    });

    const goToStep = React.useRef((stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < stepCount) {
        nextStepHandler.current = null;
        setActiveStep(stepIndex);
      } else {
        if (__DEV__) {
          logger.log(
            'warn',
            [
              `Invalid step index [${stepIndex}] passed to 'goToStep'. `,
              `Ensure the given stepIndex is not out of boundaries.`,
            ].join(''),
          );
        }
      }
    });

    // Callback to attach the step handler
    const handleStep = React.useRef((handler: Handler) => {
      nextStepHandler.current = handler;
    });

    const doNextStep = React.useRef(async () => {
      if (hasNextStep.current && nextStepHandler.current) {
        try {
          setIsLoading(true);
          await nextStepHandler.current();
          setIsLoading(false);
          nextStepHandler.current = null;
          goToNextStep.current();
        } catch (error) {
          setIsLoading(false);
          throw error;
        }
      } else {
        goToNextStep.current();
      }
    });

    const wizardValue = React.useMemo(
      () => ({
        nextStep: doNextStep.current,
        previousStep: goToPreviousStep.current,
        handleStep: handleStep.current,
        isLoading,
        activeStep,
        stepCount,
        isFirstStep: !hasPreviousStep.current,
        isLastStep: !hasNextStep.current,
        goToStep: goToStep.current,
      }),
      [activeStep, stepCount, isLoading],
    );

    const activeStepContent = React.useMemo(() => {
      const reactChildren = React.Children.toArray(children);

      if (__DEV__) {
        // No steps passed
        if (reactChildren.length === 0) {
          logger.log(
            'warn',
            'Make sure to pass your steps as children in your <Wizard>',
          );
        }
        // The passed start index is invalid
        if (activeStep > reactChildren.length) {
          logger.log('warn', 'An invalid startIndex is passed to <Wizard>');
        }
        // Invalid header element
        if (header && !React.isValidElement(header)) {
          logger.log('error', 'Invalid header passed to <Wizard>');
        }
        // Invalid footer element
        if (footer && !React.isValidElement(footer)) {
          logger.log('error', 'Invalid footer passed to <Wizard>');
        }
      }

      return reactChildren[activeStep];
    }, [activeStep, children, header, footer]);

    const enhancedActiveStepContent = React.useMemo(
      () =>
        Wrapper
          ? React.cloneElement(Wrapper, { children: activeStepContent })
          : activeStepContent,
      [Wrapper, activeStepContent],
    );

    return (
      <WizardContext.Provider value={wizardValue}>
        {header}
        {enhancedActiveStepContent}
        {footer}
      </WizardContext.Provider>
    );
  },
);

export default Wizard;
