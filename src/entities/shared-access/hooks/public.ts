import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';

import { getPublicEntry, getPublicFile, getPublicFolder } from '../api/public';
import { IPaginationParams } from '../types/params';

export const useGetPublicEntry = (
  token: string,
  params: IPaginationParams,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [QueryKeys.GET_SHARED_ACCESS, 'public-entry', token, params],
    queryFn: ({ signal }) => getPublicEntry(token, params, signal),
    retry: false,
    enabled,
  });
};

export const useGetPublicFolder = (
  { token, folderId }: { token: string; folderId: string },
  params: IPaginationParams,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [
      QueryKeys.GET_SHARED_ACCESS,
      'public-folder',
      token,
      folderId,
      params,
    ],
    queryFn: ({ signal }) =>
      getPublicFolder({ token, folderId }, params, signal),
    retry: false,
    enabled,
  });
};

export const useGetPublicFile = (
  token: string,
  fileId: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [QueryKeys.GET_SHARED_ACCESS, 'public-file', token, fileId],
    queryFn: ({ signal }) => getPublicFile(token, fileId, signal),
    retry: false,
    enabled,
  });
};
