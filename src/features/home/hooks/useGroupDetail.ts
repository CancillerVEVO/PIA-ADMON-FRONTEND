import { useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';

interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface Member {
  id: number;
  username: string;
  email: string;
  imageUrl: string | null;
  role: 'ADMIN' | 'MEMBER';
}

interface GroupResponse {
  group: {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    events: Event[];
    members: Member[];
  };
}

async function getGroupDetailFn(groupId: number) {
  try {
    const res = await facerec.get<GroupResponse>(`/group/${groupId}`);

    return res.data.group;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useGroupDetail(groupId: number) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [group, setGroup] = useState<GroupResponse['group'] | null>(null);

  const getGroupDetail = async () => {
    setIsLoading(true);

    try {
      const group = await getGroupDetailFn(groupId);
      setGroup(group);

      setError(null);
    } catch (error) {
      logApiError(error);

      setError(error as Error);
      setGroup(null);
    }

    setIsLoading(false);
  };

  return {
    getGroupDetail,
    isLoading,
    error,
    group,
  };
}
