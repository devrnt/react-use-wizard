export type Handler = (() => Promise<void>) | (() => void) | null;

export type WizardProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export type WizardValues = {
  nextStep: () => Promise<void>;
  previousStep: () => void;
  handleStep: (handler: Handler) => void;
  isLoading: boolean;
  activeStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
} | null;
