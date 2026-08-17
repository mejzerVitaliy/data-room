import Link from 'next/link';

import { FileQuestion } from 'lucide-react';

import { Button } from 'shared/ui/button';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center gap-4 bg-background px-4 text-center min-h-full-screen">
    <FileQuestion className="size-10 text-muted-foreground" />
    <div>
      <h1 className="text-lg font-semibold">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
    </div>
    <Button asChild>
      <Link href="/data-rooms">Back to Data Rooms</Link>
    </Button>
  </div>
);

export default NotFound;
