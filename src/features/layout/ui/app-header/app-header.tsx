import Link from 'next/link';

import { ThemeToggle } from 'features/layout/ui/theme-toggle/theme-toggle';
import { UserMenu } from 'features/layout/ui/user-menu/user-menu';

export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <nav className="flex items-center gap-5">
          <Link
            href="/data-rooms"
            className="font-mono text-sm font-medium tracking-tight"
          >
            Data Room
          </Link>
          <Link
            href="/shared-with-me"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Shared with me
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
