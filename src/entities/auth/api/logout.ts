import { api } from 'shared/lib/axios';

export const logout = async (): Promise<{ message: string }> => {
  const response = await api.post('/auth/logout');

  return response.data;
};
