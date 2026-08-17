'use client';

import { useCallback, useState } from 'react';

import Link from 'next/link';

import { useGetDataRoom } from 'entities/data-room/hooks/get';
import { useGetFiles } from 'entities/file/hooks/get';
import { IFile } from 'entities/file/types/responses';
import { useGetFolders } from 'entities/folder/hooks/get';
import { IFolder } from 'entities/folder/types/responses';
import { ArrowLeft, FolderOpen, SearchX } from 'lucide-react';

import { DeleteFileDialog } from 'features/files/ui/delete-file-dialog/delete-file-dialog';
import { FileDropZone } from 'features/files/ui/file-drop-zone/file-drop-zone';
import { FilePreviewDialog } from 'features/files/ui/file-preview-dialog/file-preview-dialog';
import { FileRow } from 'features/files/ui/file-row/file-row';
import { MoveFileDialog } from 'features/files/ui/move-file-dialog/move-file-dialog';
import { RenameFileDialog } from 'features/files/ui/rename-file-dialog/rename-file-dialog';
import { UploadButton } from 'features/files/ui/upload-button/upload-button';
import { CreateFolderDialog } from 'features/folders/ui/create-folder-dialog/create-folder-dialog';
import { DeleteFolderDialog } from 'features/folders/ui/delete-folder-dialog/delete-folder-dialog';
import { FolderRow } from 'features/folders/ui/folder-row/folder-row';
import { RenameFolderDialog } from 'features/folders/ui/rename-folder-dialog/rename-folder-dialog';
import { ShareableResource } from 'features/share/types';
import { ShareDialog } from 'features/share/ui/share-dialog/share-dialog';
import { Button } from 'shared/ui/button';
import { Pager } from 'shared/ui/pager';
import { Skeleton } from 'shared/ui/skeleton';
import {
  BrowseToolbar,
  FileTypeValue,
  SortValue,
} from 'widgets/folder-browser/ui/browse-toolbar/browse-toolbar';
import { FolderBreadcrumbs } from 'widgets/folder-browser/ui/folder-breadcrumbs/folder-breadcrumbs';

const PER_PAGE = 50;
const DEFAULT_SORT: SortValue = 'name-asc';

type Props = {
  dataRoomId: string;
  folderId: string | null;
};

const SORT_TO_QUERY: Record<
  SortValue,
  { sortBy: 'name' | 'createdAt'; sortOrder: 'asc' | 'desc' }
> = {
  'name-asc': { sortBy: 'name', sortOrder: 'asc' },
  'name-desc': { sortBy: 'name', sortOrder: 'desc' },
  'date-desc': { sortBy: 'createdAt', sortOrder: 'desc' },
  'date-asc': { sortBy: 'createdAt', sortOrder: 'asc' },
};

const UnavailableState = ({
  title,
  description,
  backHref,
  backLabel,
}: {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
}) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
    <FolderOpen className="size-8 text-muted-foreground" />
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <Link
      href={backHref}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4"
    >
      <ArrowLeft className="size-4" />
      {backLabel}
    </Link>
  </div>
);

