import { useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';
import { useUserContext } from '@/features/auth';

interface UploadFaceResponse {
  message: string;
}

async function TestFaceFn() {
  try {
    const res = await facerec.delete<UploadFaceResponse>('/face');

    return res.data.message;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useFaceDataDelete() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<string>('');
  const { user, setUser } = useUserContext();

  const deleteFaceData = async () => {
    setIsLoading(true);

    try {
      const data = await TestFaceFn();
      setData(data);
      setUser({ ...user, imageUrl: null });

      setError(null);
    } catch (error) {
      logApiError(error);

      setError(error as Error);
      setData('');
    }

    setIsLoading(false);
  };

  return {
    deleteFaceData,
    isLoading,
    error,
    data,
  };
}
