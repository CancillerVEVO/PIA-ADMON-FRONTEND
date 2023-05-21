import { format } from 'date-fns';
import { useGroupContext } from '../../hooks/useGroupContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { group } = useGroupContext();
  const navigate = useNavigate();

  return (
    <header
      style={{
        padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>{group?.title}</h1>
        {group?.createdAt ? (
          <p>{format(new Date(group.createdAt), 'PPP')}</p>
        ) : null}
      </div>

      <p>{group?.description}</p>

      {group?.currentUserRole === 'ADMIN' && (
        <div>
          <Button
            variant="primary"
            onClick={() => navigate(`/admin/${group?.id}/edit`)}
          >
            Edit
          </Button>
        </div>
      )}
    </header>
  );
}
