import { useUserContext } from '../../auth';

export function ProfilePage() {
  const { user } = useUserContext();

  return (
    <div>
      <h1>{user.username}</h1>
      <h1>{user.email}</h1>
      <h1>{user.id}</h1>
      {user.imageUrl && <img src={user.imageUrl} alt={user.username} />}
    </div>
  );
}
