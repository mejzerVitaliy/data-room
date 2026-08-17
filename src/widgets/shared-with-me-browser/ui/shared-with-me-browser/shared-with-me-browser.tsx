'use client';

import { useState } from 'react';

import Link from 'next/link';

import {
  useGetMySharedDataRoom,
  useGetMySharedFile,
  useGetMySharedFolder,
} from 'entities/shared-access/hooks/with-me';
import { FileText, Folder, FolderOpen, ShieldAlert } from 'lucide-react';

import { formatBytes, formatDate } from 'shared/lib/format';
import { Pager } from 'shared/ui/pager';
import { Skeleton } from 'shared/ui/skeleton';

const PER_PAGE = 50;

type Props =
  | { mode: 'data-room'; resourceId: string }
  | { mode: 'folder'; resourceId: string }
  | { mode: 'file'; resourceId: string };

const buildFolderHref = (folderId: string) =>
  `/shared-with-me/folders/${folderId}`;

const buildFileHref = (fileId: string) => `/shared-with-me/files/${fileId}`;

const UnavailableNotice = () => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
    <ShieldAlert className="size-8 text-muted-foreground" />
    <div>
      <p className="text-sm font-medium">This item is no longer available</p>
      <p className="text-sm text-muted-foreground">
        Access may have been revoked, or the content may have been removed.
      </p>
    </div>
    <Link
      href="/shared-with-me"
      className="text-sm font-medium text-foreground underline underline-offset-4"
    >
      Back to Shared with me
    </Link>
  </div>
);

export const SharedWithMeBrowser = ({ mode, resourceId }: Props) => {
  const [page, setPage] = useState(1);
  const params = { page, perPage: PER_PAGE };

  const dataRoomQuery = useGetMySharedDataRoom(
    mode === 'data-room' ? resourceId : '',
    params,
    mode === 'data-room',
  );
  const folderQuery = useGetMySharedFolder(
    mode === 'folder' ? resourceId : '',
    params,
    mode === 'folder',
  );
  const fileQuery = useGetMySharedFile(
    mode === 'file' ? resourceId : '',
    mode === 'file',
  );

  if (mode === 'file') {
    if (fileQuery.isPending) {
      return <Skeleton className="h-[70vh] w-full" />;
    }

    if (fileQuery.isError || !fileQuery.data) {
      return <UnavailableNotice />;
    }

    const { file, viewUrl, dataRoomName } = fileQuery.data.data;

    return (
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">{dataRoomName}</p>
        <div>
          <p className="text-sm font-medium">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatBytes(file.sizeBytes)}
          </p>
        </div>
        <div className="h-[75vh] overflow-hidden rounded-xl border border-border bg-muted">
          <iframe
            src={viewUrl}
            title={file.name}
            className="size-full border-0"
          />
        </div>
      </div>
    );
  }

  const query = mode === 'data-room' ? dataRoomQuery : folderQuery;

  if (query.isPending) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-5 w-64" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (query.isError || !query.data) {
    return <UnavailableNotice />;
  }

  const { dataRoomName, breadcrumbs, folders, files, totalPages } =
    query.data.data;
  const isEmpty = folders.length === 0 && files.length === 0;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-muted-foreground">{dataRoomName}</p>
        <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <span
            className={
              breadcrumbs.length === 0 ? 'font-medium text-foreground' : ''
            }
          >
            Root
          </span>
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.id} className="flex items-center gap-1">
              <span>/</span>
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-foreground">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={buildFolderHref(crumb.id)}
                  className="hover:text-foreground"
                >
                  {crumb.name}
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <FolderOpen className="size-8 text-muted-foreground" />
          <p className="text-sm font-medium">This folder is empty</p>
        </div>
      ) : (
        <div className="space-y-0.5">
          {folders.map(folder => (
            <Link
              key={folder.id}
              href={buildFolderHref(folder.id)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent/60"
            >
              <Folder className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {folder.name}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatDate(folder.updatedAt)}
              </span>
            </Link>
          ))}
          {files.map(file => (
            <Link
              key={file.id}
              href={buildFileHref(file.id)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent/60"
            >
              <FileText className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate text-sm">
                {file.name}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatBytes(file.sizeBytes)}
              </span>
            </Link>
          ))}
        </div>
      )}

      <Pager page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};
