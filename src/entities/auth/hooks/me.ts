import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';

import { getMe } from '../api/me';

export const useMe = () => {
  return useQuery({
    queryKey: [QueryKeys.GET_ME],
    queryFn: ({ signal }) => getMe(signal),
    retry: false,
  });
};
