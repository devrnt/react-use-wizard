import { styled } from 'goober';
import * as React from 'react';

import { useWizard } from '../../dist';
import { useMockMutation } from '../hooks';

type Props = {
  number: number;
  name?: string;
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

const Container = styled('div')`
  background: var(--step);
  border: 1px solid #250b46;
  border-radius: 2px;
  padding: 2.75rem 0.35rem;
  display: flex;
  flex-direction: column;
  min-height: 15vh;
  justify-content: center;
  align-items: center;
`;

const P = styled('p')`
  color: var(--text);
`;

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
    <Container>
      <P>(Async) Step {number}</P>
      {isLoading && <P>Loading...</P>}
    </Container>
  );
});

export default AsyncStep;
