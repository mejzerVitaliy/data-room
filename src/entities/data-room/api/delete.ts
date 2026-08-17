import { api } from 'shared/lib/axios';

export const deleteDataRoom = async (
  dataRoomId: string,
): Promise<{ message: string }> => {
  const response = await api.delete(`/data-rooms/${dataRoomId}`);

  return response.data;
};
