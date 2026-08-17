'use client';

import { useState } from 'react';

import Link from 'next/link';

import { useGetMyShares } from 'entities/shared-access/hooks/with-me';
import { File, Folder, FolderOpen, Users } from 'lucide-react';

import { Card } from 'shared/ui/card';
import { Pager } from 'shared/ui/pager';
import { Skeleton } from 'shared/ui/skeleton';

const PER_PAGE = 24;

const buildHref = (resourceType: string, resourceId: string) => {
  if (resourceType === 'DATA_ROOM') {
    return `/shared-with-me/data-rooms/${resourceId}`;
  }

  if (resourceType === 'FOLDER') {
    return `/shared-with-me/folders/${resourceId}`;
  }

  return `/shared-with-me/files/${resourceId}`;
};

const ResourceIcon = ({ resourceType }: { resourceType: string }) => {
  if (resourceType === 'FILE') {
    return <File className="size-5 text-muted-foreground" />;
  }

  return <Folder className="size-5 text-muted-foreground" />;
};

export const SharedWithMeList = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useGetMyShares({
    page,
    perPage: PER_PAGE,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">Shared with me</h1>
        <p className="text-sm text-muted-foreground">
          Data Rooms, folders, and files other people have granted you access
          to.
        </p>
      </div>

      {isPending && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} className="h-24 rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-sm text-destructive">
          Couldn&apos;t load your shared items. Please try again.
        </p>
      )}

      {data && data.data.shares.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <Users className="size-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Nothing shared with you yet</p>
            <p className="text-sm text-muted-foreground">
              When someone grants you access, it will show up here.
            </p>
          </div>
        </div>
      )}

      {data && data.data.shares.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.shares.map(share => (
              <Link
                key={`${share.resourceType}-${share.resourceId}`}
                href={buildHref(share.resourceType, share.resourceId)}
              >
                <Card className="flex flex-col gap-3 p-4 transition-colors hover:border-foreground/20">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                    {share.resourceType === 'DATA_ROOM' ? (
                      <FolderOpen className="size-5 text-muted-foreground" />
                    ) : (
                      <ResourceIcon resourceType={share.resourceType} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{share.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {share.dataRoomName}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <Pager
            page={data.data.page}
            totalPages={data.data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};
