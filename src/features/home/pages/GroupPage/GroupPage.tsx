import { Outlet, useParams } from 'react-router-dom';
import { useGroup } from '../../hooks/useGroup';
import { Header } from './Header';
import { TabBar } from './TabBar';

export function GroupPage() {
  const params = useParams();
  const id = params.groupId;

  const { group } = useGroup(id ? parseInt(id) : undefined);

  return (
    <div>
      <Header group={group} />

      <main>
        <TabBar />

        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
