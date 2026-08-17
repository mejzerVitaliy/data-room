import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';

import {
  getMySharedDataRoom,
  getMySharedFile,
  getMySharedFolder,
  getMyShares,
} from '../api/with-me';
import { IPaginationParams } from '../types/params';

export const useGetMyShares = (params: IPaginationParams) => {
  return useQuery({
    queryKey: [QueryKeys.GET_SHARED_ACCESS, 'with-me', params],
    queryFn: ({ signal }) => getMyShares(params, signal),
  });
};

export const useGetMySharedDataRoom = (
  dataRoomId: string,
  params: IPaginationParams,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [
      QueryKeys.GET_SHARED_ACCESS,
      'with-me-data-room',
      dataRoomId,
      params,
    ],
    queryFn: ({ signal }) => getMySharedDataRoom(dataRoomId, params, signal),
    retry: false,
    enabled,
  });
};

export const useGetMySharedFolder = (
  folderId: string,
  params: IPaginationParams,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [QueryKeys.GET_SHARED_ACCESS, 'with-me-folder', folderId, params],
    queryFn: ({ signal }) => getMySharedFolder(folderId, params, signal),
    retry: false,
    enabled,
  });
};

export const useGetMySharedFile = (fileId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QueryKeys.GET_SHARED_ACCESS, 'with-me-file', fileId],
    queryFn: ({ signal }) => getMySharedFile(fileId, signal),
    retry: false,
    enabled,
  });
};
