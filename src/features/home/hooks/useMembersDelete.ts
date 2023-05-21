import { useCallback, useState } from 'react';
import { facerec } from '@/api/facerec';
import { getApiError } from '@/utils/getApiError';
import { logApiError } from '@/utils/logApiError';

export interface DeleteMemberParams {
  groupId: number;
  members: number[];
}

async function deleteMembersFn(params: DeleteMemberParams) {
  try {
    const groupId = params.groupId;

    const promises = params.members.map(async (memberId) => {
      try {
        const res = await facerec.delete(`/member/${groupId}/${memberId}`);
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

export function useMembersDelete() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const deleteMembers = useCallback(async (params: DeleteMemberParams) => {
    setIsLoading(true);

    const data = await deleteMembersFn(params);
    setData(data);
    setIsLoading(false);
  }, []);

  return {
    deleteMembers,
    isLoading,
    data,
  };
}
