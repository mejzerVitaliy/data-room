'use client';

import { AlertTriangle } from 'lucide-react';

import { Button } from 'shared/ui/button';

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  error: Error & { digest?: string };
  reset: () => void;
};

const GlobalError = ({ reset }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-background px-4 text-center min-h-full-screen">
      <AlertTriangle className="size-10 text-muted-foreground" />
      <div>
        <h1 className="text-lg font-semibold">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
};

export default GlobalError;
