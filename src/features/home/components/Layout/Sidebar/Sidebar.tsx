import { useLocation } from 'react-router-dom';
import { GroupList } from './GroupList';
import { Nav } from './Nav';

export function Sidebar() {
  const location = useLocation();

  let type: 'ADMIN' | 'MEMBER' | undefined;
  if (location.pathname.includes('admin')) {
    type = 'ADMIN';
  } else if (location.pathname.includes('member')) {
    type = 'MEMBER';
  }

  return (
    <aside
      style={{
        width: type ? 400 : 'auto',
        overflowY: 'auto',
        display: 'flex',
      }}
      className="sidebar"
    >
      <Nav />
      {type ? <GroupList type={type} /> : null}
    </aside>
  );
}
