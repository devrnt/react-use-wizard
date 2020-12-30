import * as React from 'react';

import WizardContext from './wizardContext';

const useWizard = () => {
  const context = React.useContext(WizardContext);

  if (!context) {
    throw Error('Wrap your component with `Wizard`');
  } else {
    return context;
  }
};

export default useWizard;
