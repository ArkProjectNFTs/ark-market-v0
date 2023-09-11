"use client";

import React from "react";

import { useAccount } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import TokenOwnerActions from "./token-owner-actions";
import TokenPublicActions from "./token-public-actions";

interface TokenActionsProps {
  token: any;
  contractAddress: string;
}

const TokenActions: React.FC<TokenActionsProps> = ({
  token,
  contractAddress
}) => {
  console.log(token);
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = React.useState<string>("");
  React.useEffect(() => {
    if (address !== undefined) {
      setWalletAddress(validateAndParseAddress(address));
    }
  }, [address]);
  
  return (
    <div>
      {token.owner === walletAddress && (
        <TokenOwnerActions token={token} contractAddress={contractAddress} />
      )}
      {token.owner !== walletAddress && walletAddress !== undefined && (
        <TokenPublicActions token={token} />
      )}
    </div>
  );
};

export default TokenActions;
