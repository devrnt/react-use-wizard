import * as React from 'react';

import { WizardValues } from './types';

const WizardContext = React.createContext<WizardValues | null>(null);

if (__DEV__) {
  WizardContext.displayName = 'WizardContext';
}

export default WizardContext;
