"use client";

import React from "react";

import { useAccount } from "@starknet-react/core";

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
  return (
    <div>
      {tokenOwnerAddress === address ? (
        <TokenOwnerActions
          tokenId={tokenId}
          tokenOwnerAddress={"contractAddress"}
          contractAddress={contractAddress}
        />
      ) : (
        <TokenPublicActions />
      )}
    </div>
  );
};

export default TokenActions;
