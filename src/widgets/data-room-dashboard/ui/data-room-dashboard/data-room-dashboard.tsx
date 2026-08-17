'use client';

import { useState } from 'react';

import { useGetDataRooms } from 'entities/data-room/hooks/get';
import { IDataRoom } from 'entities/data-room/types/responses';
import { FolderOpen } from 'lucide-react';

import { CreateDataRoomDialog } from 'features/data-rooms/ui/create-data-room-dialog/create-data-room-dialog';
import { DataRoomCard } from 'features/data-rooms/ui/data-room-card/data-room-card';
import { DeleteDataRoomDialog } from 'features/data-rooms/ui/delete-data-room-dialog/delete-data-room-dialog';
import { RenameDataRoomDialog } from 'features/data-rooms/ui/rename-data-room-dialog/rename-data-room-dialog';
import { ShareDialog } from 'features/share/ui/share-dialog/share-dialog';
import { Pager } from 'shared/ui/pager';
import { Skeleton } from 'shared/ui/skeleton';

const PER_PAGE = 24;

export const DataRoomDashboard = () => {
  const [page, setPage] = useState(1);
  const [renaming, setRenaming] = useState<IDataRoom | null>(null);
  const [deleting, setDeleting] = useState<IDataRoom | null>(null);
  const [sharing, setSharing] = useState<IDataRoom | null>(null);

  const { data, isPending, isError } = useGetDataRooms({
    page,
    perPage: PER_PAGE,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Data Rooms</h1>
          <p className="text-sm text-muted-foreground">
            Secure spaces for organizing due diligence documents.
          </p>
        </div>
        <CreateDataRoomDialog />
      </div>

      {isPending && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} className="h-28 rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-sm text-destructive">
          Couldn&apos;t load your Data Rooms. Please try again.
        </p>
      )}

      {data && data.data.dataRooms.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <FolderOpen className="size-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">No Data Rooms yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first Data Room to start organizing documents.
            </p>
          </div>
        </div>
      )}

      {data && data.data.dataRooms.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.dataRooms.map(dataRoom => (
              <DataRoomCard
                key={dataRoom.id}
                dataRoom={dataRoom}
                onRename={setRenaming}
                onShare={setSharing}
                onDelete={setDeleting}
              />
            ))}
          </div>
          <Pager
            page={data.data.page}
            totalPages={data.data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <RenameDataRoomDialog
        dataRoom={renaming}
        onOpenChange={open => !open && setRenaming(null)}
      />
      <DeleteDataRoomDialog
        dataRoom={deleting}
        onOpenChange={open => !open && setDeleting(null)}
      />
      <ShareDialog
        resource={
          sharing
            ? {
                resourceType: 'DATA_ROOM',
                resourceId: sharing.id,
                name: sharing.name,
              }
            : null
        }
        onOpenChange={open => !open && setSharing(null)}
      />
    </div>
  );
};
