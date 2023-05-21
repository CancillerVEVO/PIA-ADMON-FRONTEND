import { useCallback, useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';

export interface CreateEventParams {
  title: string;
  description: string;
  groupId: number;
  endDate: string;
}

async function createEventFn(params: CreateEventParams) {
  try {
    const res = await facerec.post(`/event`, params);
    return res.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useEventCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const createEvent = useCallback(async (params: CreateEventParams) => {
    setIsLoading(true);

    try {
      const data = await createEventFn(params);
      setData(data);
      setError(null);
    } catch (error) {
      logApiError(error);

      setError(error as Error);
      setData(null);
    }

    setIsLoading(false);
  }, []);

  return {
    createEvent,
    isLoading,
    data,
    error,
  };
}
