import axios from 'axios';

import { type ApiErrorResponse } from '@/types/api';

export const axiosInstance = axios.create({
  baseURL: process.env.AXIOS_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => {
    const { data } = response;
    if (data.success) {
      return data.data;
    }
    return Promise.reject(data as ApiErrorResponse);
  },
  error => {
    if (error.response?.data) {
      const errorData = error.response.data as ApiErrorResponse;
      return Promise.reject(errorData);
    }
    return Promise.reject({
      success: false,
      statusCode: 500,
      data: {
        message: 'Network error occurred.',
        path: '',
        timestamp: new Date().toISOString(),
      },
    } satisfies ApiErrorResponse);
  }
);
