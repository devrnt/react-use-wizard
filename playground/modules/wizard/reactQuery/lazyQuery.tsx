import { styled } from 'goober';
import * as React from 'react';
import { useMutation } from 'react-query';

import { useWizard } from '../../../../dist';

const Container = styled('div')`
  background: var(--step);
  border: 1px solid #250b46;
  border-radius: 2px;
  padding: 2.75rem 0.35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 35vh;
`;

const P = styled('p')`
  color: var(--text);
`;

type Props = {
  number: number;
};

const LazyQueryStep: React.FC<Props> = ({ number }) => {
  const { handleStep, isLoading } = useWizard();
  const { error, data, mutateAsync } = useMutation(
    `getTodosLazy${number}`,
    () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json(),
      ),
  );

  handleStep(() => {
    return mutateAsync();
  });

  const content = React.useMemo(() => {
    if (error) return 'An error has occurred: ' + (error as Error).message;

    return data
      ? data.map((todo) => (
          <div key={todo.id}>
            <h1>{data.name}</h1>
          </div>
        ))
      : !isLoading && <p>Click next button to make request</p>;
  }, [error, data, isLoading]);

  return (
    <Container>
      <P>Step {number}</P>
      {content}
      {isLoading && <P>Loading...</P>}
    </Container>
  );
};

export default LazyQueryStep;
