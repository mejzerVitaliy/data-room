import { ReactNode } from 'react';

import type { Metadata } from 'next';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { cn } from 'shared/lib/styles';
import { TanStackQueryProvider } from 'shared/providers/tanstack-query';
import { ThemeProvider } from 'shared/providers/theme-provider';
import { Toaster } from 'shared/ui/sonner';

import 'app/styles/global.css';

export const metadata: Metadata = {
  title: 'Data Room',
  description:
    'A secure virtual data room for organizing and sharing due diligence documents.',
};

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <TanStackQueryProvider>
            {children}
            <Toaster position="bottom-right" />
          </TanStackQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
