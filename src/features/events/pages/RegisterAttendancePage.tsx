import { Stepper } from '@/features/face-data';
import { useRegisterAttendance } from '../hooks/useRegisterAttendance';
import { useParams } from 'react-router-dom';

export function RegisterAttendancePage() {
  const { eventId } = useParams();
  const { error, isLoading, registerAttendance, data } =
    useRegisterAttendance();

  const onFinish = (imageBase64: string) => {
    if (!eventId) {
      return;
    }

    return registerAttendance(eventId, {
      imageBase64,
    });
  };

  return (
    <Stepper
      title="Register attendance"
      lastStepText="Register attendance"
      onFinish={onFinish}
      successMessage="Attendance registered successfully"
      success={Boolean(data)}
      error={error}
      isLoading={isLoading}
    />
  );
}
