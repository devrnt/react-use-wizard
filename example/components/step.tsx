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
    <div>
      <p>Step {number}</p>
      {isLoading && <p>loading...</p>}
    </div>
  );
});

export default Step;
