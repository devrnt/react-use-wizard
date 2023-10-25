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
        {false && <p>Optional step</p>}
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

  test('should set step count to two', () => {
    const { result } = renderUseWizardHook();

    expect(result.current.stepCount).toBe(2);
  });

  test.each([false, null, undefined])(
    'should set step count to two when using %s as step',
    (value) => {
      const { result } = renderHook(() => useWizard(), {
        wrapper: ({ children }) => (
          <Wizard>
            <p>step 1 {children}</p>
            <p>step 2 {children}</p>
            {value && <p>step 3 {children}</p>}
          </Wizard>
        ),
      });

      expect(result.current.stepCount).toBe(2);
    },
  );

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

  test('should not go to previous step if first step', async () => {
    const { result } = renderUseWizardHook();

    act(() => {
      result.current.previousStep();
    });

    // Wait for an element to appear
    expect(result.current.activeStep).toBe(0);
  });

  test('should go to given step index', async () => {
    const { result } = renderUseWizardHook();

    act(() => {
      result.current.goToStep(1);
    });

    expect(result.current.activeStep).toBe(1);
    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(true);
  });

  test('should go to given step index', async () => {
    const { result } = renderUseWizardHook(1);

    act(() => {
      result.current.goToStep(0);
    });

    expect(result.current.activeStep).toBe(0);
    expect(result.current.isFirstStep).toBe(true);
    expect(result.current.isLastStep).toBe(false);
  });

  test('should go to given step index and not invoke `handleStep` handler', async () => {
    const handler = jest.fn();
    const { result } = renderUseWizardHook();

    act(() => {
      result.current.handleStep(handler);
      result.current.goToStep(1);
    });

    expect(handler).not.toBeCalled();
    expect(result.current.activeStep).toBe(1);
    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(true);
  });

  test('should not go to given step index when out of boundary', async () => {
    const { result } = renderUseWizardHook();

    try {
      act(() => {
        result.current.goToStep(2);
      });
    } catch (error) {
      expect(result.current.activeStep).toBe(0);
      expect(result.current.isFirstStep).toBe(true);
      expect(result.current.isLastStep).toBe(false);
    }
  });

  test('should thrown error on async nextStep', async () => {
    const { result, waitForNextUpdate } = renderUseWizardHook();

    act(() => {
      result.current.handleStep(() => {
        return Promise.reject(Error('Gotcha'));
      });

      result.current.nextStep().catch((error) => {
        expect(error).toEqual(Error('Gotcha'));
        expect(result.current.activeStep).toBe(0);
        expect(result.current.isFirstStep).toBe(true);
      });
    });

    await waitForNextUpdate();
  });

  test('should throw error on sync nextStep', async () => {
    const { result } = renderUseWizardHook();

    act(() => {
      result.current.handleStep(() => {
        throw Error('Sync gotcha');
      });
    });

    await act(async () => {
      try {
        await result.current.nextStep();
      } catch (error) {
        expect(error).toEqual(Error('Sync gotcha'));
        expect(result.current.activeStep).toBe(0);
        expect(result.current.isFirstStep).toBe(true);
      }
    });
  });

  test('should update step count when dynamic step is added', () => {
    const steps = ['one', 'two', 'three'];

    const { result, rerender } = renderHook(() => useWizard(), {
      initialProps: {
        startIndex: 0,
      },
      wrapper: ({ children, startIndex }) => (
        <Wizard startIndex={startIndex}>
          {steps.map((step) => (
            <p key={step}>{children}</p>
          ))}
        </Wizard>
      ),
    });

    expect(result.current.stepCount).toBe(3);

    steps.push('four');
    rerender();

    expect(result.current.stepCount).toBe(4);
  });

  test('should go to step index of dynamic step', () => {
    const steps = ['one', 'two', 'three'];

    const { result, rerender } = renderHook(() => useWizard(), {
      initialProps: {
        startIndex: 0,
      },
      wrapper: ({ children, startIndex }) => (
        <Wizard startIndex={startIndex}>
          {steps.map((step) => (
            <p key={step}>{children}</p>
          ))}
        </Wizard>
      ),
    });

    steps.push('four');
    rerender();

    act(() => {
      result.current.goToStep(3);
    });

    expect(result.current.activeStep).toBe(3);
    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(true);
  });
});
