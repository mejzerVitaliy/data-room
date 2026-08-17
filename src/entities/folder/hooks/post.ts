import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';
import { queryClient } from 'shared/lib/query';

import { createFolder } from '../api/post';
import { ICreateFolderPayload } from '../types/payloads';

export const useCreateFolder = () => {
  return useMutation({
    mutationFn: (payload: ICreateFolderPayload) => createFolder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_FOLDERS] });
    },
  });
};
