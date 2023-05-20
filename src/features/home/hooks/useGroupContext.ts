import { useContext } from 'react';
import { GroupContext } from '../providers/GroupProvider';

export function useGroupContext() {
  return useContext(GroupContext);
}
