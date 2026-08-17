import { notFound } from 'next/navigation';

import { isUuid } from 'shared/lib/uuid';
import { PublicShareBrowser } from 'widgets/public-share-browser/ui/public-share-browser/public-share-browser';

type Props = {
  params: Promise<{ token: string; folderId: string }>;
};

const PublicShareFolderPage = async ({ params }: Props) => {
  const { token, folderId } = await params;

  if (!isUuid(folderId)) {
    notFound();
  }

  return (
    <PublicShareBrowser key={folderId} token={token} folderId={folderId} />
  );
};

export default PublicShareFolderPage;
