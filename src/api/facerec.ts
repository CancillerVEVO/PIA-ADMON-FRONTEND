import ax from 'axios';

const BASE_URL = 'http://localhost:3004/api';

export const facerec = ax.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
