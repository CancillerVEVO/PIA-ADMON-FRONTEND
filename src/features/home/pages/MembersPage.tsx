import { format } from 'date-fns';
import { useGroupContext } from '../hooks/useGroupContext';

export function MembersPage() {
  const { group } = useGroupContext();

  const members = group?.members ?? [];

  return (
    <div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        {members.map((member) => (
          <li
            key={member.id}
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              padding: '1rem',
              borderBottom: '1px solid #ccc',
            }}
          >
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
          </li>
        ))}
      </ul>
    </div>
  );
}
