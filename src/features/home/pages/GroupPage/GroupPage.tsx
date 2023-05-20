import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { TabBar } from './TabBar';
import { GroupProvider } from '../../providers/GroupProvider';

export function GroupPage() {
  return (
    <GroupProvider>
      <div>
        <Header />

        <main>
          <TabBar />

          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </GroupProvider>
  );
}
