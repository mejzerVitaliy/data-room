import { api } from 'shared/lib/axios';

import { IGetDataRoomsParams } from '../types/params';
import {
  IDataRoomResponse,
  IDataRoomsResponse,
  IDeletePreviewResponse,
} from '../types/responses';

export const getDataRooms = async (
  params: IGetDataRoomsParams,
  signal?: AbortSignal,
): Promise<IDataRoomsResponse> => {
  const response = await api.get('/data-rooms', { params, signal });

  return response.data;
};

export const getDataRoom = async (
  dataRoomId: string,
  signal?: AbortSignal,
): Promise<IDataRoomResponse> => {
  const response = await api.get(`/data-rooms/${dataRoomId}`, { signal });

  return response.data;
};

export const getDataRoomDeletePreview = async (
  dataRoomId: string,
  signal?: AbortSignal,
): Promise<IDeletePreviewResponse> => {
  const response = await api.get(`/data-rooms/${dataRoomId}/delete-preview`, {
    signal,
  });

  return response.data;
};
