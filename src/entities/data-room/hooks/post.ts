import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';
import { queryClient } from 'shared/lib/query';

import { createDataRoom } from '../api/post';
import { ICreateDataRoomPayload } from '../types/payloads';

export const useCreateDataRoom = () => {
  return useMutation({
    mutationFn: (payload: ICreateDataRoomPayload) => createDataRoom(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_DATA_ROOMS],
      });
    },
  });
};
