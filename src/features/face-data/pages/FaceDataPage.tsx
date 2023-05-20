import { useUserContext } from '@/features/auth';
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
      <Card
        style={{
          position: 'relative',
        }}
      >
        <img
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            cursor: 'pointer',
          }}
          onClick={() => navigate(-1)}
          src="https://icon-library.com/images/close-icon/close-icon-10.jpg"
          width={50}
        />
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
  const { user } = useUserContext();

  return (
    <ListGroup variant="flush">
      <ListGroup.Item
        disabled={!user.imageUrl}
        action
        onClick={() => onClick('test')}
      >
        Test face recognition
      </ListGroup.Item>
      <ListGroup.Item action onClick={() => onClick('change')}>
        Change
      </ListGroup.Item>
      <ListGroup.Item
        action
        variant="danger"
        disabled={!user.imageUrl}
        onClick={() => onClick('delete')}
      >
        Delete
      </ListGroup.Item>
    </ListGroup>
  );
}
