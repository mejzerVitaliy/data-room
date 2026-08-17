import { api } from 'shared/lib/axios';

import { IUpdateFolderPayload } from '../types/payloads';
import { IFolderResponse } from '../types/responses';

export const updateFolder = async (
  folderId: string,
  payload: IUpdateFolderPayload,
): Promise<IFolderResponse> => {
  const response = await api.patch(`/folders/${folderId}`, payload);

  return response.data;
};
