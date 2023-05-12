import { useEffect } from 'react';
import { useAutoLogin } from '../hooks/useAutoLogin';
import { Outlet } from 'react-router-dom';

export function AutoLogin() {
  const { isLoading, autoLogin } = useAutoLogin();

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}
