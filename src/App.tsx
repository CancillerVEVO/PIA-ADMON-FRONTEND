import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { UserProvider } from './features/auth';

export function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}
