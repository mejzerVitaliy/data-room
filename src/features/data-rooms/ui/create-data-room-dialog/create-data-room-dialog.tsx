'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateDataRoom } from 'entities/data-room/hooks/post';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  DataRoomNameInput,
  dataRoomNameSchema,
} from 'features/data-rooms/schemas/validation';
import { getErrorMessage } from 'shared/lib/errors';
import { Button } from 'shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

export const CreateDataRoomDialog = () => {
  const [open, setOpen] = useState(false);
  const createDataRoom = useCreateDataRoom();

  const form = useForm<DataRoomNameInput>({
    resolver: zodResolver(dataRoomNameSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = (values: DataRoomNameInput) => {
    createDataRoom.mutate(values, {
      onSuccess: () => {
        toast.success('Data Room created');
        setOpen(false);
        form.reset();
      },
      onError: error => toast.error(getErrorMessage(error)),
    });
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
        <Button size="sm">
          <Plus className="mr-1.5 size-4" />
          New Data Room
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Data Room</DialogTitle>
          <DialogDescription>
            Give your new Data Room a name. You can rename it later.
          </DialogDescription>
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
                    <Input
                      placeholder="Acme Corp Acquisition"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={createDataRoom.isPending}>
                {createDataRoom.isPending ? 'Creating…' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
