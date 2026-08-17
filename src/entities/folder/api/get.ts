import { api } from 'shared/lib/axios';

import { IGetFoldersParams } from '../types/params';
import {
  IDeletePreviewResponse,
  IFolderResponse,
  IFoldersResponse,
} from '../types/responses';

export const getFolders = async (
  params: IGetFoldersParams,
  signal?: AbortSignal,
): Promise<IFoldersResponse> => {
  const response = await api.get('/folders', { params, signal });

  return response.data;
};

export const getFolder = async (
  folderId: string,
  signal?: AbortSignal,
): Promise<IFolderResponse> => {
  const response = await api.get(`/folders/${folderId}`, { signal });

  return response.data;
};

export const getFolderDeletePreview = async (
  folderId: string,
  signal?: AbortSignal,
): Promise<IDeletePreviewResponse> => {
  const response = await api.get(`/folders/${folderId}/delete-preview`, {
    signal,
  });

  return response.data;
};
