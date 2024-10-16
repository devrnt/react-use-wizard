import * as React from 'react';

import * as logger from './logger';
import { Handler, WizardProps } from './types';
import WizardContext from './wizardContext';

const Wizard: React.FC<React.PropsWithChildren<WizardProps>> = React.memo(
  ({
    header,
    footer,
    children,
    onStepChange,
    wrapper: Wrapper,
    startIndex = 0,
  }) => {
    const [activeStep, setActiveStep] = React.useState(startIndex);
    const [isLoading, setIsLoading] = React.useState(false);
    const hasNextStep = React.useRef(true);
    const hasPreviousStep = React.useRef(false);
    const nextStepHandler = React.useRef<Handler>(() => {});
    const previousStepHandler = React.useRef<Handler>(() => {});
    const goToStepHandler = React.useRef<Handler>(() => {});
    const stepCount = React.Children.toArray(children).length;

    hasNextStep.current = activeStep < stepCount - 1;
    hasPreviousStep.current = activeStep > 0;

    const goToNextStep = React.useCallback(() => {
      if (hasNextStep.current) {
        previousStepHandler.current = null;
        goToStepHandler.current = null;
        const newActiveStepIndex = activeStep + 1;

        setActiveStep(newActiveStepIndex);
        onStepChange?.(newActiveStepIndex);
      }
    }, [activeStep, onStepChange]);

    const goToPreviousStep = React.useCallback(() => {
      if (hasPreviousStep.current) {
        nextStepHandler.current = null;
        goToStepHandler.current = null;
        const newActiveStepIndex = activeStep - 1;

        setActiveStep(newActiveStepIndex);
        onStepChange?.(newActiveStepIndex);
      }
    }, [activeStep, onStepChange]);

    const goToStep = React.useCallback(
      (stepIndex: number) => {
        if (stepIndex >= 0 && stepIndex < stepCount) {
          nextStepHandler.current = null;
          previousStepHandler.current = null;
          setActiveStep(stepIndex);
          onStepChange?.(stepIndex);
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
      },
      [stepCount, onStepChange],
    );

    // Callback to attach the step handler
    const handleStep = React.useRef((handler: Handler) => {
      nextStepHandler.current = handler;
    });

    // Callback to attach the previous step handler
    const handlePreviousStep = React.useRef((handler: Handler) => {
      previousStepHandler.current = handler;
    });

    // Callback to attach the go-to-step handler
    const handleGoToStep = React.useRef((handler: Handler) => {
      goToStepHandler.current = handler;
    });

    /**
     * Attempts to execute the provided step handler if the condition is met.
     * If the handler is executed successfully, it triggers the step change handler
     * and then executes the provided step function.
     * @param {React.MutableRefObject<Handler>} handler - The step handler to be executed.
     * @param {boolean} andCondition - Condition to check before executing the handler.
     * @param {() => void} stepFunction - Function to execute after the handler.
     * @throws Will throw an error if the handler execution fails.
     */
    async function tryStepHandler(
      handler: React.MutableRefObject<Handler>,
      andCondition: boolean,
      stepFunction: () => void,
    ) {
      if (andCondition && handler.current) {
        try {
          setIsLoading(true);
          await handler.current();
          setIsLoading(false);
          stepFunction();
        } catch (error) {
          setIsLoading(false);
          throw error;
        }
      } else {
        stepFunction();
      }
    }

    const doNextStep = React.useCallback(async () => {
      await tryStepHandler(nextStepHandler, hasNextStep.current, goToNextStep);
    }, [goToNextStep]);

    const doPreviousStep = React.useCallback(async () => {
      await tryStepHandler(
        previousStepHandler,
        hasPreviousStep.current,
        goToPreviousStep,
      );
    }, [goToPreviousStep]);

    const doGoToStep = React.useCallback(
      async (stepIndex: number) => {
        const validStepIndex = stepIndex >= 0 && stepIndex < stepCount;
        tryStepHandler(goToStepHandler, validStepIndex, () =>
          goToStep(stepIndex),
        );
      },
      [stepCount, goToStep],
    );

    const wizardValue = React.useMemo(
      () => ({
        nextStep: doNextStep,
        previousStep: doPreviousStep,
        handleStep: handleStep.current,
        handlePreviousStep: handlePreviousStep.current,
        handleGoToStep: handleGoToStep.current,
        isLoading,
        activeStep,
        stepCount,
        isFirstStep: !hasPreviousStep.current,
        isLastStep: !hasNextStep.current,
        goToStep: doGoToStep,
      }),
      [
        doNextStep,
        doPreviousStep,
        isLoading,
        activeStep,
        stepCount,
        doGoToStep,
      ],
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
