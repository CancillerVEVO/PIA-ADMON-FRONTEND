import { useParams } from 'react-router-dom';

export function GroupPage() {
  const params = useParams();
  const groupId = params.groupId;

  return (
    <div>
      <h1>{groupId}</h1>
    </div>
  );
}
