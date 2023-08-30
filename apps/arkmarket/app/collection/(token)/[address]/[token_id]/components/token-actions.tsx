"use client";

import React, { useEffect } from "react";

import { useAccount } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import { Skeleton } from "@/components/ui/skeleton";

import TokenOwnerActions from "./token-owner-actions";
import TokenPublicActions from "./token-public-actions";

interface TokenActionsProps {
  tokenId: string;
  contractAddress: string;
  tokenOwnerAddress: string;
}

const TokenActions: React.FC<TokenActionsProps> = ({
  tokenId,
  contractAddress,
  tokenOwnerAddress
}) => {
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = React.useState<string>("");
  useEffect(() => {
    if (address !== undefined) {
      setWalletAddress(validateAndParseAddress(address));
    }
  }, [address]);

  if (!address) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div>
      {tokenOwnerAddress === walletAddress && (
        <TokenOwnerActions
          tokenId={tokenId}
          tokenOwnerAddress={"contractAddress"}
          contractAddress={contractAddress}
        />
      )}
      {tokenOwnerAddress !== walletAddress && walletAddress !== undefined && (
        <TokenPublicActions />
      )}
    </div>
  );
};

export default TokenActions;
