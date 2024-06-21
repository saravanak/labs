import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppContainer from "@/components/layout/app-container";
import { TrpcProvider } from "@/utils/trpc-provider";

// import { getServerSession } from "next-auth/next"

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Old Weaver";
const APP_DEFAULT_TITLE = "My Awesome Old Weaver";
const APP_TITLE_TEMPLATE = "%s - Old Weaver";
const APP_DESCRIPTION = "Best Old Weaver in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
      </head>
      <body className={inter.className}>
        <TrpcProvider>
          <AppContainer>{children}</AppContainer>
        </TrpcProvider>
      </body>
    </html>
  );
}

