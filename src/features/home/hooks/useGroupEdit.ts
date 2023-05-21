import { useCallback, useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';

export interface EditGroupParams {
  title: string;
  description: string;
}

interface EditGroupResponse {
  id: number;
}

async function editGroupFn(id: number, params: EditGroupParams) {
  try {
    const res = await facerec.put<EditGroupResponse>(`/group/${id}`, params);
    return res.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useGroupEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<EditGroupResponse | null>(null);

  const editGroup = useCallback(async (id: number, params: EditGroupParams) => {
    setIsLoading(true);

    try {
      const data = await editGroupFn(id, params);
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
    editGroup,
    isLoading,
    data,
    error,
  };
}
