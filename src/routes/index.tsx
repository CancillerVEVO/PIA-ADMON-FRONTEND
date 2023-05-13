import { Routes, Route } from 'react-router-dom';
import {
  AutoLogin,
  LoginPage,
  RegisterPage,
  RequireAuth,
} from '../features/auth';
import { HomePage, ProfilePage, Layout } from '../features/home';
import {
  FaceDataChangePage,
  FaceDataPage,
  FaceDataTestPage,
} from '@/features/face-data';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AutoLogin />}>
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/face-data/test" element={<FaceDataTestPage />} />
          <Route path="/face-data/change" element={<FaceDataChangePage />} />
          <Route path="/face-data" element={<FaceDataPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
