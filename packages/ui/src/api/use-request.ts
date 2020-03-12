import { useState, useEffect } from 'react';

export type RequestState<T> = { data?: T; loading: boolean; error?: Error };

export const useRequest = <T extends unknown>(
  request: (abortController: AbortController) => Promise<T>
) => {
  const [{ data, loading, error }, setState] = useState<RequestState<T>>({
    loading: true
  });

  useEffect(() => {
    setState({ loading: true });

    const controller = new AbortController();

    request(controller)
      .then(data => setState({ data, loading: false }))
      .catch(error => setState({ loading: false, error }));

    return () => controller.abort();
  }, [request]);

  return { data, loading, error };
};
