import { notFound } from 'next/navigation';

import { isUuid } from 'shared/lib/uuid';
import { PublicShareBrowser } from 'widgets/public-share-browser/ui/public-share-browser/public-share-browser';

type Props = {
  params: Promise<{ token: string; fileId: string }>;
};

const PublicShareFilePage = async ({ params }: Props) => {
  const { token, fileId } = await params;

  if (!isUuid(fileId)) {
    notFound();
  }

  return <PublicShareBrowser key={fileId} token={token} fileId={fileId} />;
};

export default PublicShareFilePage;
