<p align="center"><img src="https://raw.githubusercontent.com/devrnt/react-use-wizard/docs/readme/assets/logo.svg" alt="react-use-wizard logo" height="120px" style="margin-top: 20px;"/></p>
<h1 align="center">react-use-wizard</h1>
<p align="center">A React wizard (stepper) builder without the hassle, powered by hooks.</p>

<p align="center">
<img alt="ci" src="https://github.com/devrnt/react-use-wizard/workflows/CI/badge.svg?branch=master">
<img alt="version" src="https://img.shields.io/npm/v/react-use-wizard.svg" />
<img alt="downloads" src="https://badgen.net/npm/dt/react-use-wizard" />
<img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/react-use-wizard">
<img alt="known vulnerabilities" src="https://snyk.io/test/github/devrnt/react-use-wizard/badge.svg">
</p>

## Features

- Hooks
- Focused on logic
- No UI restrictions
- Written in TypeScript
- Documented, self explaining methods

## Installation

```
yarn add react-use-wizard
```

## Quickstart

```js
import * as React from 'react';

import { Wizard } from 'react-use-wizard';

const App = () => (
  <Wizard>
    <Step1 />
    <Step2 />
    <Step3 />
  </Wizard>
);

const Step1 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  // Attach a handler
  handleStep(() => {
    alert('Going to step 2');
  });

  return (
      <>
        <button onClick={previousStep}>Previous ⏮️</button>
        <button onClick={nextStep}>Next ⏭</button>
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
- [Troubleshoot](#troubleshoot)
- [Advanced](#advanced)

## API

- [Wizard](#wizard)
- [useWizard](#usewizard)

### Wizard

`Wizard` is used to wrap your steps. Each child component will be treated as an individual step. You can set a shared `footer` and `header` that always should be in your steps. Example: pass an action button component that contain a "previous" and "next" button.

Place the `Wizard` around it and that's it.

#### Props

| name                | type             | description                                                                                                                                                                                                                                                                                                              | required | default |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------- |
| footer              | boolean          | indicates if Intercom should be automatically booted. If `true` no need to call `boot`, the `IntercomProvider` will call it for you                                                                                                                                                                                      | false    | false   |
| startIndex          | number           | Start index to indicate the wizard to start at the given step. Defaults to                                                                                                                                                                                                                                               | false    |         |
| header              | React.ReactNode  | Header that is shown above the active step                                                                                                                                                                                                                                                                               | false    |         |
| footer              | React.ReactNode  | Footer that is shown below the active stepstep                                                                                                                                                                                                                                                                           | false    |         |
| children            | React.ReactNode  | Each child component will be treated as an individual step                                                                                                                                         
#### Example

```javascript
const App = () => {
  const [unreadMessagesCount, setUnreadMessagesCount] = React.useState(0);

  const onHide = () => console.log('Intercom did hide the Messenger');
  const onShow = () => console.log('Intercom did show the Messenger');
  const onUnreadCountChange = (amount: number) => {
    console.log('Intercom has a new unread message');
    setUnreadMessagesCount(amount);
  };

  return (
    <IntercomProvider
      appId={INTERCOM_APP_ID}
      onHide={onHide}
      onShow={onShow}
      onUnreadCountChange={onUnreadCountChange}
      autoBoot
    >
      <p>Hi there, I am a child of the IntercomProvider</p>
    </IntercomProvider>
  );
};
```

### useWizard

Used to retrieve all methods bundled with Intercom. These are based on the official [Intercom docs](https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects). Some extra methods were added to improve convenience.

Make sure `IntercomProvider` is wrapped around your component when calling `useIntercom()`.

**Remark** - You can't use `useIntercom()` in the same component where `IntercomProvider` is initialized.

#### Methods

| name            | type                                       | description                                                                                                                         |
| --------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| boot            | (props?: IntercomProps) => void            | boots the Intercom instance, not needed if `autoBoot` in `IntercomProvider` is `true`                                               |
| shutdown        | () => void                                 | shuts down the Intercom instance                                                                                                    |
| hardShutdown    | () => void                                 | same functionality as `shutdown`, but makes sure the Intercom cookies, `window.Intercom` and `window.intercomSettings` are removed. |
| update          | (props?: IntercomProps) => void            | updates the Intercom instance with the supplied props. To initiate a 'ping', call `update` without props                            |
| hide            | () => void                                 | hides the Messenger, will call `onHide` if supplied to `IntercomProvider`                                                           |
| show            | () => void                                 | shows the Messenger, will call `onShow` if supplied to `IntercomProvider`                                                           |
| showMessages    | () => void                                 | shows the Messenger with the message list                                                                                           |
| showNewMessages | (content?: string) => void                 | shows the Messenger as if a new conversation was just created. If `content` is passed, it will fill in the message composer         |
| getVisitorId    | () => string                               | gets the visitor id                                                                                                                 |
| startTour       | (tourId: number) => void                   | starts a tour based on the `tourId`                                                                                                 |
| trackEvent      | (event: string, metaData?: object) => void | submits an `event` with optional `metaData`                                                                                         |

#### Example

```javascript
import * as React from 'react';

import { IntercomProvider, useIntercom } from 'react-use-intercom';

const INTERCOM_APP_ID = 'your-intercom-app-id';

const App = () => (
  <IntercomProvider appId={INTERCOM_APP_ID}>
    <HomePage />
  </IntercomProvider>
);

