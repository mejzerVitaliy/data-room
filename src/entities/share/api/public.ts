import { api } from 'shared/lib/axios';

import { IResourceRef } from '../types/params';
import { IPublicShareResponse } from '../types/responses';

export const enablePublicShare = async (
  payload: IResourceRef,
): Promise<IPublicShareResponse> => {
  const response = await api.put('/shares/public', payload);

  return response.data;
};

export const revokePublicShare = async (
  params: IResourceRef,
): Promise<{ message: string }> => {
  const response = await api.delete('/shares/public', { params });

  return response.data;
};
