import { useCallback, useEffect, useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';

export interface Member {
  id: number;
  username: string;
  email: string;
  imageUrl: string | null;
}

export interface GetMembersSearchParams {
  name?: string;
}

async function getMembersSearchFn(params: GetMembersSearchParams) {
  try {
    const res = await facerec.get<Member[]>(
      `/member/search?name=${params.name ?? ''}`
    );

    return res.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useMembersSearch(params: GetMembersSearchParams) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  const searchMembers = useCallback(async () => {
    setIsLoading(true);

    try {
      const members = await getMembersSearchFn(params);
      setMembers(members);

      setError(null);
    } catch (error) {
      logApiError(error);

      setError(error as Error);
      setMembers([]);
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => {
    searchMembers();
  }, [searchMembers]);

  return {
    isLoading,
    error,
    members,
  };
}
