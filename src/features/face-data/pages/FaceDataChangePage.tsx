import { Stepper } from '../components/Stepper';
import { useUploadFace } from '../hooks/useUploadFace';

export function FaceDataChangePage() {
  const { error, isLoading, uploadFace, data } = useUploadFace();

  const onFinish = (imageBase64: string) => {
    return uploadFace({
      imageBase64,
    });
  };

  return (
    <Stepper
      title="Change face data"
      lastStepText="Change"
      onFinish={onFinish}
      successMessage="Face data changed!"
      success={Boolean(data)}
      error={error}
      isLoading={isLoading}
    />
  );
}
