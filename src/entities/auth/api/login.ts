import { api } from 'shared/lib/axios';

import { ILoginPayload } from '../types/payloads';
import { IAuthResponse } from '../types/responses';

export const login = async (payload: ILoginPayload): Promise<IAuthResponse> => {
  const response = await api.post('/auth/login', payload);

  return response.data;
};
