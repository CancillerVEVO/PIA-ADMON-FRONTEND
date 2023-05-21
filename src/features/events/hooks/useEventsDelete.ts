import { useCallback, useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';

export interface DeleteEventParams {
  events: number[];
}

async function deleteEventsFn(params: DeleteEventParams) {
  try {
    const promises = params.events.map(async (eventId) => {
      try {
        const res = await facerec.delete(`/event/${eventId}`);
        return res.data;
      } catch (e) {
        const error = getApiError(e);
        logApiError(error);
        return error;
      }
    });

    const events = await Promise.all(promises);

    return events;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useEventsDelete() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const deleteEvents = useCallback(async (params: DeleteEventParams) => {
    setIsLoading(true);

    const data = await deleteEventsFn(params);
    setData(data);
    setIsLoading(false);
  }, []);

  return {
    deleteEvents,
    isLoading,
    data,
  };
}
