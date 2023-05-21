import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Event, useGroupContext } from '@/features/home';
import { EventsList } from '../components/EventsList';
import { useEventsDelete } from '../hooks/useEventsDelete';

export function EventsPage() {
  const navigate = useNavigate();

  const { group, refetch } = useGroupContext();
  const data = group?.events ?? [];

  const [selected, setSelected] = React.useState<Event[]>([]);

  const eventsDelete = useEventsDelete();

  const onDelete = async () => {
    if (!group) return;

    const events = selected.map((e) => e.id);

    await eventsDelete.deleteEvents({ events });
    refetch();

    alert('Events deleted');
  };

  const onCreate = () => {};

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',
          alignItems: 'center',
        }}
      >
        <h1>Events</h1>

        {group?.currentUserRole === 'ADMIN' ? (
          <Options
            selected={selected}
            onDelete={onDelete}
            onCreate={onCreate}
          />
        ) : null}
      </div>

      <EventsList
        data={data}
        setSelected={setSelected}
        selected={selected}
        readOnly={group?.currentUserRole !== 'ADMIN'}
      />
    </div>
  );
}

function Options({
  selected,
  onDelete,
  onCreate,
}: {
  selected: Event[];
  onDelete: () => void;
  onCreate: () => void;
}) {
  return (
    <div>
      <Button variant="primary" onClick={onCreate}>
        Create
      </Button>{' '}
      <Button
        variant="danger"
        disabled={selected.length === 0}
        onClick={onDelete}
      >
        Delete
      </Button>
    </div>
  );
}
