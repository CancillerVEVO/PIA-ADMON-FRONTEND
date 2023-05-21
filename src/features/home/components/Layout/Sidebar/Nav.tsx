import { useLocation, useNavigate } from 'react-router-dom';

export function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  return (
    <nav
      style={{
        backgroundColor: '#fff',
        borderRight: '2px solid #ccc',
      }}
    >
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
        }}
      >
        <li
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: location.pathname.includes('admin')
              ? '#ddd'
              : 'transparent',
          }}
          onClick={() => navigate('admin')}
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
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: location.pathname.match(/^\/member/)
              ? '#ddd'
              : 'transparent',
          }}
          onClick={() => navigate('member')}
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
  );
}
