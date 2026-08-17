import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';
import { queryClient } from 'shared/lib/query';

import { updateFolder } from '../api/put';
import { IUpdateFolderPayload } from '../types/payloads';

export const useUpdateFolder = () => {
  return useMutation({
    mutationFn: ({
      folderId,
      ...payload
    }: IUpdateFolderPayload & { folderId: string }) =>
      updateFolder(folderId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_FOLDERS] });
    },
  });
};
