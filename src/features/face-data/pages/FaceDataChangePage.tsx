import { useState } from 'react';
import { Stepper } from '../components/Stepper';

export function FaceDataChangePage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <Stepper
      title="Change face data"
      lastStepText="Change"
      onFinish={() => {
        setIsLoading(true);
        setTimeout(() => {
          setData({ name: 'Test' });
          setIsLoading(false);
        }, 3000);
      }}
      successMessage="Face data changed!"
      success={data}
      error={error}
      isLoading={isLoading}
    />
  );
}
