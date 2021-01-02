import 'react-app-polyfill/ie11';
import './style.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Wizard } from '../dist';
import { AsyncStep, Footer, Step } from './components';
import AnimatedStep from './components/animatedStep';

const App: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
      }}
    >
      <section>
        <h2>Vanila</h2>
        <Wizard footer={<Footer />} header={<p>header</p>}>
          <AsyncStep number={1} />
          <Step number={2} />
          <AsyncStep number={3} />
          <Step number={4} />
        </Wizard>
      </section>
      <section>
        <h2>With animation</h2>
        <Wizard footer={<Footer />} header={<p>header</p>}>
          <AnimatedStep>
            <AsyncStep number={1} />
          </AnimatedStep>
          <AnimatedStep>
            <Step number={2} />
          </AnimatedStep>
          <AnimatedStep>
            <AsyncStep number={3} />
          </AnimatedStep>
          <AnimatedStep>
            <Step number={4} />
          </AnimatedStep>
        </Wizard>
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
