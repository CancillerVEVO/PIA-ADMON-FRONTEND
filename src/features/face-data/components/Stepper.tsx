import { useRef, useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Image } from './Image';
import { ErrorMessages } from '@/features/auth/components/ErrorMessages';

export function Stepper({
  title,
  lastStepText,
  onFinish,
  isLoading,
  success,
  error,
  successMessage,
  fileBrowserDisabled,
}: {
  title: string;
  lastStepText: string;
  onFinish: (imageBase64: string) => void;
  isLoading?: boolean;
  success?: boolean;
  error?: Error | null;
  successMessage?: string;
  fileBrowserDisabled?: boolean;
}) {
  const navigate = useNavigate();

  const ref = useRef<Webcam>(null);
  const [src, setSrc] = useState<string | null>(null);

  const onChageInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      setSrc(e.target?.result as string);
    };

    reader.readAsDataURL(file);

    e.target.value = '';

    setStep((s) => (s + 1 < totalSteps ? s + 1 : s));
  };

  const [step, setStep] = useState(0);
  const cancelTexts = ['Cancel', 'Retake photo'];
  const confirmTexts = ['Take photo', lastStepText];
  const totalSteps = confirmTexts.length;

  const takePhoto = () => {
    if (ref.current) {
      const newSrc = ref.current.getScreenshot();
      setSrc(newSrc);
    }
  };

  const onConfirm = () => {
    switch (step) {
      case 0:
        takePhoto();
        break;
      case 1:
        if (src) onFinish(src);
        break;
    }

    setStep((s) => (s + 1 < totalSteps ? s + 1 : s));
  };

  const onCancel = () => {
    switch (step) {
      case 0:
        navigate(-1);
        break;
      case 1:
        setSrc(null);
        takePhoto();
        break;
    }

    setStep((s) => (s - 1 >= 0 ? s - 1 : s));
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
              alt: 'Taken user photo',
            }}
          />
        ) : (
          <Webcam
            style={{
              width: '100%',
              height: '100%',
            }}
            ref={ref}
            screenshotFormat="image/jpeg"
          />
        )}
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
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={onChageInputFile}
              disabled={fileBrowserDisabled}
              style={{
                display: fileBrowserDisabled ? 'none' : 'inline',
              }}
            />
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
