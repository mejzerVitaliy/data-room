import { Fragment } from 'react';

import { IBreadcrumb } from 'shared/types/breadcrumb';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'shared/ui/breadcrumb';

type Props = {
  dataRoomId: string;
  dataRoomName: string;
  breadcrumbs: IBreadcrumb[];
};

export const FolderBreadcrumbs = ({
  dataRoomId,
  dataRoomName,
  breadcrumbs,
}: Props) => {
  const isRoot = breadcrumbs.length === 0;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {isRoot ? (
            <BreadcrumbPage>{dataRoomName}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={`/data-rooms/${dataRoomId}`}>
              {dataRoomName}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <Fragment key={crumb.id}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={`/data-rooms/${dataRoomId}/folders/${crumb.id}`}
                  >
                    {crumb.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
