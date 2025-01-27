import SessionWrapper from '@/components/todo/session-wrapper';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrpcProvider } from '@/utils/trpc-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Toaster } from 'sonner';
import { baseUrl } from '@/utils/base-url';

// import { getServerSession } from "next-auth/next"

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'Old Weaver';
const APP_DEFAULT_TITLE = 'My Awesome Old Weaver';
const APP_TITLE_TEMPLATE = '%s - Old Weaver';
const APP_DESCRIPTION = 'Best Old Weaver in the world!';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${baseUrl}/favicon.svg`, 
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  icons: {
    icon: '/favicon.svg',
  }
};

export default async function TodoRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
      </head>
      <body
        className={cn(
          inter.className,
          'min-h-screen bg-gradient-to-b from-zinc-100 to-stone-100'
        )}
      >
        <TrpcProvider>
          <div className='lg:container lg:px-auto w-full lg:w-4/6 '>
            <Card className='border-none bg-gray-100'>
              <SessionWrapper>{children}</SessionWrapper>
            </Card>
          </div>
        </TrpcProvider>
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
