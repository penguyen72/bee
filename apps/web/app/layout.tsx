import { SidebarProvider } from '@bee/ui/components/ui/sidebar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@bee/ui/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mighty Bee',
  description: 'A Check In Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <main className="flex w-full">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
