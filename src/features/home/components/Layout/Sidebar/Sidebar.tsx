import { GroupList } from './GroupList';
import { Nav } from './Nav';

export function Sidebar() {
  return (
    <aside
      style={{
        width: 400,
        overflowY: 'auto',
        display: 'flex',
      }}
      className="sidebar"
    >
      <Nav />
      <GroupList />
    </aside>
  );
}
