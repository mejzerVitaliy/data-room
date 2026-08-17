import { api } from 'shared/lib/axios';

import { IGetFilesParams } from '../types/params';
import { IFilesResponse } from '../types/responses';

export const getFiles = async (
  params: IGetFilesParams,
  signal?: AbortSignal,
): Promise<IFilesResponse> => {
  const response = await api.get('/files', { params, signal });

  return response.data;
};
