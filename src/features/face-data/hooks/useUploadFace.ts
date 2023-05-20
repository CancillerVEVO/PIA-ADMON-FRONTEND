import { useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';
import { b64toBlob } from '@/utils/b64toBlob';
import { useUserContext } from '@/features/auth';

export interface UploadFaceProps {
  imageBase64: string;
}

interface UploadFaceResponse {
  url: string;
}

async function uploadFaceFn(params: UploadFaceProps) {
  try {
    const formData = new FormData();
    const blob = await b64toBlob(params.imageBase64);

    formData.append('filename', blob);

    const res = await facerec.post<UploadFaceResponse>(
      '/face/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data.url;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useUploadFace() {
  const { setUser, user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<string>('');

  const uploadFace = async (props: UploadFaceProps) => {
    setIsLoading(true);

    try {
      const data = await uploadFaceFn(props);
      setData(data);
      setUser({ ...user, imageUrl: data });

      setError(null);
    } catch (error) {
      logApiError(error);

      setError(error as Error);
      setData('');
    }

    setIsLoading(false);
  };

  return {
    uploadFace,
    isLoading,
    error,
    data,
  };
}
