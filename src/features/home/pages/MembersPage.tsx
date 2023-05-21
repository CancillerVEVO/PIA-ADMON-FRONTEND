import { format } from 'date-fns';
import { useGroupContext } from '../hooks/useGroupContext';
import { Member } from '../hooks/useGroup';
import React from 'react';
import { Button } from 'react-bootstrap';
import { List } from '../components/List';
import { useNavigate } from 'react-router-dom';
import { useMembersDelete } from '../hooks/useMembersDelete';

export function MembersPage() {
  const navigate = useNavigate();

  const { group, refetch } = useGroupContext();

  const members = group?.members ?? [];

  const [selected, setSelected] = React.useState<Member[]>([]);

  const membersDelete = useMembersDelete();

  const onDelete = () => {
    if (!group) return;

    const members = selected.map((member) => member.id);
    const groupId = group.id;

    membersDelete.deleteMembers({ members, groupId });
    alert('Members deleted');

    refetch();
  };

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
        <h1>Members</h1>
        {group?.currentUserRole === 'ADMIN' ? (
          <div>
            <Button variant="primary" onClick={() => navigate('add')}>
              Add
            </Button>{' '}
            <Button
              variant="danger"
              disabled={selected.length === 0}
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        ) : null}
      </div>

      <List
        data={members}
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
        {member.role === 'ADMIN' ? (
          <span
            style={{
              backgroundColor: '#0f0',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem',
              marginBottom: '0.5rem',
              alignSelf: 'flex-start',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              textTransform: 'lowercase',
            }}
          >
            {member.role}
          </span>
        ) : null}

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
            Joined at:
          </span>{' '}
          <span>{format(new Date(member.joinedAt), "PPP 'at' p")}</span>
        </p>
      </div>
    </>
  );
}
