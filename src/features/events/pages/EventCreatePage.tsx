import { add, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CreateEventParams, useEventCreate } from '../hooks/useEventCreate';
import { useGroupContext } from '@/features/home';
import { ErrorMessages } from '@/features/auth/components/ErrorMessages';

interface FormValues {
  title: string;
  description: string;
  endDate: string;
}

function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm");
}

export function EventCreatePage() {
  const { group, refetch } = useGroupContext();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split('/').slice(0, -1).join('/');

  const eventCreate = useEventCreate();

  const [values, setValues] = useState<FormValues>({
    title: '',
    description: '',
    endDate: formatDate(add(new Date(), { days: 1 })),
  });

  const onChange = (e: { name: string; value: string }) => {
    const { name, value } = e;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (eventCreate.data) {
      navigate(pathname);
    }
  }, [eventCreate.data, navigate, pathname]);

  const onCreate = async () => {
    try {
      if (!group) {
        return;
      }

      const endDate = new Date(values.endDate);

      const event: CreateEventParams = {
        ...values,
        endDate: endDate.toISOString(),
        groupId: group?.id,
      };

      await eventCreate.createEvent(event);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

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
          <Link to={pathname}>Events</Link> / <span>Create event</span>
        </h1>

        <div>
          <Button
            type="submit"
            variant="primary"
            form="create-event-form"
            disabled={eventCreate.isLoading}
          >
            Create
            {eventCreate.isLoading && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: eventCreate.isLoading ? 'flex' : 'none',
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
            disabled={eventCreate.isLoading}
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
            disabled={eventCreate.isLoading}
          />
        </Field>

        <Field label="End date" htmlFor="endDate">
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            value={values.endDate}
            onChange={(e) => onChange(e.target)}
            style={{
              padding: '0.5rem',
            }}
            min={formatDate(new Date())}
            required
            disabled={eventCreate.isLoading}
          />
        </Field>
      </form>

      <ErrorMessages error={eventCreate.error} />
    </div>
  );
}

export function Field({
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
