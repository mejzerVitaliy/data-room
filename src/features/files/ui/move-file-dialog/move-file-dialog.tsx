'use client';

import { useEffect, useState } from 'react';

import { useUpdateFile } from 'entities/file/hooks/put';
import { IFile } from 'entities/file/types/responses';
import { useGetFolders } from 'entities/folder/hooks/get';
import { ArrowUp, Folder } from 'lucide-react';
import { toast } from 'sonner';

import { getErrorMessage } from 'shared/lib/errors';
import { Button } from 'shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'shared/ui/dialog';
import { Skeleton } from 'shared/ui/skeleton';

type Props = {
  file: IFile | null;
  onOpenChange: (open: boolean) => void;
};

const PER_PAGE = 100;
const GRANDPARENT_OFFSET = 2;

export const MoveFileDialog = ({ file, onOpenChange }: Props) => {
  const [browsingFolderId, setBrowsingFolderId] = useState<string | null>(null);
  const updateFile = useUpdateFile();

  useEffect(() => {
    setBrowsingFolderId(file?.folderId ?? null);
  }, [file]);

  const foldersQuery = useGetFolders(
    {
      dataRoomId: file?.dataRoomId ?? '',
      parentId: browsingFolderId ?? undefined,
      perPage: PER_PAGE,
    },
    Boolean(file),
  );

  const breadcrumbs = foldersQuery.data?.data.breadcrumbs ?? [];
  const parentId =
    breadcrumbs.length > 1
      ? breadcrumbs[breadcrumbs.length - GRANDPARENT_OFFSET].id
      : null;
  const locationLabel =
    breadcrumbs.length > 0
      ? breadcrumbs[breadcrumbs.length - 1].name
      : 'Data Room root';

  const onConfirm = () => {
    if (!file) {
      return;
    }

    if (browsingFolderId === file.folderId) {
      onOpenChange(false);

      return;
    }

    updateFile.mutate(
      { fileId: file.id, folderId: browsingFolderId },
      {
        onSuccess: () => {
          toast.success('File moved');
          onOpenChange(false);
        },
        onError: error => toast.error(getErrorMessage(error)),
      },
    );
  };

  return (
    <Dialog open={Boolean(file)} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move &ldquo;{file?.name}&rdquo;</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Current location:{' '}
            <span className="text-foreground">{locationLabel}</span>
          </p>

          <div className="max-h-64 overflow-y-auto rounded-md border border-border">
            {browsingFolderId !== null && (
              <button
                type="button"
                onClick={() => setBrowsingFolderId(parentId)}
                className="flex w-full items-center gap-2 border-b border-border px-3 py-2 text-left text-sm hover:bg-accent"
              >
                <ArrowUp className="size-4 text-muted-foreground" />
                ..
              </button>
            )}

            {foldersQuery.isPending && (
              <div className="space-y-1 p-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            )}

            {foldersQuery.data?.data.folders.map(folder => (
              <button
                key={folder.id}
                type="button"
                onClick={() => setBrowsingFolderId(folder.id)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
              >
                <Folder className="size-4 text-muted-foreground" />
                {folder.name}
              </button>
            ))}

            {foldersQuery.data?.data.folders.length === 0 && (
              <p className="p-4 text-center text-sm text-muted-foreground">
                No subfolders here
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={onConfirm}
            disabled={updateFile.isPending || foldersQuery.isPending}
          >
            {updateFile.isPending ? 'Moving…' : `Move to ${locationLabel}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
