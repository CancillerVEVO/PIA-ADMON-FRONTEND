import { format } from 'date-fns';
import { useGroupContext } from '../../hooks/useGroupContext';

export function Header() {
  const { group } = useGroupContext();

  return (
    <header
      style={{
        padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>{group?.title}</h1>
        {group?.createdAt ? (
          <p>{format(new Date(group.createdAt), 'PPP')}</p>
        ) : null}
      </div>

      <p>{group?.description}</p>
    </header>
  );
}
