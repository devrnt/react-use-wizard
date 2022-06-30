// Type re-export workaround, to stay compatible with TS 3.7 and lower
import {
  Handler as _Handler,
  WizardProps as _WizardProps,
  WizardValues as _WizardValues,
} from './types';
import { default as useWizard } from './useWizard';
import { default as Wizard } from './wizard';

export type WizardProps = _WizardProps;
export type WizardValues = _WizardValues;
export type Handler = _Handler;

export { Wizard, useWizard };
