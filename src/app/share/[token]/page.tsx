import { PublicShareBrowser } from 'widgets/public-share-browser/ui/public-share-browser/public-share-browser';

type Props = {
  params: Promise<{ token: string }>;
};

const PublicSharePage = async ({ params }: Props) => {
  const { token } = await params;

  return <PublicShareBrowser token={token} />;
};

export default PublicSharePage;
