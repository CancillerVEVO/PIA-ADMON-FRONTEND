import { useCallback, useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';

export interface EditEventParams {
  title: string;
  description: string;
  groupId: number;
  endDate: string;
}

async function editEventFn(id: number, params: EditEventParams) {
  try {
    const res = await facerec.put(`/event/${id}`, params);
    return res.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useEventEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const editEvent = useCallback(async (id: number, params: EditEventParams) => {
    setIsLoading(true);

    try {
      const data = await editEventFn(id, params);
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
    editEvent,
    isLoading,
    data,
    error,
  };
}
