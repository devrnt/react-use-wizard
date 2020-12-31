import { waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useWizard, Wizard } from '../src';

// Common render use wizard hook
const renderUseWizardHook = () => {
  return renderHook(() => useWizard(), {
    wrapper: ({ children }: { children: React.ReactNode }) => {
      return <Wizard>{children}</Wizard>;
    },
    initialProps: {
      children: (
        <>
          <p>step 1</p>
          <p>step 2</p>
        </>
      ),
    },
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

  test('should be first step', () => {
    const { result } = renderUseWizardHook();

    expect(result.current.isFirstStep).toBe(true);
  });

  test('should be second step after next step', () => {
    const { result } = renderUseWizardHook();

    act(() => {
      result.current.nextStep();
    });

    // Wait for an element to appear
    waitFor(() => {
      expect(result.current.isFirstStep).toBe(false);
      expect(result.current.isLastStep).toBe(true);
    });
  });

  test('should call callback on next step', () => {
    const callback = jest.fn();

    const { result } = renderUseWizardHook();

    act(() => {
      result.current.handleStep(callback);
    });

    // Wait for an element to appear
    waitFor(() => {
      result.current.nextStep();
      expect(callback).toBeCalled();
    });
  });

  test('should set active step to one on next step', () => {
    const { result } = renderUseWizardHook();

    // Wait for an element to appear
    waitFor(() => {
      result.current.nextStep();
      expect(result.current.activeStep).toBe(1);
    });
  });

  test('should set is last stap on next step', () => {
    const { result } = renderUseWizardHook();

    // Wait for an element to appear
    waitFor(() => {
      result.current.nextStep();
      expect(result.current.isFirstStep).toBe(false);
      expect(result.current.isLastStep).toBe(true);
    });
  });

  test('should not go to previous step if first step', () => {
    const { result } = renderUseWizardHook();

    act(() => {
      result.current.previousStep();
    });

    // Wait for an element to appear
    waitFor(() => {
      result.current.nextStep();
      expect(result.current.activeStep).toBe(0);
    });
  });
});
