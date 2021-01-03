import { styled } from 'goober';
import * as React from 'react';

type Props = {
  label: string;
  disabled: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const Container = styled('button')`
  width: fit-content;
  min-width: 8rem;
  border: 1px solid var(--purple);
  padding: 0.7rem 1.75rem;
  border-radius: 6px;
  color: var(--text);
  font-size: 1.1rem;
  font-weight: 700;
  background-color: var(--dark);
  cursor: pointer;
  font-family: 'Rokkitt';

  &:active,
  &:focus,
  &:hover {
    background-image: linear-gradient(48.66deg, var(--purple), var(--blue));
  }
  &:disabled {
    opacity: 0.4;
    background-image: initial;
    cursor: initial;
  }
`;

const Button = ({ label, ...rest }: Props) => (
  <Container {...rest}>{label}</Container>
);

export default Button;
