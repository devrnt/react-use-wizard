import { setup } from 'goober';
import { shouldForwardProp } from 'goober/should-forward-prop';
import * as React from 'react';

import { WizardModule } from './modules';
import { Page, Style } from './modules/common';

setup(
  React.createElement,
  undefined,
  undefined,
  // Transient props
  shouldForwardProp((prop) => prop[0] !== '$'),
);

const App = () => {
  return (
    <>
      <Style />
      <Page
        title="react-use-wizard"
        description="Playground to showcase the functionalities of react-use-wizard"
      >
        <WizardModule />
      </Page>
    </>
  );
};

export default App;
