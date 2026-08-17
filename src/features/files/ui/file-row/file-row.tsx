'use client';

import { IFile } from 'entities/file/types/responses';
import {
  FileText,
  FolderInput,
  MoreVertical,
  Pencil,
  Share2,
  Trash2,
} from 'lucide-react';

import { formatBytes, formatDate } from 'shared/lib/format';
import { Button } from 'shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui/dropdown-menu';

type Props = {
  file: IFile;
  onView: (file: IFile) => void;
  onRename: (file: IFile) => void;
  onMove: (file: IFile) => void;
  onShare: (file: IFile) => void;
  onDelete: (file: IFile) => void;
};

export const FileRow = ({
  file,
  onView,
  onRename,
  onMove,
  onShare,
  onDelete,
}: Props) => {
  return (
    <div className="group flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent/60">
      <button
        type="button"
        onClick={() => onView(file)}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <FileText className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate text-sm">{file.name}</span>
      </button>
      <span className="shrink-0 text-xs text-muted-foreground">
        {formatBytes(file.sizeBytes)}
      </span>
      <span className="w-20 shrink-0 text-right text-xs text-muted-foreground">
        {formatDate(file.updatedAt)}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
            aria-label={`Actions for ${file.name}`}
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onShare(file)}>
            <Share2 className="mr-2 size-4" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRename(file)}>
            <Pencil className="mr-2 size-4" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onMove(file)}>
            <FolderInput className="mr-2 size-4" />
            Move
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(file)}
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
