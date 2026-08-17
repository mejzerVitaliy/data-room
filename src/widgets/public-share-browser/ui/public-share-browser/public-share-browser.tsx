'use client';

import { useState } from 'react';

import Link from 'next/link';

import {
  useGetPublicEntry,
  useGetPublicFile,
  useGetPublicFolder,
} from 'entities/shared-access/hooks/public';
import { FileText, Folder, FolderOpen, ShieldAlert } from 'lucide-react';

import { formatBytes, formatDate } from 'shared/lib/format';
import { Pager } from 'shared/ui/pager';
import { Skeleton } from 'shared/ui/skeleton';

const PER_PAGE = 50;

type Props = {
  token: string;
  folderId?: string;
  fileId?: string;
};

const buildFolderHref = (token: string, folderId: string) =>
  `/share/${token}/folders/${folderId}`;

const buildFileHref = (token: string, fileId: string) =>
  `/share/${token}/files/${fileId}`;

const UnavailableNotice = () => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
    <ShieldAlert className="size-8 text-muted-foreground" />
    <div>
      <p className="text-sm font-medium">This link is no longer available</p>
      <p className="text-sm text-muted-foreground">
        It may have been revoked, or the content may have been removed.
      </p>
    </div>
  </div>
);

export const PublicShareBrowser = ({ token, folderId, fileId }: Props) => {
  const [page, setPage] = useState(1);
  const isEntry = folderId === undefined && fileId === undefined;
  const isFileView = fileId !== undefined;

  const entryQuery = useGetPublicEntry(
    token,
    { page, perPage: PER_PAGE },
    isEntry,
  );
  const folderQuery = useGetPublicFolder(
    { token, folderId: folderId ?? '' },
    { page, perPage: PER_PAGE },
    !isEntry && !isFileView,
  );
  const fileQuery = useGetPublicFile(token, fileId ?? '', isFileView);

  if (isFileView) {
    if (fileQuery.isPending) {
      return <Skeleton className="h-[70vh] w-full" />;
    }

    if (fileQuery.isError || !fileQuery.data) {
      return <UnavailableNotice />;
    }

    const { file, viewUrl } = fileQuery.data.data;

    return (
      <div className="space-y-3">
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

  const query = isEntry ? entryQuery : folderQuery;

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

  const { data } = query.data;

  if ('file' in data) {
    const { file, viewUrl } = data;

    return (
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">{data.dataRoomName}</p>
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

  const { dataRoomName, breadcrumbs, folders, files, totalPages } = data;
  const isEmpty = folders.length === 0 && files.length === 0;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-muted-foreground">{dataRoomName}</p>
        <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {breadcrumbs.length === 0 ? (
            <span className="font-medium text-foreground">Root</span>
          ) : (
            breadcrumbs.map((crumb, index) => (
              <span key={crumb.id} className="flex items-center gap-1">
                {index > 0 && <span>/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-foreground">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={buildFolderHref(token, crumb.id)}
                    className="hover:text-foreground"
                  >
                    {crumb.name}
                  </Link>
                )}
              </span>
            ))
          )}
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
              href={buildFolderHref(token, folder.id)}
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
              href={buildFileHref(token, file.id)}
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
