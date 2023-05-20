import { useRef, useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Image } from './Image';
import { ErrorMessages } from '@/features/auth/components/ErrorMessages';

export function StepperDelete({
  title,
  onFinish,
  isLoading,
  success,
  error,
  successMessage,
  src: srcProp,
}: {
  title: string;
  onFinish: () => void;
  isLoading?: boolean;
  success?: boolean;
  error?: Error | null;
  successMessage?: string;
  src: string | null;
}) {
  const navigate = useNavigate();

  const ref = useRef<Webcam>(null);
  const [src, setSrc] = useState<string | null>(srcProp);

  const [step, setStep] = useState(0);
  const cancelTexts = ['Cancel'];
  const confirmTexts = ['Delete'];
  const totalSteps = confirmTexts.length;

  const onConfirm = () => {
    onFinish();
  };

  const onCancel = () => {
    navigate(-1);
  };

  let content = (
    <>
      <div
        style={{
          marginBottom: '2rem',
          width: 500,
          height: 500,
          background: 'black',
          borderRadius: '1rem',
        }}
      >
        {src ? (
          <Image
            img={{
              src,
              alt: 'User photo',
            }}
          />
        ) : null}
      </div>

      <Footer
        onCancel={onCancel}
        onConfirm={onConfirm}
        confirmText={confirmTexts[step]}
        cancelText={cancelTexts[step]}
        confirmButtonVariant={step === 0 ? 'success' : 'primary'}
        cancelButtonVariant={step === 0 ? 'danger' : 'warning'}
        isLoading={isLoading}
      />
    </>
  );

  if (success) {
    content = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            marginBottom: '2rem',
            width: 500,
            height: 500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            width={300}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eo_circle_light-green_checkmark.svg/1024px-Eo_circle_light-green_checkmark.svg.png"
          />
        </div>

        <h2
          style={{
            marginBottom: '1rem',
          }}
        >
          {successMessage ?? 'Success!'}
        </h2>

        <Button size="lg" onClick={() => navigate(-1)}>
          Done
        </Button>
      </div>
    );
  }

  if (error) {
    content = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            marginBottom: '2rem',
            width: 500,
            height: 500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            width={300}
            src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/08-512.png"
          />
        </div>

        <ErrorMessages error={error} />

        <Button size="lg" onClick={() => navigate(-1)}>
          Done
        </Button>
      </div>
    );
  }

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
            <h1>{title}</h1>
          </Card.Title>

          {content}
        </Card.Body>
      </Card>
    </div>
  );
}

function Footer(props: {
  onCancel: () => void;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
  confirmButtonVariant?: 'primary' | 'success';
  cancelButtonVariant?: 'danger' | 'warning';
  isLoading?: boolean;
}) {
  const {
    onCancel,
    onConfirm,
    confirmText,
    cancelText,
    confirmButtonVariant,
    cancelButtonVariant,
    isLoading,
  } = props;

  const disabled = !!isLoading;

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      <Button
        style={{
          flex: 1,
        }}
        variant={cancelButtonVariant}
        size="lg"
        onClick={onCancel}
        disabled={disabled}
      >
        {cancelText}
      </Button>
      <Button
        style={{
          flex: 1,
          position: 'relative',
        }}
        variant={confirmButtonVariant}
        size="lg"
        onClick={onConfirm}
        disabled={disabled}
      >
        {confirmText}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: isLoading ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner />
        </div>
      </Button>
    </div>
  );
}
