import * as React from 'react';

import { useWizard } from '../..';
import { useMockMutation } from '../hooks';

type Props = {
  number: number;
};

const MOCK = [
  {
    id: 1,
    name: 'Tony Stark',
  },
  {
    id: 2,
    name: 'Bruce Banner',
  },
];

const AsyncStep: React.FC<Props> = React.memo(({ number }) => {
  const [mutate] = useMockMutation(MOCK);
  const { handleStep, isLoading } = useWizard();

  // Also works
  handleStep(async () => {
    await mutate();
  });

  // Alternative
  // handleStep(() => {
  //   return mutate();
  // });

  return (
    <div>
      <p>Step {number}</p>
      {isLoading && <p>loading...</p>}
    </div>
  );
});

export default AsyncStep;
