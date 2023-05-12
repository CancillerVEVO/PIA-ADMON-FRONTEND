import { Routes, Route } from 'react-router-dom';
import { AutoLogin, LoginPage, RegisterPage } from '../features/auth';
import { HomePage, ProfilePage, Layout } from '../features/home';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AutoLogin />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
