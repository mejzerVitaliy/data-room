import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';

import {
  getDataRoom,
  getDataRoomDeletePreview,
  getDataRooms,
} from '../api/get';
import { IGetDataRoomsParams } from '../types/params';

export const useGetDataRooms = (params: IGetDataRoomsParams) => {
  return useQuery({
    queryKey: [QueryKeys.GET_DATA_ROOMS, params],
    queryFn: ({ signal }) => getDataRooms(params, signal),
  });
};

export const useGetDataRoom = (dataRoomId: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_DATA_ROOMS, dataRoomId],
    queryFn: ({ signal }) => getDataRoom(dataRoomId, signal),
  });
};

export const useGetDataRoomDeletePreview = (
  dataRoomId: string,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: [QueryKeys.GET_DATA_ROOMS, dataRoomId, 'delete-preview'],
    queryFn: ({ signal }) => getDataRoomDeletePreview(dataRoomId, signal),
    enabled,
  });
};
