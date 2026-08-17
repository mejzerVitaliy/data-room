'use client';

import { useState } from 'react';

import { ChevronDown, ChevronUp, X } from 'lucide-react';

import { UploadQueueItemRow } from 'features/files/ui/upload-queue-panel/upload-queue-item-row';
import { UploadStatus, useUploadQueueStore } from 'shared/store/upload-queue';
import { Button } from 'shared/ui/button';
import { Card } from 'shared/ui/card';

export const UploadQueuePanel = () => {
  const items = useUploadQueueStore(state => state.items);
  const clearFinished = useUploadQueueStore(state => state.clearFinished);
  const [collapsed, setCollapsed] = useState(false);

  if (items.length === 0) {
    return null;
  }

  const activeCount = items.filter(
    queueItem =>
      queueItem.status === UploadStatus.Uploading ||
      queueItem.status === UploadStatus.Processing,
  ).length;

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 overflow-hidden py-0 shadow-xl">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <p className="text-sm font-medium">
          {activeCount > 0
            ? `Uploading ${activeCount} file${activeCount === 1 ? '' : 's'}`
            : 'Uploads complete'}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-6"
            aria-label={collapsed ? 'Expand' : 'Collapse'}
            onClick={() => setCollapsed(previous => !previous)}
          >
            {collapsed ? (
              <ChevronUp className="size-3.5" />
            ) : (
              <ChevronDown className="size-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-6"
            aria-label="Clear finished uploads"
            onClick={clearFinished}
          >
            <X className="size-3.5" />
          </Button>
        </div>
      </div>
      {!collapsed && (
        <div className="max-h-80 overflow-y-auto">
          {items.map(queueItem => (
            <UploadQueueItemRow key={queueItem.id} queueItem={queueItem} />
          ))}
        </div>
      )}
    </Card>
  );
};
