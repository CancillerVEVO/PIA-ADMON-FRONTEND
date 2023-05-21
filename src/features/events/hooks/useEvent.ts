import { useCallback, useEffect, useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';

export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

async function getEventFn(id: number) {
  try {
    const res = await facerec.get<Event>(`/event/${id}`);

    return res.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useEvent(id?: number) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [event, setEvent] = useState<Event | null>(null);

  const getEvent = useCallback(async (id: number) => {
    setIsLoading(true);

    try {
      const event = await getEventFn(id);
      setEvent(event);

      setError(null);
    } catch (error) {
      logApiError(error);

      setError(error as Error);
      setEvent(null);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (id) {
      getEvent(id);
    }
  }, [getEvent, id]);

  const refetch = useCallback(async () => {
    if (id) {
      await getEvent(id);
    }
  }, [getEvent, id]);

  return {
    refetch,
    isLoading,
    error,
    event,
  };
}
