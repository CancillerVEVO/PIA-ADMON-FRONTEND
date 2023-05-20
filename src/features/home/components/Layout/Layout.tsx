import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useLogout, useUserContext } from '../../../auth';
import { Group } from '../../hooks/useUserGroups';
import { useState } from 'react';
const groups = {
  admin: [
    {
      id: 13,
      title: 'Mi super grupo de prueba',
      description: 'Este sera el grupo de prueba',
      createdAt: '2023-05-09T00:25:17.479Z',
      role: 'ADMIN',
    },
    {
      id: 14,
      title: 'Mi super grupo de prueba',
      description: 'Este sera el grupo de prueba',
      createdAt: '2023-05-12T21:00:35.444Z',
      role: 'ADMIN',
    },
  ],
  member: [
    {
      id: 2,
      title: 'Mi segundo grupo',
      description: 'Este es mi segundo grupo',
      createdAt: '2023-05-02T06:40:30.859Z',
      role: 'MEMBER',
    },
    {
      id: 4,
      title: 'Cuarto grupo',
      description: 'Este es el cuarto grupo',
      createdAt: '2023-05-02T07:15:21.751Z',
      role: 'MEMBER',
    },
    {
      id: 12,
      title: 'Nuevo Grupo',
      description: 'Sere admin?',
      createdAt: '2023-05-05T02:34:31.719Z',
      role: 'MEMBER',
    },
  ],
};

function GroupItem({
  title,
  description,
  createdAt,
}: {
  title: string;
  description: string;
  createdAt: string;
  role: string;
}) {
  return (
    <button
      style={{
        padding: '0.7rem',
        borderBottom: '1px solid #ccc',
        width: '100%',
      }}
    >
      <h4>{title}</h4>
      <p>{description}</p>
      <p>{createdAt}</p>
    </button>
  );
}

export function Layout() {
  const { logout } = useLogout();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [showAdminGroups, setShowAdminGroups] = useState(false);
  const [showUserGroups, setShowUserGroups] = useState(false);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          backgroundColor: 'teal',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            Face recognition
          </Link>
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              borderRadius: 5,
              backgroundColor: '#fff',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/face-data')}
          >
            <img
              src={
                user.imageUrl ??
                'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
              }
              alt="User photo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          <img
            onClick={logout}
            width={50}
            src="https://pngimg.com/d/exit_PNG34.png"
            alt="Logout"
            style={{
              cursor: 'pointer',
            }}
          />
        </div>
      </header>

      <div
        style={{
          display: 'flex',
          flex: 1,
        }}
      >
        <aside
          style={{
            width: 400,
            overflowY: 'auto',
            display: 'flex',
          }}
          className="sidebar"
        >
          <nav
            style={{
              backgroundColor: '#fff',
              borderRight: '2px solid #ccc',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <li
                onClick={() => {
                  setShowAdminGroups(!showAdminGroups);
                  setShowUserGroups(false);
                }}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img
                  style={{
                    cursor: 'pointer',
                  }}
                  width={50}
                  src="https://images.sftcdn.net/images/t_app-icon-m/p/621b756a-9aa2-11e6-af98-00163ed833e7/1643758006/xp-tools-logo.png"
                  alt="Admin Groups"
                />
                Admin
              </li>
              <li
                onClick={() => {
                  setShowUserGroups(!showUserGroups);
                  setShowAdminGroups(false);
                }}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '1rem',
                }}
              >
                <img
                  width={50}
                  style={{
                    cursor: 'pointer',
                  }}
                  src="https://cdn.pixabay.com/photo/2012/04/01/17/43/boy-23714_1280.png"
                  alt="User Groups"
                />
                Member
              </li>
            </ul>
          </nav>
          <div
            style={{
              flex: 1,
              position: 'relative',
              overflowY: 'auto',
              borderRight: '2px solid #ccc',
            }}
          >
            <aside
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#fff',
                paddingTop: '1rem',
                paddingBottom: '1rem',
              }}
            >
              {showAdminGroups && (
                <div>
                  <h2>Admin Groups</h2>
                  {groups.admin.map((group) => (
                    <GroupItem key={group.id} {...group} />
                  ))}
                </div>
              )}
              {showUserGroups && (
                <div>
                  <h2>User Groups</h2>
                  {groups.member.map((group) => (
                    <GroupItem key={group.id} {...group} />
                  ))}
                </div>
              )}
            </aside>
          </div>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
