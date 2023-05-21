import { Group, useGroups } from '@/features/home/hooks/useGroups';
import { GroupItem } from './GroupItem';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { eventEmitter } from '@/utils/eventEmitter';

export function GroupList({ type }: { type?: 'ADMIN' | 'MEMBER' }) {
  const { groups, isLoading, refetch } = useGroups({
    type,
  });

  useEffect(() => {
    eventEmitter.on('GROUP_CREATED', refetch);

    return () => {
      eventEmitter.off('GROUP_CREATED', refetch);
    };
  }, [refetch]);

  return (
    <div
      style={{
        flex: 1,
        position: 'relative',
        overflowY: 'auto',
        borderRight: '2px solid #ccc',
      }}
    >
      {isLoading ? <Skeleton /> : <Content groups={groups} />}
    </div>
  );
}

function Content({ groups }: { groups: Group[] }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          borderBottom: '2px solid #ccc',
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '1rem',
        }}
      >
        <Button onClick={() => navigate('/admin/create')}>Create</Button>
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        {groups.map((group) => (
          <li key={group.id}>
            <GroupItem group={group} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Skeleton() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinner />
    </div>
  );
}
