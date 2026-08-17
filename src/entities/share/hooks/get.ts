import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';

import { getSharingState } from '../api/get';
import { IResourceRef } from '../types/params';

export const useGetSharingState = (ref: IResourceRef, enabled: boolean) => {
  return useQuery({
    queryKey: [QueryKeys.GET_SHARES, ref],
    queryFn: ({ signal }) => getSharingState(ref, signal),
    enabled,
  });
};
