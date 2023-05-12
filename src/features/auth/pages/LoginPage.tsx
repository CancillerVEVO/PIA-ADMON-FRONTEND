import { useState } from 'react';
import { SignInProps, useLogin } from '../hooks/useLogin';
import { useUserContext } from '..';
import { Navigate, useLocation } from 'react-router-dom';

export function LoginPage() {
  const { authenticated } = useUserContext();
  const { error, isLoading, login } = useLogin();
  const location = useLocation();

  const from = location.state ? location.state.from.pathname : '/';

  const [values, setValues] = useState<SignInProps>({
    email: '',
    password: '',
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    return login(values);
  };

  if (authenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={values.email}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <input
          name="password"
          type="password"
          autoComplete="password"
          placeholder="Password"
          value={values.password}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <button type="submit" disabled={isLoading}>
          Login
        </button>

        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </form>
    </div>
  );
}
