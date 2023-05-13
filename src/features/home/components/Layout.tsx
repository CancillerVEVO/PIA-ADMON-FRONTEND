import { Outlet } from 'react-router-dom';
import { useLogout } from '../../auth';

export function Layout() {
  const { logout } = useLogout();
  return (
    <div>
      <header>
        <h1>HEADER</h1>
        <button onClick={logout}>LOGOUT</button>
      </header>
      <Outlet />
      <h1>FOOTER</h1>
    </div>
  );
}
