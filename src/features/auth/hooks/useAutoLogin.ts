import { useCallback, useState } from 'react';
import { axios } from '../../../api/axios';
import { User } from '../types';
import { useUserContext } from '../hooks/useUserContext';

async function autoLoginFn() {
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('token')}`;

  const res = await axios.get<User>('/auth/me');

  return res.data;
}

export function useAutoLogin() {
  const { setUser } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const autoLogin = useCallback(async () => {
    setIsLoading(true);

    try {
      const user = await autoLoginFn();

      setUser(user);
      setError(null);
    } catch (e) {
      console.error(e);
      setError(e as Error);

      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }

    setIsLoading(false);
  }, [setUser]);

  return {
    autoLogin,
    isLoading,
    error,
  };
}
