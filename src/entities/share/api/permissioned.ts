import { api } from 'shared/lib/axios';

import { IResourceRef } from '../types/params';
import { ISetPermissionedGranteesPayload } from '../types/payloads';
import { IPermissionedShareResponse } from '../types/responses';

export const setPermissionedGrantees = async (
  payload: ISetPermissionedGranteesPayload,
): Promise<IPermissionedShareResponse> => {
  const response = await api.put('/shares/permissioned', payload);

  return response.data;
};

export const revokePermissionedShare = async (
  params: IResourceRef,
): Promise<{ message: string }> => {
  const response = await api.delete('/shares/permissioned', { params });

  return response.data;
};
