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
      <code>Async</code>
      <p>Step {number}</p>
      {isLoading && <p>loading...</p>}
    </div>
  );
});

export default AsyncStep;
