<p align="center"><img src="https://raw.githubusercontent.com/devrnt/react-use-wizard/master/assets/logo.svg" alt="react-use-wizard logo" height="120px" style="margin-top: 20px;"/></p>
<h1 align="center">react-use-wizard</h1>
<p align="center">A React wizard (stepper) builder without the hassle, powered by hooks.</p>

<p align="center">
<img alt="ci" src="https://github.com/devrnt/react-use-wizard/workflows/CI/badge.svg?branch=main">
<img alt="version" src="https://img.shields.io/npm/v/react-use-wizard.svg" />
<img alt="downloads" src="https://badgen.net/npm/dw/react-use-wizard" />
<img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/react-use-wizard">
<img alt="known vulnerabilities" src="https://snyk.io/test/github/devrnt/react-use-wizard/badge.svg">
</p>

## Features

- Simplicity
- Focused on logic
- Zero dependencies
- No UI restrictions
- [Tiny size](https://bundlephobia.com/result?p=react-use-wizard@latest)
- Written in TypeScript

## Installation

```
yarn add react-use-wizard
```

## Quickstart

```js
import * as React from 'react';

import { Wizard, useWizard } from 'react-use-wizard';

const App = () => (
  <Wizard>
    <Step1 />
    <Step2 />
    <Step3 />
  </Wizard>
);

const Step1 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  // Attach an optional handler
  handleStep(() => {
    alert('Going to step 2');
  });

  return (
    <>
      <button onClick={() => previousStep()}>Previous ⏮️</button>
      <button onClick={() => nextStep()}>Next ⏭</button>
    </>
  );
};
```

## Links

- [API](#api)
- [Playground](#playground)
- [Examples](#examples)
- [Async](#async)
- [Animation](#animation)
- [IE11](#ie11)

## API

- [Wizard](#wizard)
- [useWizard](#usewizard)

### Wizard

`Wizard` is used to wrap your steps. Each child component will be treated as an individual step. You can pass a shared `footer` and `header` component that should always be in your steps.

Example: pass a footer component that contains a "previous" and "next" button to the wizard.

#### Props

| name       | type            | description                                                | required | default |
| ---------- | --------------- | ---------------------------------------------------------- | -------- | ------- |
| startIndex | number          | Indicate the wizard to start at the given step             | ❌       | 0       |
| header     | React.ReactNode | Header that is shown above the active step                 | ❌       |         |
| footer     | React.ReactNode | Footer that is shown below the active stepstep             | ❌       |         |
  | wrapper  | React.React.ReactElement | Optional wrapper that is exclusively wrapped around the active step component. It is not wrapped around the `header` and `footer`             | ❌       |         |
| children   | React.ReactNode | Each child component will be treated as an individual step | ✔️       |

#### Example

```javascript
// Example: show the active step in the header
const Header = () => <p>I am the header component</p>;

// Example: show the "previous" and "next" buttons in the footer
const Footer = () => <p>I am the footer component</p>;

// Example: Wrap steps in an `<AnimatePresence` from framer-motion 
const Wrapper = () => <AnimatePresence exitBeforeEnter />;

const App = () => {
  return (
    <Wizard 
        startIndex={0}
        header={<Header />}
        footer={<Footer />}
        wrapper={<Wrapper />}
      >
      <Step1 />
      <Step2 />
      <Step3 />
    </Wizard>
  );
};
```

### useWizard

Used to retrieve all methods and properties related to your wizard. Make sure `Wizard` is wrapped around your component when calling `useWizard`.

`handleStep` is used to attach a handler to the step, can either be `async` or a `sync` function. This function will be invoked when calling `nextStep`.

**Remark** - You can't use `useWizard` in the same component where `Wizard` is used.

#### Methods

| name         | type                        | description                                                                                                                                              |
| ------------ | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nextStep     | () => Promise<void>         | Go to the next step                                                                                                                                      |
| previousStep | () => void                  | Go to the previous step index                                                                                                                            |
| goToStep     | (stepIndex: number) => void | Go to the given step index                                                                                                                               |
| handleStep   | (handler: Handler) => void  | Attach a callback that will be called when calling `nextStep`. `handler` can be either sync or async                                                     |
| isLoading    | boolean                     | \* Will reflect the handler promise state: will be `true` if the handler promise is pending and `false` when the handler is either fulfilled or rejected |
| activeStep   | number                      | The current active step of the wizard                                                                                                                    |
| stepCount    | number                      | The total number of steps of the wizard                                                                                                                  |
| isFirstStep  | boolean                     | Indicate if the current step is the first step (aka no previous step)                                                                                    |
| isLastStep   | boolean                     | Indicate if the current step is the last step (aka no next step)                                                                                         |
|              |

#### Example

```javascript
import * as React from 'react';

import { Wizard, useWizard } from 'react-use-wizard';

const App = () => (
  <Wizard>
    <Step1 />
    <Step2 />
    <Step3 />
  </Wizard>
);

const Step1 = () => {
  const {
    isLoading,
    isLastStep,
    isFirstStep,
    activeStep,
    stepCount,
    previousStep,
    nextStep,
    goToStep,
    handleStep,
  } = useWizard();

  // This handler is optional
  handleStep(() => {
    alert('Going to step 2');
  });

  return (
    <>
      <p>Step 1</p>
      {isLoading && <p>loading...</p>}
      <button onClick={() => previousStep()}>Previous</button>
      <button onClick={() => nextStep()}>Next</button>
      <button onClick={() => goToStep(2)}>Go to the last step</button>
      <div>
        Has next step: {!isLastStep ? '✅' : '⛔'}
        <br />
        Has previous step : {!isFirstStep ? '✅' : '⛔'}
      </div>
      Active step: {activeStep + 1} <br />
    </>
  );
};
```

It's recommended to pass the shared components to the `header` or `footer` in the `Wizard` to avoid duplication.

## Playground

Small playground to showcase the functionalities of `react-use-wizard`:
[https://devrnt.github.io/react-use-wizard/](https://devrnt.github.io/react-use-wizard/)

Following use cases are available in the playground

- Simple wizard with async and sync steps
- Animated wizard with sync steps
- Integration with [react-query](https://react-query.tanstack.com/) (mutation on next step)

Source code can be found [here](https://github.com/devrnt/react-use-wizard/tree/main/playground).

## Examples

Go to [examples](https://github.com/devrnt/react-use-wizard/tree/master/examples) to check out some integrations (Gatsby, NextJS...).

## Async

You can attach an async step handler to a step as well. Make sure to make to either pass an async function or return a promise (async) function:

```ts
const Step1 = () => {
  const { handleStep } = useWizard();

  // Async function
  handleStep(async () => {
    await fetch(...);
  });

  // OR

  // Return promise
  handleStep(() => {
    return fetch(...);
  });

  ...
}
```

### Errors

If no errors are thrown then the wizard will go to the next step, so no need to call `nextStep` by yourself.

If an error is thrown in the attached function the wizard will just stay at the same step and will rethrow the error. (So you can try-catch in your attached function).

### IsLoading

If an async function is attached to `handleStep` the `isLoading` property will indicate the loading state of the function. In general `isLoading` will reflect the handler promise state: will be `true` if the handler promise is pending and `false` when the handler is either fulfilled or rejected.

## Animation

Since `react-use-wizard` is focused to manage the logic of a wizard it doesn't mean you can't add some animation by your own. Add any animation library that you like. I highly suggest [framer-motion](https://www.framer.com/motion/) to add your animations.

Checkout this [example](https://github.com/devrnt/react-use-wizard/blob/main/playground/modules/wizard/animated/index.tsx) to see how a step can be animated with framer motion.

## IE11

Since Internet Explorer 11 doesn't support promises or async functions you'll need to install a polyfill for the `regenerator-runtime`.
