import { useCallback, useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';

export interface AddMemberParams {
  groupId: number;
  members: number[];
}

async function addMembersFn(params: AddMemberParams) {
  try {
    const groupId = params.groupId;

    const promises = params.members.map(async (memberId) => {
      try {
        const res = await facerec.post(`/member/${groupId}/${memberId}`);
        return res.data;
      } catch (e) {
        const error = getApiError(e);
        logApiError(error);
        return error;
      }
    });

    const members = await Promise.all(promises);

    return members;
  } catch (error) {
    throw getApiError(error);
  }
}

export function useMembersAdd() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const addMembers = useCallback(async (params: AddMemberParams) => {
    setIsLoading(true);

    const data = await addMembersFn(params);
    setData(data);
    setIsLoading(false);
  }, []);

  return {
    addMembers,
    isLoading,
    data,
  };
}
