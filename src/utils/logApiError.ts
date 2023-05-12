import { ValidationError } from './getApiError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logApiError(e: any) {
  if (e instanceof ValidationError) {
    console.error(e, e.errors);
  } else {
    console.error(e);
  }
}
