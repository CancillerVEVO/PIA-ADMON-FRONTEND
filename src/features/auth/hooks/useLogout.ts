import { facerec } from '../../../api/facerec';
import { useUserContext } from '../hooks/useUserContext';

export function useLogout() {
  const { setUser } = useUserContext();

  const logout = async () => {
    localStorage.removeItem('token');
    delete facerec.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return {
    logout,
  };
}
