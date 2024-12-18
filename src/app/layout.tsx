import SidebarCollab from '@/components/Dashboard/Sidebar';
import { ThemeModeProvider } from '@/components/ThemeContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ModelProvider from '@/components/ModelContext';
// import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeModeProvider>
          <SidebarCollab>
            <ModelProvider>{children}</ModelProvider>
          </SidebarCollab>
        </ThemeModeProvider>
      </body>
    </html>
  );
}
