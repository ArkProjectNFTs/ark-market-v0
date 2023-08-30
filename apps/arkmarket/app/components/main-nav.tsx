"use client";

import Link from "next/link";

import { useAccount } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { address } = useAccount();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/trending"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Trending
      </Link>
      <Link
        href="/watchlist"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Watchlist
      </Link>
      <Link
        href={`/profile/${address ? validateAndParseAddress(address) : ""}`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Owned
      </Link>
    </nav>
  );
}
