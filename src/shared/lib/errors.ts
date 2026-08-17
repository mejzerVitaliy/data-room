import axios from 'axios';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? DEFAULT_ERROR_MESSAGE;
  }

  return DEFAULT_ERROR_MESSAGE;
};
