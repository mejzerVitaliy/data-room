'use client';

import { useDeleteFolder } from 'entities/folder/hooks/delete';
import { useGetFolderDeletePreview } from 'entities/folder/hooks/get';
import { IFolder } from 'entities/folder/types/responses';
import { toast } from 'sonner';

import { getErrorMessage } from 'shared/lib/errors';
import { formatBytes } from 'shared/lib/format';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'shared/ui/alert-dialog';
import { Skeleton } from 'shared/ui/skeleton';

type Props = {
  folder: IFolder | null;
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
};

export const DeleteFolderDialog = ({
  folder,
  onOpenChange,
  onDeleted,
}: Props) => {
  const deleteFolder = useDeleteFolder();
  const preview = useGetFolderDeletePreview(folder?.id ?? '', Boolean(folder));

  const onConfirm = () => {
    if (!folder) {
      return;
    }

    deleteFolder.mutate(folder.id, {
      onSuccess: () => {
        toast.success('Folder deleted');
        onOpenChange(false);
        onDeleted?.();
      },
      onError: error => toast.error(getErrorMessage(error)),
    });
  };

  const renderPreview = () => {
    if (preview.isPending) {
      return <Skeleton className="h-4 w-64" />;
    }

    if (!preview.data) {
      return <p>This action cannot be undone.</p>;
    }

    const { folderCount, fileCount, totalSizeBytes } = preview.data.data;

    if (folderCount === 0 && fileCount === 0) {
      return <p>This folder is empty. This action cannot be undone.</p>;
    }

    return (
      <p>
        This will permanently delete{' '}
        <strong className="text-foreground">
          {folderCount} folder{folderCount === 1 ? '' : 's'} and {fileCount}{' '}
          file{fileCount === 1 ? '' : 's'}
        </strong>{' '}
        ({formatBytes(totalSizeBytes)}) nested inside this folder. This action
        cannot be undone.
      </p>
    );
  };

  return (
    <AlertDialog open={Boolean(folder)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &ldquo;{folder?.name}&rdquo;?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>{renderPreview()}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={deleteFolder.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteFolder.isPending ? 'Deleting…' : 'Delete folder'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
