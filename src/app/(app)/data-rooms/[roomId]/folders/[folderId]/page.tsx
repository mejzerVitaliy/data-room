import { notFound } from 'next/navigation';

import { isUuid } from 'shared/lib/uuid';
import { FolderBrowser } from 'widgets/folder-browser/ui/folder-browser/folder-browser';

type Props = {
  params: Promise<{ roomId: string; folderId: string }>;
};

const FolderPage = async ({ params }: Props) => {
  const { roomId, folderId } = await params;

  if (!isUuid(roomId) || !isUuid(folderId)) {
    notFound();
  }

  return (
    <FolderBrowser
      key={`${roomId}-${folderId}`}
      dataRoomId={roomId}
      folderId={folderId}
    />
  );
};

export default FolderPage;
