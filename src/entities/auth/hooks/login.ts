import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';
import { queryClient } from 'shared/lib/query';

import { login } from '../api/login';
import { ILoginPayload } from '../types/payloads';

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: ILoginPayload) => login(payload),
    onSuccess: response => {
      queryClient.setQueryData([QueryKeys.GET_ME], {
        message: response.message,
        data: { user: response.data.user },
      });
    },
  });
};
