import { api } from 'shared/lib/axios';

import { IUpdateDataRoomPayload } from '../types/payloads';
import { IDataRoomResponse } from '../types/responses';

export const updateDataRoom = async (
  dataRoomId: string,
  payload: IUpdateDataRoomPayload,
): Promise<IDataRoomResponse> => {
  const response = await api.patch(`/data-rooms/${dataRoomId}`, payload);

  return response.data;
};
