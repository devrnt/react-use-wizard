import { act, renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useWizard, Wizard } from '../src';

// Common render use wizard hook
const renderUseWizardHook = (initialStartIndex = 0) => {
  return renderHook(() => useWizard(), {
    initialProps: {
      startIndex: initialStartIndex,
    },
    wrapper: ({ children, startIndex }) => (
      <Wizard startIndex={startIndex}>
        <p>step 1 {children}</p>
        <p>step 2 {children}</p>
      </Wizard>
    ),
  });
};

describe('useWizard', () => {
  test('should be available when wrapped in wizard', () => {
    const { result } = renderUseWizardHook();

    expect(result.current).toBeDefined();
  });

  test('should set active step to zero', () => {
    const { result } = renderUseWizardHook();

    expect(result.current.activeStep).toBe(0);
  });

  test('should set active step to one', () => {
    const { result } = renderUseWizardHook(1);

    expect(result.current.activeStep).toBe(1);
  });

  test('should be first step', () => {
    const { result } = renderUseWizardHook();

    expect(result.current.isFirstStep).toBe(true);
  });

  test('should be second step after next step', async () => {
    const { result, waitForNextUpdate } = renderUseWizardHook();

    // According to https://react-hooks-testing-library.com/usage/advanced-hooks#async it's
    // not necessary to wrap this call in `act`, however this doesn't seem to be the case
    act(() => {
      result.current.nextStep();
    });

    await waitForNextUpdate();

    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(true);
  });

  test('should invoke `handleStep` handler on next step', async () => {
    const callback = jest.fn();

    const { result, waitForNextUpdate } = renderUseWizardHook();

    act(() => {
      result.current.handleStep(callback);
      result.current.nextStep();
    });

    await waitForNextUpdate();

    expect(callback).toBeCalled();
  });

  test('should set active step to one on next step', async () => {
    const { result, waitForNextUpdate } = renderUseWizardHook();

    act(() => {
      result.current.nextStep();
    });

    await waitForNextUpdate();

    expect(result.current.activeStep).toBe(1);
  });

  test('should set `isLastStap` on next step', async () => {
    const { result, waitForNextUpdate } = renderUseWizardHook();

    // Wait for an element to appear
    act(() => {
      result.current.nextStep();
    });

    await waitForNextUpdate();

    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(true);
  });

  test('should go to passed step index on next step', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useWizard(), {
      wrapper: ({ children }) => (
        <Wizard>
          <p>step 1 {children}</p>
          <p>step 2 {children}</p>
          <p>step 3 {children}</p>
        </Wizard>
      ),
    });

    act(() => {
      result.current.nextStep(2);
    });

    await waitForNextUpdate();

    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(true);
  });

  test('should go to passed step index on next step with handler', async () => {
    const callback = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() => useWizard(), {
      wrapper: ({ children }) => (
        <Wizard>
          <p>step 1 {children}</p>
          <p>step 2 {children}</p>
          <p>step 3 {children}</p>
        </Wizard>
      ),
    });

    act(() => {
      result.current.handleStep(callback);
      result.current.nextStep(2);
    });

    await waitForNextUpdate();

    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(true);
    expect(callback).toBeCalled();
  });

  test('should not go to previous step if first step', async () => {
    const { result } = renderUseWizardHook();

    act(() => {
      result.current.previousStep();
    });

    // Wait for an element to appear
    expect(result.current.activeStep).toBe(0);
  });
});
