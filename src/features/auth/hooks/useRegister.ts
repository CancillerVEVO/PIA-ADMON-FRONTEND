import { useState } from 'react';
import { User } from '../types';
import { facerec } from '../../../api/facerec';
import { ValidationError, getApiError } from '../../../utils/getApiError';
import { logApiError } from '../../../utils/logApiError';

export interface RegisterProps {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

async function registerFn(params: RegisterProps) {
  try {
    const res = await facerec.post<User>('/auth/register', params);
    return res.data;
  } catch (e) {
    throw getApiError(e);
  }
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const register = async (props: RegisterProps) => {
    setIsLoading(true);

    try {
      const user = await registerFn(props);
      setUser(user);

      setError(null);
    } catch (e) {
      logApiError(e);

      setError(e as Error);
      setUser(null);
    }

    setIsLoading(false);
  };

  return {
    register,
    isLoading,
    error,
    user,
  };
}
