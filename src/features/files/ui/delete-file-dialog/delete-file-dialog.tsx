'use client';

import { useDeleteFile } from 'entities/file/hooks/delete';
import { IFile } from 'entities/file/types/responses';
import { toast } from 'sonner';

import { getErrorMessage } from 'shared/lib/errors';
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

type Props = {
  file: IFile | null;
  onOpenChange: (open: boolean) => void;
};

export const DeleteFileDialog = ({ file, onOpenChange }: Props) => {
  const deleteFile = useDeleteFile();

  const onConfirm = () => {
    if (!file) {
      return;
    }

    deleteFile.mutate(file.id, {
      onSuccess: () => {
        toast.success('File deleted');
        onOpenChange(false);
      },
      onError: error => toast.error(getErrorMessage(error)),
    });
  };

  return (
    <AlertDialog open={Boolean(file)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &ldquo;{file?.name}&rdquo;?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={deleteFile.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteFile.isPending ? 'Deleting…' : 'Delete file'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
