import * as React from 'react';
import styled from 'styled-components';

type Props = {
  label: string;
};

const Container = styled.div<Props>`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  &::after {
    position: absolute;
    content: ${({ label }) => label};
    right: -9rem;
    border: 2px solid var(--code);
    padding: 0.65rem 1.25rem;
    top: 50%;
    font-weight: 300;
    font-size: 0.95rem;
    transform: translateY(-50%);
    z-index: 10;
    background: var(--dark);
  }
`;

const Tooltip: React.FC<Props> = ({ children, label }) => {
  return <Container label={label}>{children}</Container>;
};

export default Tooltip;