const HomePage = () => {
  const {
    boot,
    shutdown,
    hardShutdown,
    update,
    hide,
    show,
    showMessages,
    showNewMessages,
    getVisitorId,
    startTour,
    trackEvent,
  } = useIntercom();

  const bootWithProps = () => boot({ name: 'Russo' });
  const updateWithProps = () => update({ name: 'Ossur' });
  const handleNewMessages = () => showNewMessages();
  const handleNewMessagesWithContent = () => showNewMessages('content');
  const handleGetVisitorId = () => console.log(getVisitorId());
  const handleStartTour = () => startTour(123);
  const handleTrackEvent = () => trackEvent('invited-friend');
  const handleTrackEventWithMetaData = () =>
    trackEvent('invited-frind', {
      name: 'Russo',
    });

  return (
    <>
      <button onClick={boot}>Boot intercom</button>
      <button onClick={bootWithProps}>Boot with props</button>
      <button onClick={shutdown}>Shutdown</button>
      <button onClick={hardShutdown}>Hard shutdown</button>
      <button onClick={update}>Update clean session</button>
      <button onClick={updateWithProps}>Update session with props</button>
      <button onClick={show}>Show messages</button>
      <button onClick={hide}>Hide messages</button>
      <button onClick={showMessages}>Show message list</button>
      <button onClick={handleNewMessages}>Show new messages</button>
      <button onClick={handleNewMessagesWithContent}>
        Show new message with pre-filled content
      </button>
      <button onClick={handleGetVisitorId}>Get visitor id</button>
      <button onClick={handleStartTour}>Start tour</button>
      <button onClick={handleTrackEvent}>Track event</button>
      <button onClick={handleTrackEventWithMetaData}>
        Track event with metadata
      </button>
    </>
  );
};
```

### IntercomProps

All the Intercom default attributes/props are camel cased (`appId` instead of `app_id`) in `react-use-intercom`, see [IntercomProps](src/types.ts) to see what attributes you can pass to `boot` or `update`. Or check the Intercom [docs](https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects)
to see all the available attributes/props.

**Remark** - all the listed Intercom attributes [here](https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects) are snake cased, in `react-use-intercom` are these camel cased.

#### Custom attributes

Still want to pass custom attributes to Intercom? Whether `boot` or `update` is used, you can add your custom properties by passing these through `customAttributes` in the `boot` or `update` method.

**Remark** - the keys of the `customAttributes` object should be snake cased (this is how Intercom wants them). They are rawly passed to Intercom.

```javascript
const { boot } = useIntercom();

boot({
  name: 'Russo',
  customAttributes: { custom_attribute_key: 'hi there' },
});
```

## Playground

Small playground to showcase the functionalities of `react-use-intercom`.

### useIntercom

[https://devrnt.github.io/react-use-intercom/#/useIntercom](https://devrnt.github.io/react-use-intercom/#/useIntercom)

### useIntercom (with Intercom tour)

[https://devrnt.github.io/react-use-intercom/#/useIntercomTour](https://devrnt.github.io/react-use-intercom/#/useIntercomTour)

## Examples

Go to [examples](https://github.com/devrnt/react-use-intercom/tree/master/examples) to check out some integrations (Gatsby, NextJS...).

## TypeScript

All the possible pre-defined options to pass to the Intercom instance are typed. So whenever you have to pass [IntercomProps](src/types.ts), all the possible properties will be available out of the box.
These props are `JavaScript` 'friendly', so [camelCase](https://en.wikipedia.org/wiki/Camel_case). No need to pass the props with [snake_cased](https://en.wikipedia.org/wiki/Snake_case) keys.

**Remark** - if you want to pass custom properties, you should still use [snake_cased](https://en.wikipedia.org/wiki/Snake_case) keys.

## Troubleshoot

- I'm seeing `Please wrap your component with IntercomProvider` in the console.
  > Make sure `IntercomProvider` is initialized before calling `useIntercom()`. You only need to initialize `IntercomProvider` once. It is advised to initialize `IntercomProvider` as high as possible in your application tree.

> Make sure you aren't calling `useIntercom()` in the same component where you initialized `IntercomProvider`.

- I'm seeing `Some invalid props were passed to IntercomProvider. Please check following props: [properties]` in the console.
  > Make sure you're passing the correct properties to the `IntercomProvider`. Check [IntercomProvider](#intercomprovider) to see all the properties.
  > Mind that all the properties in `react-use-intercom` are camel cased, except for the `customAttributes` property in the `boot` and `update` method from `useIntercom`.

## Advanced

To reduce the amount of re-renders in your React application I suggest to make use of [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback)

**TLDR:** `useCallback` will return a memoized version of the callback that only changes if one of the dependencies has changed.

This can be applied to both the `IntercomProvider` events and the `useIntercom` methods. It depends on how many times your main app gets re-rendered.

### Example

```javascript
import * as React from 'react';

import { IntercomProvider, useIntercom } from 'react-use-intercom';

const INTERCOM_APP_ID = 'your-intercom-app-id';

const App = () => {
  // const onHide = () => console.log('Intercom did hide the Messenger');
  const onHide = React.useCallback(
    () => console.log('Intercom did hide the Messenger'),
    [],
  );

  return (
    <IntercomProvider appId={INTERCOM_APP_ID} onHide={onHide}>
      <HomePage />
    </IntercomProvider>
  );
};

const HomePage = () => {
  const { boot } = useIntercom();

  // const bootWithProps = () => boot({ name: 'Russo' });
  const bootWithProps = React.useCallback(() => boot({ name: 'Russo' }), [
    boot,
  ]);

  return <button onClick={bootWithProps}>Boot with props</button>;
};
```
