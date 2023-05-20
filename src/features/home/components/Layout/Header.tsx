import { useLogout, useUserContext } from '@/features/auth';
import { useNavigate, Link } from 'react-router-dom';

export function Header() {
  const { logout } = useLogout();
  const { user } = useUserContext();

  const navigate = useNavigate();

  return (
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
  );
}
