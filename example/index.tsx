import 'react-app-polyfill/ie11';
import './style.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Wizard } from '../.';
import { AsyncStep, Footer, Step } from './components';

const App: React.FC = () => {
  return (
    <Wizard footer={<Footer />} header={<p>header</p>}>
      <AsyncStep number={1} />
      <Step number={2} />
      <AsyncStep number={3} />
      <Step number={4} />
    </Wizard>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
