import { useState, useCallback } from 'react';
import type { AxiosResponse } from 'axios';
import { FetchStatus } from '../enums/fetchStatus';

export const useFetch = <T>(
  fetcher: (params?: any) => Promise<AxiosResponse<T, any>>
) => {
  const [status, setStatus] = useState(FetchStatus.PENDING);
  const [result, setResult] = useState<T | null>();
  const [error, setError] = useState<unknown>();

  const execute = useCallback(
    async (params: any) => {
      setStatus(FetchStatus.FETCHING);
      setResult(null);
      setError(null);

      try {
        const response = await fetcher(params);
        setResult(response.data);
        setStatus(FetchStatus.SUCCESS);
      } catch (error) {
        console.log({ error });
        setError(error);
        setStatus(FetchStatus.ERROR);
      }
    },
    [fetcher]
  );

  return { execute, status, result, error };
};
