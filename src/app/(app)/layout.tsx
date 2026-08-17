import { ReactNode } from 'react';

import { UploadQueuePanel } from 'features/files/ui/upload-queue-panel/upload-queue-panel';
import { AppHeader } from 'features/layout/ui/app-header/app-header';
import { AuthGuard } from 'widgets/auth-guard/ui/auth-guard/auth-guard';

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <AuthGuard mode="require-auth">
      <div className="bg-background min-h-full-screen">
        <AppHeader />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
        <UploadQueuePanel />
      </div>
    </AuthGuard>
  );
};

export default AppLayout;
