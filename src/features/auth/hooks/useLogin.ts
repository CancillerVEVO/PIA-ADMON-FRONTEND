import { useState } from 'react';
import { facerec } from '../../../api/facerec';
import { User } from '../types';
import { useUserContext } from '../hooks/useUserContext';
import { getApiError } from '../../../utils/getApiError';
import { logApiError } from '../../../utils/logApiError';

export interface SignInProps {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: User;
}

async function loginFn(params: SignInProps) {
  try {
    const res = await facerec.post<SignInResponse>('/auth/login', params);

    return res.data;
  } catch (e) {
    throw getApiError(e);
  }
}

export function useLogin() {
  const { setUser } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (props: SignInProps) => {
    setIsLoading(true);

    try {
      const data = await loginFn(props);

      setUser(data.user);
      setError(null);

      localStorage.setItem('token', data.token);
      facerec.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    } catch (e) {
      logApiError(e);
      setError(e as Error);

      localStorage.removeItem('token');
      delete facerec.defaults.headers.common['Authorization'];
    }

    setIsLoading(false);
  };

  return {
    login,
    isLoading,
    error,
  };
}
