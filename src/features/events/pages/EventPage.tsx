import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEvent } from '../hooks/useEvent';
import { compareAsc, format } from 'date-fns';
import { Field } from '../components/Field';
import { AttendanceList } from '../components/AttendanceList';
import { Button } from 'react-bootstrap';
import { useGroupContext } from '@/features/home';

export function EventPage() {
  const { group } = useGroupContext();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split('/').slice(0, -1).join('/');

  const { eventId } = useParams();

  const { event } = useEvent(eventId ? parseInt(eventId) : undefined);

  const isClosed = event
    ? compareAsc(new Date(), new Date(event.endDate)) === 1
    : false;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          padding: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <Link to={pathname}>Events</Link> / <span>{event?.title}</span>
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

        <div>
          {group?.currentUserRole === 'ADMIN' ? (
            <Button
              onClick={() => navigate('edit')}
              type="submit"
              variant="primary"
              form="create-event-form"
            >
              Edit
            </Button>
          ) : null}{' '}
          <Button type="submit" variant="success" form="create-event-form">
            Register attendance
          </Button>
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          paddingTop: 0,
        }}
      >
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

      <AttendanceList data={event?.attendance ?? []} />
    </div>
  );
}
