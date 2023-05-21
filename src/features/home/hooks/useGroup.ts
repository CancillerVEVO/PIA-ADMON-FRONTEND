import { useCallback, useEffect, useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';

export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Member {
  id: number;
  username: string;
  email: string;
  imageUrl: string | null;
  role: 'ADMIN' | 'MEMBER';
  joinedAt: string;
}

export interface Group {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  events: Event[];
  members: Member[];
}

interface GroupResponse {
  group: Group;
}

async function getGroupFn(id: number) {
  try {
    const res = await facerec.get<GroupResponse>(`/group/${id}`);

    return res.data.group;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useGroup(id?: number) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [group, setGroup] = useState<Group | null>(null);

  const getGroup = useCallback(async (id: number) => {
    setIsLoading(true);

    try {
      const group = await getGroupFn(id);
      setGroup(group);

      setError(null);
    } catch (error) {
      logApiError(error);

      setError(error as Error);
      setGroup(null);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (id) {
      getGroup(id);
    }
  }, [getGroup, id]);

  return {
    getGroup,
    isLoading,
    error,
    group,
  };
}
