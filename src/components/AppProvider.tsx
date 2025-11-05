'use client';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';

export * from '@heroui/react';

export default function AppProvider({children}: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <HeroUIProvider>{children}</HeroUIProvider>
    </ThemeProvider>
  );
}