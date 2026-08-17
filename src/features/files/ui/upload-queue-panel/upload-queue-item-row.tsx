'use client';

import { useState } from 'react';

import { AlertCircle, CheckCircle2, FileText, X } from 'lucide-react';

import { useUploadFiles } from 'features/files/hooks/use-upload-files';
import { suggestAlternateName } from 'shared/lib/suggest-name';
import {
  UploadQueueItem,
  UploadStatus,
  useUploadQueueStore,
} from 'shared/store/upload-queue';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import { Progress } from 'shared/ui/progress';

type Props = {
  queueItem: UploadQueueItem;
};

export const UploadQueueItemRow = ({ queueItem }: Props) => {
  const removeItem = useUploadQueueStore(state => state.removeItem);
  const { retryWithName } = useUploadFiles();
  const [draftName, setDraftName] = useState(() =>
    suggestAlternateName(queueItem.name),
  );

  const isError = queueItem.status === UploadStatus.Error;
  const isSuccess = queueItem.status === UploadStatus.Success;

  return (
    <div className="space-y-2 border-b border-border/60 px-4 py-3 last:border-b-0">
      <div className="flex items-center gap-2">
        {isSuccess && <CheckCircle2 className="size-4 shrink-0 text-success" />}
        {isError && (
          <AlertCircle className="size-4 shrink-0 text-destructive" />
        )}
        {!isSuccess && !isError && (
          <FileText className="size-4 shrink-0 text-muted-foreground" />
        )}
        <span className="min-w-0 flex-1 truncate text-sm">
          {queueItem.name}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 shrink-0"
          aria-label={`Dismiss ${queueItem.name}`}
          onClick={() => removeItem(queueItem.id)}
        >
          <X className="size-3.5" />
        </Button>
      </div>

      {!isError && !isSuccess && (
        <Progress value={queueItem.progress} className="h-1.5" />
      )}

      {isError && (
        <div className="space-y-1.5">
          <p className="text-xs text-destructive">{queueItem.errorMessage}</p>
          <div className="flex gap-1.5">
            <Input
              value={draftName}
              onChange={event => setDraftName(event.target.value)}
              className="h-7 text-xs"
            />
            <Button
              size="sm"
              className="h-7 shrink-0 px-2 text-xs"
              onClick={() => retryWithName(queueItem, draftName)}
            >
              Retry
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
