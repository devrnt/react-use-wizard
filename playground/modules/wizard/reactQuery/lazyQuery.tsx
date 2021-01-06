import { styled } from 'goober';
import * as React from 'react';
import { useMutation } from 'react-query';

import { useWizard } from '../../../../dist';

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  const { error, data, mutateAsync } = useMutation('repDataMutation', () =>
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
