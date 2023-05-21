import { useParams } from 'react-router-dom';
import { useEvent } from '../hooks/useEvent';
import { compareAsc, format } from 'date-fns';
import { Field } from '../components/Field';

export function EventPage() {
  const { eventId } = useParams();

  const { event } = useEvent(eventId ? parseInt(eventId) : undefined);

  const isClosed = event
    ? compareAsc(new Date(), new Date(event.endDate)) === 1
    : false;

  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h1
          style={{
            margin: 0,
          }}
        >
          {event?.title}
        </h1>

        <span
          style={{
            backgroundColor: isClosed ? '#f44336' : '#4caf50',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.5rem',

            fontSize: '0.75rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {isClosed ? 'closed' : 'open'}
        </span>
      </div>

      <Field label="Description" value={event?.description ?? ''} />
      <Field
        label="Start date"
        value={
          event?.startDate
            ? format(new Date(event.startDate), "PPP 'at' p")
            : ''
        }
      />
      <Field
        label="End date"
        value={
          event?.endDate ? format(new Date(event.endDate), "PPP 'at' p") : ''
        }
      />
    </div>
  );
}
