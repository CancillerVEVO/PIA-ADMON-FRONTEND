import { useState } from 'react';
import { axios } from '../../../api/axios';
import { User } from '../types';
import { useUserContext } from '../hooks/useUserContext';

export interface SignInProps {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: User;
}

async function loginFn(params: SignInProps) {
  const res = await axios.post<SignInResponse>('/auth/login', params);

  return res.data;
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
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    } catch (e) {
      console.error(e);
      setError(e as Error);

      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }

    setIsLoading(false);
  };

  return {
    login,
    isLoading,
    error,
  };
}
