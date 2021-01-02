// @ts-ignore
import { createGlobalStyles } from 'goober/global';
import * as React from 'react';

const GlobalStyle = createGlobalStyles`
  :root {
    --light: #0b002b;
    --nav: rgba(3, 0, 12, 0.5);
    --dark: #120029;
    --purple: #8B42E8;
    --blue: #08D8F4;
    --code:#260949;
    --step:#170231;
  }

  html {
    font-size: 15px;
  }

  h1, 
  h2, 
  h3,
  h4,
  h5,
  h6,
  p {
    color: #ffffff;
    line-height: 1.75rem;
  }

  body {
    font-family: 'Inter', Helvetica, sans-serif;
    text-rendering: optimizeLegibility;
    color: white;
  }

  i {
    font-weight: 100;
  }

  code {
    background: var(--code);
    border: 1px solid #31115a;
    border-radius: 2px;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    padding: 0.75rem 0.35rem;
  }
`;

const Style = () => (
  <>
    <GlobalStyle />
  </>
);

export default Style;
