import { api } from 'shared/lib/axios';

import { ICreateFolderPayload } from '../types/payloads';
import { IFolderResponse } from '../types/responses';

export const createFolder = async (
  payload: ICreateFolderPayload,
): Promise<IFolderResponse> => {
  const response = await api.post('/folders', payload);

  return response.data;
};
