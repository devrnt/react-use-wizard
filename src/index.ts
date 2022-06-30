import { default as Wizard } from './wizard';
import { default as useWizard } from './useWizard';

// Type re-export workaround, to stay compatible with TS 3.7 and lower
import {
  WizardProps as _WizardProps,
  WizardValues as _WizardValues,
  Handler as _Handler,
} from './types';

export type WizardProps = _WizardProps;
export type WizardValues = _WizardValues;
export type Handler = _Handler;

export { Wizard, useWizard };
