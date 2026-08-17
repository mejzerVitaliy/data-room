import { api } from 'shared/lib/axios';

export const deleteFolder = async (
  folderId: string,
): Promise<{ message: string }> => {
  const response = await api.delete(`/folders/${folderId}`);

  return response.data;
};
