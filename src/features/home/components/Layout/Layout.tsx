import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />

      <div
        style={{
          display: 'flex',
          flex: 1,
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
