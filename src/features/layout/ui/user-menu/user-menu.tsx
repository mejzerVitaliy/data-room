'use client';

import { useLogout } from 'entities/auth/hooks/logout';
import { useMe } from 'entities/auth/hooks/me';
import { LogOut } from 'lucide-react';

import { Avatar, AvatarFallback } from 'shared/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'shared/ui/dropdown-menu';
import { Skeleton } from 'shared/ui/skeleton';

const MAX_INITIALS = 2;

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, MAX_INITIALS)
    .map(part => part[0]?.toUpperCase())
    .join('');

export const UserMenu = () => {
  const { data, isPending } = useMe();
  const { mutate: logout } = useLogout();

  if (isPending || !data) {
    return <Skeleton className="size-8 rounded-full" />;
  }

  const { user } = data.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full outline-none ring-ring ring-offset-2 ring-offset-background focus-visible:ring-2">
        <Avatar className="size-8">
          <AvatarFallback className="bg-secondary text-xs font-medium">
            {getInitials(user.name) || user.email[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="truncate text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()} className="text-destructive">
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
