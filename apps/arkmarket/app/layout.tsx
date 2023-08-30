import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { Toaster } from "@/components/ui/toaster";

import { MainNav } from "./components/main-nav";
import { Providers } from "./components/providers";
import { Search } from "./components/search";
import { UserNav } from "./components/user-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ark Market",
  description: "Ark Market a Starknet marketplace templace"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className="fixed top-0 z-10 w-full border-b bg-background">
            <div className="flex h-16 items-center px-4">
              <div className="flex h-16 items-center space-x-4 px-4">
                <Link href={"/"} passHref>
                  <Image
                    src="/arkmarket.svg"
                    alt="Ark Market"
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                    width={140}
                    height={21}
                    priority
                  />
                </Link>
                <Search />
              </div>
              <div className="ml-auto flex items-center space-x-6">
                <MainNav />
                <ModeToggle />
                <UserNav />
              </div>
            </div>
          </div>
          <div className="z-1 relative mx-auto mt-16 w-full max-w-[1600px]">
            {children}
          </div>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
