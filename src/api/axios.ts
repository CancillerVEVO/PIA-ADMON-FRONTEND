import ax from 'axios';

const BASE_URL = 'http://localhost:3004/api';

export const axios = ax.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
