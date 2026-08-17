'use client';

import { useDeleteDataRoom } from 'entities/data-room/hooks/delete';
import { useGetDataRoomDeletePreview } from 'entities/data-room/hooks/get';
import { IDataRoom } from 'entities/data-room/types/responses';
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
  dataRoom: IDataRoom | null;
  onOpenChange: (open: boolean) => void;
};

export const DeleteDataRoomDialog = ({ dataRoom, onOpenChange }: Props) => {
  const deleteDataRoom = useDeleteDataRoom();
  const preview = useGetDataRoomDeletePreview(
    dataRoom?.id ?? '',
    Boolean(dataRoom),
  );

  const onConfirm = () => {
    if (!dataRoom) {
      return;
    }

    deleteDataRoom.mutate(dataRoom.id, {
      onSuccess: () => {
        toast.success('Data Room deleted');
        onOpenChange(false);
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

    return (
      <p>
        This will permanently delete{' '}
        <strong className="text-foreground">
          {folderCount} folder{folderCount === 1 ? '' : 's'} and {fileCount}{' '}
          file{fileCount === 1 ? '' : 's'}
        </strong>{' '}
        ({formatBytes(totalSizeBytes)}) inside this Data Room. This action
        cannot be undone.
      </p>
    );
  };

  return (
    <AlertDialog open={Boolean(dataRoom)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &ldquo;{dataRoom?.name}&rdquo;?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>{renderPreview()}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={deleteDataRoom.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteDataRoom.isPending ? 'Deleting…' : 'Delete Data Room'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
