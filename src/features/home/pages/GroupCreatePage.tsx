import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ErrorMessages } from '@/features/auth/components/ErrorMessages';
import { useGroupCreate } from '../hooks/useGroupCreate';
import { eventEmitter } from '@/utils/eventEmitter';

interface FormValues {
  title: string;
  description: string;
}

export function GroupCreatePage() {
  const navigate = useNavigate();

  const [values, setValues] = useState<FormValues>({
    title: '',
    description: '',
  });

  const groupCreate = useGroupCreate();

  const onChange = (e: { name: string; value: string }) => {
    const { name, value } = e;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onCreate = () => {
    return groupCreate.createGroup(values);
  };

  const isLoading = groupCreate.isLoading;
  const error = groupCreate.error;

  useEffect(() => {
    if (groupCreate.data) {
      eventEmitter.emit('GROUP_CREATED');
      navigate(`/admin/${groupCreate.data.id}`);
    }
  }, [groupCreate.data, navigate]);

  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h1
          style={{
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          Create group
        </h1>

        <div>
          <Button
            type="submit"
            variant="primary"
            form="create-event-form"
            disabled={isLoading}
          >
            Create
            {isLoading && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: isLoading ? 'flex' : 'none',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Spinner />
              </div>
            )}
          </Button>
        </div>
      </div>

      <form
        id="create-event-form"
        onSubmit={(e) => {
          e.preventDefault();
          onCreate();
        }}
      >
        <Field label="Title" htmlFor="title">
          <input
            type="text"
            id="title"
            name="title"
            onChange={(e) => onChange(e.target)}
            value={values.title}
            style={{
              padding: '0.5rem',
            }}
            required
            disabled={isLoading}
          />
        </Field>

        <Field label="Description" htmlFor="description">
          <textarea
            id="description"
            name="description"
            rows={4}
            maxLength={250}
            value={values.description}
            onChange={(e) => onChange(e.target)}
            style={{
              padding: '0.5rem',
            }}
            required
            disabled={isLoading}
          />
        </Field>
      </form>

      <ErrorMessages error={error} />
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginBottom: '1rem',
      }}
    >
      <label
        style={{
          fontWeight: 'bold',
        }}
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
