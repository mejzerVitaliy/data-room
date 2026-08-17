import { api } from 'shared/lib/axios';

import { IResourceRef } from '../types/params';
import { ISharingStateResponse } from '../types/responses';

export const getSharingState = async (
  params: IResourceRef,
  signal?: AbortSignal,
): Promise<ISharingStateResponse> => {
  const response = await api.get('/shares', { params, signal });

  return response.data;
};
