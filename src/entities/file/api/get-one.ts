import { api } from 'shared/lib/axios';

import { IFileWithViewUrlResponse } from '../types/responses';

export const getFile = async (
  fileId: string,
  signal?: AbortSignal,
): Promise<IFileWithViewUrlResponse> => {
  const response = await api.get(`/files/${fileId}`, { signal });

  return response.data;
};
