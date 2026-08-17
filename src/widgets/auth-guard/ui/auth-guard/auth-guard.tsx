'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useMe } from 'entities/auth/hooks/me';

import { Skeleton } from 'shared/ui/skeleton';

const LOGIN_PATH = '/login';
const DATA_ROOMS_PATH = '/data-rooms';

type Props = {
  mode: 'require-auth' | 'require-guest';
  children: ReactNode;
};

export const AuthGuard = ({ mode, children }: Props) => {
  const router = useRouter();
  const { data, isPending, isError } = useMe();
  const isAuthenticated = Boolean(data) && !isError;

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (mode === 'require-auth' && !isAuthenticated) {
      router.replace(LOGIN_PATH);
    }

    if (mode === 'require-guest' && isAuthenticated) {
      router.replace(DATA_ROOMS_PATH);
    }
  }, [isPending, isAuthenticated, mode, router]);

  if (mode === 'require-guest') {
    return children;
  }

  if (isPending) {
    return (
      <div className="space-y-4 py-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};
