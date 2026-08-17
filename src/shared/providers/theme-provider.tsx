'use client';

import { PropsWithChildren } from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
);
