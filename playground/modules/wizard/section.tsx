import { styled } from 'goober';
import * as React from 'react';

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

type Props = {
  title: string;
  description: string;
  showDivider: boolean;
};

const Section: React.FC<Props> = ({
  title,
  description,
  showDivider,
  children,
}) => {
  return (
    <>
      <Title>
        {title} <span>{description}</span>
      </Title>
      <Item showDivider={showDivider}>{children}</Item>
    </>
  );
};

export default Section;
