'use client';

import { ChangeEvent, useRef } from 'react';

import { Upload } from 'lucide-react';

import { useUploadFiles } from 'features/files/hooks/use-upload-files';
import { Button } from 'shared/ui/button';

type Props = {
  dataRoomId: string;
  folderId: string | null;
};

export const UploadButton = ({ dataRoomId, folderId }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFiles } = useUploadFiles();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length > 0) {
      uploadFiles(files, { dataRoomId, folderId });
    }

    event.target.value = '';
  };

  return (
    <>
      <Button size="sm" onClick={() => inputRef.current?.click()}>
        <Upload className="mr-1.5 size-4" />
        Upload
      </Button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="application/pdf"
        className="hidden"
        onChange={onChange}
      />
    </>
  );
};
