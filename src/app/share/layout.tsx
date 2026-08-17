import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ShareLayout = ({ children }: Props) => {
  return (
    <div className="bg-background min-h-full-screen">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4 sm:px-6">
          <span className="font-mono text-sm font-medium tracking-tight">
            Data Room
          </span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
            Shared view
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
};

export default ShareLayout;
