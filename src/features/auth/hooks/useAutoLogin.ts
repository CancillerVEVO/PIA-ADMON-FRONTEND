import { useCallback, useState } from 'react';
import { facerec } from '../../../api/facerec';
import { User } from '../types';
import { useUserContext } from '../hooks/useUserContext';
import { getApiError } from '../../../utils/getApiError';

async function autoLoginFn() {
  try {
    facerec.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('token')}`;

    const res = await facerec.get<User>('/auth/me');

    return res.data;
  } catch (e) {
    throw getApiError(e);
  }
}

export function useAutoLogin() {
  const { setUser } = useUserContext();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const autoLogin = useCallback(async () => {
    setIsLoading(true);

    try {
      const user = await autoLoginFn();

      setUser(user);
      setError(null);
    } catch (e) {
      setError(e as Error);

      localStorage.removeItem('token');
      delete facerec.defaults.headers.common['Authorization'];
    }

    setIsLoading(false);
  }, [setUser]);

  return {
    autoLogin,
    isLoading,
    error,
  };
}
