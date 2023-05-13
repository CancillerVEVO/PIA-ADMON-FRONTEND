import { useState } from 'react';
import { Stepper } from '../components/Stepper';

export function FaceDataTestPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <Stepper
      title="Test face recognition"
      lastStepText="Test"
      onFinish={() => {
        setIsLoading(true);
        setTimeout(() => {
          setData({ name: 'Test' });
          setIsLoading(false);
        }, 3000);
      }}
      successMessage="Face recognized!"
      success={data}
      error={error}
      isLoading={isLoading}
    />
  );
}
