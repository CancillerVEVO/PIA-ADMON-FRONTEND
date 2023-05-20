import { Stepper } from '../components/Stepper';
import { useTestFaceRec } from '../hooks/useTestFaceRec';

export function FaceDataTestPage() {
  const { error, isLoading, testFaceRec, data } = useTestFaceRec();

  const onFinish = (imageBase64: string) => {
    return testFaceRec({
      imageBase64,
    });
  };

  return (
    <Stepper
      title="Test face recognition"
      lastStepText="Test"
      onFinish={onFinish}
      successMessage="Face recognized!"
      success={Boolean(data)}
      error={error}
      isLoading={isLoading}
    />
  );
}
