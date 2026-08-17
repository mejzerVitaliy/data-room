import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';

import { getFiles } from '../api/get';
import { getFile } from '../api/get-one';
import { IGetFilesParams } from '../types/params';

export const useGetFiles = (params: IGetFilesParams) => {
  return useQuery({
    queryKey: [QueryKeys.GET_FILES, params],
    queryFn: ({ signal }) => getFiles(params, signal),
  });
};

export const useGetFile = (fileId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QueryKeys.GET_FILES, fileId],
    queryFn: ({ signal }) => getFile(fileId, signal),
    enabled,
  });
};
