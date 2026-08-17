'use client';

import Link from 'next/link';

import { IFolder } from 'entities/folder/types/responses';
import { Folder, MoreVertical, Pencil, Share2, Trash2 } from 'lucide-react';

import { formatDate } from 'shared/lib/format';
import { Button } from 'shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui/dropdown-menu';

type Props = {
  folder: IFolder;
  href: string;
  onRename: (folder: IFolder) => void;
  onShare: (folder: IFolder) => void;
  onDelete: (folder: IFolder) => void;
};

export const FolderRow = ({
  folder,
  href,
  onRename,
  onShare,
  onDelete,
}: Props) => {
  return (
    <div className="group flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent/60">
      <Link href={href} className="flex min-w-0 flex-1 items-center gap-3">
        <Folder className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate text-sm font-medium">{folder.name}</span>
      </Link>
      <span className="shrink-0 text-xs text-muted-foreground">
        {formatDate(folder.updatedAt)}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
            aria-label={`Actions for ${folder.name}`}
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onShare(folder)}>
            <Share2 className="mr-2 size-4" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRename(folder)}>
            <Pencil className="mr-2 size-4" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(folder)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
