import { useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';

export interface Group {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  role: 'ADMIN' | 'MEMBER';
}

interface GroupsResponse {
  groups: {
    admin: Group[];
    member: Group[];
  };
}

async function getUserGroupsFn() {
  try {
    const res = await facerec.get<GroupsResponse>('/group');

    return res.data.groups;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useUserGroups() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [groups, setGroups] = useState<GroupsResponse['groups'] | null>(null);

  const getUserGroups = async () => {
    setIsLoading(true);

    try {
      const groups = await getUserGroupsFn();
      setGroups(groups);

      setError(null);
    } catch (error) {
      logApiError(error);

      setError(error as Error);
      setGroups(null);
    }

    setIsLoading(false);
  };

  return {
    getUserGroups,
    isLoading,
    error,
    groups,
  };
}
