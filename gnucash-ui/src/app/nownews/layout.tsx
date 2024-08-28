'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/utils/query-client';

export const metadata = {
  title: 'Now Now Now News',
  description: 'Updates on the now pages from across the world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
