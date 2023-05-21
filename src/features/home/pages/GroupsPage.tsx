import { Outlet } from 'react-router-dom';
import { GroupProvider } from '..';

export function GroupsPage() {
  return (
    <GroupProvider>
      <Outlet />
    </GroupProvider>
  );
}
