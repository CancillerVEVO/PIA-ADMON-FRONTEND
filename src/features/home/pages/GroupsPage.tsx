import { Outlet, useParams } from 'react-router-dom';

export function GroupsPage() {
  const params = useParams();
  const groupId = params.groupId;

  if (groupId) {
    return <Outlet />;
  } else {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <h1
          style={{
            color: 'gray',
          }}
        >
          Select a group from the sidebar
        </h1>
      </div>
    );
  }
}
