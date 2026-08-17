import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';
import { queryClient } from 'shared/lib/query';

import {
  revokePermissionedShare,
  setPermissionedGrantees,
} from '../api/permissioned';
import { IResourceRef } from '../types/params';
import { ISetPermissionedGranteesPayload } from '../types/payloads';

export const useSetPermissionedGrantees = () => {
  return useMutation({
    mutationFn: (payload: ISetPermissionedGranteesPayload) =>
      setPermissionedGrantees(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_SHARES] });
    },
  });
};

export const useRevokePermissionedShare = () => {
  return useMutation({
    mutationFn: (params: IResourceRef) => revokePermissionedShare(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_SHARES] });
    },
  });
};
