'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateFile } from 'entities/file/hooks/put';
import { IFile } from 'entities/file/types/responses';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  FileNameInput,
  fileNameSchema,
} from 'features/files/schemas/validation';
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
  file: IFile | null;
  onOpenChange: (open: boolean) => void;
};

export const RenameFileDialog = ({ file, onOpenChange }: Props) => {
  const updateFile = useUpdateFile();

  const form = useForm<FileNameInput>({
    resolver: zodResolver(fileNameSchema),
    defaultValues: { name: file?.name ?? '' },
  });

  useEffect(() => {
    form.reset({ name: file?.name ?? '' });
  }, [file, form]);

  const onSubmit = (values: FileNameInput) => {
    if (!file) {
      return;
    }

    updateFile.mutate(
      { fileId: file.id, ...values },
      {
        onSuccess: () => {
          toast.success('File renamed');
          onOpenChange(false);
        },
        onError: error => toast.error(getErrorMessage(error)),
      },
    );
  };

  return (
    <Dialog open={Boolean(file)} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename file</DialogTitle>
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
              <Button type="submit" disabled={updateFile.isPending}>
                {updateFile.isPending ? 'Saving…' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
