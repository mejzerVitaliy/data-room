'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateFolder } from 'entities/folder/hooks/post';
import { FolderPlus } from 'lucide-react';
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
  DialogTrigger,
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
  dataRoomId: string;
  parentId: string | null;
};

export const CreateFolderDialog = ({ dataRoomId, parentId }: Props) => {
  const [open, setOpen] = useState(false);
  const createFolder = useCreateFolder();

  const form = useForm<FolderNameInput>({
    resolver: zodResolver(folderNameSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = (values: FolderNameInput) => {
    createFolder.mutate(
      { dataRoomId, parentId, ...values },
      {
        onSuccess: () => {
          toast.success('Folder created');
          setOpen(false);
          form.reset();
        },
        onError: error => toast.error(getErrorMessage(error)),
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={next => {
        setOpen(next);
        if (!next) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FolderPlus className="mr-1.5 size-4" />
          New folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New folder</DialogTitle>
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
                    <Input placeholder="Financials" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={createFolder.isPending}>
                {createFolder.isPending ? 'Creating…' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