export const FolderBrowser = ({ dataRoomId, folderId }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [fileType, setFileType] = useState<FileTypeValue>('all');
  const [sort, setSort] = useState<SortValue>(DEFAULT_SORT);
  const [renamingFolder, setRenamingFolder] = useState<IFolder | null>(null);
  const [deletingFolder, setDeletingFolder] = useState<IFolder | null>(null);
  const [viewingFileId, setViewingFileId] = useState<string | null>(null);
  const [renamingFile, setRenamingFile] = useState<IFile | null>(null);
  const [movingFile, setMovingFile] = useState<IFile | null>(null);
  const [deletingFile, setDeletingFile] = useState<IFile | null>(null);
  const [sharing, setSharing] = useState<ShareableResource | null>(null);

  const { sortBy, sortOrder } = SORT_TO_QUERY[sort];
  const hasActiveFilters = search.trim().length > 0 || fileType !== 'all';

  const onSearchChange = useCallback((nextSearch: string) => {
    setSearch(nextSearch);
    setPage(1);
  }, []);

  const onFileTypeChange = useCallback((nextFileType: FileTypeValue) => {
    setFileType(nextFileType);
    setPage(1);
  }, []);

  const onSortChange = useCallback((nextSort: SortValue) => {
    setSort(nextSort);
    setPage(1);
  }, []);

  const onClearFilters = useCallback(() => {
    setSearch('');
    setFileType('all');
    setPage(1);
  }, []);

  const dataRoomQuery = useGetDataRoom(dataRoomId);
  const foldersQuery = useGetFolders({
    dataRoomId,
    parentId: folderId ?? undefined,
    page,
    perPage: PER_PAGE,
    search: search.trim() || undefined,
    sortBy,
    sortOrder,
  });
  const filesQuery = useGetFiles({
    dataRoomId,
    folderId: folderId ?? undefined,
    page,
    perPage: PER_PAGE,
    search: search.trim() || undefined,
    sortBy,
    sortOrder,
    fileType: fileType === 'all' ? undefined : fileType,
  });

  if (dataRoomQuery.isError) {
    return (
      <UnavailableState
        title="This Data Room is unavailable"
        description="It may have been deleted, or you no longer have access."
        backHref="/data-rooms"
        backLabel="Back to Data Rooms"
      />
    );
  }

  if (foldersQuery.isError) {
    return (
      <UnavailableState
        title="This folder is unavailable"
        description="It may have been moved, deleted, or you no longer have access."
        backHref={`/data-rooms/${dataRoomId}`}
        backLabel="Back to Data Room"
      />
    );
  }

  if (
    dataRoomQuery.isPending ||
    foldersQuery.isPending ||
    filesQuery.isPending
  ) {
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

  const dataRoomName = dataRoomQuery.data.data.dataRoom.name;
  const { folders } = foldersQuery.data.data;
  const files = filesQuery.data?.data.files ?? [];
  const { breadcrumbs } = foldersQuery.data.data;
  const isEmpty = folders.length === 0 && files.length === 0;
  const totalPages = Math.max(
    foldersQuery.data.data.totalPages,
    filesQuery.data?.data.totalPages ?? 1,
  );

  return (
    <FileDropZone dataRoomId={dataRoomId} folderId={folderId}>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <FolderBreadcrumbs
            dataRoomId={dataRoomId}
            dataRoomName={dataRoomName}
            breadcrumbs={breadcrumbs}
          />
          <div className="flex items-center gap-2">
            <CreateFolderDialog dataRoomId={dataRoomId} parentId={folderId} />
            <UploadButton dataRoomId={dataRoomId} folderId={folderId} />
          </div>
        </div>

        <BrowseToolbar
          search={search}
          onSearchChange={onSearchChange}
          fileType={fileType}
          onFileTypeChange={onFileTypeChange}
          sort={sort}
          onSortChange={onSortChange}
        />

        {isEmpty && hasActiveFilters && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
            <SearchX className="size-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">No matches found</p>
              <p className="text-sm text-muted-foreground">
                Try a different search term or clear the filters.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              Clear filters
            </Button>
          </div>
        )}

        {isEmpty && !hasActiveFilters && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
            <FolderOpen className="size-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">This folder is empty</p>
              <p className="text-sm text-muted-foreground">
                Drag and drop files here, or use the buttons above.
              </p>
            </div>
          </div>
        )}

        {!isEmpty && (
          <div className="space-y-0.5">
            {folders.map(folder => (
              <FolderRow
                key={folder.id}
                folder={folder}
                href={`/data-rooms/${dataRoomId}/folders/${folder.id}`}
                onRename={setRenamingFolder}
                onShare={folder =>
                  setSharing({
                    resourceType: 'FOLDER',
                    resourceId: folder.id,
                    name: folder.name,
                  })
                }
                onDelete={setDeletingFolder}
              />
            ))}
            {files.map(file => (
              <FileRow
                key={file.id}
                file={file}
                onView={file => setViewingFileId(file.id)}
                onRename={setRenamingFile}
                onMove={setMovingFile}
                onShare={file =>
                  setSharing({
                    resourceType: 'FILE',
                    resourceId: file.id,
                    name: file.name,
                  })
                }
                onDelete={setDeletingFile}
              />
            ))}
          </div>
        )}

        <Pager page={page} totalPages={totalPages} onPageChange={setPage} />

        <RenameFolderDialog
          folder={renamingFolder}
          onOpenChange={open => !open && setRenamingFolder(null)}
        />
        <DeleteFolderDialog
          folder={deletingFolder}
          onOpenChange={open => !open && setDeletingFolder(null)}
        />
        <FilePreviewDialog
          fileId={viewingFileId}
          onOpenChange={open => !open && setViewingFileId(null)}
        />
        <RenameFileDialog
          file={renamingFile}
          onOpenChange={open => !open && setRenamingFile(null)}
        />
        <MoveFileDialog
          file={movingFile}
          onOpenChange={open => !open && setMovingFile(null)}
        />
        <DeleteFileDialog
          file={deletingFile}
          onOpenChange={open => !open && setDeletingFile(null)}
        />
        <ShareDialog
          resource={sharing}
          onOpenChange={open => !open && setSharing(null)}
        />
      </div>
    </FileDropZone>
  );
};
