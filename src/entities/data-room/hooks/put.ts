import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';
import { queryClient } from 'shared/lib/query';

import { updateDataRoom } from '../api/put';
import { IUpdateDataRoomPayload } from '../types/payloads';

export const useUpdateDataRoom = () => {
  return useMutation({
    mutationFn: ({
      dataRoomId,
      ...payload
    }: IUpdateDataRoomPayload & { dataRoomId: string }) =>
      updateDataRoom(dataRoomId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_DATA_ROOMS],
      });
    },
  });
};
