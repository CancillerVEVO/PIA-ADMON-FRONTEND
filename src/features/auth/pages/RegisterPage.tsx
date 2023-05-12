import { useState } from 'react';
import { RegisterProps, useRegister } from '../hooks/useRegister';
import { Link, Navigate } from 'react-router-dom';
import { ErrorMessages } from '../components/ErrorMessages';
import { Button, Card } from 'react-bootstrap';

export function RegisterPage() {
  const { error, isLoading, register, user } = useRegister();

  const [values, setValues] = useState<RegisterProps>({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    return register(values);
  };

  if (user) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="center-content">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title as="h1" className="form-title">
            Register
          </Card.Title>

          <form onSubmit={onSubmit} className="form-vertical">
            <input
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Username"
              value={values.username}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, username: e.target.value }));
              }}
            />
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

            <input
              name="passwordConfirmation"
              type="password"
              autoComplete="passwordConfirmation"
              placeholder="Password Confirmation"
              value={values.passwordConfirmation}
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  passwordConfirmation: e.target.value,
                }));
              }}
            />

            <Button variant="primary" type="submit" disabled={isLoading}>
              Register
            </Button>

            <ErrorMessages error={error} />
          </form>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
