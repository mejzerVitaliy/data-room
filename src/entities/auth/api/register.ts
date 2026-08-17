import { api } from 'shared/lib/axios';

import { IRegisterPayload } from '../types/payloads';
import { IAuthResponse } from '../types/responses';

export const register = async (
  payload: IRegisterPayload,
): Promise<IAuthResponse> => {
  const response = await api.post('/auth/register', payload);

  return response.data;
};
