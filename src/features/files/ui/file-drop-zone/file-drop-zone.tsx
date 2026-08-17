'use client';

import { DragEvent, PropsWithChildren, useState } from 'react';

import { UploadCloud } from 'lucide-react';

import { useUploadFiles } from 'features/files/hooks/use-upload-files';

type Props = PropsWithChildren<{
  dataRoomId: string;
  folderId: string | null;
}>;

export const FileDropZone = ({ dataRoomId, folderId, children }: Props) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const { uploadFiles } = useUploadFiles();

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.dataTransfer.types.includes('Files')) {
      setIsDraggingOver(true);
    }
  };

  const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      return;
    }

    setIsDraggingOver(false);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);

    const files = Array.from(event.dataTransfer.files);

    if (files.length > 0) {
      uploadFiles(files, { dataRoomId, folderId });
    }
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className="relative"
    >
      {children}
      {isDraggingOver && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-brand p-12">
            <UploadCloud className="size-8 text-brand" />
            <p className="text-sm font-medium">Drop files to upload</p>
          </div>
        </div>
      )}
    </div>
  );
};
