import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { queryClient } from 'shared/lib/query';

import { logout } from '../api/logout';

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      router.push('/login');
    },
  });
};
