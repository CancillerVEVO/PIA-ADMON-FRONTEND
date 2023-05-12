import { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';

export function useUserContext() {
  return useContext(UserContext);
}
