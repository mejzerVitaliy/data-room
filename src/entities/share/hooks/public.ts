import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';
import { queryClient } from 'shared/lib/query';

import { enablePublicShare, revokePublicShare } from '../api/public';
import { IResourceRef } from '../types/params';

export const useEnablePublicShare = () => {
  return useMutation({
    mutationFn: (payload: IResourceRef) => enablePublicShare(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_SHARES] });
    },
  });
};

export const useRevokePublicShare = () => {
  return useMutation({
    mutationFn: (params: IResourceRef) => revokePublicShare(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_SHARES] });
    },
  });
};
