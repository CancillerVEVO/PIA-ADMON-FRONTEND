import { useCallback, useEffect, useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';
import { Group } from '../types/Group';

interface GroupsResponse {
  groups: {
    admin: Group[];
    member: Group[];
  };
}

async function getUserGroupsFn(params: GetUserGroupsParams) {
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

export interface GetUserGroupsParams {
  type?: 'ADMIN' | 'MEMBER';
}

export function useUserGroups(params: GetUserGroupsParams) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);

  const getUserGroups = useCallback(async () => {
    setIsLoading(true);

    try {
      const groups = await getUserGroupsFn(params);
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
    getUserGroups();
  }, [getUserGroups]);

  return {
    getUserGroups,
    isLoading,
    error,
    groups,
  };
}
