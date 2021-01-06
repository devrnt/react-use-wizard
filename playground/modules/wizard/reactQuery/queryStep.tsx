import { styled } from 'goober';
import * as React from 'react';
import { useQuery } from 'react-query';

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

const QueryStep: React.FC<Props> = ({ number }) => {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch(`https://jsonplaceholder.typicode.com/todos/${number}`).then((res) =>
      res.json(),
    ),
  );

  const content = React.useMemo(() => {
    if (isLoading) return 'Loading...';

    if (error) return 'An error has occurred: ' + (error as Error).message;

    return (
      <div>
        <h1>
          todo {data.id}: {data.title}
        </h1>
      </div>
    );
  }, [isLoading, error, data]);

  return (
    <Container>
      <P>Step {number}</P>
      {content}
    </Container>
  );
};

export default QueryStep;
