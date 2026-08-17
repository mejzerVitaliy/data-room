'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateFolder } from 'entities/folder/hooks/put';
import { IFolder } from 'entities/folder/types/responses';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  FolderNameInput,
  folderNameSchema,
} from 'features/folders/schemas/validation';
import { getErrorMessage } from 'shared/lib/errors';
import { Button } from 'shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'shared/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'shared/ui/form';
import { Input } from 'shared/ui/input';

type Props = {
  folder: IFolder | null;
  onOpenChange: (open: boolean) => void;
};

export const RenameFolderDialog = ({ folder, onOpenChange }: Props) => {
  const updateFolder = useUpdateFolder();

  const form = useForm<FolderNameInput>({
    resolver: zodResolver(folderNameSchema),
    defaultValues: { name: folder?.name ?? '' },
  });

  useEffect(() => {
    form.reset({ name: folder?.name ?? '' });
  }, [folder, form]);

  const onSubmit = (values: FolderNameInput) => {
    if (!folder) {
      return;
    }

    updateFolder.mutate(
      { folderId: folder.id, ...values },
      {
        onSuccess: () => {
          toast.success('Folder renamed');
          onOpenChange(false);
        },
        onError: error => toast.error(getErrorMessage(error)),
      },
    );
  };

  return (
    <Dialog open={Boolean(folder)} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename folder</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={updateFolder.isPending}>
                {updateFolder.isPending ? 'Saving…' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
