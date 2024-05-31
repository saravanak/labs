
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from '../components/sidebar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Projects by Saro(old weaver)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>

        <nav className="fixed bottom-[calc(100vh-theme(spacing.16))] left-0 right-0 top-0 bg-blue-200">
          Nav
        </nav>

        <div className="flex flex-row">
          <Sidebar></Sidebar>
          <main className="min-h-screen flex-col items-center justify-between p-24 bg-white w-full">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

