'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateDataRoom } from 'entities/data-room/hooks/put';
import { IDataRoom } from 'entities/data-room/types/responses';
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
  dataRoom: IDataRoom | null;
  onOpenChange: (open: boolean) => void;
};

export const RenameDataRoomDialog = ({ dataRoom, onOpenChange }: Props) => {
  const updateDataRoom = useUpdateDataRoom();

  const form = useForm<DataRoomNameInput>({
    resolver: zodResolver(dataRoomNameSchema),
    defaultValues: { name: dataRoom?.name ?? '' },
  });

  useEffect(() => {
    form.reset({ name: dataRoom?.name ?? '' });
  }, [dataRoom, form]);

  const onSubmit = (values: DataRoomNameInput) => {
    if (!dataRoom) {
      return;
    }

    updateDataRoom.mutate(
      { dataRoomId: dataRoom.id, ...values },
      {
        onSuccess: () => {
          toast.success('Data Room renamed');
          onOpenChange(false);
        },
        onError: error => toast.error(getErrorMessage(error)),
      },
    );
  };

  return (
    <Dialog open={Boolean(dataRoom)} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Data Room</DialogTitle>
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
              <Button type="submit" disabled={updateDataRoom.isPending}>
                {updateDataRoom.isPending ? 'Saving…' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
