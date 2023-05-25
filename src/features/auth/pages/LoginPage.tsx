import { useState } from 'react';
import { SignInProps, useLogin } from '../hooks/useLogin';
import { useUserContext } from '..';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ErrorMessages } from '../components/ErrorMessages';
import { Button, Card } from 'react-bootstrap';

export function LoginPage() {
  const { authenticated } = useUserContext();
  const { error, isLoading, login } = useLogin();
  const location = useLocation();

  const from = location.state ? location.state.from.pathname : '/';

  const [values, setValues] = useState<SignInProps>({
    email: '',
    password: '123456',
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    return login(values);
  };

  if (authenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="center-content">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title as="h1" className="form-title">
            Login
          </Card.Title>

          <form onSubmit={onSubmit} className="form-vertical">
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
            <Button type="submit" disabled={isLoading}>
              Login
            </Button>

            <ErrorMessages error={error} />
          </form>

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
