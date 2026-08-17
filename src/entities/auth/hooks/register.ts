import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants/query-keys';
import { queryClient } from 'shared/lib/query';

import { register } from '../api/register';
import { IRegisterPayload } from '../types/payloads';

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: IRegisterPayload) => register(payload),
    onSuccess: response => {
      queryClient.setQueryData([QueryKeys.GET_ME], {
        message: response.message,
        data: { user: response.data.user },
      });
    },
  });
};
