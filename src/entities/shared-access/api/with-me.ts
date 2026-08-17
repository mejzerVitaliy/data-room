import { api } from 'shared/lib/axios';

import { IPaginationParams } from '../types/params';
import {
  ISharedContentsResponse,
  ISharedFileResponse,
  ISharedWithMeListResponse,
} from '../types/responses';

export const getMyShares = async (
  params: IPaginationParams,
  signal?: AbortSignal,
): Promise<ISharedWithMeListResponse> => {
  const response = await api.get('/shared/with-me', { params, signal });

  return response.data;
};

export const getMySharedDataRoom = async (
  dataRoomId: string,
  params: IPaginationParams,
  signal?: AbortSignal,
): Promise<ISharedContentsResponse> => {
  const response = await api.get(`/shared/with-me/data-rooms/${dataRoomId}`, {
    params,
    signal,
  });

  return response.data;
};

export const getMySharedFolder = async (
  folderId: string,
  params: IPaginationParams,
  signal?: AbortSignal,
): Promise<ISharedContentsResponse> => {
  const response = await api.get(`/shared/with-me/folders/${folderId}`, {
    params,
    signal,
  });

  return response.data;
};

export const getMySharedFile = async (
  fileId: string,
  signal?: AbortSignal,
): Promise<ISharedFileResponse> => {
  const response = await api.get(`/shared/with-me/files/${fileId}`, {
    signal,
  });

  return response.data;
};
