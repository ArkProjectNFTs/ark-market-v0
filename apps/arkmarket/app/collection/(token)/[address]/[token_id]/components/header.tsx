"use client";

import React from "react";
import Link from "next/link";

import { useAccount } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import { Badge } from "@/components/ui/badge";

interface TokenSidebarProps {
  token: {
    token_address: string;
    token_id: string;
    owner?: string;
    normalized_metadata?: {
      name: string;
      description: string;
      image: string;
      attributes: unknown[];
      external_url: string;
    };
  };
}

const Header: React.FC<TokenSidebarProps> = ({ token }) => {
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = React.useState<string>("");
  React.useEffect(() => {
    if (address !== undefined) {
      setWalletAddress(validateAndParseAddress(address));
    }
  }, [address]);

  return (
    <>
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          {token.normalized_metadata?.name}
        </h2>
        <div className="flex space-x-2">
          <Badge variant="secondary">Rarity: #423</Badge>
        </div>
      </div>
      <div className="flex items-center justify-between py-2 text-sm">
        <div className="flex w-32 flex-col">
          <span className="text-xs text-muted-foreground">Created by</span>
          <span className="font-semibold">Team Everai</span>
        </div>
        <div className="flex w-32 flex-col">
          <span className="text-xs text-muted-foreground">Owner</span>
          <span className="truncate font-semibold">
            <Link href={`/profile/${token.owner}`}>
              {token.owner === walletAddress ? "You" : token.owner}
            </Link>
          </span>
        </div>
        <div className="flex w-32 flex-col">
          <span className="text-xs text-muted-foreground">Held for</span>
          <span className="font-semibold">12 days</span>
        </div>
        <div className="flex w-32 flex-col">
          <span className="text-xs text-muted-foreground">Last Price</span>
          <span className="font-semibold">3.24</span>
        </div>
        <div className="flex w-32 flex-col">
          <span className="text-xs text-muted-foreground">
            Collection Floor
          </span>
          <span className="font-semibold">6.24</span>
        </div>
        <div className="flex w-32 flex-col">
          <span className="text-xs text-muted-foreground">Top bid</span>
          <span className="font-semibold">7.24</span>
        </div>
      </div>
    </>
  );
};

export default Header;
