export type Handler = (() => Promise<void>) | (() => void) | null;

export type WizardProps = {
  /** Optional header that is shown above the active step */
  header?: React.ReactNode;
  /** Optional footer that is shown below the active step */
  footer?: React.ReactNode;
  /** Optional start index @default 0 */
  startIndex?: number;
};

export type WizardValues = {
  /**
   * Go to the next step
   *
   * @param stepIndex Overwrite the default behaviour by providing a step index
   */
  nextStep: (stepIndex?: number) => Promise<void>;
  /**
   * Go to the previous step
   *
   * @param stepIndex Overwrite the default behaviour by providing a step index
   *  */
  previousStep: (stepIndex?: number) => void;
  /**
   * Set the current step
   *
   * @param stepIndex Overwrite the default behaviour by providing a step index
   *  */
  setStep: (stepIndex: number) => void;
  /**
   * Attach a callback that will be called when calling `nextStep()`
   *
   * @param handler Can be either sync or async
   *
   */
  handleStep: (handler: Handler) => void;
  /**
   * Indicate the current state of the handler
   *
   * Will reflect the handler promise state: will be `true` if the handler promise is pending and
   * `false` when the handler is either fulfilled or rejected
   */
  isLoading: boolean;
  /** The current active step of the wizard */
  activeStep: number;
  /** Indicate if the current step is the first step (aka no previous step) */
  isFirstStep: boolean;
  /** Indicate if the current step is the last step (aka no next step) */
  isLastStep: boolean;
};

/** Console log levels */
export type LogLevel = 'info' | 'error' | 'warn';
