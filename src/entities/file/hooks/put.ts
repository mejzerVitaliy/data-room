import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';
import { queryClient } from 'shared/lib/query';

import { updateFile } from '../api/put';
import { IUpdateFilePayload } from '../types/payloads';

export const useUpdateFile = () => {
  return useMutation({
    mutationFn: ({
      fileId,
      ...payload
    }: IUpdateFilePayload & { fileId: string }) => updateFile(fileId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_FILES] });
    },
  });
};
