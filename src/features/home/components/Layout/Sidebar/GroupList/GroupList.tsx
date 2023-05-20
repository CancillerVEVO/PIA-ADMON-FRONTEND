import { Group, useGroups } from '@/features/home/hooks/useGroups';
import { GroupItem } from './GroupItem';
import { Spinner } from 'react-bootstrap';

export function GroupList({ type }: { type?: 'ADMIN' | 'MEMBER' }) {
  const { groups, isLoading } = useGroups({
    type,
  });

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
