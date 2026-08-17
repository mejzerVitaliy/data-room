import { api } from 'shared/lib/axios';

import { IUpdateFilePayload } from '../types/payloads';
import { IFileResponse } from '../types/responses';

export const updateFile = async (
  fileId: string,
  payload: IUpdateFilePayload,
): Promise<IFileResponse> => {
  const response = await api.patch(`/files/${fileId}`, payload);

  return response.data;
};
