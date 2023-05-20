import { useCallback, useEffect, useState } from 'react';
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

async function getGroupsFn(params: GetGroupsParams) {
  try {
    if (!params.type) {
      return [];
    }

    const res = await facerec.get<GroupsResponse>('/group');

    return params.type === 'ADMIN'
      ? res.data.groups.admin
      : res.data.groups.member;
  } catch (error) {
    throw getApiError(error);
  }
}

export interface GetGroupsParams {
  type?: 'ADMIN' | 'MEMBER';
}

export function useGroups(params: GetGroupsParams) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);

  const getGroups = useCallback(async () => {
    setIsLoading(true);

    try {
      const groups = await getGroupsFn(params);
      setGroups(groups);

      setError(null);
    } catch (error) {
      logApiError(error);

      setError(error as Error);
      setGroups([]);
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  return {
    getGroups,
    isLoading,
    error,
    groups,
  };
}
