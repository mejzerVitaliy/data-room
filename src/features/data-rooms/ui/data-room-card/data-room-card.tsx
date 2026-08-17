'use client';

import Link from 'next/link';

import { IDataRoom } from 'entities/data-room/types/responses';
import { Folder, MoreVertical, Pencil, Share2, Trash2 } from 'lucide-react';

import { formatDate } from 'shared/lib/format';
import { Button } from 'shared/ui/button';
import { Card } from 'shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui/dropdown-menu';

type Props = {
  dataRoom: IDataRoom;
  onRename: (dataRoom: IDataRoom) => void;
  onShare: (dataRoom: IDataRoom) => void;
  onDelete: (dataRoom: IDataRoom) => void;
};

export const DataRoomCard = ({
  dataRoom,
  onRename,
  onShare,
  onDelete,
}: Props) => {
  return (
    <Card className="group relative flex flex-col gap-3 p-4 transition-colors hover:border-foreground/20">
      <Link href={`/data-rooms/${dataRoom.id}`} className="flex flex-col gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
          <Folder className="size-5 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{dataRoom.name}</p>
          <p className="text-xs text-muted-foreground">
            Updated {formatDate(dataRoom.updatedAt)}
          </p>
        </div>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 size-7 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
            aria-label={`Actions for ${dataRoom.name}`}
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onShare(dataRoom)}>
            <Share2 className="mr-2 size-4" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRename(dataRoom)}>
            <Pencil className="mr-2 size-4" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(dataRoom)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
};
