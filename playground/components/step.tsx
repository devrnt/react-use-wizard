import { styled } from 'goober';
import * as React from 'react';

import { useWizard } from '../../dist';
import { BaseWizardStep } from '../../dist/types';

type Props = BaseWizardStep & {
  withCallback?: boolean;
};

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

const Step: React.FC<Props> = React.memo(({ number, withCallback = true }) => {
  const { isLoading, handleStep } = useWizard();

  if (withCallback) {
    handleStep(() => {
      alert('Going to next step');
    });
  }

  return (
    <Container>
      <P>(Sync) Step {number}</P>
      {isLoading && <P>Loading...</P>}
    </Container>
  );
});

export default Step;
