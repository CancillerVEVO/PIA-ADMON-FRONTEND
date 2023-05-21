import { useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';
import { b64toBlob } from '@/utils/b64toBlob';

export interface RegisterAttendanceParams {
  imageBase64: string;
}

type RegisterAttendanceResponse = any;

async function registerAttendanceFn(
  id: string,
  params: RegisterAttendanceParams
) {
  try {
    const formData = new FormData();
    const blob = await b64toBlob(params.imageBase64);

    formData.append('filename', blob);

    const res = await facerec.post<RegisterAttendanceResponse>(
      `/attendance/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useRegisterAttendance() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const registerAttendance = async (
    id: string,
    params: RegisterAttendanceParams
  ) => {
    setIsLoading(true);

    try {
      const data = await registerAttendanceFn(id, params);
      setData(data);

      setError(null);
    } catch (error) {
      logApiError(error);

      setError(error as Error);
      setData(null);
    }

    setIsLoading(false);
  };

  return {
    registerAttendance,
    isLoading,
    error,
    data,
  };
}
