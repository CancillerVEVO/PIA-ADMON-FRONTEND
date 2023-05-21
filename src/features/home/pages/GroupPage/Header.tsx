import { format } from 'date-fns';
import { useGroupContext } from '../../hooks/useGroupContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logApiError } from '@/utils/logApiError';
import { facerec } from '@/api/facerec';
import { eventEmitter } from '@/utils/eventEmitter';

export function Header() {
  const { group, refetch } = useGroupContext();
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
          </Button>{' '}
          <Button
            variant="danger"
            onClick={async () => {
              try {
                const ok = confirm(
                  'Are you sure you want to delete this group?'
                );
                if (!ok) return;

                await facerec.delete(`/group/${group?.id}`);
                eventEmitter.emit('GROUP_CREATED');
                navigate('/admin');
                refetch();
              } catch (error) {
                logApiError(error);
              }
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </header>
  );
}
