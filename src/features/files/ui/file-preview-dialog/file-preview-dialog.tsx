'use client';

import { useGetFile } from 'entities/file/hooks/get';

import { formatBytes } from 'shared/lib/format';
import { Dialog, DialogContent, DialogTitle } from 'shared/ui/dialog';
import { Skeleton } from 'shared/ui/skeleton';

type Props = {
  fileId: string | null;
  onOpenChange: (open: boolean) => void;
};

export const FilePreviewDialog = ({ fileId, onOpenChange }: Props) => {
  const { data, isPending, isError } = useGetFile(
    fileId ?? '',
    fileId !== null,
  );

  return (
    <Dialog open={fileId !== null} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[85vh] max-w-4xl flex-col gap-0 p-0">
        <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-3">
          <div className="min-w-0">
            <DialogTitle className="truncate text-sm font-medium">
              {data?.data.file.name ?? 'Loading…'}
            </DialogTitle>
            {data && (
              <p className="text-xs text-muted-foreground">
                {formatBytes(data.data.file.sizeBytes)}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-muted">
          {isPending && <Skeleton className="size-full rounded-none" />}
          {isError && (
            <div className="flex size-full items-center justify-center">
              <p className="text-sm text-muted-foreground">
                This file could not be loaded.
              </p>
            </div>
          )}
          {data && (
            <iframe
              src={data.data.viewUrl}
              title={data.data.file.name}
              className="size-full border-0"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
