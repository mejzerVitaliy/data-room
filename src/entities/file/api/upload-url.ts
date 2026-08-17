import { api } from 'shared/lib/axios';

import {
  ICreateUploadUrlPayload,
  ICreateUploadUrlResult,
} from '../types/payloads';

export const createUploadUrl = async (
  payload: ICreateUploadUrlPayload,
): Promise<{ message: string; data: ICreateUploadUrlResult }> => {
  const response = await api.post('/files/upload-url', payload);

  return response.data;
};
