import * as React from 'react';

import { useWizard } from '../..';

type Props = {
  number: number;
};

const Step: React.FC<Props> = React.memo(({ number }) => {
  const { isLoading, handleStep } = useWizard();

  handleStep(() => {
    alert('Going to next step');
  });

  return (
    <div
      style={{
        border: '1px solid grey',
        minHeight: '20vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <code>Sync</code>
      <p>Step {number}</p>
      {isLoading && <p>loading...</p>}
    </div>
  );
});

export default Step;
