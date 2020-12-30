import * as React from 'react';

import { WizardValues } from './types';

const WizardContext = React.createContext<WizardValues>(null);
WizardContext.displayName = 'WizardContext';

export default WizardContext;
