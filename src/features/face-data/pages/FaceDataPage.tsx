import { User, useUserContext } from '@/features/auth';
import { Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Image } from '../components/Image';

export function FaceDataPage() {
  const { user } = useUserContext();

  const navigate = useNavigate();

  const onClick = (action: MenuActionType) => {
    switch (action) {
      case 'test':
        navigate('/face-data/test');
        break;
      case 'change':
        navigate('/face-data/change');
        break;
      case 'delete':
        navigate('/face-data/delete');
        break;
    }
  };

  return (
    <div className="center-content">
      <Card>
        <Card.Body
          style={{
            padding: '4rem',
          }}
        >
          <Card.Title
            style={{
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            <h1>Face data</h1>
          </Card.Title>

          <Image
            style={{
              marginBottom: '2rem',
            }}
            img={
              user.imageUrl
                ? {
                    src: user.imageUrl,
                    alt: 'User photo',
                  }
                : null
            }
          />

          <Menu onClick={onClick} />
        </Card.Body>
      </Card>
    </div>
  );
}

type MenuActionType = 'test' | 'change' | 'delete';

function Menu({ onClick }: { onClick: (action: MenuActionType) => void }) {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item action onClick={() => onClick('test')}>
        Test face recognition
      </ListGroup.Item>
      <ListGroup.Item action onClick={() => onClick('change')}>
        Change
      </ListGroup.Item>
      <ListGroup.Item action variant="danger" onClick={() => onClick('delete')}>
        Delete
      </ListGroup.Item>
    </ListGroup>
  );
}
