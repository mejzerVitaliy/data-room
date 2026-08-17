import { notFound } from 'next/navigation';

import { isUuid } from 'shared/lib/uuid';
import { SharedWithMeBrowser } from 'widgets/shared-with-me-browser/ui/shared-with-me-browser/shared-with-me-browser';

type Props = {
  params: Promise<{ id: string }>;
};

const SharedDataRoomPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!isUuid(id)) {
    notFound();
  }

  return <SharedWithMeBrowser key={id} mode="data-room" resourceId={id} />;
};

export default SharedDataRoomPage;
