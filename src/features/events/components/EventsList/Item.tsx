import { Event } from '@/features/home';
import { compareAsc, format } from 'date-fns';
import { Link } from 'react-router-dom';

export function Item({ event }: { event: Event }) {
  const isClosed = compareAsc(new Date(), new Date(event.endDate)) === 1;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <h4>
          <Link to={event.id.toString()}>{event.title}</Link>
        </h4>
        <span
          style={{
            backgroundColor: isClosed ? '#f44336' : '#4caf50',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.5rem',
            alignSelf: 'flex-start',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {isClosed ? 'closed' : 'open'}
        </span>
      </div>

      <Field label="Description" value={event.description} />
      <Field
        label="Start date"
        value={format(new Date(event.startDate), "PPP 'at' p")}
      />
      <Field
        label="End date"
        value={format(new Date(event.endDate), "PPP 'at' p")}
      />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <p
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      <span
        style={{
          fontWeight: 'bold',
        }}
      >
        {label}:
      </span>{' '}
      <span>{value}</span>
    </p>
  );
}
