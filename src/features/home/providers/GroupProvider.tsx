import { createContext } from 'react';
import { Group, useGroup } from '../hooks/useGroup';
import { useParams } from 'react-router-dom';

export interface GroupProviderValue {
  group: Group | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const GroupContext = createContext<GroupProviderValue>({
  group: null,
  isLoading: false,
  error: null,
  refetch: () => {},
});

export function GroupProvider(props: { children: React.ReactNode }) {
  const params = useParams();
  const id = params.groupId;

  const value = useGroup(id ? parseInt(id) : undefined);

  return (
    <GroupContext.Provider value={value}>
      {props.children}
    </GroupContext.Provider>
  );
}
