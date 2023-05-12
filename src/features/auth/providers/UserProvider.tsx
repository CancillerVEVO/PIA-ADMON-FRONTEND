import { createContext, useCallback, useState } from 'react';
import { User } from '../types';

export interface UserProviderValue {
  user: User;
  authenticated: boolean;
  setUser: (user: User | null) => void;
}

const INITIAl_USER: User = {
  id: 0,
  username: '',
  email: '',
  imageUrl: null,
};

export const UserContext = createContext<UserProviderValue>({
  user: INITIAl_USER,
  authenticated: false,
  setUser: () => {},
});

export function UserProvider(props: { children: React.ReactNode }) {
  const [user, changeUser] = useState<User>(INITIAl_USER);
  const authenticated = user.id !== 0;

  const setUser = useCallback((user: User | null) => {
    if (user) {
      changeUser(user);
    } else {
      changeUser(INITIAl_USER);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, authenticated, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
