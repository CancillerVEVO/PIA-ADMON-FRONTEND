import { ValidationError } from '../../../utils/getApiError';

export interface ErrorMessagesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export function ErrorMessages({ error }: ErrorMessagesProps) {
  if (!error) {
    return null;
  }

  if (error instanceof ValidationError) {
    return (
      <ul>
        {error.errors.map((e, i) => {
          let message = e.path.join('.');
          message += `: ${e.message}`;

          return (
            <li key={i}>
              <Item message={message} />
            </li>
          );
        })}
      </ul>
    );
  }

  if (error instanceof Error) {
    return <Item message={error.message} />;
  }

  console.error(error);

  return <Item message="Ha ocurrido un error desconocido." />;
}

interface ItemProps {
  message: string;
}

function Item({ message }: ItemProps) {
  return (
    <p
      style={{
        color: 'red',
      }}
    >
      {message}
    </p>
  );
}
