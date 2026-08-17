import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';
import { queryClient } from 'shared/lib/query';

import { deleteDataRoom } from '../api/delete';

export const useDeleteDataRoom = () => {
  return useMutation({
    mutationFn: (dataRoomId: string) => deleteDataRoom(dataRoomId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_DATA_ROOMS],
      });
    },
  });
};
