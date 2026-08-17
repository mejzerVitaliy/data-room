import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';

import { getFolder, getFolderDeletePreview, getFolders } from '../api/get';
import { IGetFoldersParams } from '../types/params';

export const useGetFolders = (
  params: IGetFoldersParams,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [QueryKeys.GET_FOLDERS, params],
    queryFn: ({ signal }) => getFolders(params, signal),
    enabled,
  });
};

export const useGetFolder = (folderId: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_FOLDERS, folderId],
    queryFn: ({ signal }) => getFolder(folderId, signal),
  });
};

export const useGetFolderDeletePreview = (
  folderId: string,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: [QueryKeys.GET_FOLDERS, folderId, 'delete-preview'],
    queryFn: ({ signal }) => getFolderDeletePreview(folderId, signal),
    enabled,
  });
};
