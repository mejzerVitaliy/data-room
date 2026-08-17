import { notFound } from 'next/navigation';

import { isUuid } from 'shared/lib/uuid';
import { FolderBrowser } from 'widgets/folder-browser/ui/folder-browser/folder-browser';

type Props = {
  params: Promise<{ roomId: string }>;
};

const DataRoomPage = async ({ params }: Props) => {
  const { roomId } = await params;

  if (!isUuid(roomId)) {
    notFound();
  }

  return <FolderBrowser key={roomId} dataRoomId={roomId} folderId={null} />;
};

export default DataRoomPage;
