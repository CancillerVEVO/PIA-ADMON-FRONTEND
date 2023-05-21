import { useGroupContext } from '../hooks/useGroupContext';
import React from 'react';
import { Button } from 'react-bootstrap';
import { List } from '@/components/List';
import { Member, useMembersSearch } from '../hooks/useMembersSearch';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useMembersAdd } from '../hooks/useMembersAdd';

const EMPTY_ARRAY: Member[] = [];

export function MemberAddPage() {
  const { group, refetch } = useGroupContext();
  const [params, setParams] = useSearchParams();
  const [selected, setSelected] = React.useState<Member[]>([]);
  const location = useLocation();
  const pathname = location.pathname.split('/').slice(0, -1).join('/');
  const memberAdd = useMembersAdd();

  const currentMembers = group?.members ?? EMPTY_ARRAY;

  const { members, isLoading } = useMembersSearch({
    name: params.get('search') ?? '',
  });

  const onAdd = () => {
    if (!group) return;

    const members = selected.map((member) => member.id);
    const groupId = group.id;

    memberAdd.addMembers({ members, groupId });
    alert('Members added');

    refetch();
  };

  const data = React.useMemo(() => {
    return members.filter((member) => {
      return !currentMembers.some(
        (currentMember) => currentMember.email === member.email
      );
    });
  }, [currentMembers, members]);

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
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          <h1>
            <Link to={pathname}>Members</Link> /
          </h1>{' '}
          <h1>Add members</h1>
        </div>
        <div>
          <Button
            onClick={onAdd}
            variant="primary"
            disabled={selected.length === 0}
          >
            Add
          </Button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        <input
          style={{
            flex: 1,
            padding: '0.5rem',
          }}
          type="search"
          placeholder="Search by username"
          defaultValue={params.get('search') ?? ''}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setParams({ search: e.currentTarget.value });
            }
          }}
        />
      </div>

      <List
        isLoading={isLoading}
        data={data}
        getKey={(member) => member.id.toString()}
        onSelectedChange={setSelected}
        renderItem={(member) => <Item member={member} />}
        selected={selected}
        readOnly={group?.currentUserRole !== 'ADMIN'}
      />
    </div>
  );
}

function Item({ member }: { member: Member }) {
  return (
    <>
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '0.5rem',
          overflow: 'hidden',
        }}
      >
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src={
            member.imageUrl ??
            'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
          }
          alt={member.username}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
            Username:
          </span>{' '}
          <span>{member.username}</span>
        </p>
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
            Email:
          </span>{' '}
          <span>{member.email}</span>
        </p>
      </div>
    </>
  );
}
