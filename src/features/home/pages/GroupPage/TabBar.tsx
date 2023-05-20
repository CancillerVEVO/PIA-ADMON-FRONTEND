import { useNavigate } from 'react-router-dom';

export function TabBar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <button
        style={{
          flex: 1,
        }}
        onClick={() => navigate('members')}
      >
        Members
      </button>
      <button
        style={{
          flex: 1,
        }}
        onClick={() => navigate('events')}
      >
        Events
      </button>
    </div>
  );
}
