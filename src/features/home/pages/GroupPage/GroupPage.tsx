import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { TabBar } from './TabBar';

export function GroupPage() {
  return (
    <div>
      <Header />

      <main>
        <TabBar />

        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
