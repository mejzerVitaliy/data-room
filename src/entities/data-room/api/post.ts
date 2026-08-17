import { api } from 'shared/lib/axios';

import { ICreateDataRoomPayload } from '../types/payloads';
import { IDataRoomResponse } from '../types/responses';

export const createDataRoom = async (
  payload: ICreateDataRoomPayload,
): Promise<IDataRoomResponse> => {
  const response = await api.post('/data-rooms', payload);

  return response.data;
};
