import { useLocation, useNavigate } from 'react-router-dom';

export function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <button
        style={{
          flex: 1,
          backgroundColor: location.pathname.includes('members')
            ? '#ddd'
            : 'transparent',
          border: '2px solid #ccc',
        }}
        onClick={() => navigate('members')}
      >
        Members
      </button>
      <button
        style={{
          flex: 1,
          backgroundColor: location.pathname.includes('events')
            ? '#ddd'
            : 'transparent',
          border: '2px solid #ccc',
        }}
        onClick={() => navigate('events')}
      >
        Events
      </button>
    </div>
  );
}
