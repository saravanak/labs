import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppContainer from "@/components/layout/app-container";
import { TrpcProvider } from "@/utils/trpc-provider";

// import { getServerSession } from "next-auth/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Projects by Saro(old weaver)",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const session = (await getServerSession()) || {};

  // if (Object.keys(session).length !== 0) {
  //   redirect("/protected");
  // }

  return (
    <html lang="en">
      <body className={inter.className}>
        <TrpcProvider>
          <AppContainer>{children}</AppContainer>
        </TrpcProvider>
      </body>
    </html>
  );
}

