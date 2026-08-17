import { api } from 'shared/lib/axios';

import { IPaginationParams } from '../types/params';
import {
  ISharedContentsResponse,
  ISharedEntryResponse,
  ISharedFileResponse,
} from '../types/responses';

export const getPublicEntry = async (
  token: string,
  params: IPaginationParams,
  signal?: AbortSignal,
): Promise<ISharedEntryResponse> => {
  const response = await api.get(`/shared/public/${token}`, {
    params,
    signal,
  });

  return response.data;
};

export const getPublicFolder = async (
  { token, folderId }: { token: string; folderId: string },
  params: IPaginationParams,
  signal?: AbortSignal,
): Promise<ISharedContentsResponse> => {
  const response = await api.get(
    `/shared/public/${token}/folders/${folderId}`,
    { params, signal },
  );

  return response.data;
};

export const getPublicFile = async (
  token: string,
  fileId: string,
  signal?: AbortSignal,
): Promise<ISharedFileResponse> => {
  const response = await api.get(`/shared/public/${token}/files/${fileId}`, {
    signal,
  });

  return response.data;
};
