export interface ValidationErrorItem {
  path: string[];
  message: string;
}

export class ValidationError extends Error {
  errors: ValidationErrorItem[];

  constructor(message: string, errors: ValidationErrorItem[]) {
    super(message);
    this.errors = errors;
    this.name = 'ValidationError';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getApiError(e: any): Error {
  if (e.response) {
    const data = e.response.data;

    if (data.message) {
      const message = data.message;

      if (typeof message === 'string') {
        return new Error(message);
      } else if (message instanceof Array) {
        return new ValidationError(
          'Ha ocurrido un error de validación.',
          message
        );
      }
    }
  }

  if (e instanceof Error) return new Error(e.message);

  return new Error('Ha ocurrido un error inesperado.');
}
