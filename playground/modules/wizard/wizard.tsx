import { css, styled } from 'goober';
import * as React from 'react';

import { Wizard } from '../../../dist';
import { AnimatedStep, AsyncStep, Footer, Step } from '../../components';

const Container = styled('section')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled('h2')`
  font-family: 'Rokkitt';
  font-size: 1.75rem;

  span {
    margin-left: 0.5rem;
    font-weight: 100;
    font-size: 1.5rem;
  }
`;

const Item = styled('div')<{ showDivider: boolean }>`
  display: flex;
  flex-direction: column;

  &::after {
    margin: 3rem 0 2rem;
    content: '';
    background-image: linear-gradient(48.66deg, var(--purple), var(--blue));
    width: 100%;
    position: relative;
    height: ${({ showDivider }) => (showDivider ? '1px' : 0)};
  }

  ${({ showDivider }) =>
    showDivider
      ? `
          &::after {
            margin: 3rem 0 2rem;
            content: '';
            background-image: linear-gradient(
              48.66deg,
              var(--purple),
              var(--blue)
            );
            width: 100%;
            position: relative;
            height: 1px;
          }
        `
      : ''}
`;

const WizardModule = () => {
  return (
    <Container>
      <Title>
        Simple wizard <span>mix of async and sync steps</span>
      </Title>
      <Item showDivider>
        <Wizard footer={<Footer />}>
          <AsyncStep number={1} />
          <Step number={2} />
          <AsyncStep number={3} />
          <Step number={4} />
        </Wizard>
      </Item>

      <Title>
        Animated wizard <span>animation by framer motion</span>
      </Title>
      <Item showDivider={false}>
        <Wizard footer={<Footer />}>
          <AnimatedStep>
            <Step number={1} withCallback={false} />
          </AnimatedStep>
          <AnimatedStep>
            <Step number={2} withCallback={false} />
          </AnimatedStep>
          <AnimatedStep>
            <Step number={3} withCallback={false} />
          </AnimatedStep>
          <AnimatedStep>
            <Step number={4} withCallback={false} />
          </AnimatedStep>
        </Wizard>
      </Item>
    </Container>
  );
};

export default WizardModule;
