import { api } from 'shared/lib/axios';

import { ICompleteUploadPayload } from '../types/payloads';
import { IFileResponse } from '../types/responses';

export const completeUpload = async (
  payload: ICompleteUploadPayload,
): Promise<IFileResponse> => {
  const response = await api.post('/files', payload);

  return response.data;
};
