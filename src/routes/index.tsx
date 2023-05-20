import { Routes, Route, Navigate } from 'react-router-dom';
import {
  AutoLogin,
  LoginPage,
  RegisterPage,
  RequireAuth,
} from '../features/auth';
import {
  HomePage,
  ProfilePage,
  Layout,
  GroupsPage,
  GroupPage,
  MembersPage,
  EventsPage,
} from '../features/home';
import {
  FaceDataChangePage,
  FaceDataDeletePage,
  FaceDataTestPage,
  FaceDataPage,
} from '@/features/face-data';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AutoLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<HomePage />} />

            <Route path="profile" element={<ProfilePage />} />

            <Route path="/admin" element={<GroupsPage />}>
              <Route path=":groupId" element={<GroupPage />}>
                <Route path="" element={<Navigate to="members" />} />
                <Route path="members" element={<MembersPage />} />
                <Route path="events" element={<EventsPage />} />
              </Route>
            </Route>

            <Route path="/member" element={<GroupsPage />}>
              <Route path=":groupId" element={<GroupPage />}>
                <Route path="" element={<Navigate to="members" />} />
                <Route path="members" element={<MembersPage />} />
                <Route path="events" element={<EventsPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="/face-data/test" element={<FaceDataTestPage />} />
          <Route path="/face-data/change" element={<FaceDataChangePage />} />
          <Route path="/face-data/delete" element={<FaceDataDeletePage />} />
          <Route path="/face-data" element={<FaceDataPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
