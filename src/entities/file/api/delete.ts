import { api } from 'shared/lib/axios';

export const deleteFile = async (
  fileId: string,
): Promise<{ message: string }> => {
  const response = await api.delete(`/files/${fileId}`);

  return response.data;
};
