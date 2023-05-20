import { useUserContext } from '@/features/auth';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Image } from '../components/Image';
import { useFaceDataDelete } from '../hooks/useFaceDataDelete';
import { StepperDelete } from '../components/StepperDelete';

export function FaceDataDeletePage() {
  const { user } = useUserContext();
  const { error, isLoading, deleteFaceData, data } = useFaceDataDelete();

  return (
    <StepperDelete
      src={user.imageUrl}
      title="Delete Face Data"
      onFinish={() => {
        deleteFaceData();
      }}
      isLoading={isLoading}
      success={Boolean(data)}
      error={error}
      successMessage="Face data deleted successfully"
    />
  );
}
