import * as React from 'react';

type Options<T> = {
  makeError?: boolean;
  timeout?: number;
  onCompleted?: (result: T) => void;
};

/**
 * An ApolloClient clone of `useMutation`
 * @param result The result once the promise is fulfilled
 * @param options Some options
 */
const useMockMutation = <T extends object = any>(
  result: T,
  { makeError = false, timeout = 3000, onCompleted }: Options<T> = {}
) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<{ message: string }>();

  const mutationCb = React.useRef(async () => {
    const promise = new Promise<void>((res, rej) => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        if (makeError) {
          setError({ message: 'Something went wrong' });
          rej({ message: 'Something went wrong' });
        } else {
          res(onCompleted?.(result));
        }
      }, timeout);
    });

    return promise;
  });

  return [mutationCb.current, { loading, error }] as const;
};

export default useMockMutation;
