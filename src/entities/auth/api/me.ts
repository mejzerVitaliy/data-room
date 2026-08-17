import { api } from 'shared/lib/axios';

import { IMeResponse } from '../types/responses';

export const getMe = async (signal?: AbortSignal): Promise<IMeResponse> => {
  const response = await api.get('/auth/me', { signal });

  return response.data;
};
