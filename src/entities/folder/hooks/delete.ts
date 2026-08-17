import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';
import { queryClient } from 'shared/lib/query';

import { deleteFolder } from '../api/delete';

export const useDeleteFolder = () => {
  return useMutation({
    mutationFn: (folderId: string) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_FOLDERS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_FILES] });
    },
  });
};
