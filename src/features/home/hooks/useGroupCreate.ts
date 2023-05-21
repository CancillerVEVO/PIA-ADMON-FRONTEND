import { useCallback, useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';

export interface CreateGroupParams {
  title: string;
  description: string;
}

interface CreateGroupResponse {
  id: number;
}

async function createGroupFn(params: CreateGroupParams) {
  try {
    const res = await facerec.post<CreateGroupResponse>(`/group`, params);
    return res.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useGroupCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<CreateGroupResponse | null>(null);

  const createGroup = useCallback(async (params: CreateGroupParams) => {
    setIsLoading(true);

    try {
      const data = await createGroupFn(params);
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
    createGroup,
    isLoading,
    data,
    error,
  };
}
