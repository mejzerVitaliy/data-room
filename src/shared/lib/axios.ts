import axios, { InternalAxiosRequestConfig } from 'axios';
import { env } from 'env';

const UNAUTHORIZED_STATUS = 401;
const REFRESH_URL = '/auth/refresh';

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  isRetryAfterRefresh?: boolean;
};

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshPromise: Promise<unknown> | null = null;

const refreshAccessToken = () => {
  refreshPromise ??= api.post(REFRESH_URL).finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
};

api.interceptors.response.use(
  response => response,
  async error => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const isUnauthorized = error.response?.status === UNAUTHORIZED_STATUS;
    const isRefreshCall = originalRequest?.url === REFRESH_URL;

    if (
      !isUnauthorized ||
      isRefreshCall ||
      !originalRequest ||
      originalRequest.isRetryAfterRefresh
    ) {
      return Promise.reject(error);
    }

    originalRequest.isRetryAfterRefresh = true;

    try {
      await refreshAccessToken();

      return await api(originalRequest);
    } catch {
      return Promise.reject(error);
    }
  },
);
