import { useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';
import { b64toBlob } from '@/utils/b64toBlob';

export interface TestFaceProps {
  imageBase64: string;
}

interface UploadFaceResponse {
  message: string;
}

async function TestFaceFn(params: TestFaceProps) {
  try {
    const formData = new FormData();
    const blob = await b64toBlob(params.imageBase64);

    formData.append('filename', blob);

    const res = await facerec.post<UploadFaceResponse>(
      '/face/recognition',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data.message;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useTestFaceRec() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<string>('');

  const testFaceRec = async (props: TestFaceProps) => {
    setIsLoading(true);

    try {
      const data = await TestFaceFn(props);
      setData(data);

      setError(null);
    } catch (error) {
      logApiError(error);

      setError(error as Error);
      setData('');
    }

    setIsLoading(false);
  };

  return {
    testFaceRec,
    isLoading,
    error,
    data,
  };
}
