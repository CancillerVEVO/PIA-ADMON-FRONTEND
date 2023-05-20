import { Group } from '@/features/home/types/Group';
import styles from './GroupItem.module.css';
import { useNavigate, useParams } from 'react-router-dom';

export function GroupItem({ group }: { group: Group }) {
  const navigate = useNavigate();
  const params = useParams();
  const groupId = params.groupId ? parseInt(params.groupId) : null;

  const { title, description, createdAt, id, role } = group;

  return (
    <button
      style={{
        padding: '0.7rem',
        border: 'none',
        borderBottom: '1px solid #ccc',
        width: '100%',
        backgroundColor: groupId === id ? '#ccc' : 'transparent',
      }}
      className={styles.root}
      onClick={() => navigate(`/groups/${role.toLowerCase()}/${id}`)}
    >
      <h4>{title}</h4>
      <p>{description}</p>
      <p>{createdAt}</p>
    </button>
  );
}
