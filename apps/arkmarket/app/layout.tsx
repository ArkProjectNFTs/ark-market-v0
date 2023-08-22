import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/ui/mode-toggle";

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
      <body className={inter.className}>
        <Providers>
          <div className="hidden flex-col md:flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <div className="flex h-16 items-center space-x-4 px-4">
                  <Link href={"/"} passHref>
                    <Image
                      src="/arkmarket.svg"
                      alt="Ark Market"
                      className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                      width={120}
                      height={37}
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
            <div className="max-w-[1600px] w-full mx-auto">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}