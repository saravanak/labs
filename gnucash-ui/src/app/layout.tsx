
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppContainer from "@/components/layout/app-container";

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
          <AppContainer>{children}</AppContainer>
        

        {/* <div className="flex flex-row">
          
          <main className="min-h-screen flex-col items-center justify-between p-24 bg-white w-full">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex justify-center align-center">
              {children}
            </div>
          </main>
        </div> */}
      </body>
    </html>
  );
}

